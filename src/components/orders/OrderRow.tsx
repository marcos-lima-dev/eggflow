import { Order } from '@/types/order';
import { statusConfig } from '@/config/orderStatus';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderActions } from './OrderActions';
import { cn } from '@/lib/utils';

interface OrderRowProps {
  order: Order;
}

export function OrderRow({ order }: OrderRowProps) {
  const status = statusConfig[order.status];

  return (
    <tr className="hover:bg-surface-container-low transition-colors group">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center font-bold text-xs text-on-tertiary-container">
            {order.clientInitials}
          </div>
          <div>
            <span className="font-semibold text-on-surface">{order.client}</span>
            <p className="text-xs text-on-surface-variant">{order.id}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <span className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-lg text-xs font-medium">
          {order.eggType}
        </span>
      </td>
      <td className="px-6 py-5 text-center font-bold">{order.quantity}</td>
      <td className="px-6 py-5">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="px-6 py-5 text-right">
        <OrderActions />
      </td>
    </tr>
  );
}