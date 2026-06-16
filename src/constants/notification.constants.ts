import {
  NotificationCategory,
  NotificationAction,
  type NotificationTabItem,
} from '../types/notification.types';

export const CATEGORY_ICON_MAP: Record<NotificationCategory, string> = {
  [NotificationCategory.ORDER_CREATED]: 'archive-outline',
  [NotificationCategory.ORDER_CONFIRMED]: 'checkmark-circle-outline',
  [NotificationCategory.ORDER_PICKUP_ASSIGNED]: 'bicycle-outline',
  [NotificationCategory.ORDER_PICKED_UP]: 'bicycle-outline',
  [NotificationCategory.ORDER_IN_PROCESS]: 'hammer-outline',
  [NotificationCategory.ORDER_WASHING]: 'water-outline',
  [NotificationCategory.ORDER_IRONING]: 'flame-outline',
  [NotificationCategory.ORDER_PACKING]: 'cube-outline',
  [NotificationCategory.ORDER_OUT_FOR_DELIVERY]: 'car-outline',
  [NotificationCategory.ORDER_DELIVERED]: 'checkmark-done-outline',
  [NotificationCategory.PAYMENT_SUCCESS]: 'card-outline',
  [NotificationCategory.PAYMENT_FAILED]: 'close-circle-outline',
  [NotificationCategory.PAYMENT_REFUND]: 'cash-outline',
  [NotificationCategory.PROMOTION]: 'gift-outline',
  [NotificationCategory.WALLET_CREDIT]: 'wallet-outline',
  [NotificationCategory.WALLET_DEBIT]: 'wallet-outline',
  [NotificationCategory.REFERRAL_REWARD]: 'people-outline',
  [NotificationCategory.SYSTEM_UPDATE]: 'information-circle-outline',
  [NotificationCategory.SERVICE_REMINDER]: 'alarm-outline',
  [NotificationCategory.ANNOUNCEMENT]: 'megaphone-outline',
  [NotificationCategory.APP_UPDATE]: 'cloud-download-outline',
};

export const CATEGORY_COLOR_MAP: Record<NotificationCategory, string> = {
  [NotificationCategory.ORDER_CREATED]: '#8259D2',
  [NotificationCategory.ORDER_CONFIRMED]: '#2ECC71',
  [NotificationCategory.ORDER_PICKUP_ASSIGNED]: '#F39C12',
  [NotificationCategory.ORDER_PICKED_UP]: '#F39C12',
  [NotificationCategory.ORDER_IN_PROCESS]: '#3498DB',
  [NotificationCategory.ORDER_WASHING]: '#3498DB',
  [NotificationCategory.ORDER_IRONING]: '#E74C3C',
  [NotificationCategory.ORDER_PACKING]: '#9B59B6',
  [NotificationCategory.ORDER_OUT_FOR_DELIVERY]: '#1ABC9C',
  [NotificationCategory.ORDER_DELIVERED]: '#2ECC71',
  [NotificationCategory.PAYMENT_SUCCESS]: '#2ECC71',
  [NotificationCategory.PAYMENT_FAILED]: '#E74C3C',
  [NotificationCategory.PAYMENT_REFUND]: '#F39C12',
  [NotificationCategory.PROMOTION]: '#E91E63',
  [NotificationCategory.WALLET_CREDIT]: '#8259D2',
  [NotificationCategory.WALLET_DEBIT]: '#E74C3C',
  [NotificationCategory.REFERRAL_REWARD]: '#FF6B35',
  [NotificationCategory.SYSTEM_UPDATE]: '#3498DB',
  [NotificationCategory.SERVICE_REMINDER]: '#1ABC9C',
  [NotificationCategory.ANNOUNCEMENT]: '#9B59B6',
  [NotificationCategory.APP_UPDATE]: '#3498DB',
};

export const CATEGORY_CTA_MAP: Partial<Record<NotificationCategory, NotificationAction>> = {
  [NotificationCategory.ORDER_CONFIRMED]: NotificationAction.TRACK_ORDER,
  [NotificationCategory.ORDER_PICKUP_ASSIGNED]: NotificationAction.TRACK_ORDER,
  [NotificationCategory.ORDER_OUT_FOR_DELIVERY]: NotificationAction.TRACK_ORDER,
  [NotificationCategory.ORDER_DELIVERED]: NotificationAction.VIEW_ORDER,
  [NotificationCategory.PAYMENT_SUCCESS]: NotificationAction.VIEW_PAYMENT,
  [NotificationCategory.PAYMENT_FAILED]: NotificationAction.VIEW_PAYMENT,
  [NotificationCategory.PAYMENT_REFUND]: NotificationAction.VIEW_PAYMENT,
  [NotificationCategory.PROMOTION]: NotificationAction.CLAIM_OFFER,
  [NotificationCategory.WALLET_CREDIT]: NotificationAction.OPEN_WALLET,
  [NotificationCategory.REFERRAL_REWARD]: NotificationAction.REFER_NOW,
  [NotificationCategory.APP_UPDATE]: NotificationAction.UPDATE_APP,
};

export const CTA_LABEL_MAP: Partial<Record<NotificationAction, string>> = {
  [NotificationAction.TRACK_ORDER]: 'Track Order',
  [NotificationAction.VIEW_ORDER]: 'View Order',
  [NotificationAction.VIEW_PAYMENT]: 'View Payment',
  [NotificationAction.OPEN_WALLET]: 'Open Wallet',
  [NotificationAction.CLAIM_OFFER]: 'Claim Offer',
  [NotificationAction.REFER_NOW]: 'Refer Now',
  [NotificationAction.UPDATE_APP]: 'Update App',
};

export const NOTIFICATION_TABS: NotificationTabItem[] = [
  {
    label: 'All',
    categories: [],
    key: 'all' as const,
  },
  {
    label: 'Orders',
    categories: [
      NotificationCategory.ORDER_CREATED,
      NotificationCategory.ORDER_CONFIRMED,
      NotificationCategory.ORDER_PICKUP_ASSIGNED,
      NotificationCategory.ORDER_PICKED_UP,
      NotificationCategory.ORDER_IN_PROCESS,
      NotificationCategory.ORDER_WASHING,
      NotificationCategory.ORDER_IRONING,
      NotificationCategory.ORDER_PACKING,
      NotificationCategory.ORDER_OUT_FOR_DELIVERY,
      NotificationCategory.ORDER_DELIVERED,
    ],
    key: 'orders' as const,
  },
  {
    label: 'Offers',
    categories: [NotificationCategory.PROMOTION],
    key: 'offers' as const,
  },
  {
    label: 'Payments',
    categories: [
      NotificationCategory.PAYMENT_SUCCESS,
      NotificationCategory.PAYMENT_FAILED,
      NotificationCategory.PAYMENT_REFUND,
    ],
    key: 'payments' as const,
  },
  {
    label: 'Wallet',
    categories: [
      NotificationCategory.WALLET_CREDIT,
      NotificationCategory.WALLET_DEBIT,
      NotificationCategory.REFERRAL_REWARD,
    ],
    key: 'wallet' as const,
  },
  {
    label: 'System',
    categories: [
      NotificationCategory.SYSTEM_UPDATE,
      NotificationCategory.SERVICE_REMINDER,
      NotificationCategory.ANNOUNCEMENT,
      NotificationCategory.APP_UPDATE,
    ],
    key: 'system' as const,
  },
];
