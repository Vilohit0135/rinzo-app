import { Platform } from 'react-native';
import Constants from 'expo-constants';

const IS_EXPO_GO = Constants.executionEnvironment === 'storeClient';

function loadNotifications() {
  try {
    return require('expo-notifications');
  } catch {
    return null;
  }
}

function loadDevice() {
  try {
    return require('expo-device');
  } catch {
    return null;
  }
}

let handlerSet = false;

function ensureHandler() {
  if (handlerSet || IS_EXPO_GO) return;
  const Notifications = loadNotifications();
  if (!Notifications) return;
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    handlerSet = true;
  } catch {
    handlerSet = true;
  }
}

export async function setupNotificationChannel(): Promise<void> {
  if (IS_EXPO_GO || Platform.OS !== 'android') return;
  const Notifications = loadNotifications();
  if (!Notifications) return;
  try {
    await Notifications.setNotificationChannelAsync('rinzo-orders', {
      name: 'Orders',
      importance: 5,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#8259D2',
    });
  } catch {
    // channel setup failed silently
  }
}

export async function requestPermissions(): Promise<boolean> {
  if (IS_EXPO_GO) return true;
  const Device = loadDevice();
  if (Device && !Device.isDevice) return true;

  const Notifications = loadNotifications();
  if (!Notifications) return true;

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') return false;
    if (Platform.OS === 'android') {
      await setupNotificationChannel();
    }
    return true;
  } catch {
    return true;
  }
}

export async function showLocalNotification(
  title: string,
  body: string,
  data?: Record<string, any>
): Promise<void> {
  if (IS_EXPO_GO) return;
  ensureHandler();
  const Notifications = loadNotifications();
  if (!Notifications) return;

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
        sound: true,
        ...(Platform.OS === 'android' ? { channelId: 'rinzo-orders' } : {}),
      },
      trigger: null,
    });
  } catch {
    // notification schedule failed silently
  }
}

export function addNotificationResponseListener(
  handler: (response: any) => void
): { remove: () => void } | null {
  if (IS_EXPO_GO) return null;
  const Notifications = loadNotifications();
  if (!Notifications) return null;

  try {
    const subscription = Notifications.addNotificationResponseReceivedListener(handler);
    return {
      remove: () => {
        try { subscription.remove(); } catch {}
      },
    };
  } catch {
    return null;
  }
}
