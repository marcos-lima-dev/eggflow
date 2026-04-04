"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OrdersPaginationProps {
  total: number;
  current: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function OrdersPagination({ total, current, pageSize, onPageChange }: OrdersPaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const start = (current - 1) * pageSize + 1;
  const end = Math.min(current * pageSize, total);

  if (total === 0) return null;

  return (
    <div className="px-8 py-5 bg-surface-container-low/30 flex items-center justify-between">
      <p className="text-sm text-on-surface-variant">
        Mostrando {start} até {end} de {total} pedidos
      </p>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg disabled:opacity-30"
          disabled={current === 1}
          onClick={() => onPageChange(current - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg disabled:opacity-30"
          disabled={current === totalPages}
          onClick={() => onPageChange(current + 1)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}