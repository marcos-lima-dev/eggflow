import { Headphones } from "lucide-react";

export function SupportPulse() {
  return (
    <div className="fixed bottom-8 right-8 flex items-center gap-3 bg-white p-3 pr-5 rounded-full shadow-lg border border-outline-variant/10 hidden sm:flex">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
          <Headphones className="text-secondary w-5 h-5" />
        </div>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary border-2 border-white rounded-full animate-pulse"></span>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">
          Suporte Online
        </span>
        <span className="text-xs font-semibold text-on-surface-variant">
          Falar com Líder da Colmeia
        </span>
      </div>
    </div>
  );
}