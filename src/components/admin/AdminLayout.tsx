import { useState, useEffect, useCallback, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Menu, X, LogOut, Search, Image, Inbox, Mail,
  BookOpen, Home, Briefcase, Users, Shield, Settings2,
  ChevronLeft, ChevronRight, FilePlus,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { CommandPalette } from "@/components/admin/CommandPalette";
import { NotificationBell } from "@/components/admin/NotificationBell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import logo from "@/assets/logo.png";
import logomark from "@/assets/logo.png"; // collapsed: same asset, shown small

type NavEntry = {
  label: string;
  to: string;
  icon: React.ElementType;
  badge?: boolean;
};

type NavGroup = {
  label: string;
  items: NavEntry[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", to: "/admin/", icon: LayoutDashboard },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Blog Posts",     to: "/admin/blog/",      icon: BookOpen },
      { label: "New Post",       to: "/admin/blog/new",   icon: FilePlus },
      { label: "Media Library",  to: "/admin/media",      icon: Image },
      { label: "Contact Inbox",  to: "/admin/contacts",   icon: Inbox,  badge: true },
      { label: "Newsletter",     to: "/admin/newsletter", icon: Mail },
    ],
  },
  {
    label: "Pages",
    items: [
      { label: "Home Page",     to: "/admin/pages/home",     icon: Home },
      { label: "SEO Settings",  to: "/admin/pages/seo",      icon: Search },
      { label: "Services",      to: "/admin/pages/services", icon: Briefcase },
    ],
  },
  {
    label: "Admin",
    items: [
      { label: "Team",      to: "/admin/team",     icon: Users },
      { label: "Security",  to: "/admin/security", icon: Shield },
      { label: "Settings",  to: "/admin/settings", icon: Settings2 },
    ],
  },
];

// Flat list for currentTitle resolution
const ALL_NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

const ROLE_LABEL: Record<string, string> = {
  owner: "Owner",
  admin: "Admin",
  editor: "Editor",
};

function isNavActive(to: string, pathname: string): boolean {
  if (to === "/admin/") return pathname === "/admin" || pathname === "/admin/";
  if (to === "/admin/blog/") return pathname === "/admin/blog" || pathname === "/admin/blog/";
  return pathname === to || pathname.startsWith(to + "/");
}

