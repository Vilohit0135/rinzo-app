import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNotificationStore } from '../../store/notificationStore';
import { initializeNotifications } from '../../services/notification.service';
import type { RootStackParamList } from '../../types/navigation';
import type { NotificationItem } from '../../types/notification.types';
import NotificationsHeader from '../../components/notifications/NotificationsHeader';
import NotificationList from '../../components/notifications/NotificationList';
import NotificationsEmptyState from '../../components/notifications/NotificationsEmptyState';

const NotificationsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const notifications = useNotificationStore((s) => s.notifications);
  const markAllRead = useNotificationStore((s) => s.markAllRead);

  useEffect(() => {
    initializeNotifications();
  }, []);

  const handleNotificationPress = (item: NotificationItem) => {
    (navigation as any).navigate('NotificationDetails', { notificationId: item.id });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <NotificationsHeader
        onBackPress={() => navigation.goBack()}
        onMarkAllRead={markAllRead}
      />

      <View style={styles.content}>
        {notifications.length === 0 ? (
          <NotificationsEmptyState />
        ) : (
          <NotificationList
            notifications={notifications}
            onNotificationPress={handleNotificationPress}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  content: {
    flex: 1,
  },
});

export default NotificationsScreen;
