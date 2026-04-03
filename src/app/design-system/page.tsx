"use client";

import { TopAppBar } from "@/components/layout/TopAppBar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { BottomNavBar } from "@/components/layout/BottomNavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Leaf,
  Activity,
  Cloud,
  Thermometer,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DesignSystemPage() {
  return (
    <>
      <NavigationDrawer />
      <main className="md:ml-72 min-h-screen pb-32 md:pb-8">
        <TopAppBar />

        <div className="max-w-7xl mx-auto px-6 py-8">
          <section className="mb-16">
            <h2 className="font-headline font-extrabold text-5xl text-on-surface mb-4 tracking-tighter">
              O Agrário Digital
            </h2>
            <p className="text-on-surface-variant max-w-2xl text-lg mb-12">
              Diretrizes visuais e componentes reutilizáveis para o ecossistema
              EggFlow.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Buttons Section */}
              <div className="col-span-1 lg:col-span-2 bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-[0px_12px_32px_rgba(26,28,28,0.06)]">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-headline font-bold text-xl text-on-surface">
                    Primitivos Interativos: Botões
                  </h3>
                  <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant/50">
                    Biblioteca de Componentes
                  </span>
                </div>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-label text-on-surface-variant/60">
                      Primário (Gradiente Gema)
                    </span>
                    <Button className="px-8 py-3 yolk-gradient text-on-primary font-bold rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-primary/10">
                      Fazer Pedido
                    </Button>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-label text-on-surface-variant/60">
                      Secundário (Borda)
                    </span>
                    <Button
                      variant="outline"
                      className="px-8 py-3 bg-transparent border-2 border-outline-variant/30 text-primary font-bold rounded-xl hover:bg-surface-container-low hover:scale-[1.02] transition-all"
                    >
                      Cancelar Ação
                    </Button>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-label text-on-surface-variant/60">
                      Estado Desativado
                    </span>
                    <Button
                      disabled
                      className="px-8 py-3 bg-surface-container-highest text-on-surface-variant/40 font-bold rounded-xl cursor-not-allowed"
                    >
                      Inativo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-[0px_12px_32px_rgba(26,28,28,0.06)] flex flex-col justify-between">
                <div>
                  <h3 className="font-headline font-bold text-xl text-on-surface mb-6">
                    Indicadores de Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                      <span className="text-sm font-medium">Colheita Pendente</span>
                      <Badge className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-on-primary-container rounded-full animate-pulse"></span>
                        Ativo
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                      <span className="text-sm font-medium">Pedido Concluído</span>
                      <Badge className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider rounded-full">
                        Enviado
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                      <span className="text-sm font-medium">Falha na Qualidade</span>
                      <Badge className="px-3 py-1 bg-error-container text-on-error-container text-[10px] font-bold uppercase tracking-wider rounded-full">
                        Rejeitado
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Input Architecture */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-surface-container-low rounded-[1.5rem] p-8">
              <h3 className="font-headline font-bold text-xl text-on-surface mb-6">
                Arquitetura de Entrada
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface-variant block ml-1">
                    Número do Lote
                  </label>
                  <Input
                    placeholder="ex: 9942-A"
                    className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface-variant block ml-1">
                    Temperatura do Galpão (°C)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      defaultValue="24.5"
                      className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20"
                    />
                    <Thermometer className="absolute right-4 top-3 text-secondary text-sm w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface-variant block ml-1">
                    Notas
                  </label>
                  <Textarea
                    placeholder="Digite as observações..."
                    rows={3}
                    className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Glass Card */}
              <div className="glass-card rounded-[1.5rem] p-8 shadow-[0px_12px_32px_rgba(26,28,28,0.06)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
                <h3 className="font-headline font-bold text-xl text-on-surface mb-2">
                  Padrão de Card Orgânico
                </h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  Cards utilizam camadas tonais em vez de linhas.
                </p>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-surface-container-high rounded-xl">
                    <Leaf className="text-primary w-5 h-5" />
                  </div>
                  <div className="p-3 bg-surface-container-high rounded-xl">
                    <Activity className="text-primary w-5 h-5" />
                  </div>
                  <div className="p-3 bg-surface-container-high rounded-xl">
                    <Cloud className="text-primary w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-[0px_12px_32px_rgba(26,28,28,0.06)]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant/50 mb-1">
                      Saúde da Produção
                    </p>
                    <h4 className="font-headline font-bold text-2xl">
                      98.4% Eficiência
                    </h4>
                  </div>
                  <Badge className="px-3 py-1 bg-secondary-container/30 text-secondary font-bold text-xs rounded-full">
                    +2.1%
                  </Badge>
                </div>
                <Progress value={98.4} className="h-3 bg-surface-container-high rounded-full" />
              </div>
            </div>
          </section>

          {/* Assets Section */}
          <section className="bg-surface-container-lowest rounded-[2rem] p-12 shadow-[0px_12px_32px_rgba(26,28,28,0.06)]">
            <h3 className="font-headline font-bold text-2xl text-on-surface mb-8">
              Tratamento de Ativos e Fotografia
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 h-64 rounded-2xl overflow-hidden relative group">
                <img
                  alt="Granja Avícola"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEV-vPn6EUca6VxeCAAUVjDk5GVYl1iT0JvuLlKSLMNHCyhviuQvYeaCcEX77j7m-JByhVTqSJDWhraClSMAZ1bm4rU5Wzl3qFnfXwoH5X-r-r7wK4tTGmEqD3EsCgCcpfua5l2XJdV3ubpWBWXeM1RNBpvbtmNqcUVPmiAY1OGoh9Tw5J_ANq0fuAnHsxmTLMyCEB3LhnZpIgvDju_8Wxxd5fYQSHSwf7bCzXMAKA1lNEpVt7gwDDSoHxVp9Hi0afy4qLinS--g"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs font-label uppercase tracking-widest opacity-80">
                    Vida Sustentável
                  </p>
                  <p className="text-lg font-bold">Foco em Crescimento Orgânico</p>
                </div>
              </div>
              <div className="h-64 rounded-2xl overflow-hidden">
                <img
                  alt="Ovos Frescos"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuALIwhSCX8Bbnt1_XSTIyOfW1oPVxOB4oRKKlboKfFFmxiK07TVD-QNw37c774hc60FGBf4evnWi_4QDHsAyH_wQfvJ4HuAnS6Ebs1NqoHRfxs2Eioh8RVsrvj2uFE5Cta48ofBs6f6YDfTZ8leoaG0pNEN9djr1UChY6IvpzoHJuFCyNbxHtm7wI4xoxCDhgAHW6usRuiliWZvW8Unw4UdIpTVyArEtZslHS9zcbtXeK6XlhFYScVB9eS-rSII0WtXvyDO0fN7VA"
                />
              </div>
              <div className="h-64 rounded-2xl overflow-hidden">
                <img
                  alt="Campo Verde"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-zC51n-__OYxQKDXMZOtNd-kJVRs9HtcGCUryRWpy4XAc3zNwMz5C9S-XeWpu5p_6_b1NkLvnrst-RlLQbFpE6DxmJdhFnYbycZVqfL48St3tlVF1Fc4OtRYEMkD59jIuR_DgOCwesac0LVq68A9t0g1oKA5sbCmXs9grvNwMPR96luICEVJfyv-NAw07QrmhNNY4zC1Ok0fNbwC4mx0xwMEewj3LuNBgSqOrYhLKA7aQ83Z7LJ3Q4WwXJtSwXQHzGLEW6G7rUw"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <BottomNavBar />
    </>
  );
}