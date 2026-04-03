"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBasket,
  PlusCircle,
  Palette,
  Sprout,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { href: "/pedidos", label: "Pedidos", icon: ShoppingBasket },
  { href: "/novo-pedido", label: "Novo Pedido", icon: PlusCircle },
  { href: "/design-system", label: "Sistema de Design", icon: Palette },
];

export function NavigationDrawer() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full z-50 p-4 flex-col bg-surface rounded-r-3xl w-72 shadow-2xl shadow-zinc-950/10 transition-transform duration-200">
      <div className="flex items-center gap-3 px-4 py-8">
        <Sprout className="text-primary text-3xl" />
        <span className="text-xl font-bold text-primary font-headline">
          EggFlow
        </span>
      </div>

      <div className="flex flex-col gap-2 mt-4 flex-grow">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary-container text-on-primary-container font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:scale-[1.02]"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-body font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto p-4 flex items-center gap-3 bg-surface-container-low rounded-2xl">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
          <img
            alt="Avatar do Gerente"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmvDjPLPJgjnBgutFUuvRpq-wJScT6G5Cx2ZUkPUqfqTVDFgiSGfJcyLtnbr2xBj0BYOaHzb9usPDY6W0hsTGWeOSjh9mJb1rqOK88JXh9bI_-NVxeBYRZ1iIXSIdO_RvF-NlcCVdQORNpInInCWUjKh4l498djBxwUmlTu17Re682_PyGiwyIqzPu4Uyuamgm5iDZQ2cwQ5NTJ3ET8zWcPIt5sPkG-SWLGbdH9YukPr8VVIeVu13zLWy0dTgHoO3xsbVzlHCwyQ"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm">Gerente Avícola</span>
          <span className="text-xs text-on-surface-variant">Líder de Colheita</span>
        </div>
      </div>
    </aside>
  );
}