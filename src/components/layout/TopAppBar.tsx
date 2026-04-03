"use client";

import { Bell, Search, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopAppBar() {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl md:bg-transparent">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 md:hidden">
          <Sprout className="text-primary" />
          <h1 className="text-2xl font-black text-primary tracking-tighter font-headline">
            EggFlow
          </h1>
        </div>

        <div className="hidden md:block">
          <h2 className="text-on-surface-variant text-sm font-medium">
            Segunda-feira, 23 Out
          </h2>
          <p className="text-on-surface font-bold text-xl font-headline">
            Visão Geral da Manhã
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-surface-container-high"
          >
            <Search className="w-5 h-5 text-on-surface-variant" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-surface-container-high"
          >
            <Bell className="w-5 h-5 text-on-surface-variant" />
          </Button>
        </div>
      </div>
    </header>
  );
}