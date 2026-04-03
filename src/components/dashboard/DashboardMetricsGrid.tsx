import { StatsCard } from "@/components/cards/StatsCard";
import { RevenueCard } from "./RevenueCard";
import { ShoppingBasket, Truck } from "lucide-react";

interface DashboardMetricsGridProps {
  weeklyOrders: number;
  deliveredToday: number;
  monthlyRevenue: number;
  revenueOnTarget: boolean;
}

export function DashboardMetricsGrid({
  weeklyOrders,
  deliveredToday,
  monthlyRevenue,
  revenueOnTarget,
}: DashboardMetricsGridProps) {
  return (
    <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 gap-6">
      <StatsCard
        title="Pedidos"
        value={weeklyOrders}
        subtitle="Ativos esta semana"
        icon={<ShoppingBasket className="text-primary" />}
      />
      <StatsCard
        title="Entregues"
        value={deliveredToday}
        subtitle="Confirmados hoje"
        icon={<Truck className="text-secondary" />}
      />
      <RevenueCard revenue={monthlyRevenue} onTarget={revenueOnTarget} />
    </div>
  );
}