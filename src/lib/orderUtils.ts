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

export function mapPriorityToStatus(priority: "normal" | "urgent"): "pending" | "processing" {
  return priority === "urgent" ? "processing" : "pending";
}

export function formatQuantity(quantity: string): string {
  return `${quantity} Dúzias`;
}