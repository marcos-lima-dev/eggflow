import { PedidoOrder } from "@/types/pedidoOrder";

// Chave do localStorage
const STORAGE_KEY = "eggflow-orders";

// Dados mock iniciais (se localStorage vazio)
const INITIAL_ORDERS: PedidoOrder[] = [
  {
    id: "#EF-9082",
    client: "Artisan Bakery Co.",
    clientAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-QKCgmO_BoSolXwR6AHRFbaGL-LOz3X0Lh8MeWb2PGgKKAXBwpRI0CzJMVsYA51aMjgcaLlhpXQf87GiOvyFoSFZ-aK3ycALYwc8KSucxYwSNz2manjM0XifA_b7Nklkb4SYnI4Ic7M4VImMywB1V4NcI2o8J8SMQsbVRoI9dM3lkPCKR97n-Bkx_OqbtXV_MrEDnKrS79uc-JO4rqiRG1rgDktUcG3iQTQdOLarivE2V4qn8K0vDeOKSjjYZDLSTfPOiHMr7LA",
    eggType: "organic",
    status: "delivered",
    date: "24 Out, 2023",
  },
  {
    id: "#EF-9104",
    client: "WholeFoods Market",
    clientAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjCIUsgECqZBC4S6L1ACtUm7IxDUPMIkD_nYFtJshoevnwzW7D25q2mTMDv8-1n30Y3AVbhZx5mBzFs7slqPWT0bZMyzrmc9ugTc91iyEMWLLL6gWLz4Jml5yNSpU6KNZMJjXhGOrVNNgFPCsKFEWCO7y5I-gb2915wSM0RmCFBnsr5Qs9rPD2Wz72kLJgu2sJqS_gJd7TuWOBtzfmS9Gn3ewlwS5gx6vI-sXb5v9oTZN8ONjFF46czQzXcc-9x6hgaXvl_q4ssw",
    eggType: "caipira",
    status: "processing",
    date: "25 Out, 2023",
  },
  {
    id: "#EF-8977",
    client: "Central Bistro",
    clientAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKw3QR31Fade5OCxHwfX8qaHhEbhKxpqYa2ggssNqHPVtV4f5TrenBct9jN5TnNrlRLDJTiuMs_2XsAvYHyV7wVkOZj0xQt5BiUqtanB-7cLbhmG0lMoVZ-0lkTQXWxWwHu597xEph09C8FKaAKHLk2dZHru7bnARr0e3yHUguqyRnCxvI_fRnOYNkRXCqCRiejSN1n6yNtvc-GGL3WuroX2ycfn4l9rXylA8Knurcjsc0op7h9pamaMn_JFOyZ3M8qah-JiDovQ",
    eggType: "industrial",
    status: "pending",
    date: "26 Out, 2023",
  },
  {
    id: "#EF-9201",
    client: "Pasta & Vino",
    clientAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBCc8lvvq21i_GCbpaA9HcUP1exAbFilLo8vGKthuM2hOkTLtCLpZKUfvweZRWJXVy3ULVyn9y2yQywoS06X9sS6mQuQsPXwR2MS3FugFTALlrrsSNbBQ6Ap4dAuO-PLquNG5Woz_OV8WiyloIVhoaasJcEBcsXvp8BHQAMTD6QpYXTT4jrQGoTgDxLI1pPlVEh5S2zfx8qZAcInrbOidVoDUOvKcnpIooz9yqN_PXiwbuyxVatKr8fryNQ03OXWRwHL5BlfMuyew",
    eggType: "organic",
    status: "cancelled",
    date: "26 Out, 2023",
  },
];

class OrderService {
  private getStorageOrders(): PedidoOrder[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private setStorageOrders(orders: PedidoOrder[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  // Carrega pedidos (se localStorage vazio, inicializa com mock)
  loadOrders(): PedidoOrder[] {
    const orders = this.getStorageOrders();
    if (orders.length === 0) {
      this.setStorageOrders(INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
    return orders;
  }

  // Salva lista inteira (usado internamente)
  saveOrders(orders: PedidoOrder[]): void {
    this.setStorageOrders(orders);
  }

  // Adiciona novo pedido
  addOrder(order: Omit<PedidoOrder, "id">): PedidoOrder {
    const orders = this.loadOrders();
    const newId = this.getNextId(orders);
    const newOrder: PedidoOrder = { ...order, id: newId };
    const updatedOrders = [newOrder, ...orders];
    this.saveOrders(updatedOrders);
    return newOrder;
  }

  // Atualiza pedido existente
  updateOrder(id: string, updates: Partial<PedidoOrder>): PedidoOrder | null {
    const orders = this.loadOrders();
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return null;
    const updatedOrder = { ...orders[index], ...updates };
    orders[index] = updatedOrder;
    this.saveOrders(orders);
    return updatedOrder;
  }

  // Remove pedido
  deleteOrder(id: string): boolean {
    const orders = this.loadOrders();
    const filtered = orders.filter((o) => o.id !== id);
    if (filtered.length === orders.length) return false;
    this.saveOrders(filtered);
    return true;
  }

  // Gera próximo ID
  private getNextId(orders: PedidoOrder[]): string {
    // Garantir que orders é array
    if (!Array.isArray(orders)) orders = [];
    let max = 9082;
    for (const order of orders) {
      const num = parseInt(order.id.replace("#EF-", ""));
      if (!isNaN(num) && num > max) max = num;
    }
    return `#EF-${max + 1}`;
  }
}

export const orderService = new OrderService();