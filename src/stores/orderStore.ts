import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PedidoOrder, EggType, PedidoStatus } from '@/types/pedidoOrder';

interface OrderStore {
  orders: PedidoOrder[];
  addOrder: (order: Omit<PedidoOrder, 'id'>) => void;
  updateOrder: (id: string, order: Partial<PedidoOrder>) => void;
  deleteOrder: (id: string) => void;
  getNextId: () => string;
}

// Mock inicial (compatível com o existente)
const initialOrders: PedidoOrder[] = [
  {
    id: '#EF-9082',
    client: 'Artisan Bakery Co.',
    clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-QKCgmO_BoSolXwR6AHRFbaGL-LOz3X0Lh8MeWb2PGgKKAXBwpRI0CzJMVsYA51aMjgcaLlhpXQf87GiOvyFoSFZ-aK3ycALYwc8KSucxYwSNz2manjM0XifA_b7Nklkb4SYnI4Ic7M4VImMywB1V4NcI2o8J8SMQsbVRoI9dM3lkPCKR97n-Bkx_OqbtXV_MrEDnKrS79uc-JO4rqiRG1rgDktUcG3iQTQdOLarivE2V4qn8K0vDeOKSjjYZDLSTfPOiHMr7LA',
    eggType: 'organic',
    status: 'delivered',
    date: '24 Out, 2023',
  },
  {
    id: '#EF-9104',
    client: 'WholeFoods Market',
    clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjCIUsgECqZBC4S6L1ACtUm7IxDUPMIkD_nYFtJshoevnwzW7D25q2mTMDv8-1n30Y3AVbhZx5mBzFs7slqPWT0bZMyzrmc9ugTc91iyEMWLLL6gWLz4Jml5yNSpU6KNZMJjXhGOrVNNgFPCsKFEWCO7y5I-gb2915wSM0RmCFBnsr5Qs9rPD2Wz72kLJgu2sJqS_gJd7TuWOBtzfmS9Gn3ewlwS5gx6vI-sXb5v9oTZN8ONjFF46czQzXcc-9x6hgaXvl_q4ssw',
    eggType: 'caipira',
    status: 'processing',
    date: '25 Out, 2023',
  },
  {
    id: '#EF-8977',
    client: 'Central Bistro',
    clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKw3QR31Fade5OCxHwfX8qaHhEbhKxpqYa2ggssNqHPVtV4f5TrenBct9jN5TnNrlRLDJTiuMs_2XsAvYHyV7wVkOZj0xQt5BiUqtanB-7cLbhmG0lMoVZ-0lkTQXWxWwHu597xEph09C8FKaAKHLk2dZHru7bnARr0e3yHUguqyRnCxvI_fRnOYNkRXCqCRiejSN1n6yNtvc-GGL3WuroX2ycfn4l9rXylA8Knurcjsc0op7h9pamaMn_JFOyZ3M8qah-JiDovQ',
    eggType: 'industrial',
    status: 'pending',
    date: '26 Out, 2023',
  },
  {
    id: '#EF-9201',
    client: 'Pasta & Vino',
    clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCc8lvvq21i_GCbpaA9HcUP1exAbFilLo8vGKthuM2hOkTLtCLpZKUfvweZRWJXVy3ULVyn9y2yQywoS06X9sS6mQuQsPXwR2MS3FugFTALlrrsSNbBQ6Ap4dAuO-PLquNG5Woz_OV8WiyloIVhoaasJcEBcsXvp8BHQAMTD6QpYXTT4jrQGoTgDxLI1pPlVEh5S2zfx8qZAcInrbOidVoDUOvKcnpIooz9yqN_PXiwbuyxVatKr8fryNQ03OXWRwHL5BlfMuyew',
    eggType: 'organic',
    status: 'cancelled',
    date: '26 Out, 2023',
  },
];

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: initialOrders,
      addOrder: (order) => {
        const newId = get().getNextId();
        const newOrder: PedidoOrder = {
          ...order,
          id: newId,
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
      },
      updateOrder: (id, updatedFields) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, ...updatedFields } : order
          ),
        }));
      },
      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        }));
      },
      getNextId: () => {
        const orders = get().orders;
        const maxId = orders.reduce((max, order) => {
          const num = parseInt(order.id.replace('#EF-', ''));
          return isNaN(num) ? max : Math.max(max, num);
        }, 9082);
        return `#EF-${maxId + 1}`;
      },
    }),
    {
      name: 'eggflow-orders',
    }
  )
);