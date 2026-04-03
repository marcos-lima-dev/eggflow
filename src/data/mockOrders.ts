import { DashboardOrder } from '@/types/dashboardOrder';

export const mockOrders: DashboardOrder[] = [
  {
    id: '#EF-9082',
    client: "Baker's Market",
    clientInitials: 'BM',
    eggType: 'Grangeiro/Industrial',
    eggTypeColor: 'bg-secondary',
    quantity: '120 Dúzias',
    status: 'transit',
    date: '23 Out, 2023',
  },
  {
    id: '#EF-9104',
    client: 'Organic Foods Co.',
    clientInitials: 'OF',
    eggType: 'Orgânico',
    eggTypeColor: 'bg-primary',
    quantity: '450 Dúzias',
    status: 'processing',
    date: '24 Out, 2023',
  },
  {
    id: '#EF-8977',
    client: 'Green Staples',
    clientInitials: 'GS',
    eggType: 'Caipira',
    eggTypeColor: 'bg-secondary',
    quantity: '80 Dúzias',
    status: 'delivered',
    date: '22 Out, 2023',
  },
];