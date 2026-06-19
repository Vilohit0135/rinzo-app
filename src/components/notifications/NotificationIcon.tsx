import { View, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NotificationCategory } from '../../types/notification.types';

interface NotificationIconProps {
  category: NotificationCategory;
}

function getIconName(category: NotificationCategory): string {
  switch (category) {
    case NotificationCategory.ORDER_PICKUP_ASSIGNED:
    case NotificationCategory.ORDER_PICKED_UP:
      return 'notifications-outline';
    case NotificationCategory.ORDER_WASHING:
    case NotificationCategory.ORDER_IN_PROCESS:
    case NotificationCategory.ORDER_IRONING:
    case NotificationCategory.ORDER_PACKING:
      return 'people-outline';
    case NotificationCategory.ORDER_OUT_FOR_DELIVERY:
      return 'settings-outline';
    case NotificationCategory.ORDER_CREATED:
    case NotificationCategory.ORDER_CONFIRMED:
    case NotificationCategory.ORDER_DELIVERED:
      return 'checkmark-circle-outline';
    default:
      return 'notifications-outline';
  }
}

const NotificationIcon = ({ category }: NotificationIconProps) => {
  const iconName = getIconName(category);

  return (
    <View style={styles.container}>
      <Ionicons name={iconName as any} size={24} color="#D3D3D3" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationIcon;
