import { Sprout } from "lucide-react";

export function LoginVisualSection() {
  return (
    <section className="hidden md:flex md:w-1/2 relative p-12 flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-90 scale-105"
          alt="Modern organic farm morning light"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2-xu1ywHRQbSjbDY5OKu7DyP_KUcRraTXRfGlTa6qJTb--BHtprn7UGjfgrcKFSxaH6KRe9Zkhy9m8T5WMkev8ZaeaWSCF2zXZyJNzHAX8q6DUKgPr9ZtvaFE1FS_a56rG6RzUmpJf3894vlLCpZ12f1XtIdYs79sZiTKKGTO4VB9FZWAiZxytdt6pn07W8tQsehaTjmNe281vToeH-L8RRIKCj_pqA6Yyyxcz8kk1_CVDUnaAwHJugR4SjdxLXPbybCjaw8_pg"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <Sprout className="text-primary-container text-4xl" />
          <h1 className="font-headline font-black text-3xl text-surface-container-lowest tracking-tighter uppercase">
            EggFlow
          </h1>
        </div>
      </div>

      <div className="relative z-10 glass-card p-8 rounded-3xl border border-white/20">
        <p className="font-headline text-2xl font-bold text-on-surface leading-tight mb-4">
          “O futuro da gestão avícola é orgânico, orientado por dados e fluido.”
        </p>
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-primary rounded-full"></div>
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Sistema Agrário Digital
          </span>
        </div>
      </div>
    </section>
  );
}