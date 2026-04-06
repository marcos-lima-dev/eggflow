export type PedidoStatus = 'delivered' | 'processing' | 'pending' | 'cancelled';
export type EggType = 'organic' | 'caipira' | 'industrial';

export interface PedidoOrder {
  id: string;
  client: string;
  clientAvatar: string;
  eggType: EggType;
  quantity: string;
  status: PedidoStatus;
  date: string;
}