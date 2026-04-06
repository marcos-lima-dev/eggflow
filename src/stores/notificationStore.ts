import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationType = 'critical' | 'attention' | 'info';
export type NotificationCategory = 'order' | 'health' | 'inventory' | 'system';

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  category: NotificationCategory;
  createdAt: Date;
  read: boolean;
  link?: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

// Gera ID único
function generateUniqueId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${performance.now()}`;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      addNotification: (notification) => {
        // Evita duplicatas
        const existing = get().notifications.find(
          (n) => n.title === notification.title && n.description === notification.description
        );
        if (existing) return;

        const newNotification: Notification = {
          ...notification,
          id: generateUniqueId(),
          createdAt: new Date(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));
      },
      markAsRead: (id) => {
        set((state) => {
          const updated = state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          );
          const unread = updated.filter((n) => !n.read).length;
          return { notifications: updated, unreadCount: unread };
        });
      },
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        }));
      },
      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
        localStorage.removeItem('eggflow-notifications');
      },
    }),
    {
      name: 'eggflow-notifications',
      // Usar onRehydrateStorage para converter strings de data de volta para Date e limpar IDs antigos
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Erro ao reidratar notificações', error);
          return;
        }
        if (state) {
          // Converte createdAt de string para Date
          state.notifications = state.notifications.map((n) => ({
            ...n,
            createdAt: typeof n.createdAt === 'string' ? new Date(n.createdAt) : n.createdAt,
          }));
          // Verifica IDs antigos (apenas números)
          const hasOldFormat = state.notifications.some((n) => /^\d+$/.test(n.id));
          if (hasOldFormat) {
            console.warn('🧹 Removendo notificações com IDs antigos (formato numérico).');
            setTimeout(() => {
              useNotificationStore.getState().clearAll();
            }, 0);
          }
        }
      },
    }
  )
);