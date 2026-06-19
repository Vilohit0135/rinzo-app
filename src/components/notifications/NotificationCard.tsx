import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { type NotificationItem } from '../../types/notification.types';
import NotificationIcon from './NotificationIcon';

interface NotificationCardProps {
  item: NotificationItem;
  onPress: (item: NotificationItem) => void;
}

function formatTime(isoDate: string): string {
  const date = new Date(isoDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  const m = minutes.toString().padStart(2, '0');
  return `${h}:${m} ${ampm}`;
}

const NotificationCard = ({ item, onPress }: NotificationCardProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.95}
      onPress={() => onPress(item)}
    >
      <View style={styles.container}>
        <NotificationIcon category={item.category} />
        <View style={styles.content}>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail"
            allowFontScaling={false}
          >
            {item.title}
          </Text>
          <Text
            style={styles.message}
            numberOfLines={1}
            ellipsizeMode="tail"
            allowFontScaling={false}
          >
            {item.message}
          </Text>
        </View>
        <Text style={styles.time} allowFontScaling={false}>
          {formatTime(item.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 88,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 10,
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 20,
  },
  message: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 17,
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A9A9A9',
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

export default NotificationCard;
