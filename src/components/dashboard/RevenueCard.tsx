import { DollarSign, CheckCircle } from "lucide-react";

interface RevenueCardProps {
  revenue: number;
  onTarget: boolean;
}

export function RevenueCard({ revenue, onTarget }: RevenueCardProps) {
  const formattedRevenue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(revenue);

  return (
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
            {formattedRevenue}
          </p>
          <p className="text-xs text-on-surface-variant">
            Acompanhamento mensal
          </p>
        </div>
        {onTarget && (
          <div className="bg-secondary-container px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="text-secondary text-xs" />
            <span className="text-xs text-secondary font-bold">Na Meta</span>
          </div>
        )}
      </div>
    </div>
  );
}