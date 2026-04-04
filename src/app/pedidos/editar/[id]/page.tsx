"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { BottomNavBar } from "@/components/layout/BottomNavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { User, Egg, Package, Calendar, ArrowLeft } from "lucide-react";

export default function EditarPedidoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { orders, updateOrder } = useOrderStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    client: "",
    eggType: "organic" as "organic" | "caipira" | "industrial",
    quantity: "",
    date: "",
  });
  const [originalDate, setOriginalDate] = useState("");

  // Carregar dados do pedido
  useEffect(() => {
    const order = orders.find((o) => o.id === id);
    if (order) {
      // Converter data do formato "25 Out, 2023" para input date (YYYY-MM-DD)
      let formattedDate = "";
      if (order.date) {
        const dateParts = order.date.replace(",", "").split(" ");
        if (dateParts.length >= 3) {
          const day = parseInt(dateParts[0]);
          const monthStr = dateParts[1];
          const year = parseInt(dateParts[2]);
          const monthMap: Record<string, number> = {
            Jan: 0, Fev: 1, Mar: 2, Abr: 3, Mai: 4, Jun: 5,
            Jul: 6, Ago: 7, Set: 8, Out: 9, Nov: 10, Dez: 11,
          };
          const month = monthMap[monthStr];
          if (!isNaN(day) && month !== undefined && !isNaN(year)) {
            const dateObj = new Date(year, month, day);
            formattedDate = dateObj.toISOString().split("T")[0];
          }
        }
      }

      // Quantidade (extrair número da string "120 Dúzias")
      let qty = "";
      const qtyMatch = order.quantity?.match(/\d+/);
      if (qtyMatch) qty = qtyMatch[0];

      setFormData({
        client: order.client,
        eggType: order.eggType,
        quantity: qty,
        date: formattedDate,
      });
      setOriginalDate(order.date);
    } else {
      toast.error("Pedido não encontrado");
      router.push("/pedidos");
    }
    setIsLoading(false);
  }, [id, orders, router]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (!formData.client.trim()) {
      toast.error("Nome do cliente é obrigatório");
      setIsSaving(false);
      return;
    }
    const quantityNum = parseInt(formData.quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      toast.error("Quantidade inválida (mínimo 1 dúzia)");
      setIsSaving(false);
      return;
    }
    if (!formData.date) {
      toast.error("Data de entrega é obrigatória");
      setIsSaving(false);
      return;
    }

    // Formatar data para exibição
    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).replace(" de ", " ");

    // Manter o mesmo avatar (não alterar)
    const orderToUpdate = orders.find((o) => o.id === id);
    if (!orderToUpdate) {
      toast.error("Pedido não encontrado");
      router.push("/pedidos");
      return;
    }

    updateOrder(id, {
    client: formData.client,
    eggType: formData.eggType,
    quantity: `${quantityNum} Dúzias`,
    date: formattedDate,
    });

    toast.success("Pedido atualizado com sucesso!");
    router.push("/pedidos");
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <>
        <NavigationDrawer />
        <main className="md:ml-72 min-h-screen pb-32 md:pb-8">
          <TopAppBar />
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-primary">Carregando...</div>
          </div>
        </main>
        <BottomNavBar />
      </>
    );
  }

  return (
    <>
      <NavigationDrawer />
      <main className="md:ml-72 min-h-screen pb-32 md:pb-8">
        <TopAppBar />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-8">
            <Button
              variant="ghost"
              className="mb-4 -ml-2 text-on-surface-variant"
              onClick={() => router.push("/pedidos")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para pedidos
            </Button>
            <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
              Editar Pedido
            </h2>
            <p className="text-on-surface-variant">
              Atualize as informações do pedido <span className="font-mono">{id}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0px_12px_32px_rgba(26,28,28,0.06)]">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-on-surface-variant ml-1">
                    Nome do Cliente
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
                    <Input
                      value={formData.client}
                      onChange={(e) => handleChange("client", e.target.value)}
                      className="pl-12 py-4 bg-surface-container-highest border-none rounded-2xl"
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-on-surface-variant ml-1">
                      Tipo de Ovo
                    </Label>
                    <div className="relative">
                      <Egg className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
                      <Select
                        value={formData.eggType}
                        onValueChange={(val) => handleChange("eggType", val as any)}
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

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-on-surface-variant ml-1">
                      Quantidade (Dúzias)
                    </Label>
                    <div className="relative">
                      <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
                      <Input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => handleChange("quantity", e.target.value)}
                        className="pl-12 py-4 bg-surface-container-highest border-none rounded-2xl"
                        disabled={isSaving}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-on-surface-variant ml-1">
                    Entrega Esperada
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      className="pl-12 py-4 bg-surface-container-highest border-none rounded-2xl"
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-5 yolk-gradient text-white font-bold rounded-2xl text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </form>
            </div>

            <div className="md:col-span-5 space-y-8">
              {/* Card de ajuda (igual ao de novo pedido) */}
              <div className="bg-secondary-container/30 backdrop-blur-xl rounded-[2rem] p-8 border-none overflow-hidden relative group">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                    <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                      Status do Inventário
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-on-secondary-container mb-2">
                    94% Capacidade
                  </h3>
                  <p className="text-on-secondary-container/70 text-sm leading-relaxed mb-6">
                    A produção atual está excelente. Todos os pedidos editados
                    serão sincronizados em tempo real.
                  </p>
                  <div className="h-3 w-full bg-surface/50 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[94%] rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -right-12 -bottom-12 opacity-10 scale-150 transform rotate-12 transition-transform duration-700 group-hover:rotate-0">
                  <Egg className="w-40 h-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavBar />
    </>
  );
}