"use client";

import { Sprout } from "lucide-react";
import { LoginVisualSection } from "@/components/login/LoginVisualSection";
import { LoginForm } from "@/components/login/LoginForm";
import { LoginFooter } from "@/components/login/LoginFooter";
import { SupportPulse } from "@/components/login/SupportPulse";

export default function LoginPage() {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex items-center justify-center p-6">
      <main className="w-full max-w-5xl flex flex-col md:flex-row items-stretch rounded-[2.5rem] overflow-hidden bg-surface-container-low shadow-2xl shadow-zinc-950/5 border border-outline-variant/10">
        <LoginVisualSection />

        {/* Form Section */}
        <section className="w-full md:w-1/2 bg-surface-container-lowest p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <div className="md:hidden flex items-center gap-2 mb-12">
            <Sprout className="text-primary text-3xl" />
            <span className="font-headline font-black text-2xl text-primary tracking-tighter uppercase">
              EggFlow
            </span>
          </div>

          <header className="mb-10">
            <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2">
              Bem-vindo de volta
            </h2>
            <p className="text-on-surface-variant font-medium">
              Acesse os dados vitais da sua granja e ciclos de ovos.
            </p>
          </header>

          <LoginForm />
          <LoginFooter />
        </section>
      </main>

      <SupportPulse />
    </div>
  );
}