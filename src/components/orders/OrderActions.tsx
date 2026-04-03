import { Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrderActions() {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-lg hover:bg-surface-container-high"
      >
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-lg hover:bg-surface-container-high"
      >
        <Edit className="w-4 h-4" />
      </Button>
    </div>
  );
}