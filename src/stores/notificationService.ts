import { useOrderStore } from '@/stores/orderStore';
import { useNotificationStore, NotificationType, NotificationCategory } from '@/stores/notificationStore';

// Verifica pedidos atrasados (status pending há mais de 3 dias)
function checkDelayedOrders() {
  const orders = useOrderStore.getState().orders;
  const now = new Date();
  orders.forEach((order) => {
    if (order.status === 'pending') {
      // Simular data do pedido (como não temos data de criação, usamos a data de entrega como referência aproximada)
      const deliveryDate = new Date(order.date);
      const diffDays = Math.floor((now.getTime() - deliveryDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 3) {
        // Verificar se já existe notificação para este pedido atrasado
        const existing = useNotificationStore.getState().notifications.find(
          (n) => n.description.includes(order.id) && n.category === 'order'
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

// Simula temperatura e umidade (valores aleatórios)
function checkHealthMetrics() {
  const temp = 20 + Math.random() * 10; // 20-30°C
  const humidity = 40 + Math.random() * 40; // 40-80%
  let type: NotificationType = 'info';
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
    return; // saudável, sem notificação
  }

  // Evitar duplicatas (mesmo título nas últimas 24h)
  const existing = useNotificationStore.getState().notifications.find(
    (n) => n.title === title && (new Date().getTime() - n.createdAt.getTime()) < 24 * 60 * 60 * 1000
  );
  if (!existing) {
    useNotificationStore.getState().addNotification({
      title,
      description,
      type,
      category: 'health',
    });
  }
}

// Função principal que gera notificações (pode ser chamada periodicamente)
export function generateNotifications() {
  checkDelayedOrders();
  checkHealthMetrics();
}

// Opcional: agendar execução a cada X minutos (ex: 5 min)
if (typeof window !== 'undefined') {
  setInterval(() => {
    generateNotifications();
  }, 5 * 60 * 1000); // a cada 5 minutos
}