"use client";

import { TopAppBar } from "@/components/layout/TopAppBar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { BottomNavBar } from "@/components/layout/BottomNavBar";
import { NovoPedidoForm } from "./NovoPedidoForm";
import { InventoryStatusCard } from "@/components/egg-ui/cards/InventoryStatusCard";
import { QuickHelp } from "@/components/egg-ui/feedback/QuickHelp";

export default function NovoPedidoPage() {
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
              Preencha os detalhes abaixo para registrar um novo pedido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 bg-surface-container-lowest rounded-[2rem] p-8 shadow-md">
              <NovoPedidoForm />
            </div>
            <div className="md:col-span-5 space-y-8">
              <InventoryStatusCard />
              <div className="rounded-[2rem] overflow-hidden aspect-video shadow-2xl">
                <img
                  alt="Fresh Harvest"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9X9CEensLY5iIPwCNJnilJFcCrA4FKgbmaI7Vg-0C6Ch0svhqaN_xWStoSH_cj9yIBa9wjgP2ZHFUdibc_aSNFTcfPGaU68hHH0YUCfq0vVtiQf1-SS0rHQcoWGggW6UnTbC7_gJAz01gsaRmgU5mE0Q85NxHRuVKnN9g0f3yYNdsmv059jl-UjxA2cRYlTBrwFsNsMFVmtQq9tGnVeXc4K6bVZuaY-KpCLPwTf0tXtQFUameEwjehnbC317CA2ADLptxY1uH6A"
                />
              </div>
              <QuickHelp />
            </div>
          </div>
        </div>
      </main>
      <BottomNavBar />
    </>
  );
}