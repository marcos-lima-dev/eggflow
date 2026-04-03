export type DashboardOrderStatus = 'transit' | 'pending' | 'delivered' | 'cancelled' | 'processing';

export interface DashboardOrder {
  id: string;
  client: string;
  clientInitials: string;
  eggType: string;  
  eggTypeColor: string;
  quantity: string;
  status: DashboardOrderStatus;
  date: string;
}