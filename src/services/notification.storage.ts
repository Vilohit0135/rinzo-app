import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  NOTIFICATIONS: 'rinzo-notifications',
  BADGE_COUNT: 'rinzo-badge-count',
  LAST_SEEN: 'rinzo-notification-last-seen',
} as const;

export async function getBadgeCount(): Promise<number> {
  try {
    const val = await AsyncStorage.getItem(KEYS.BADGE_COUNT);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

export async function setBadgeCount(count: number): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.BADGE_COUNT, String(count));
  } catch {
    // silently fail
  }
}

export async function getLastSeenTimestamp(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(KEYS.LAST_SEEN);
  } catch {
    return null;
  }
}

export async function setLastSeenTimestamp(iso: string): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.LAST_SEEN, iso);
  } catch {
    // silently fail
  }
}
