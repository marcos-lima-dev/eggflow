import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase">
          {title}
        </span>
      </div>
      <div>
        <p className="text-3xl font-bold font-headline mt-4">{value}</p>
        {subtitle && (
          <p className="text-xs text-on-surface-variant">{subtitle}</p>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-secondary font-bold text-lg">+{trend.value}%</span>
          <span className="text-on-surface-variant text-sm">{trend.label}</span>
        </div>
      )}
    </div>
  );
}