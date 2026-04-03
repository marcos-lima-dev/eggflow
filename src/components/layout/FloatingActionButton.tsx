"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingActionButton() {
  return (
    <Button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-16 h-16 bg-primary text-on-primary rounded-2xl shadow-xl flex items-center justify-center group hover:scale-110 active:scale-90 transition-all z-40">
      <Plus className="w-6 h-6 transition-transform group-hover:rotate-90" />
    </Button>
  );
}