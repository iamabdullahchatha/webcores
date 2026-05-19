import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import {
  Search, LayoutDashboard, BookOpen, FilePlus, Image,
  Inbox, Mail, Users, Shield, Settings2, Home, LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

type LucideIcon = typeof Search;

type Command_ = {
  id: string;
  label: string;
  group: "Recent" | "Navigate" | "Actions";
  icon: LucideIcon;
  action: () => void;
  keywords?: string[];
};

type RecentEntry = { label: string; path: string };

const RECENT_KEY = "wc_cmd_recent";
const RECENT_MAX = 5;

function readRecent(): RecentEntry[] {
  try {
    return JSON.parse(sessionStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function pushRecent(entry: RecentEntry) {
  const list = readRecent().filter((r) => r.path !== entry.path);
  list.unshift(entry);
  sessionStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, RECENT_MAX)));
}

// Icon map for reconstructing recent entries
const PATH_META: Record<string, { icon: LucideIcon; label: string }> = {
  "/admin/":             { icon: LayoutDashboard, label: "Dashboard" },
  "/admin/blog/":        { icon: BookOpen,         label: "Blog Posts" },
  "/admin/blog/new":     { icon: FilePlus,         label: "New Blog Post" },
  "/admin/media":        { icon: Image,            label: "Media Library" },
  "/admin/contacts":     { icon: Inbox,            label: "Contact Inbox" },
  "/admin/newsletter":   { icon: Mail,             label: "Newsletter" },
  "/admin/team":         { icon: Users,            label: "Team Members" },
  "/admin/security":     { icon: Shield,           label: "Security Logs" },
  "/admin/settings":     { icon: Settings2,        label: "Site Settings" },
  "/admin/pages/seo":    { icon: Search,           label: "SEO Settings" },
  "/admin/pages/home":   { icon: Home,             label: "Edit Home Page" },
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [recent, setRecent] = useState<RecentEntry[]>([]);

  // Refresh recent list whenever the palette opens
  useEffect(() => {
    if (open) setRecent(readRecent());
  }, [open]);

  // Keyboard toggle — also handled by AdminLayout for the ⌘K header button,
  // but we own the Escape close here via cmdk's built-in behavior.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const go = useCallback(
    (path: string, label: string, icon: LucideIcon) => {
      pushRecent({ label, path });
      navigate({ to: path as Parameters<typeof navigate>[0]["to"] });
      onOpenChange(false);
    },
    [navigate, onOpenChange],
  );

  const navCommands: Omit<Command_, "group">[] = [
    { id: "dash",     label: "Dashboard",       icon: LayoutDashboard, action: () => go("/admin/",           "Dashboard",       LayoutDashboard) },
    { id: "blog",     label: "Blog Posts",       icon: BookOpen,        action: () => go("/admin/blog/",      "Blog Posts",      BookOpen) },
    { id: "newpost",  label: "New Blog Post",    icon: FilePlus,        action: () => go("/admin/blog/new",   "New Blog Post",   FilePlus),  keywords: ["write", "create", "article"] },
    { id: "media",    label: "Media Library",    icon: Image,           action: () => go("/admin/media",      "Media Library",   Image),     keywords: ["images", "files", "upload"] },
    { id: "contacts", label: "Contact Inbox",    icon: Inbox,           action: () => go("/admin/contacts",   "Contact Inbox",   Inbox),     keywords: ["messages", "enquiries", "submissions"] },
    { id: "news",     label: "Newsletter",       icon: Mail,            action: () => go("/admin/newsletter", "Newsletter",      Mail),      keywords: ["subscribers", "email list"] },
    { id: "team",     label: "Team Members",     icon: Users,           action: () => go("/admin/team",       "Team Members",    Users),     keywords: ["users", "invite", "roles"] },
    { id: "security", label: "Security Logs",    icon: Shield,          action: () => go("/admin/security",   "Security Logs",   Shield),    keywords: ["logins", "audit", "history"] },
    { id: "settings", label: "Site Settings",    icon: Settings2,       action: () => go("/admin/settings",   "Site Settings",   Settings2), keywords: ["config", "preferences"] },
    { id: "seo",      label: "SEO Settings",     icon: Search,          action: () => go("/admin/pages/seo",  "SEO Settings",    Search),    keywords: ["meta", "robots", "og"] },
    { id: "home-ed",  label: "Edit Home Page",   icon: Home,            action: () => go("/admin/pages/home", "Edit Home Page",  Home),      keywords: ["homepage", "hero", "landing"] },
  ];

  const actionCommands: Command_[] = [
    {
      id: "signout",
      label: "Sign Out",
      group: "Actions",
      icon: LogOut,
      action: async () => {
        onOpenChange(false);
        await signOut();
        navigate({ to: "/admin/login" });
      },
      keywords: ["logout", "exit"],
    },
  ];

  const recentCommands: Command_[] = recent.map((r) => {
    const meta = PATH_META[r.path] ?? { icon: LayoutDashboard, label: r.label };
    return {
      id: `recent-${r.path}`,
      label: r.label,
      group: "Recent" as const,
      icon: meta.icon,
      action: () => go(r.path, r.label, meta.icon),
    };
  });

  const allCommands: Command_[] = [
    ...recentCommands,
    ...navCommands.map((c) => ({ ...c, group: "Navigate" as const })),
    ...actionCommands,
  ];

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      <div className="fixed left-1/2 top-[20%] z-50 -translate-x-1/2 w-full max-w-lg px-4">
        <Command
          className="glass rounded-2xl border border-border/40 shadow-2xl overflow-hidden"
          loop
          onKeyDown={(e) => {
            if (e.key === "Escape") onOpenChange(false);
          }}
        >
          {/* Search input row */}
          <div className="flex items-center border-b border-border/40 px-4">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground mr-3" />
            <Command.Input
              placeholder="Search commands…"
              className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground text-foreground"
              autoFocus
            />
            <kbd className="text-xs text-muted-foreground bg-muted/30 rounded px-1.5 py-0.5">ESC</kbd>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
              No commands found.
            </Command.Empty>

            {(["Recent", "Navigate", "Actions"] as const).map((group) => {
              const items = allCommands.filter((c) => c.group === group);
              if (!items.length) return null;
              return (
                <Command.Group
                  key={group}
                  heading={group}
                  className="*:[[cmdk-group-heading]]:text-xs *:[[cmdk-group-heading]]:text-muted-foreground *:[[cmdk-group-heading]]:px-2 *:[[cmdk-group-heading]]:py-1.5 *:[[cmdk-group-heading]]:font-semibold *:[[cmdk-group-heading]]:uppercase *:[[cmdk-group-heading]]:tracking-wider"
                >
                  {items.map((cmd) => (
                    <Command.Item
                      key={cmd.id}
                      value={`${cmd.label} ${cmd.keywords?.join(" ") ?? ""}`}
                      onSelect={() => cmd.action()}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm text-foreground data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground transition-colors duration-100"
                    >
                      <cmd.icon className="h-4 w-4 shrink-0 opacity-70" />
                      {cmd.label}
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            })}
          </Command.List>
        </Command>
      </div>
    </>
  );
}
