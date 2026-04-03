import Link from "next/link";

export function LoginFooter() {
  return (
    <footer className="mt-12 text-center">
      <p className="text-on-surface-variant text-sm">
        Novo na rede?{" "}
        <Link href="#" className="text-secondary font-bold hover:underline underline-offset-4 decoration-2">
          Solicitar Acesso
        </Link>
      </p>
      <div className="mt-8 pt-8 border-t border-surface-container-high flex flex-wrap justify-center gap-6">
        <Link href="#" className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/40 hover:text-primary transition-colors">
          Status do Sistema
        </Link>
        <Link href="#" className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/40 hover:text-primary transition-colors">
          Protocolo de Segurança
        </Link>
        <Link href="#" className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/40 hover:text-primary transition-colors">
          Jurídico
        </Link>
      </div>
    </footer>
  );
}