export interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  message: string;
  time: string;
}

export const notificationsData: NotificationItem[] = [
  {
    id: '1',
    icon: 'notifications-outline',
    title: 'Order Picked up',
    message: 'Your order has been picked up',
    time: '9:41 AM',
  },
  {
    id: '2',
    icon: 'people-outline',
    title: 'Washing Started',
    message: 'We have started washing your clothes',
    time: '9:41 AM',
  },
  {
    id: '3',
    icon: 'bicycle-outline',
    title: 'Out for Delivery',
    message: 'Your order is out for delivery',
    time: '9:41 AM',
  },
  {
    id: '4',
    icon: 'checkmark-circle-outline',
    title: 'Order Picked up',
    message: 'Your order has been picked up',
    time: '9:41 AM',
  },
];
