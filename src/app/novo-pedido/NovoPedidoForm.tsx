"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrderStore } from "@/stores/orderStore";
import { toast } from "sonner";
import { User, Egg, Package, Calendar } from "lucide-react";
import { FormField } from "./FormField";

export function NovoPedidoForm() {
  const router = useRouter();
  const { addOrder } = useOrderStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    client: "",
    eggType: "organic",
    quantity: "",
    date: "",
    priority: "normal" as "normal" | "urgent",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.client.trim()) {
      toast.error("Nome do cliente é obrigatório");
      setIsLoading(false);
      return;
    }
    const qty = parseInt(formData.quantity);
    if (isNaN(qty) || qty <= 0) {
      toast.error("Quantidade inválida (mínimo 1 dúzia)");
      setIsLoading(false);
      return;
    }
    if (!formData.date) {
      toast.error("Data de entrega é obrigatória");
      setIsLoading(false);
      return;
    }

    const initials = formData.client
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const avatarUrl = `https://ui-avatars.com/api/?name=${initials}&background=FFD700&color=705D00&rounded=true&size=128`;

    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).replace(" de ", " ");

    const status = formData.priority === "urgent" ? "processing" : "pending";

    addOrder({
      client: formData.client,
      clientAvatar: avatarUrl,
      eggType: formData.eggType as "organic" | "caipira" | "industrial",
      status: status as "pending" | "processing" | "delivered" | "cancelled",
      date: formattedDate,
    });

    toast.success("Pedido criado com sucesso!");
    router.push("/pedidos");
    setIsLoading(false);
  };

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
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-on-surface-variant ml-1">
            Tipo de Ovo
          </Label>
          <div className="relative">
            <Egg className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
            <Select
              value={formData.eggType}
              onValueChange={(val) => handleChange("eggType", val)}
            >
              <SelectTrigger className="pl-12 py-4 bg-surface-container-highest border-none rounded-2xl">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organic">Orgânico Vermelho</SelectItem>
                <SelectItem value="caipira">Caipira</SelectItem>
                <SelectItem value="industrial">Branco Padrão</SelectItem>
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

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-on-surface-variant ml-1">
            Nível de Prioridade
          </Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={formData.priority === "normal" ? "default" : "ghost"}
              className={`flex-1 py-4 rounded-2xl text-sm font-bold ${
                formData.priority === "normal"
                  ? "bg-secondary-container text-on-secondary-container"
                  : "bg-surface-container-highest text-on-surface-variant"
              }`}
              onClick={() => handleChange("priority", "normal")}
            >
              Normal
            </Button>
            <Button
              type="button"
              variant={formData.priority === "urgent" ? "default" : "ghost"}
              className={`flex-1 py-4 rounded-2xl text-sm font-bold ${
                formData.priority === "urgent"
                  ? "bg-error-container text-on-error-container"
                  : "bg-surface-container-highest text-on-surface-variant"
              }`}
              onClick={() => handleChange("priority", "urgent")}
            >
              Urgente
            </Button>
          </div>
        </div>
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