export interface Order {
  id: string;
  client: string;
  clientInitials: string;
  eggType: "granjeiro" | "organico" | "caipira";
  eggTypeColor: string;
  quantity: string;
  status: "transit" | "pending" | "delivered" | "cancelled" | "processing";
  date: string;
}

export interface DashboardStats {
  dailyProduction: number;
  weeklyOrders: number;
  deliveredToday: number;
  monthlyRevenue: number;
  trend: number;
}

export interface HealthMetrics {
  temperature: number;
  humidity: number;
  healthIndex: number;
}