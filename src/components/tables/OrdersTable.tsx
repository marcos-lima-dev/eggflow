import { Eye, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  client: string;
  clientInitials: string;
  eggType: string;
  eggTypeColor: string;
  quantity: string;
  status: "transit" | "pending" | "delivered" | "cancelled" | "processing";
  date: string;
}

const orders: Order[] = [
  {
    id: "#EF-9082",
    client: "Baker's Market",
    clientInitials: "BM",
    eggType: "Grangeiro/Industrial",
    eggTypeColor: "bg-secondary",
    quantity: "120 Dúzias",
    status: "transit",
    date: "23 Out, 2023",
  },
  {
    id: "#EF-9104",
    client: "Organic Foods Co.",
    clientInitials: "OF",
    eggType: "Orgânico",
    eggTypeColor: "bg-primary",
    quantity: "450 Dúzias",
    status: "processing",
    date: "24 Out, 2023",
  },
  {
    id: "#EF-8977",
    client: "Green Staples",
    clientInitials: "GS",
    eggType: "Caipira",
    eggTypeColor: "bg-secondary",
    quantity: "80 Dúzias",
    status: "delivered",
    date: "22 Out, 2023",
  },
];

const statusConfig = {
  transit: {
    label: "Em Trânsito",
    className: "bg-secondary text-on-secondary",
    dotClass: "bg-secondary animate-pulse",
  },
  pending: {
    label: "Pendente",
    className: "bg-outline-variant/30 text-on-surface-variant",
    dotClass: "bg-outline-variant",
  },
  delivered: {
    label: "Entregue",
    className: "bg-secondary text-on-secondary",
    dotClass: "bg-secondary",
  },
  cancelled: {
    label: "Cancelado",
    className: "bg-error-container text-on-error-container",
    dotClass: "bg-error",
  },
  processing: {
    label: "Processando",
    className: "bg-primary-container text-on-primary-container",
    dotClass: "bg-primary",
  },
};

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
            {orders.map((order) => {
              const status = statusConfig[order.status];

              return (
                <tr
                  key={order.id}
                  className="hover:bg-surface-container-low transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center font-bold text-xs text-on-tertiary-container">
                        {order.clientInitials}
                      </div>
                      <div>
                        <span className="font-semibold text-on-surface">
                          {order.client}
                        </span>
                        <p className="text-xs text-on-surface-variant">
                          {order.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-lg text-xs font-medium">
                      {order.eggType}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center font-bold">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn("w-2 h-2 rounded-full", status.dotClass)}
                      ></div>
                      <span
                        className={cn(
                          "text-xs font-bold uppercase tracking-wider",
                          status.className
                        )}
                      >
                        {status.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-surface-container-high"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-surface-container-high"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}