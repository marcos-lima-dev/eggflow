"use client";

import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EggSelectProps {
  id: string;
  label: string;
  icon: ReactNode;
  value: string;
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function EggSelect({
  id,
  label,
  icon,
  value,
  options,
  onValueChange,
  disabled,
}: EggSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold text-on-surface-variant ml-1">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
          {icon}
        </div>
        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger id={id} className="pl-12 py-4 bg-surface-container-highest border-none rounded-2xl">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}