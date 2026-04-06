"use client";

import { useEffect } from 'react';
import { generateNotifications } from '@/services/notificationService';
import { useNotificationStore } from '@/stores/notificationStore';

export function NotificationInitializer() {
  useEffect(() => {
    // Limpeza única: se existirem IDs antigos (apenas números) ou duplicados, limpa tudo
    const notifications = useNotificationStore.getState().notifications;
    const hasOldFormat = notifications.some((n) => /^\d+$/.test(n.id));
    const hasDuplicate = notifications.some((n, i, arr) => arr.findIndex(x => x.id === n.id) !== i);
    if (hasOldFormat || hasDuplicate) {
      console.log('🧹 Limpando notificações corrompidas (IDs antigos/duplicados)...');
      useNotificationStore.getState().clearAll();
      // Garantir que o localStorage seja limpo também
      localStorage.removeItem('eggflow-notifications');
    }
    generateNotifications();
  }, []);

  return null;
}