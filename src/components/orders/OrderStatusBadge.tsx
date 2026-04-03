import { OrderStatus } from '@/types/order';
import { statusConfig } from '@/config/orderStatus';
import { cn } from '@/lib/utils';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-2 h-2 rounded-full", config.dotClass)}></div>
      <span className={cn("text-xs font-bold uppercase tracking-wider", config.className)}>
        {config.label}
      </span>
    </div>
  );
}