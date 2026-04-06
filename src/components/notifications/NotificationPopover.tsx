"use client";

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { useNotificationStore } from '@/stores/notificationStore';
import { NotificationItem } from './NotificationItem';

export function NotificationPopover() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotificationStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-surface-container-high relative">
          <Bell className="w-5 h-5 text-on-surface-variant" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-error text-on-error text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 bg-surface-container-lowest border-outline-variant shadow-xl" align="end">
        <div className="flex justify-between items-center p-3 border-b border-outline-variant">
          <h3 className="font-headline font-bold">Notificações</h3>
          <div className="flex gap-1">
            {notifications.length > 0 && (
              <>
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 px-2 text-xs">
                  <CheckCheck className="w-3 h-3 mr-1" /> Ler todas
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAll} className="h-8 px-2 text-xs text-error">
                  <Trash2 className="w-3 h-3 mr-1" /> Limpar
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant text-sm">Nenhuma notificação</div>
          ) : (
            notifications.map((notif) => <NotificationItem key={notif.id} notification={notif} onRead={markAsRead} />)
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}