import { CheckCircle, Truck } from "lucide-react";

export function QuickHelp() {
  return (
    <div className="bg-surface-container-low rounded-3xl p-6">
      <h4 className="font-bold text-on-surface mb-4">Guia Rápido</h4>
      <ul className="space-y-4">
        <li className="flex gap-4 items-start">
          <CheckCircle className="text-primary text-xl w-5 h-5" />
          <p className="text-sm text-on-surface-variant">
            Verifique os níveis antes de pedidos acima de 500 dúzias.
          </p>
        </li>
        <li className="flex gap-4 items-start">
          <Truck className="text-primary text-xl w-5 h-5" />
          <p className="text-sm text-on-surface-variant">
            Zonas de envio são atribuídas automaticamente.
          </p>
        </li>
      </ul>
    </div>
  );
}