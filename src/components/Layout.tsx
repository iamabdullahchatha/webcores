import { Header } from "./Header";
import { Footer } from "./Footer";
import { MessageCircle } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      <main className="flex-1 pt-24">
        {children}
      </main>

      <Footer />

      <a
        href="https://wa.me/+44 7570 792516"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[oklch(0.75_0.18_150)] text-white shadow-glow hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}