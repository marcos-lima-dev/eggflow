import { TopAppBar } from "@/components/layout/TopAppBar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { BottomNavBar } from "@/components/layout/BottomNavBar";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";
import { StatsCard } from "@/components/cards/StatsCard";
import { HealthCard } from "@/components/cards/HealthCard";
import { OrdersTable } from "@/components/tables/OrdersTable";
import {
  ShoppingBasket,
  Truck,
  TrendingUp,
  DollarSign,
  CheckCircle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <NavigationDrawer />
      <main className="md:ml-72 min-h-screen pb-32 md:pb-8">
        <TopAppBar />

        <div className="max-w-7xl mx-auto px-6 pt-4 space-y-12">
          {/* Hero Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Primary Metric */}
            <div className="md:col-span-2 lg:col-span-3 bg-primary-container/30 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative">
              <div className="relative z-10">
                <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
                  Produção Diária
                </span>
                <h3 className="font-headline text-on-primary-container text-5xl font-extrabold tracking-tight">
                  12.482
                </h3>
                <p className="text-on-primary-container/70 mt-2 font-medium">
                  Ovos Colhidos Hoje
                </p>
              </div>
              <div className="mt-8 flex items-end gap-2 relative z-10">
                <TrendingUp className="text-secondary text-3xl" />
                <span className="text-secondary font-bold text-lg">+14%</span>
                <span className="text-on-surface-variant text-sm">
                  vs semana passada
                </span>
              </div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
            </div>

            {/* Secondary Metrics */}
            <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 gap-6">
              <StatsCard
                title="Pedidos"
                value="142"
                subtitle="Ativos esta semana"
                icon={<ShoppingBasket className="text-primary" />}
              />
              <StatsCard
                title="Entregues"
                value="98"
                subtitle="Confirmados hoje"
                icon={<Truck className="text-secondary" />}
              />
              <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between col-span-2">
                <div className="flex items-center justify-between">
                  <DollarSign className="text-primary" />
                  <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase">
                    Faturamento Total
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-3xl font-bold font-headline mt-2">
                      R$ 42.850,00
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Acompanhamento mensal
                    </p>
                  </div>
                  <div className="bg-secondary-container px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="text-secondary text-xs" />
                    <span className="text-xs text-secondary font-bold">
                      Na Meta
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Layout */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-headline tracking-tight">
                  Pedidos Recentes
                </h2>
                <button className="text-primary font-bold text-sm hover:underline">
                  Ver Todos
                </button>
              </div>
              <OrdersTable />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-headline tracking-tight">
                Vitais do Galpão
              </h2>
              <HealthCard />
            </div>
          </section>
        </div>
      </main>

      <BottomNavBar />
      <FloatingActionButton />
    </>
  );
}