import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import logo from "@/assets/logo.png";

type NavItem = {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
};

// Grows each phase. Phase 3: Dashboard only.
const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
];

const ROLE_LABEL: Record<string, string> = {
  owner: "Owner",
  admin: "Admin",
  editor: "Editor",
};

export function AdminLayout({ children }: { children: ReactNode }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const pathname = useLocation({ select: (l) => l.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentTitle =
    NAV_ITEMS.find((n) => n.to === pathname)?.label ?? "Dashboard";

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/admin/login" });
  }

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="px-6 py-5">
        <img
          src={logo}
          alt="Webcore Solutions"
          width={1180}
          height={319}
          className="h-7 w-auto"
          decoding="async"
        />
      </div>

      <nav className="flex-1 px-3 py-2" aria-label="Admin navigation">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "gradient-primary text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/60 px-4 py-4">
        <p className="text-xs text-muted-foreground truncate" title={profile?.email ?? ""}>
          {profile?.email ?? "—"}
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-60 bg-card border-r border-border/60 z-30">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-60 bg-card border-r border-border/60 z-50"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <header className="fixed top-0 right-0 left-0 md:left-60 h-16 bg-background/80 backdrop-blur border-b border-border/40 z-30">
        <div className="flex items-center justify-between h-full px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 rounded-lg glass hover:bg-primary/10 transition-colors duration-200"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="font-display text-base md:text-lg font-semibold text-foreground">
              {currentTitle}
            </h1>
          </div>

          {profile && (
            <span className="rounded-full bg-primary/10 text-primary text-xs font-bold px-3 py-1">
              {ROLE_LABEL[profile.role] ?? profile.role}
            </span>
          )}
        </div>
      </header>

      <main className="md:ml-60 mt-16 p-6 md:p-8">{children}</main>
    </div>
  );
}
