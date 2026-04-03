"use client";

import { useState } from "react";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { BottomNavBar } from "@/components/layout/BottomNavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Egg,
  Package,
  Calendar,
  ChevronDown,
  EggFried,
  CheckCircle,
  Truck,
} from "lucide-react";

export default function NovoPedidoPage() {
  const [priority, setPriority] = useState<"normal" | "urgent">("normal");

  return (
    <>
      <NavigationDrawer />
      <main className="md:ml-72 min-h-screen pb-32 md:pb-8">
        <TopAppBar />

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
              Criar Pedido de Colheita
            </h2>
            <p className="text-on-surface-variant max-w-lg">
              Preencha os detalhes abaixo para registrar um novo pedido. Todos
              os dados são sincronizados com o inventário central em tempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="md:col-span-7 bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0px_12px_32px_rgba(26,28,28,0.06)]">
              <form className="space-y-8">
                {/* Client Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="client_name"
                    className="text-sm font-semibold text-on-surface-variant ml-1"
                  >
                    Nome do Cliente
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
                    <Input
                      id="client_name"
                      placeholder="Digite o nome do distribuidor ou cliente"
                      className="pl-12 py-4 bg-surface-container-highest border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Egg Type & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="egg_type"
                      className="text-sm font-semibold text-on-surface-variant ml-1"
                    >
                      Tipo de Ovo
                    </Label>
                    <div className="relative">
                      <Egg className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
                      <Select>
                        <SelectTrigger className="pl-12 py-4 bg-surface-container-highest border-none rounded-2xl focus:ring-2 focus:ring-primary/20">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="organic">Orgânico Vermelho</SelectItem>
                          <SelectItem value="white">Branco Padrão</SelectItem>
                          <SelectItem value="omega">Enriquecido com Ômega-3</SelectItem>
                          <SelectItem value="caipira">Caipira</SelectItem>
                        </SelectContent>
                      </Select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant w-4 h-4 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="quantity"
                      className="text-sm font-semibold text-on-surface-variant ml-1"
                    >
                      Quantidade (Dúzias)
                    </Label>
                    <div className="relative">
                      <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="0"
                        className="pl-12 py-4 bg-surface-container-highest border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Date & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="date"
                      className="text-sm font-semibold text-on-surface-variant ml-1"
                    >
                      Entrega Esperada
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
                      <Input
                        id="date"
                        type="date"
                        className="pl-12 py-4 bg-surface-container-highest border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-on-surface-variant ml-1">
                      Nível de Prioridade
                    </Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={priority === "normal" ? "default" : "ghost"}
                        className={`flex-1 py-4 rounded-2xl text-sm font-bold transition-colors ${
                          priority === "normal"
                            ? "bg-secondary-container text-on-secondary-container hover:bg-secondary-container"
                            : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high"
                        }`}
                        onClick={() => setPriority("normal")}
                      >
                        Normal
                      </Button>
                      <Button
                        type="button"
                        variant={priority === "urgent" ? "default" : "ghost"}
                        className={`flex-1 py-4 rounded-2xl text-sm font-bold transition-colors ${
                          priority === "urgent"
                            ? "bg-error-container text-on-error-container hover:bg-error-container"
                            : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high"
                        }`}
                        onClick={() => setPriority("urgent")}
                      >
                        Urgente
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-5 yolk-gradient text-white font-bold rounded-2xl text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Salvar Pedido
                </Button>
              </form>
            </div>

            {/* Right Column: Context/Visuals */}
            <div className="md:col-span-5 space-y-8">
              {/* Status Card */}
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
                    A produção atual está excelente. Todos os pedidos feitos hoje
                    serão processados dentro da janela de 24h.
                  </p>
                  <div className="h-3 w-full bg-surface/50 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[94%] rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -right-12 -bottom-12 opacity-10 scale-150 transform rotate-12 transition-transform duration-700 group-hover:rotate-0">
                  <EggFried className="w-40 h-40" />
                </div>
              </div>

              {/* Featured Image */}
              <div className="rounded-[2rem] overflow-hidden aspect-video shadow-2xl">
                <img
                  alt="Fresh Harvest"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9X9CEensLY5iIPwCNJnilJFcCrA4FKgbmaI7Vg-0C6Ch0svhqaN_xWStoSH_cj9yIBa9wjgP2ZHFUdibc_aSNFTcfPGaU68hHH0YUCfq0vVtiQf1-SS0rHQcoWGggW6UnTbC7_gJAz01gsaRmgU5mE0Q85NxHRuVKnN9g0f3yYNdsmv059jl-UjxA2cRYlTBrwFsNsMFVmtQq9tGnVeXc4K6bVZuaY-KpCLPwTf0tXtQFUameEwjehnbC317CA2ADLptxY1uH6A"
                />
              </div>

              {/* Quick Help */}
              <div className="bg-surface-container-low rounded-3xl p-6">
                <h4 className="font-bold text-on-surface mb-4">Guia Rápido</h4>
                <ul className="space-y-4">
                  <li className="flex gap-4 items-start">
                    <CheckCircle className="text-primary text-xl w-5 h-5" />
                    <p className="text-sm text-on-surface-variant">
                      Verifique os níveis antes de pedidos acima de 500 dúzias.
                    </p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <Truck className="text-primary text-xl w-5 h-5" />
                    <p className="text-sm text-on-surface-variant">
                      Zonas de envio são atribuídas automaticamente.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </>
  );
}