"use client";

import { FormField } from "./FormField";
import { EggSelect } from "./EggSelect";
import { PriorityButtons } from "./PriorityButtons";
import { Button } from "@/components/ui/button";
import { User, Package, Calendar, Egg } from "lucide-react";
import { useEditarPedidoForm } from "@/hooks/useEditarPedidoForm";

const eggTypeOptions = [
  { value: "organic", label: "Orgânico Vermelho" },
  { value: "caipira", label: "Caipira" },
  { value: "industrial", label: "Branco Padrão" },
];

interface EditarPedidoFormProps {
  id: string;
}

export function EditarPedidoForm({ id }: EditarPedidoFormProps) {
  const { formData, isLoading, isSaving, handleChange, handleSubmit } = useEditarPedidoForm(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-pulse text-primary">Carregando pedido...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormField
        id="client"
        label="Nome do Cliente"
        icon={<User className="w-5 h-5" />}
        placeholder="Digite o nome do distribuidor ou cliente"
        value={formData.client}
        onChange={(val) => handleChange("client", val)}
        disabled={isSaving}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <EggSelect
          id="eggType"
          label="Tipo de Ovo"
          icon={<Egg className="w-5 h-5" />}
          value={formData.eggType}
          options={eggTypeOptions}
          onValueChange={(val) => handleChange("eggType", val)}
          disabled={isSaving}
        />

        <FormField
          id="quantity"
          label="Quantidade (Dúzias)"
          icon={<Package className="w-5 h-5" />}
          type="number"
          placeholder="0"
          value={formData.quantity}
          onChange={(val) => handleChange("quantity", val)}
          disabled={isSaving}
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
          disabled={isSaving}
        />

        <PriorityButtons
          value={formData.priority}
          onChange={(val) => handleChange("priority", val)}
          disabled={isSaving}
        />
      </div>

      <Button
        type="submit"
        disabled={isSaving}
        className="w-full py-5 yolk-gradient text-white font-bold rounded-2xl text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
      >
        {isSaving ? "Salvando..." : "Salvar Alterações"}
      </Button>
    </form>
  );
}