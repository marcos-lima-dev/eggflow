"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PriorityButtonsProps {
  value: "normal" | "urgent";
  onChange: (value: "normal" | "urgent") => void;
  disabled?: boolean;
}

export function PriorityButtons({ value, onChange, disabled }: PriorityButtonsProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-on-surface-variant ml-1">
        Nível de Prioridade
      </Label>
      <div className="flex gap-2">
        <Button
          type="button"
          variant={value === "normal" ? "default" : "ghost"}
          className={`flex-1 py-4 rounded-2xl text-sm font-bold ${
            value === "normal"
              ? "bg-secondary-container text-on-secondary-container"
              : "bg-surface-container-highest text-on-surface-variant"
          }`}
          onClick={() => onChange("normal")}
          disabled={disabled}
        >
          Normal
        </Button>
        <Button
          type="button"
          variant={value === "urgent" ? "default" : "ghost"}
          className={`flex-1 py-4 rounded-2xl text-sm font-bold ${
            value === "urgent"
              ? "bg-error-container text-on-error-container"
              : "bg-surface-container-highest text-on-surface-variant"
          }`}
          onClick={() => onChange("urgent")}
          disabled={disabled}
        >
          Urgente
        </Button>
      </div>
    </div>
  );
}