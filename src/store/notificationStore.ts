import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type NotificationItem, type NotificationTab } from '../types/notification.types';

interface NotificationState {
  notifications: NotificationItem[];
  activeTab: NotificationTab;
  setActiveTab: (tab: NotificationTab) => void;
  addNotification: (item: NotificationItem) => void;
  deleteNotification: (id: string) => void;
  markRead: (id: string) => void;
  markUnread: (id: string) => void;
  markAllRead: () => void;
  clearRead: () => void;
  setNotifications: (items: NotificationItem[]) => void;
  prependNotifications: (items: NotificationItem[]) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      activeTab: 'all',

      setActiveTab: (tab) => set({ activeTab: tab }),

      addNotification: (item) =>
        set((state) => ({
          notifications: [item, ...state.notifications],
        })),

      deleteNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      markRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          ),
        })),

      markUnread: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: false } : n
          ),
        })),

      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        })),

      clearRead: () =>
        set((state) => ({
          notifications: state.notifications.filter((n) => !n.isRead),
        })),

      setNotifications: (items) => set({ notifications: items }),

      prependNotifications: (items) =>
        set((state) => ({
          notifications: [...items, ...state.notifications],
        })),
    }),
    {
      name: 'rinzo-notifications',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
