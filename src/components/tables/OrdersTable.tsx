import { orders } from '@/data/orders';
import { OrderRow } from '@/components/orders/OrderRow';

export function OrdersTable() {
  return (
    <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant/70 uppercase">
                Cliente
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant/70 uppercase">
                Tipo de Ovo
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant/70 uppercase text-center">
                Quantidade
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant/70 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface-variant/70 uppercase text-right">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}