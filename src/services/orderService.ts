import { PedidoOrder } from "@/types/pedidoOrder";

const STORAGE_KEY = "eggflow-orders";

const initialOrders: PedidoOrder[] = [
  {
    id: "#EF-9082",
    client: "Artisan Bakery Co.",
    clientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-QKCgmO_BoSolXwR6AHRFbaGL-LOz3X0Lh8MeWb2PGgKKAXBwpRI0CzJMVsYA51aMjgcaLlhpXQf87GiOvyFoSFZ-aK3ycALYwc8KSucxYwSNz2manjM0XifA_b7Nklkb4SYnI4Ic7M4VImMywB1V4NcI2o8J8SMQsbVRoI9dM3lkPCKR97n-Bkx_OqbtXV_MrEDnKrS79uc-JO4rqiRG1rgDktUcG3iQTQdOLarivE2V4qn8K0vDeOKSjjYZDLSTfPOiHMr7LA",
    eggType: "organic",
    status: "delivered",
    date: "24 Out, 2023",
    quantity: "120 Dúzias",
  },
  {
    id: "#EF-9104",
    client: "WholeFoods Market",
    clientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjCIUsgECqZBC4S6L1ACtUm7IxDUPMIkD_nYFtJshoevnwzW7D25q2mTMDv8-1n30Y3AVbhZx5mBzFs7slqPWT0bZMyzrmc9ugTc91iyEMWLLL6gWLz4Jml5yNSpU6KNZMJjXhGOrVNNgFPCsKFEWCO7y5I-gb2915wSM0RmCFBnsr5Qs9rPD2Wz72kLJgu2sJqS_gJd7TuWOBtzfmS9Gn3ewlwS5gx6vI-sXb5v9oTZN8ONjFF46czQzXcc-9x6hgaXvl_q4ssw",
    eggType: "caipira",
    status: "processing",
    date: "25 Out, 2023",
    quantity: "450 Dúzias", 
  },
  {
    id: "#EF-8977",
    client: "Central Bistro",
    clientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKw3QR31Fade5OCxHwfX8qaHhEbhKxpqYa2ggssNqHPVtV4f5TrenBct9jN5TnNrlRLDJTiuMs_2XsAvYHyV7wVkOZj0xQt5BiUqtanB-7cLbhmG0lMoVZ-0lkTQXWxWwHu597xEph09C8FKaAKHLk2dZHru7bnARr0e3yHUguqyRnCxvI_fRnOYNkRXCqCRiejSN1n6yNtvc-GGL3WuroX2ycfn4l9rXylA8Knurcjsc0op7h9pamaMn_JFOyZ3M8qah-JiDovQ",
    eggType: "industrial",
    status: "pending",
    date: "26 Out, 2023",
    quantity: "120 Dúzias", 
  },
  {
    id: "#EF-9201",
    client: "Pasta & Vino",
    clientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCc8lvvq21i_GCbpaA9HcUP1exAbFilLo8vGKthuM2hOkTLtCLpZKUfvweZRWJXVy3ULVyn9y2yQywoS06X9sS6mQuQsPXwR2MS3FugFTALlrrsSNbBQ6Ap4dAuO-PLquNG5Woz_OV8WiyloIVhoaasJcEBcsXvp8BHQAMTD6QpYXTT4jrQGoTgDxLI1pPlVEh5S2zfx8qZAcInrbOidVoDUOvKcnpIooz9yqN_PXiwbuyxVatKr8fryNQ03OXWRwHL5BlfMuyew",
    eggType: "organic",
    status: "cancelled",
    date: "26 Out, 2023",
    quantity: "315 Dúzias", 
  },
];

export class OrderService {
  private storageKey: string;

  constructor(key: string = STORAGE_KEY) {
    this.storageKey = key;
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      console.log("[OrderService] Inicializando localStorage com pedidos mock");
      localStorage.setItem(this.storageKey, JSON.stringify(initialOrders));
    }
  }

  getOrders(): PedidoOrder[] {
    console.log("[OrderService] getOrders chamado");
    if (typeof window === "undefined") {
      console.log("[OrderService] Server-side, retornando initialOrders");
      return initialOrders;
    }
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      console.log("[OrderService] Nenhum dado no localStorage, retornando initialOrders");
      return initialOrders;
    }
    try {
      const orders = JSON.parse(stored);
      const valid = Array.isArray(orders) ? orders : initialOrders;
      console.log(`[OrderService] ${valid.length} pedidos carregados do localStorage`);
      return valid;
    } catch (err) {
      console.error("[OrderService] Erro ao parsear JSON", err);
      return initialOrders;
    }
  }

  saveOrders(orders: PedidoOrder[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
    console.log(`[OrderService] ${orders.length} pedidos salvos no localStorage`);
  }

  addOrder(order: Omit<PedidoOrder, "id">): PedidoOrder {
    console.log("[OrderService] addOrder recebido:", order);
    const orders = this.getOrders();
    const newId = this.getNextId(orders);
    const newOrder: PedidoOrder = { ...order, id: newId };
    const updatedOrders = [newOrder, ...orders];
    this.saveOrders(updatedOrders);
    console.log(`[OrderService] ✅ Pedido ${newId} adicionado. Total: ${updatedOrders.length}`);
    return newOrder;
  }

  updateOrder(id: string, updates: Partial<PedidoOrder>): PedidoOrder | null {
    console.log(`[OrderService] updateOrder chamado para id ${id}`, updates);
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) {
      console.warn(`[OrderService] Pedido ${id} não encontrado para atualização`);
      return null;
    }
    const updatedOrder = { ...orders[index], ...updates };
    const updatedOrders = [...orders];
    updatedOrders[index] = updatedOrder;
    this.saveOrders(updatedOrders);
    console.log(`[OrderService] ✅ Pedido ${id} atualizado`);
    return updatedOrder;
  }

  deleteOrder(id: string): boolean {
    console.log(`[OrderService] deleteOrder chamado para id ${id}`);
    const orders = this.getOrders();
    const filtered = orders.filter((o) => o.id !== id);
    if (filtered.length === orders.length) {
      console.warn(`[OrderService] Pedido ${id} não encontrado para exclusão`);
      return false;
    }
    this.saveOrders(filtered);
    console.log(`[OrderService] ✅ Pedido ${id} removido. Restam ${filtered.length}`);
    return true;
  }

  private getNextId(orders: PedidoOrder[]): string {
    if (!Array.isArray(orders) || orders.length === 0) {
      console.log("[OrderService] Nenhum pedido existente, gerando ID inicial #EF-9083");
      return "#EF-9083";
    }
    const maxId = orders.reduce((max, order) => {
      const num = parseInt(order.id.replace("#EF-", ""));
      return isNaN(num) ? max : Math.max(max, num);
    }, 9082);
    const nextId = `#EF-${maxId + 1}`;
    console.log(`[OrderService] Próximo ID gerado: ${nextId}`);
    return nextId;
  }
}

export const orderService = new OrderService();