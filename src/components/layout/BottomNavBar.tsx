"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, ShoppingBasket, PlusCircle, Palette } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Início", icon: Home },
  { href: "/pedidos", label: "Pedidos", icon: ShoppingBasket },
  { href: "/novo-pedido", label: "Adicionar", icon: PlusCircle },
  { href: "/design-system", label: "Estilo", icon: Palette },
];

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface/80 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.05)] rounded-t-[2rem]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center transition-all duration-150 rounded-2xl px-6 py-2",
              isActive
                ? "bg-primary-container text-on-primary-container"
                : "text-on-surface-variant/60 hover:bg-surface-container-high"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="font-label text-[10px] font-semibold uppercase tracking-wider mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}