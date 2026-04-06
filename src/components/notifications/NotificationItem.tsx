"use client";

import { Notification } from '@/stores/notificationStore';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Bell, AlertTriangle, Info, AlertCircle } from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

const typeConfig = {
  critical: { icon: AlertCircle, bgColor: 'bg-error-container/20', textColor: 'text-error', borderColor: 'border-error' },
  attention: { icon: AlertTriangle, bgColor: 'bg-primary-container/20', textColor: 'text-primary', borderColor: 'border-primary' },
  info: { icon: Info, bgColor: 'bg-surface-container-low', textColor: 'text-on-surface-variant', borderColor: 'border-outline-variant' },
};

export function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const router = useRouter();
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  const handleClick = () => {
    if (!notification.read) {
      onRead(notification.id);
    }
    if (notification.link) {
      router.push(notification.link);
    }
  };

  return (
    <div
      className={cn(
        'p-4 border-l-4 rounded-lg mb-2 cursor-pointer transition-all hover:shadow-md',
        config.borderColor,
        !notification.read && 'bg-surface-container-lowest'
      )}
      onClick={handleClick}
    >
      <div className="flex gap-3">
        <Icon className={cn('w-5 h-5 mt-0.5', config.textColor)} />
        <div className="flex-1">
          <p className={cn('font-semibold', config.textColor)}>{notification.title}</p>
          <p className="text-sm text-on-surface-variant">{notification.description}</p>
          <p className="text-xs text-on-surface-variant/60 mt-1">
            {new Date(notification.createdAt).toLocaleString('pt-BR')}
          </p>
        </div>
        {!notification.read && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
      </div>
    </div>
  );
}