import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { TransitionLoader } from "@/components/TransitionLoader";
import { NotificationInitializer } from "@/components/NotificationInitializer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "EggFlow - Gestão Avícola",
  description: "Sistema de gestão para avicultura digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="light" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          manrope.variable,
          "font-body bg-background text-on-surface antialiased"
        )}
        suppressHydrationWarning
      >
        <TransitionLoader />
        {children}
        <NotificationInitializer />
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "var(--surface-container-lowest)",
              color: "var(--on-surface)",
              border: "1px solid var(--outline-variant)",
              borderRadius: "0.75rem",
            },
          }}
        />
      </body>
    </html>
  );
}