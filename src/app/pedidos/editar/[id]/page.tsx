"use client";

import { useParams } from "next/navigation";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { BottomNavBar } from "@/components/layout/BottomNavBar";
import { EditarPedidoForm } from "@/components/egg-ui/forms/EditarPedidoForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditarPedidoPage() {
  const { id } = useParams() as { id: string };

  return (
    <>
      <NavigationDrawer />
      <main className="md:ml-72 min-h-screen pb-32 md:pb-8">
        <TopAppBar />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-8">
            <Link
              href="/pedidos"
              className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para pedidos
            </Link>
            <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
              Editar Pedido
            </h2>
            <p className="text-on-surface-variant">
              Atualize as informações do pedido <span className="font-mono">{id}</span>
            </p>
          </div>
          <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-md">
            <EditarPedidoForm id={id} />
          </div>
        </div>
      </main>
      <BottomNavBar />
    </>
  );
}