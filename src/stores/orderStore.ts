import { create } from "zustand";
import { PedidoOrder } from "@/types/pedidoOrder";
import { orderService } from "@/services/orderService";

interface OrderStore {
  orders: PedidoOrder[];
  addOrder: (order: Omit<PedidoOrder, "id">) => void;
  updateOrder: (id: string, order: Partial<PedidoOrder>) => void;
  deleteOrder: (id: string) => void;
  loadOrders: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  loadOrders: () => {
    const loaded = orderService.loadOrders();
    set({ orders: loaded });
  },
  addOrder: (order) => {
    const newOrder = orderService.addOrder(order);
    set((state) => ({ orders: [newOrder, ...state.orders] }));
  },
  updateOrder: (id, updatedFields) => {
    const updated = orderService.updateOrder(id, updatedFields);
    if (updated) {
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? updated : o)),
      }));
    }
  },
  deleteOrder: (id) => {
    const success = orderService.deleteOrder(id);
    if (success) {
      set((state) => ({
        orders: state.orders.filter((o) => o.id !== id),
      }));
    }
  },
}));