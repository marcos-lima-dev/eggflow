"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useOrderStore } from '@/stores/orderStore';
import { PedidoOrder } from '@/types/pedidoOrder';
import { pedidoEggTypeConfig } from '@/config/pedidoEggTypeConfig';
import { pedidoOrderStatusConfig } from '@/config/pedidoOrderStatus';

interface OrdersTableProps {
  orders: PedidoOrder[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter();
  const { deleteOrder } = useOrderStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEdit = useCallback((id: string) => {
    if (isMounted) {
      router.push(`/pedidos/editar/${id}`);
    }
  }, [isMounted, router]);

  const handleDelete = useCallback((id: string) => {
    if (confirm('Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita.')) {
      deleteOrder(id);
    }
  }, [deleteOrder]);

  if (!isMounted) {
    // Retorna um placeholder enquanto o componente não está montado (evita hidratação)
    return (
      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0px_12px_32px_rgba(26,28,28,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Cliente</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Tipo de Ovo</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-center">Status</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Data</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr>
                <td colSpan={5} className="px-8 py-12 text-center text-on-surface-variant">
                  Carregando...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0px_12px_32px_rgba(26,28,28,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Cliente
              </th>
              <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Tipo de Ovo
              </th>
              <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-center">
                Status
              </th>
              <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Data
              </th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-right">
                Ações
              </th>
             </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {orders.map((order) => {
              const eggType = pedidoEggTypeConfig[order.eggType];
              const status = pedidoOrderStatusConfig[order.status];
              return (
                <tr key={order.id} className="group hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-surface-container-high">
                        <img
                          className="w-full h-full object-cover"
                          src={order.clientAvatar}
                          alt={order.client}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{order.client}</p>
                        <p className="text-xs text-on-surface-variant">{order.id}</p>
                      </div>
                    </div>
                   </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-2 h-2 rounded-full', eggType.dotColor)} />
                      <span className="text-sm font-semibold">{eggType.label}</span>
                    </div>
                   </td>
                  <td className="px-6 py-6 text-center">
                    <span
                      className={cn(
                        'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold',
                        status.className
                      )}
                    >
                      {status.label}
                    </span>
                   </td>
                  <td className="px-6 py-6">
                    <span className="text-sm font-medium">{order.date}</span>
                   </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-surface-container-high"
                        onClick={() => handleEdit(order.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-error-container/20 text-error"
                        onClick={() => handleDelete(order.id)}
                      >
                        <Trash2 className="w-4 h-4" />
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