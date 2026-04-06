import { TrendingUp } from "lucide-react";

interface PrimaryMetricCardProps {
  production: number;
  trend: number;
}

export function PrimaryMetricCard({ production, trend }: PrimaryMetricCardProps) {
  return (
    <div className="md:col-span-2 lg:col-span-3 bg-primary-container/30 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative">
      <div className="relative z-10">
        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
          Produção Diária
        </span>
        <h3 className="font-headline text-on-primary-container text-5xl font-extrabold tracking-tight">
          {production.toLocaleString()}
        </h3>
        <p className="text-on-primary-container/70 mt-2 font-medium">
          Ovos Colhidos Hoje
        </p>
      </div>
      <div className="mt-8 flex items-end gap-2 relative z-10">
        <TrendingUp className="text-secondary text-3xl" />
        <span className="text-secondary font-bold text-lg">+{trend}%</span>
        <span className="text-on-surface-variant text-sm">
          vs semana passada
        </span>
      </div>
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
    </div>
  );
}