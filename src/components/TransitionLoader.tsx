"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // npm install framer-motion

export function TransitionLoader() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Quando a rota muda, esconde o loader
    setIsTransitioning(false);
  }, [pathname]);

  // Função para navegar com transição
  const navigateWithTransition = (href: string) => {
    setIsTransitioning(true);
    router.push(href);
  };

  // Expor a função globalmente (opcional, para usar em qualquer lugar)
  useEffect(() => {
    (window as any).navigateWithTransition = navigateWithTransition;
  }, []);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-surface/80 backdrop-blur-md"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-on-surface font-medium">Carregando...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}