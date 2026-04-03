"use client";

import { useState } from "react";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { BottomNavBar } from "@/components/layout/BottomNavBar";
import { Button } from "@/components/ui/button";
import {
  Search,
  Egg,
  RefreshCw,
  Download,
  Plus,
  Eye,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  client: string;
  clientAvatar: string;
  eggType: "organic" | "caipira" | "industrial";
  status: "delivered" | "processing" | "pending" | "cancelled";
  date: string;
}

const orders: Order[] = [
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

const eggTypeConfig = {
  organic: { label: "Orgânico", color: "bg-secondary", dotColor: "bg-secondary" },
  caipira: { label: "Caipira", color: "bg-primary", dotColor: "bg-primary" },
  industrial: { label: "Industrial", color: "bg-slate-400", dotColor: "bg-slate-400" },
};

const statusConfig = {
  delivered: {
    label: "Entregue",
    className: "bg-secondary-container text-on-secondary-container",
  },
  processing: {
    label: "Processando",
    className: "bg-primary-container text-on-primary-container",
  },
  pending: {
    label: "Pendente",
    className: "bg-surface-container-high text-on-surface-variant",
  },
  cancelled: {
    label: "Cancelado",
    className: "bg-error-container text-on-error-container",
  },
};

export default function PedidosPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavigationDrawer />
      <main className="md:ml-72 min-h-screen pb-32 md:pb-8">
        <TopAppBar />

        <div className="max-w-7xl mx-auto px-6 py-8">
          <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline mb-2">
                Livro de Pedidos
              </h1>
              <p className="text-on-surface-variant font-body">
                Gerenciando a cadeia de suprimentos orgânica e industrial.
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="px-6 py-3 rounded-xl bg-surface-container-lowest text-primary font-bold hover:scale-105 transition-all shadow-sm flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
              <Button className="px-6 py-3 rounded-xl yolk-gradient text-on-primary font-bold hover:scale-105 transition-all shadow-lg flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Novo Pedido
              </Button>
            </div>
          </header>

          {/* Filters */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-2 bg-surface-container-low rounded-xl p-2 flex items-center group focus-within:bg-surface-container-high transition-colors">
              <Search className="px-3 text-on-surface-variant w-10 h-5" />
              <input
                type="text"
                placeholder="Buscar por cliente ou ID..."
                className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium py-3 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative bg-surface-container-low rounded-xl flex items-center px-4 py-3 cursor-pointer hover:bg-surface-container-high transition-colors">
              <Egg className="text-on-surface-variant mr-3 w-5 h-5" />
              <span className="text-sm font-medium flex-1">Tipo de Ovo</span>
              <RefreshCw className="text-xs w-4 h-4" />
            </div>
            <div className="relative bg-surface-container-low rounded-xl flex items-center px-4 py-3 cursor-pointer hover:bg-surface-container-high transition-colors">
              <RefreshCw className="text-on-surface-variant mr-3 w-5 h-5" />
              <span className="text-sm font-medium flex-1">Status</span>
              <RefreshCw className="text-xs w-4 h-4" />
            </div>
          </section>

          {/* Orders Table */}
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
                  {filteredOrders.map((order) => {
                    const eggType = eggTypeConfig[order.eggType];
                    const status = statusConfig[order.status];

                    return (
                      <tr
                        key={order.id}
                        className="group hover:bg-surface-container-low/30 transition-colors"
                      >
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
                              <p className="font-bold text-on-surface">
                                {order.client}
                              </p>
                              <p className="text-xs text-on-surface-variant">
                                {order.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn("w-2 h-2 rounded-full", eggType.dotColor)}
                            ></div>
                            <span className="text-sm font-semibold">
                              {eggType.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-center">
                          <span
                            className={cn(
                              "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold",
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

            {/* Pagination */}
            <div className="px-8 py-5 bg-surface-container-low/30 flex items-center justify-between">
              <p className="text-sm text-on-surface-variant">
                Mostrando {filteredOrders.length} de {orders.length} pedidos
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg disabled:opacity-30"
                  disabled
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-lg">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </>
  );
}