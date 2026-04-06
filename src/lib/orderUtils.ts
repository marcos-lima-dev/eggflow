// Função para gerar URL de avatar baseado no nome do cliente
export function generateAvatarUrl(clientName: string): string {
  const initials = clientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return `https://ui-avatars.com/api/?name=${initials}&background=FFD700&color=705D00&rounded=true&size=128`;
}

// Formata data de YYYY-MM-DD para "DD MMM, YYYY" (ex: "25 Abr, 2025")
export function formatDateForDisplay(dateString: string): string {
  const dateObj = new Date(dateString);
  return dateObj
    .toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(" de ", " ");
}

// Mapeia prioridade do formulário para status do pedido
export function mapPriorityToStatus(priority: "normal" | "urgent"): "pending" | "processing" {
  return priority === "urgent" ? "processing" : "pending";
}