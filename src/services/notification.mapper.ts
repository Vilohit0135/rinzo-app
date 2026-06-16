import {
  NotificationCategory,
  NotificationPriority,
  type NotificationItem,
} from '../types/notification.types';

interface ApiNotificationPayload {
  id?: string;
  title?: string;
  body?: string;
  category?: string;
  action_type?: string;
  action_payload?: string;
  created_at?: string;
  priority?: string;
}

export function mapApiNotification(raw: ApiNotificationPayload): NotificationItem | null {
  if (!raw.id || !raw.title) return null;

  const category = Object.values(NotificationCategory).includes(raw.category as NotificationCategory)
    ? (raw.category as NotificationCategory)
    : NotificationCategory.SYSTEM_UPDATE;

  const priority = Object.values(NotificationPriority).includes(raw.priority as NotificationPriority)
    ? (raw.priority as NotificationPriority)
    : NotificationPriority.NORMAL;

  return {
    id: raw.id,
    title: raw.title,
    message: raw.body || '',
    category,
    actionType: undefined,
    actionPayload: raw.action_payload,
    isRead: false,
    createdAt: raw.created_at || new Date().toISOString(),
    priority,
  };
}

export function mapApiNotificationList(rawList: ApiNotificationPayload[]): NotificationItem[] {
  return rawList.map(mapApiNotification).filter((n): n is NotificationItem => n !== null);
}
