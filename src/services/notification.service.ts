import { NotificationCategory, NotificationPriority, type NotificationItem } from '../types/notification.types';
import { useNotificationStore } from '../store/notificationStore';
import { showLocalNotification } from './pushNotification.service';

interface NotificationTemplate {
  category: NotificationCategory;
  title: string;
  message: string;
  actionType?: string;
  actionPayload?: string;
  priority: NotificationPriority;
}

const templates: NotificationTemplate[] = [
  { category: NotificationCategory.ORDER_CREATED, title: 'Order Created', message: 'Your order #RNZ1024 has been created successfully.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.ORDER_CONFIRMED, title: 'Order Confirmed', message: 'Your order #RNZ1024 has been confirmed. We will pick up your clothes soon.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.ORDER_PICKUP_ASSIGNED, title: 'Pickup Partner Assigned', message: 'Rahul will arrive for pickup between 4-5 PM today.', priority: NotificationPriority.HIGH },
  { category: NotificationCategory.ORDER_PICKUP_ASSIGNED, title: 'Pickup Partner on the Way', message: 'Your pickup partner Suresh is on the way. Expected in 15 mins.', priority: NotificationPriority.HIGH },
  { category: NotificationCategory.ORDER_PICKED_UP, title: 'Items Picked Up', message: 'Your laundry items have been picked up. Total: 8 items.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.ORDER_PICKED_UP, title: 'Pickup Complete', message: 'All 12 items picked up from your doorstep. Heading to facility.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.ORDER_IN_PROCESS, title: 'Processing Started', message: 'Your laundry has reached our facility and processing has begun.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.ORDER_WASHING, title: 'Washing in Progress', message: 'Your clothes are being washed with premium detergent.', priority: NotificationPriority.LOW },
  { category: NotificationCategory.ORDER_IRONING, title: 'Ironing in Progress', message: 'Your clothes are being ironed with care.', priority: NotificationPriority.LOW },
  { category: NotificationCategory.ORDER_PACKING, title: 'Packing Your Order', message: 'Your clothes are being folded and packed neatly.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.ORDER_OUT_FOR_DELIVERY, title: 'Out for Delivery', message: 'Your order is out for delivery. Expected within 1 hour.', priority: NotificationPriority.HIGH },
  { category: NotificationCategory.ORDER_DELIVERED, title: 'Order Delivered', message: 'Your order has been delivered successfully. Thank you for choosing Rinzo!', priority: NotificationPriority.HIGH },
  { category: NotificationCategory.ORDER_DELIVERED, title: 'Delivery Complete', message: 'All 8 items delivered. Rate your experience!', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.PAYMENT_SUCCESS, title: 'Payment Successful', message: '₹450 payment received successfully for order #RNZ1024.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.PAYMENT_SUCCESS, title: 'Payment Received', message: '₹320 paid via UPI. Receipt sent to your email.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.PAYMENT_FAILED, title: 'Payment Failed', message: 'Payment of ₹250 failed. Please try again.', priority: NotificationPriority.HIGH },
  { category: NotificationCategory.PAYMENT_REFUND, title: 'Refund Initiated', message: '₹50 refund has been initiated for cancelled item. Expected in 3-5 days.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.PAYMENT_REFUND, title: 'Refund Credited', message: '₹120 refund has been credited to your original payment method.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.PROMOTION, title: 'Flat 20% Off', message: 'Enjoy flat 20% off on your next order. Use code FRESH20. Valid till Sunday!', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.PROMOTION, title: 'Free Pickup', message: 'Free pickup on all orders above ₹299. No minimum order value for new users!', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.PROMOTION, title: 'Weekend Special', message: 'Flat 30% off on Dry Clean services this weekend. Book now!', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.PROMOTION, title: 'Refer & Earn', message: 'Refer a friend and get ₹100 off on your next order. Your friend gets ₹50 off too!', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.PROMOTION, title: 'Monsoon Offer', message: 'Save 25% on full laundry service. Use code MONSOON25.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.WALLET_CREDIT, title: 'Wallet Credited', message: '₹50 cashback credited to your Rinzo wallet.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.WALLET_CREDIT, title: 'Wallet Top-up', message: '₹200 added to your wallet via UPI. New balance: ₹450.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.WALLET_DEBIT, title: 'Wallet Debited', message: '₹180 used from wallet for order #RNZ1032.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.REFERRAL_REWARD, title: 'Referral Reward', message: 'You earned ₹100 referral reward. Your friend has placed their first order!', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.REFERRAL_REWARD, title: 'Referral Bonus', message: 'Congratulations! You earned ₹150 for referring 3 friends.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.SYSTEM_UPDATE, title: 'New Feature', message: 'Schedule pickups up to 7 days in advance now available!', priority: NotificationPriority.LOW },
  { category: NotificationCategory.SYSTEM_UPDATE, title: 'Service Area Expanded', message: 'Rinzo is now available in Whitefield, Electronic City and HSR Layout!', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.SERVICE_REMINDER, title: 'Schedule Reminder', message: 'Your weekly laundry is due tomorrow. Schedule a pickup now!', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.SERVICE_REMINDER, title: 'Pickup Reminder', message: 'Your pickup is scheduled for today at 4 PM. Please keep your clothes ready.', priority: NotificationPriority.HIGH },
  { category: NotificationCategory.ANNOUNCEMENT, title: 'Diwali Special', message: 'Rinzo is running festive offers all week! Get up to 40% off on all services.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.ANNOUNCEMENT, title: 'Maintenance Break', message: 'We will be performing maintenance on Sunday 2-4 AM. Some features may be unavailable.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.APP_UPDATE, title: 'Update Available', message: 'Version 2.5.0 is now available. New features include real-time order tracking!', priority: NotificationPriority.LOW },
  { category: NotificationCategory.APP_UPDATE, title: 'New Update', message: 'Bug fixes and performance improvements in the latest update.', priority: NotificationPriority.LOW },
  { category: NotificationCategory.ORDER_CREATED, title: 'Order Created', message: 'Your order #RNZ1033 for Dry Clean service has been created.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.ORDER_CONFIRMED, title: 'Express Order Confirmed', message: 'Your express order #RNZ1034 is confirmed. Priority processing applied.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.ORDER_WASHING, title: 'Wash Complete', message: 'Washing complete for 5 items. Moving to drying stage.', priority: NotificationPriority.LOW },
  { category: NotificationCategory.ORDER_IRONING, title: 'Ironing Complete', message: 'All items have been ironed. Ready for packing.', priority: NotificationPriority.LOW },
  { category: NotificationCategory.ORDER_PACKING, title: 'Packing Complete', message: 'Your order is packed with eco-friendly packaging.', priority: NotificationPriority.NORMAL },
];

function randomId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 3600000).toISOString();
}

export function generateSeedNotifications(): NotificationItem[] {
  const items: NotificationItem[] = [];

  templates.forEach((t, index) => {
    items.push({
      id: `seed_${index}`,
      title: t.title,
      message: t.message,
      category: t.category,
      actionType: undefined,
      actionPayload: undefined,
      isRead: index < 15,
      createdAt: hoursAgo(index * 2 + Math.floor(Math.random() * 4)),
      priority: t.priority,
    });
  });

  return items;
}

const pushTemplates: NotificationTemplate[] = [
  { category: NotificationCategory.ORDER_PICKUP_ASSIGNED, title: 'Pickup Partner Assigned', message: 'Your pickup partner is on the way! ETA 15 minutes.', priority: NotificationPriority.HIGH },
  { category: NotificationCategory.ORDER_OUT_FOR_DELIVERY, title: 'Out for Delivery', message: 'Your order is out for delivery. Expected within 1 hour.', priority: NotificationPriority.HIGH },
  { category: NotificationCategory.ORDER_DELIVERED, title: 'Order Delivered', message: 'Your laundry has been delivered. Enjoy fresh clothes!', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.PROMOTION, title: 'Weekend Flash Sale', message: 'Extra 15% off on all services this weekend only!', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.PROMOTION, title: 'Don\'t Miss Out', message: 'Your cart is waiting! Complete your order now for free delivery.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.WALLET_CREDIT, title: 'Cashback Received', message: '₹25 cashback credited from your recent order.', priority: NotificationPriority.NORMAL },
  { category: NotificationCategory.SERVICE_REMINDER, title: 'Time to Refresh', message: 'It\'s been a week since your last laundry. Schedule a pickup!', priority: NotificationPriority.LOW },
];

export function generatePushNotification(): NotificationItem {
  const t = pushTemplates[Math.floor(Math.random() * pushTemplates.length)];
  return {
    id: randomId(),
    title: t.title,
    message: t.message,
    category: t.category,
    actionType: undefined,
    actionPayload: undefined,
    isRead: false,
    createdAt: new Date().toISOString(),
    priority: t.priority,
  };
}

export function simulatePushNotification(): void {
  const notification = generatePushNotification();
  useNotificationStore.getState().addNotification(notification);
  showLocalNotification(notification.title, notification.message, {
    notificationId: notification.id,
  });
}

export function initializeNotifications(): void {
  const store = useNotificationStore.getState();
  if (store.notifications.length === 0) {
    store.setNotifications(generateSeedNotifications());
  }
}

let pushInterval: ReturnType<typeof setInterval> | null = null;

export function startPushSimulation(intervalMs: number = 120000): void {
  stopPushSimulation();
  pushInterval = setInterval(() => {
    simulatePushNotification();
  }, intervalMs);
}

export function stopPushSimulation(): void {
  if (pushInterval) {
    clearInterval(pushInterval);
    pushInterval = null;
  }
}
