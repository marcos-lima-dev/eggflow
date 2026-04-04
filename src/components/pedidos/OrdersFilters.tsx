"use client";

import { Search, Egg, RefreshCw } from "lucide-react";

interface OrdersFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function OrdersFilters({ searchTerm, onSearchChange }: OrdersFiltersProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="md:col-span-2 bg-surface-container-low rounded-xl p-2 flex items-center group focus-within:bg-surface-container-high transition-colors">
        <Search className="px-3 text-on-surface-variant w-10 h-5" />
        <input
          type="text"
          placeholder="Buscar por cliente ou ID..."
          className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium py-3 outline-none"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="relative bg-surface-container-low rounded-xl flex items-center px-4 py-3 cursor-pointer hover:bg-surface-container-high transition-colors">
        <Egg className="text-on-surface-variant mr-3 w-5 h-5" />
        <span className="text-sm font-medium flex-1">Tipo de Ovo</span>
        <RefreshCw className="text-xs w-4 h-4" />
      </div>
      <div className="relative bg-surface-container-low rounded-xl flex items-center px-4 py-3 cursor-pointer hover:bg-surface-container-high transition-colors">
        <RefreshCw className="text-on-surface-variant mr-3 w-5 h-5" />
        <span className="text-sm font-medium flex-1">Status</span>
        <RefreshCw className="text-xs w-4 h-4" />
      </div>
    </section>
  );
}