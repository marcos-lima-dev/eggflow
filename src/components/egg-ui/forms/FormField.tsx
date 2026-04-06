import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  icon: ReactNode;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function FormField({
  id,
  label,
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
  disabled,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-sm font-semibold text-on-surface-variant ml-1">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
          {icon}
        </div>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 py-4 bg-surface-container-highest border-none rounded-2xl"
          disabled={disabled}
        />
      </div>
    </div>
  );
}