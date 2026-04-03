import { EggType } from '@/types/pedidoOrder';

export const pedidoEggTypeConfig: Record<EggType, { label: string; color: string; dotColor: string }> = {
  organic: { label: 'Orgânico', color: 'bg-secondary', dotColor: 'bg-secondary' },
  caipira: { label: 'Caipira', color: 'bg-primary', dotColor: 'bg-primary' },
  industrial: { label: 'Industrial', color: 'bg-slate-400', dotColor: 'bg-slate-400' },
};