// ── Nav item with optional tooltip when collapsed ────────────────────────────
function NavItem({
  entry,
  collapsed,
  unreadCount,
  onClick,
  pathname,
}: {
  entry: NavEntry;
  collapsed: boolean;
  unreadCount: number;
  onClick: () => void;
  pathname: string;
}) {
  const active = isNavActive(entry.to, pathname);
  const showBadge = entry.badge && unreadCount > 0;

  const inner = (
    <Link
      to={entry.to as Parameters<typeof Link>[0]["to"]}
      onClick={onClick}
      className={[
        "flex items-center rounded-xl text-sm font-medium transition-colors duration-150",
        collapsed ? "justify-center px-0 py-2.5 w-10 h-10 mx-auto" : "gap-3 px-3 py-2.5",
        active
          ? "gradient-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-primary/5",
      ].join(" ")}
    >
      <entry.icon className="h-4 w-4 shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1">{entry.label}</span>
          {showBadge && (
            <span className="ml-auto text-[10px] font-bold bg-destructive text-destructive-foreground rounded-full px-1.5 py-0.5 min-w-4.5 text-center leading-tight">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </>
      )}
      {collapsed && showBadge && (
        <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-destructive" />
      )}
    </Link>
  );

  if (!collapsed) return <div className="relative">{inner}</div>;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative">{inner}</div>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {entry.label}
        {showBadge && ` (${unreadCount})`}
      </TooltipContent>
    </Tooltip>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const pathname = useLocation({ select: (l) => l.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem("webcore-sidebar-collapsed") === "true",
  );

  const sidebarWidth = isCollapsed ? "w-16" : "w-60";

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((v) => {
      const next = !v;
      localStorage.setItem("webcore-sidebar-collapsed", String(next));
      return next;
    });
  }, []);

  // [ key toggles sidebar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "[" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        toggleSidebar();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggleSidebar]);

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["contacts-unread-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "new")
        .eq("honeypot_triggered", false);
      return count ?? 0;
    },
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  const currentTitle = (() => {
    for (const item of ALL_NAV_ITEMS) {
      if (isNavActive(item.to, pathname)) return item.label;
    }
    if (pathname.startsWith("/admin/blog/new")) return "New Post";
    if (pathname.startsWith("/admin/blog/")) return "Edit Post";
    if (pathname.startsWith("/admin/blog")) return "Blog Posts";
    if (pathname.startsWith("/admin/pages/home")) return "Homepage Editor";
    if (pathname.startsWith("/admin/pages/services/")) return "Edit Service Page";
    if (pathname.startsWith("/admin/pages/seo")) return "SEO Settings";
    if (pathname.startsWith("/admin/pages/services")) return "Service Pages";
    if (pathname.startsWith("/admin/contacts")) return "Contact Submissions";
    if (pathname.startsWith("/admin/newsletter")) return "Newsletter Subscribers";
    if (pathname.startsWith("/admin/media")) return "Media Library";
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

  // ── Sidebar body (shared between desktop + mobile) ──────────────────────────
  function SidebarBody({ collapsed, onNav }: { collapsed: boolean; onNav: () => void }) {
    return (
      <TooltipProvider delayDuration={150}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className={`flex items-center py-5 ${collapsed ? "justify-center px-2" : "px-5"}`}>
            {collapsed ? (
              <img src={logomark} alt="W" width={32} height={32} className="h-7 w-7 object-contain" decoding="async" />
            ) : (
              <img src={logo} alt="Webcore Solutions" width={1180} height={319} className="h-7 w-auto" decoding="async" />
            )}
          </div>

          {/* Navigation groups */}
          <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-4" aria-label="Admin navigation">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                {!collapsed && (
                  <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                    {group.label}
                  </p>
                )}
                <div className="space-y-0.5">
                  {group.items.map((entry) => (
                    <NavItem
                      key={entry.to}
                      entry={entry}
                      collapsed={collapsed}
                      unreadCount={unreadCount}
                      onClick={onNav}
                      pathname={pathname}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Collapse toggle */}
          <div className={`px-2 py-2 border-t border-border/30 ${collapsed ? "flex justify-center" : ""}`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={toggleSidebar}
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                  className="flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors duration-150"
                >
                  {collapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                {collapsed ? "Expand sidebar  [" : "Collapse sidebar  ["}
              </TooltipContent>
            </Tooltip>
          </div>

          {/* User card */}
          <div className={`border-t border-border/30 ${collapsed ? "flex justify-center px-2 py-3" : "px-3 py-3"}`}>
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="focus:outline-none"
                    aria-label="Sign out"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-bold">
                        {profile?.full_name?.[0]?.toUpperCase() ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  <p className="font-semibold">{profile?.full_name ?? "—"}</p>
                  <p className="text-primary-foreground/70 capitalize">{profile?.role}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="gradient-primary text-primary-foreground text-sm font-bold">
                    {profile?.full_name?.[0]?.toUpperCase() ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{profile?.full_name ?? "—"}</p>
                  <p className="text-xs text-muted-foreground capitalize">{profile?.role}</p>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  title="Sign out"
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors duration-150"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:block fixed left-0 top-0 bottom-0 bg-card border-r border-border/60 z-30 transition-all duration-200 ease-in-out overflow-hidden ${sidebarWidth}`}
      >
        <SidebarBody collapsed={isCollapsed} onNav={() => {}} />
      </aside>

      {/* Mobile sidebar — always full width (w-60), never collapsed */}
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
              <SidebarBody collapsed={false} onNav={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Top bar — offset matches sidebar width */}
      <header
        className={`fixed top-0 right-0 h-16 bg-background/80 backdrop-blur border-b border-border/40 z-30 transition-all duration-200 ease-in-out ${isCollapsed ? "md:left-16" : "md:left-60"} left-0`}
      >
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

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl glass border border-border/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-border/70 transition-colors duration-200"
            >
              <Search className="h-3.5 w-3.5" />
              Quick nav
              <kbd className="bg-muted/40 rounded px-1 py-0.5 text-[10px]">⌘K</kbd>
            </button>
            <NotificationBell />
            {profile && (
              <span className="rounded-full bg-primary/10 text-primary text-xs font-bold px-3 py-1">
                {ROLE_LABEL[profile.role] ?? profile.role}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main content — offset matches sidebar */}
      <main
        className={`mt-16 p-6 md:p-8 transition-all duration-200 ease-in-out ${isCollapsed ? "md:ml-16" : "md:ml-60"}`}
      >
        {children}
      </main>
    </div>
  );
}
