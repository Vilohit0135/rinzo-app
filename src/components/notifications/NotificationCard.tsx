import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NotificationItem } from '../../data/notifications/notificationsData';

interface NotificationCardProps {
  item: NotificationItem;
}

const NotificationCard = ({ item }: NotificationCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon as any} size={24} color="#D0D0D0" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 78,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  message: {
    fontSize: 14,
    fontWeight: '400',
    color: '#111111',
    marginTop: 1,
  },
  time: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A5A5A5',
    alignSelf: 'flex-start',
  },
});

export default NotificationCard;
