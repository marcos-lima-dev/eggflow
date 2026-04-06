import { useOrderStore } from '@/stores/orderStore';
import { useNotificationStore } from '@/stores/notificationStore';

function checkDelayedOrders() {
  const orders = useOrderStore.getState().orders;
  const now = new Date();
  orders.forEach((order) => {
    if (order.status === 'pending') {
      const orderDate = new Date(order.date);
      const diffDays = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 3) {
        // Verifica se já existe notificação para este pedido nas últimas 24h
        const existing = useNotificationStore.getState().notifications.find(
          (n) => n.category === 'order' && n.description.includes(order.id)
        );
        if (!existing) {
          useNotificationStore.getState().addNotification({
            title: 'Pedido atrasado',
            description: `Pedido ${order.id} - ${order.client} está atrasado em ${diffDays} dias.`,
            type: 'critical',
            category: 'order',
            link: `/pedidos/editar/${encodeURIComponent(order.id)}`,
          });
        }
      }
    }
  });
}

function checkHealthMetrics() {
  const temp = 20 + Math.random() * 10;
  const humidity = 40 + Math.random() * 40;
  let type: 'critical' | 'attention' | 'info' = 'info';
  let title = '';
  let description = '';

  if (temp > 28) {
    type = 'critical';
    title = 'Temperatura alta';
    description = `Temperatura no galpão atingiu ${temp.toFixed(1)}°C. Acima do ideal (>28°C).`;
  } else if (temp < 18) {
    type = 'attention';
    title = 'Temperatura baixa';
    description = `Temperatura no galpão está em ${temp.toFixed(1)}°C. Abaixo do ideal (<18°C).`;
  } else if (humidity > 75) {
    type = 'attention';
    title = 'Umidade alta';
    description = `Umidade relativa do ar em ${humidity.toFixed(0)}%. Acima do recomendado.`;
  } else if (humidity < 45) {
    type = 'attention';
    title = 'Umidade baixa';
    description = `Umidade relativa do ar em ${humidity.toFixed(0)}%. Abaixo do recomendado.`;
  } else {
    return;
  }

  // Evita duplicatas nas últimas 24h
  const existing = useNotificationStore.getState().notifications.find((n) => {
    if (n.title !== title) return false;
    const createdAt = n.createdAt instanceof Date ? n.createdAt : new Date(n.createdAt);
    return (Date.now() - createdAt.getTime()) < 24 * 60 * 60 * 1000;
  });
  if (!existing) {
    useNotificationStore.getState().addNotification({
      title,
      description,
      type,
      category: 'health',
    });
  }
}

function checkInventory() {
  const lowStock = Math.random() < 0.3;
  if (lowStock) {
    const existing = useNotificationStore.getState().notifications.find((n) => {
      if (n.category !== 'inventory') return false;
      const createdAt = n.createdAt instanceof Date ? n.createdAt : new Date(n.createdAt);
      return (Date.now() - createdAt.getTime()) < 12 * 60 * 60 * 1000;
    });
    if (!existing) {
      useNotificationStore.getState().addNotification({
        title: 'Estoque baixo',
        description: 'O estoque de ovos orgânicos está abaixo do nível mínimo. Reponha em breve.',
        type: 'attention',
        category: 'inventory',
      });
    }
  }
}

export function generateNotifications() {
  checkDelayedOrders();
  checkHealthMetrics();
  checkInventory();
}

if (typeof window !== 'undefined') {
  setTimeout(() => generateNotifications(), 2000);
  setInterval(() => generateNotifications(), 5 * 60 * 1000);
}