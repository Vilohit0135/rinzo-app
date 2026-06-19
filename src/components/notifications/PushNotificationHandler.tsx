import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { requestPermissions, addNotificationResponseListener } from '../../services/pushNotification.service';
import type { RootStackParamList } from '../../types/navigation';

const PushNotificationHandler = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navRef = useRef(navigation);
  navRef.current = navigation;

  useEffect(() => {
    requestPermissions();

    const sub = addNotificationResponseListener((response: any) => {
      const data = response?.notification?.request?.content?.data;
      if (data?.notificationId) {
        navRef.current.navigate('NotificationDetails' as any, {
          notificationId: data.notificationId,
        } as any);
      }
    });

    return () => {
      sub?.remove();
    };
  }, []);

  return null;
};

export default PushNotificationHandler;
