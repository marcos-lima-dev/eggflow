"use client";

import { Button } from "@/components/ui/button";
import { User, Package, Calendar, Egg } from "lucide-react";
import { FormField } from "@/components/egg-ui/forms/FormField";
import { PriorityButtons } from "@/components/egg-ui/forms/PriorityButtons";
import { useNovoPedidoForm } from "@/hooks/useNovoPedidoForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const eggTypeOptions = [
  { value: "organic", label: "Orgânico Vermelho" },
  { value: "caipira", label: "Caipira" },
  { value: "industrial", label: "Branco Padrão" },
];

export function NovoPedidoForm() {
  const { formData, isLoading, handleChange, handleSubmit } = useNovoPedidoForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormField
        id="client"
        label="Nome do Cliente"
        icon={<User className="w-5 h-5" />}
        placeholder="Digite o nome do distribuidor ou cliente"
        value={formData.client}
        onChange={(val) => handleChange("client", val)}
        disabled={isLoading}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Tipo de Ovo */}
        <div className="space-y-2 overflow-visible">
          <Label className="text-sm font-semibold text-on-surface-variant ml-1">
            Tipo de Ovo
          </Label>
          <div className="relative">
            <Egg className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5 z-10" />
            <Select
              value={formData.eggType}
              onValueChange={(val) => handleChange("eggType", val)}
              disabled={isLoading}
            >
              <SelectTrigger className="pl-12 py-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl focus:ring-2 focus:ring-primary/20 w-full text-on-surface">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              {/* portal={false} evita que o dropdown seja renderizado fora do contexto, mas depende do overflow do pai */}
              <SelectContent
                className="z-[9999] bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant rounded-lg shadow-lg"
                position="popper"
                side="bottom"
                sideOffset={10}
                align="start"
                collisionPadding={{ bottom: 20 }}
              >
                {eggTypeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <FormField
          id="quantity"
          label="Quantidade (Dúzias)"
          icon={<Package className="w-5 h-5" />}
          type="number"
          placeholder="0"
          value={formData.quantity}
          onChange={(val) => handleChange("quantity", val)}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          id="date"
          label="Entrega Esperada"
          icon={<Calendar className="w-5 h-5" />}
          type="date"
          value={formData.date}
          onChange={(val) => handleChange("date", val)}
          disabled={isLoading}
        />

        <PriorityButtons
          value={formData.priority}
          onChange={(val) => handleChange("priority", val)}
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-5 yolk-gradient text-white font-bold rounded-2xl text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
      >
        {isLoading ? "Salvando..." : "Salvar Pedido"}
      </Button>
    </form>
  );
}