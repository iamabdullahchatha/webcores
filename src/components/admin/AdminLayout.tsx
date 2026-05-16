import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Menu, X, LogOut, FileText, Plus, Layout, Settings, Users, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import logo from "@/assets/logo.png";

type NavChild = { label: string; to: string; icon: typeof FileText };
type NavItem =
  | { label: string; to: string; icon: typeof LayoutDashboard; children?: never; ownerOnly?: boolean }
  | { label: string; to?: never; icon: typeof LayoutDashboard; children: NavChild[]; ownerOnly?: boolean };

const NAV: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  {
    label: "Blog",
    icon: FileText,
    children: [
      { label: "All Posts", to: "/admin/blog", icon: FileText },
      { label: "New Post", to: "/admin/blog/new", icon: Plus },
    ],
  },
  {
    label: "Pages",
    icon: Layout,
    children: [
      { label: "Homepage", to: "/admin/pages/home", icon: Layout },
      { label: "Services", to: "/admin/pages/services", icon: Layout },
    ],
  },
  { label: "Team", to: "/admin/team", icon: Users },
  { label: "Security", to: "/admin/security", icon: Shield },
  { label: "Settings", to: "/admin/settings", icon: Settings },
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

  const currentTitle = (() => {
    for (const item of NAV) {
      if ("to" in item && item.to && item.to === pathname) return item.label;
      if (item.children) {
        const child = item.children.find((c) => c.to === pathname);
        if (child) return child.label;
      }
    }
    if (pathname.startsWith("/admin/blog/new")) return "New Post";
    if (pathname.startsWith("/admin/blog/")) return "Edit Post";
    if (pathname.startsWith("/admin/blog")) return "Blog Posts";
    if (pathname.startsWith("/admin/pages/home")) return "Homepage Editor";
    if (pathname.startsWith("/admin/pages/services/")) return "Edit Service Page";
    if (pathname.startsWith("/admin/pages/services")) return "Service Pages";
    if (pathname.startsWith("/admin/settings")) return "Site Settings";
    if (pathname.startsWith("/admin/team")) return "Team Members";
    if (pathname.startsWith("/admin/security")) return "Security";
    if (pathname.startsWith("/admin/accept-invite")) return "Accept Invitation";
    return "Admin";
  })();

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

      <nav className="flex-1 px-3 py-2 space-y-0.5" aria-label="Admin navigation">
        {NAV.map((item) => {
          if ("to" in item && item.to) {
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
          }

          // Parent with children
          const anyChildActive = item.children?.some((c) => pathname === c.to || pathname.startsWith(c.to + "/"));
          return (
            <div key={item.label}>
              <div
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  anyChildActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </div>
              <div className="ml-3 pl-4 border-l border-border/40 space-y-0.5">
                {item.children?.map((child) => {
                  const active = pathname === child.to || (child.to !== "/admin/blog" && pathname.startsWith(child.to));
                  return (
                    <Link
                      key={child.to}
                      to={child.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                        active
                          ? "gradient-primary text-primary-foreground shadow-elegant font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                      }`}
                    >
                      <child.icon className="h-3.5 w-3.5 shrink-0" />
                      {child.label}
                    </Link>
                  );
                })}
              </div>
            </div>
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
