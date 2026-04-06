import { create } from "zustand";
import { PedidoOrder } from "@/types/pedidoOrder";
import { orderService } from "@/services/orderService";

interface OrderStore {
  orders: PedidoOrder[];
  isLoading: boolean;
  loadOrders: () => void;
  addOrder: (order: Omit<PedidoOrder, "id">) => void;
  updateOrder: (id: string, updates: Partial<PedidoOrder>) => void;
  deleteOrder: (id: string) => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  isLoading: true,
  loadOrders: () => {
    console.log("[Store] loadOrders chamado");
    const orders = orderService.getOrders();
    console.log(`[Store] ${orders.length} pedidos carregados na store`);
    set({ orders, isLoading: false });
  },
  addOrder: (order) => {
    console.log("[Store] addOrder chamado com:", order);
    const newOrder = orderService.addOrder(order);
    console.log("[Store] Novo pedido retornado do service:", newOrder);
    set((state) => ({ orders: [newOrder, ...state.orders] }));
  },
  updateOrder: (id, updates) => {
    console.log(`[Store] updateOrder chamado para ${id}`, updates);
    const updated = orderService.updateOrder(id, updates);
    if (updated) {
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? updated : o)),
      }));
    }
  },
  deleteOrder: (id) => {
    console.log(`[Store] deleteOrder chamado para ${id}`);
    const success = orderService.deleteOrder(id);
    if (success) {
      set((state) => ({
        orders: state.orders.filter((o) => o.id !== id),
      }));
    }
  },
}));