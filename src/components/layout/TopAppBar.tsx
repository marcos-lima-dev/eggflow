"use client";

import { useEffect, useState } from "react";
import { Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationPopover } from "@/components/notifications/NotificationPopover";

export function TopAppBar() {
  const [currentDate, setCurrentDate] = useState("");
  const [period, setPeriod] = useState("Manhã");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 5 && hour < 12) {
        setPeriod("Manhã");
      } else if (hour >= 12 && hour < 18) {
        setPeriod("Tarde");
      } else {
        setPeriod("Noite");
      }

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "short",
      };
      let formatted = now.toLocaleDateString("pt-BR", options);
      formatted = formatted.replace(" de ", " ");
      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
      setCurrentDate(formatted);
    };

    updateDateTime();
  }, []);

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
            {currentDate || "Carregando..."}
          </h2>
          <p className="text-on-surface font-bold text-xl font-headline">
            Visão Geral da {period}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <NotificationPopover />
        </div>
      </div>
    </header>
  );
}