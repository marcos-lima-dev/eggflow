import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "transit" | "pending" | "delivered" | "cancelled" | "processing";
  size?: "sm" | "md";
}

const statusConfig = {
  transit: {
    label: "Em Trânsito",
    className: "bg-secondary text-on-secondary",
    dotClass: "bg-secondary animate-pulse",
  },
  pending: {
    label: "Pendente",
    className: "bg-outline-variant/30 text-on-surface-variant",
    dotClass: "bg-outline-variant",
  },
  delivered: {
    label: "Entregue",
    className: "bg-secondary text-on-secondary",
    dotClass: "bg-secondary",
  },
  cancelled: {
    label: "Cancelado",
    className: "bg-error-container text-on-error-container",
    dotClass: "bg-error",
  },
  processing: {
    label: "Processando",
    className: "bg-primary-container text-on-primary-container",
    dotClass: "bg-primary",
  },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs";

  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-2 h-2 rounded-full", config.dotClass)} />
      <span className={cn("font-bold uppercase tracking-wider", config.className, sizeClasses)}>
        {config.label}
      </span>
    </div>
  );
}