import { Thermometer, Droplets, Activity, Heart, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HealthCard() {
  return (
    <div className="bg-[#1A1C1C] rounded-[2.5rem] p-8 text-white relative overflow-hidden h-full flex flex-col justify-between">
      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
          <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
            Sensor ao Vivo
          </span>
          <Activity className="text-white/40" />
        </div>

        <div className="space-y-4">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <span className="text-white/60 text-sm">Temperatura</span>
            <span className="text-2xl font-headline font-bold">23.4°C</span>
          </div>
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <span className="text-white/60 text-sm">Umidade</span>
            <span className="text-2xl font-headline font-bold">58%</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-white/60 text-sm">Índice de Saúde</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-headline font-bold text-secondary-fixed">
                98%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 relative z-10">
        <Button className="w-full bg-primary-container text-on-primary-container py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform active:scale-95">
          <Monitor className="w-5 h-5" />
          Rodar Diagnóstico
        </Button>
      </div>

      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          alt="Planta Técnica"
          className="w-full h-full object-cover grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwnhb_ExYmn443QZYrJBmy68BnUUVV2A8yv_DLGzLNWVmla_fpgf_sfSK0qHS37ekCv4CCSm0UVq3On9eyYRmfNaTUmGMnkclsJCMYRQpDOgqyPZ7dc_b70gFIcokV4mwfUDk1ub5YmNvb74bmHEK7mD1wMDmewyq1ckmBnaMF9fM4mAD7K8oETIat9laNJoPAhOtAOoLotlHislKAaR6iqE8lG9uEauTdLwSK99Zw9lsQMryOx4MNHqH53yTJKdrhiB1YSrAg2Q"
        />
      </div>
    </div>
  );
}