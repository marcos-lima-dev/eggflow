"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, LockOpen, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // 👈 novo estado para transição

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim()) {
      setError("Por favor, informe o e-mail.");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Por favor, informe a senha.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro no login. Verifique suas credenciais.");
      }

      setUser(data.user);

      toast.success(`Bem-vindo, ${data.user.name}! 🥚`, {
        description: "Seu dashboard está pronto para uso.",
        duration: 4000,
      });

      // 👇 Inicia a transição suave
      setRedirecting(true);
      // Pequeno delay para dar tempo de ver o toast e o loader
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login. Tente novamente.");
      toast.error("Falha no login", {
        description: err instanceof Error ? err.message : "Erro desconhecido",
      });
      setIsLoading(false); // garante que o botão volte ao normal em caso de erro
    } finally {
      // Não desativa isLoading aqui porque o redirecionamento pode não ter acontecido ainda.
      // Em caso de sucesso, o redirecionamento já vai ocorrer.
      if (!redirecting) {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Overlay de carregamento durante a transição */}
      {redirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-on-surface font-medium">Redirecionando para o dashboard...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-on-surface-variant ml-1">
            E-mail Profissional
          </Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors w-5 h-5" />
            <Input
              id="email"
              type="email"
              placeholder="gerente@eggflow.agri"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
              disabled={isLoading || redirecting}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <Label htmlFor="password" className="text-sm font-semibold text-on-surface-variant">
              Senha
            </Label>
            <Link href="#" className="text-xs font-bold text-primary hover:text-primary-fixed-dim transition-colors">
              Esqueceu o acesso?
            </Link>
          </div>
          <div className="relative group">
            <LockOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors w-5 h-5" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-12 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
              disabled={isLoading || redirecting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-primary transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 px-1">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            className="border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            disabled={isLoading || redirecting}
          />
          <Label htmlFor="remember" className="text-sm font-medium text-on-surface-variant cursor-pointer">
            Manter conectado
          </Label>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container text-sm p-3 rounded-xl">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || redirecting}
          className="w-full yolk-gradient text-white font-headline font-bold text-lg py-4 rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          {isLoading ? "Entrando..." : "Iniciar Sessão"}
          {!isLoading && !redirecting && (
            <ArrowRight className="text-xl w-5 h-5 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>
      </form>
    </>
  );
}