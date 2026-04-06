import { EggFried } from "lucide-react";

export function InventoryStatusCard() {
  return (
    <div className="bg-secondary-container/30 backdrop-blur-xl rounded-[2rem] p-8 border-none overflow-hidden relative group">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
          <span className="text-xs font-bold text-secondary uppercase tracking-widest">
            Status do Inventário
          </span>
        </div>
        <h3 className="text-2xl font-bold text-on-secondary-container mb-2">
          94% Capacidade
        </h3>
        <p className="text-on-secondary-container/70 text-sm leading-relaxed mb-6">
          A produção atual está excelente. Todos os pedidos feitos hoje serão
          processados dentro da janela de 24h.
        </p>
        <div className="h-3 w-full bg-surface/50 rounded-full overflow-hidden">
          <div className="h-full bg-secondary w-[94%] rounded-full"></div>
        </div>
      </div>
      <div className="absolute -right-12 -bottom-12 opacity-10 scale-150 transform rotate-12 transition-transform duration-700 group-hover:rotate-0">
        <EggFried className="w-40 h-40" />
      </div>
    </div>
  );
}