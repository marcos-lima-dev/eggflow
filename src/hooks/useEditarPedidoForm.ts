import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/stores/orderStore";
import { toast } from "sonner";
import { generateAvatarUrl, formatDateForDisplay, mapPriorityToStatus } from "@/lib/orderUtils";

interface FormData {
  client: string;
  eggType: "organic" | "caipira" | "industrial";
  quantity: string;
  date: string;
  priority: "normal" | "urgent";
}

export function useEditarPedidoForm(id: string) {
  const router = useRouter();
  const { orders, updateOrder, loadOrders } = useOrderStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    client: "",
    eggType: "organic",
    quantity: "",
    date: "",
    priority: "normal",
  });
  const [originalOrder, setOriginalOrder] = useState<any>(null);

  // 🔧 Decodifica o ID da URL (ex: %23EF-9082 → #EF-9082) e normaliza
  const decodedId = decodeURIComponent(id);
  const normalizedId = decodedId.startsWith("#") ? decodedId : `#${decodedId}`;

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    if (orders.length === 0) return;
    console.log("[useEditarPedidoForm] Buscando pedido com ID:", normalizedId);
    const order = orders.find((o) => o.id === normalizedId);
    if (!order) {
      console.error("[useEditarPedidoForm] Pedido não encontrado:", normalizedId);
      toast.error("Pedido não encontrado");
      router.push("/pedidos");
      return;
    }
    console.log("[useEditarPedidoForm] Pedido encontrado:", order);
    setOriginalOrder(order);

    // Extrair quantidade (ex: "120 Dúzias" → "120")
    const qtyMatch = order.quantity?.match(/\d+/);
    const quantity = qtyMatch ? qtyMatch[0] : "";

    // Converter data de "25 Out, 2023" para YYYY-MM-DD
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

    // Mapear status para prioridade (processing → urgent, pending → normal)
    const priority = order.status === "processing" ? "urgent" : "normal";

    setFormData({
      client: order.client,
      eggType: order.eggType,
      quantity,
      date: formattedDate,
      priority,
    });
    setIsLoading(false);
  }, [orders, normalizedId, router]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    if (!formData.client.trim()) {
      toast.error("Nome do cliente é obrigatório");
      return false;
    }
    const qty = parseInt(formData.quantity);
    if (isNaN(qty) || qty <= 0) {
      toast.error("Quantidade inválida (mínimo 1 dúzia)");
      return false;
    }
    if (!formData.date) {
      toast.error("Data de entrega é obrigatória");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!originalOrder) return;
    setIsSaving(true);

    if (!validate()) {
      setIsSaving(false);
      return;
    }

    const avatarUrl = generateAvatarUrl(formData.client);
    const formattedDate = formatDateForDisplay(formData.date);
    const status = mapPriorityToStatus(formData.priority);

    updateOrder(originalOrder.id, {
      client: formData.client,
      clientAvatar: avatarUrl,
      eggType: formData.eggType,
      quantity: `${formData.quantity} Dúzias`,
      status,
      date: formattedDate,
    });

    toast.success("Pedido atualizado com sucesso!");
    router.push("/pedidos");
    setIsSaving(false);
  };

  return {
    formData,
    isLoading,
    isSaving,
    handleChange,
    handleSubmit,
  };
}