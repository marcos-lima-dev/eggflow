import { TopAppBar } from "@/components/layout/TopAppBar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { BottomNavBar } from "@/components/layout/BottomNavBar";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";
import { HealthCard } from "@/components/cards/HealthCard";
import { OrdersTable } from "@/components/tables/OrdersTable";
import { PrimaryMetricCard } from "@/components/dashboard/PrimaryMetricCard";
import { DashboardMetricsGrid } from "@/components/dashboard/DashboardMetricsGrid";
import { dashboardStats } from "@/data/dashboardStats";

export default function DashboardPage() {
  const {
    dailyProduction,
    dailyProductionTrend,
    weeklyOrders,
    deliveredToday,
    monthlyRevenue,
    revenueOnTarget,
  } = dashboardStats;

  return (
    <>
      <NavigationDrawer />
      <main className="md:ml-72 min-h-screen pb-32 md:pb-8">
        <TopAppBar />

        <div className="max-w-7xl mx-auto px-6 pt-4 space-y-12">
          {/* Hero Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <PrimaryMetricCard
              production={dailyProduction}
              trend={dailyProductionTrend}
            />
            <DashboardMetricsGrid
              weeklyOrders={weeklyOrders}
              deliveredToday={deliveredToday}
              monthlyRevenue={monthlyRevenue}
              revenueOnTarget={revenueOnTarget}
            />
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