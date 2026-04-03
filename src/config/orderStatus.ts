import { DashboardOrderStatus } from '@/types/dashboardOrder';

interface StatusConfig {
  label: string;
  className: string;
  dotClass: string;
}

export const dashboardOrderStatusConfig: Record<DashboardOrderStatus, StatusConfig> = {
  transit: {
    label: 'Em Trânsito',
    className: 'bg-secondary text-on-secondary',
    dotClass: 'bg-secondary animate-pulse',
  },
  pending: {
    label: 'Pendente',
    className: 'bg-outline-variant/30 text-on-surface-variant',
    dotClass: 'bg-outline-variant',
  },
  delivered: {
    label: 'Entregue',
    className: 'bg-secondary text-on-secondary',
    dotClass: 'bg-secondary',
  },
  cancelled: {
    label: 'Cancelado',
    className: 'bg-error-container text-on-error-container',
    dotClass: 'bg-error',
  },
  processing: {
    label: 'Processando',
    className: 'bg-primary-container text-on-primary-container',
    dotClass: 'bg-primary',
  },
};