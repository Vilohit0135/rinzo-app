import { FlatList, StyleSheet } from 'react-native';
import { type NotificationItem } from '../../types/notification.types';
import NotificationCard from './NotificationCard';

interface NotificationListProps {
  notifications: NotificationItem[];
  onNotificationPress: (item: NotificationItem) => void;
}

const NotificationList = ({ notifications, onNotificationPress }: NotificationListProps) => {
  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => (
        <NotificationCard item={item} onPress={onNotificationPress} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 100,
  },
});

export default NotificationList;
