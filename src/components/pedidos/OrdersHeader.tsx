"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

interface OrdersHeaderProps {
  onExport?: () => void;
}

export function OrdersHeader({ onExport }: OrdersHeaderProps) {
  return (
    <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline mb-2">
          Livro de Pedidos
        </h1>
        <p className="text-on-surface-variant font-body">
          Gerenciando a cadeia de suprimentos orgânica e industrial.
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={onExport}
          className="px-6 py-3 rounded-xl bg-surface-container-lowest text-primary font-bold hover:scale-105 transition-all shadow-sm flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Exportar
        </Button>
        <Link href="/novo-pedido">
          <Button className="px-6 py-3 rounded-xl yolk-gradient text-on-primary font-bold hover:scale-105 transition-all shadow-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Pedido
          </Button>
        </Link>
      </div>
    </header>
  );
}