export type OrderStatus = 'transit' | 'pending' | 'delivered' | 'cancelled' | 'processing';

export interface Order {
  id: string;
  client: string;
  clientInitials: string;
  eggType: string;
  eggTypeColor: string;
  quantity: string;
  status: OrderStatus;
  date: string;
}