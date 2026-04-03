import { PedidoStatus } from '@/types/pedidoOrder';

export const pedidoOrderStatusConfig: Record<PedidoStatus, { label: string; className: string }> = {
  delivered: {
    label: 'Entregue',
    className: 'bg-secondary-container text-on-secondary-container',
  },
  processing: {
    label: 'Processando',
    className: 'bg-primary-container text-on-primary-container',
  },
  pending: {
    label: 'Pendente',
    className: 'bg-surface-container-high text-on-surface-variant',
  },
  cancelled: {
    label: 'Cancelado',
    className: 'bg-error-container text-on-error-container',
  },
};