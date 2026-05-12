import { useLocation, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MessageCircle } from "lucide-react";
import { pageSeo } from "@/lib/seo";

function ServiceBreadcrumb() {
  const pathname = useLocation({ select: (l) => l.pathname });

  if (!pathname.startsWith("/services/") || pathname === "/services/") return null;

  const page = Object.values(pageSeo).find((p) => p.path === pathname);
  const label = page?.label ?? pathname.split("/").pop()?.replace(/-/g, " ") ?? "";

  return (
    <nav
      aria-label="Breadcrumb"
      className="fixed top-20 left-0 right-0 z-40 pointer-events-none"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-4">
        <ol className="flex items-center gap-1.5 text-xs pointer-events-auto w-fit">
          <li>
            <Link to="/" className="text-muted-foreground/60 hover:text-primary transition-colors duration-200">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
          </li>
          <li>
            <Link to="/services" className="text-muted-foreground/60 hover:text-primary transition-colors duration-200">
              Services
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
          </li>
          <li aria-current="page" className="text-foreground/70 font-medium capitalize">
            {label}
          </li>
        </ol>
      </div>
    </nav>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <ServiceBreadcrumb />

      <main className="flex-1 pt-24">{children}</main>

      <Footer />

      <a
        href="https://wa.me/447570792516"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[oklch(0.75_0.18_150)] text-white shadow-glow hover:scale-110 transition-transform"
        aria-label="Chat with Webcore Solutions on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
