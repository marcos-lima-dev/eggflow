import { useState, FormEvent } from "react";
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

export function useNovoPedidoForm() {
  const router = useRouter();
  const { addOrder } = useOrderStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    client: "",
    eggType: "organic",
    quantity: "",
    date: "",
    priority: "normal",
  });

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
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      return;
    }

    const avatarUrl = generateAvatarUrl(formData.client);
    const formattedDate = formatDateForDisplay(formData.date);
    const status = mapPriorityToStatus(formData.priority);

    addOrder({
      client: formData.client,
      clientAvatar: avatarUrl,
      eggType: formData.eggType,
      status,
      date: formattedDate,
    });

    toast.success("Pedido criado com sucesso!");
    router.push("/pedidos");
    setIsLoading(false);
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
}