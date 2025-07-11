import { create } from 'zustand';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'investment' | 'project_update' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    projectId?: string;
    investmentId?: string;
    userId?: string;
    amount?: number;
  };
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  setNotifications: (notifications) => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    set({ notifications, unreadCount });
  },
  
  addNotification: (notification) => set((state) => {
    const newNotifications = [notification, ...state.notifications];
    const unreadCount = newNotifications.filter(n => !n.isRead).length;
    return { notifications: newNotifications, unreadCount };
  }),
  
  markAsRead: (id) => set((state) => {
    const notifications = state.notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    );
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return { notifications, unreadCount };
  }),
  
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, isRead: true })),
    unreadCount: 0,
  })),
  
  removeNotification: (id) => set((state) => {
    const notifications = state.notifications.filter(n => n.id !== id);
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return { notifications, unreadCount };
  }),
  
  clearAllNotifications: () => set({
    notifications: [],
    unreadCount: 0,
  }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  getUnreadCount: () => get().unreadCount,
}));