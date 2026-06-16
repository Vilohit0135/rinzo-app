export enum NotificationCategory {
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  ORDER_PICKUP_ASSIGNED = 'ORDER_PICKUP_ASSIGNED',
  ORDER_PICKED_UP = 'ORDER_PICKED_UP',
  ORDER_IN_PROCESS = 'ORDER_IN_PROCESS',
  ORDER_WASHING = 'ORDER_WASHING',
  ORDER_IRONING = 'ORDER_IRONING',
  ORDER_PACKING = 'ORDER_PACKING',
  ORDER_OUT_FOR_DELIVERY = 'ORDER_OUT_FOR_DELIVERY',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_REFUND = 'PAYMENT_REFUND',
  PROMOTION = 'PROMOTION',
  WALLET_CREDIT = 'WALLET_CREDIT',
  WALLET_DEBIT = 'WALLET_DEBIT',
  REFERRAL_REWARD = 'REFERRAL_REWARD',
  SYSTEM_UPDATE = 'SYSTEM_UPDATE',
  SERVICE_REMINDER = 'SERVICE_REMINDER',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  APP_UPDATE = 'APP_UPDATE',
}

export enum NotificationAction {
  TRACK_ORDER = 'TRACK_ORDER',
  VIEW_ORDER = 'VIEW_ORDER',
  VIEW_PAYMENT = 'VIEW_PAYMENT',
  OPEN_WALLET = 'OPEN_WALLET',
  CLAIM_OFFER = 'CLAIM_OFFER',
  REFER_NOW = 'REFER_NOW',
  UPDATE_APP = 'UPDATE_APP',
}

export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  actionType?: NotificationAction;
  actionPayload?: string;
  isRead: boolean;
  createdAt: string;
  priority: NotificationPriority;
}

export type NotificationTab = 'all' | 'orders' | 'offers' | 'payments' | 'wallet' | 'system';

export interface NotificationTabItem {
  key: NotificationTab;
  label: string;
  categories: NotificationCategory[];
}
