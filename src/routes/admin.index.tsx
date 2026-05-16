// FILE: src/routes/admin.index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, CheckCircle2, Users, Clock, ArrowRight, Shield, XCircle, Eye, Activity } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useAuth } from "@/lib/auth/AuthContext";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

type LoginRow = Database["public"]["Tables"]["login_history"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type BlogRow = Database["public"]["Tables"]["blog_posts"]["Row"];
type PageViewRow = Database["public"]["Tables"]["page_views"]["Row"];

type ActivityItem =
  | { kind: "login"; id: string; at: string; success: boolean; userName: string; ip: string | null }
  | { kind: "post"; id: string; at: string; title: string; status: string; userName: string };

type HourlyPoint = { hour: string; views: number };
type DailyPoint  = { day: string;  views: number };

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Dashboard() {
  const { session, profile } = useAuth();
  const userId = session?.user.id;
  const isOwner = profile?.role === "owner";
  const canViewAnalytics = isOwner || profile?.role === "admin";

  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    teamMembers: 0,
    lastLogin: null as string | null,
  });
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [visitorData, setVisitorData] = useState<{
    hourly: HourlyPoint[];
    daily: DailyPoint[];
    todayViews: number;
    activeSessions: number;
  }>({ hourly: [], daily: [], todayViews: 0, activeSessions: 0 });

  useEffect(() => {
    if (!userId) return;
    let active = true;

    (async () => {
      const [postsTotal, postsPublished, team] = await Promise.all([
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_active", true),
      ]);

      const loginQuery = isOwner
        ? supabase.from("login_history").select("*").order("logged_in_at", { ascending: false }).limit(8)
        : supabase.from("login_history").select("*").eq("user_id", userId).order("logged_in_at", { ascending: false }).limit(8);

      const postQuery = isOwner
        ? supabase.from("blog_posts").select("id, title, status, updated_at, author_id").order("updated_at", { ascending: false }).limit(5)
        : supabase.from("blog_posts").select("id, title, status, updated_at, author_id").eq("author_id", userId).order("updated_at", { ascending: false }).limit(5);

      const [recentLogins, recentPosts] = await Promise.all([loginQuery, postQuery]);

      let profileMap: Record<string, string> = {};
      if (isOwner) {
        const loginIds = [...new Set((recentLogins.data ?? []).map((r) => (r as LoginRow).user_id).filter(Boolean))] as string[];
        const postIds = [...new Set((recentPosts.data ?? []).map((r) => (r as Pick<BlogRow, "author_id">).author_id).filter(Boolean))] as string[];
        const allIds = [...new Set([...loginIds, ...postIds])];
        if (allIds.length) {
          const { data: profiles } = await supabase.from("profiles").select("id, full_name").in("id", allIds);
          profileMap = Object.fromEntries((profiles ?? []).map((p: Pick<ProfileRow, "id" | "full_name">) => [p.id, p.full_name]));
        }
      } else {
        profileMap[userId] = profile?.full_name ?? "You";
      }

      if (!active) return;

      const loginRows = (recentLogins.data ?? []) as LoginRow[];
      const postRows = (recentPosts.data ?? []) as BlogRow[];

      const lastLogin = loginRows.length > 1 ? loginRows[1].logged_in_at : loginRows[0]?.logged_in_at ?? null;

      const loginItems: ActivityItem[] = loginRows.map((r) => ({
        kind: "login",
        id: r.id,
        at: r.logged_in_at,
        success: r.success,
        userName: profileMap[r.user_id ?? ""] ?? r.email ?? "—",
        ip: r.ip_address ?? null,
      }));

      const postItems: ActivityItem[] = postRows.map((r) => ({
        kind: "post",
        id: r.id,
        at: r.updated_at,
        title: r.title,
        status: r.status,
        userName: profileMap[r.author_id ?? ""] ?? "—",
      }));

      const merged = [...loginItems, ...postItems]
        .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
        .slice(0, 12);

      setStats({
        totalPosts: postsTotal.count ?? 0,
        publishedPosts: postsPublished.count ?? 0,
        teamMembers: team.count ?? 0,
        lastLogin,
      });
      setActivity(merged);
      setLoading(false);
    })();

    return () => { active = false; };
  }, [userId, isOwner, profile]);

  useEffect(() => {
    if (!canViewAnalytics) return;
    let active = true;

    (async () => {
      const now = new Date();
      const h24ago = new Date(now.getTime() - 24 * 3600 * 1000).toISOString();
      const d7ago = new Date(now.getTime() - 7 * 86400 * 1000).toISOString();
      const m30ago = new Date(now.getTime() - 30 * 60 * 1000).toISOString();
      const todayStart = new Date(now);
      todayStart.setHours(0, 0, 0, 0);

      const [res24h, res7d] = await Promise.all([
        supabase.from("page_views").select("viewed_at, session_id").gte("viewed_at", h24ago),
        supabase.from("page_views").select("viewed_at").gte("viewed_at", d7ago),
      ]);

      if (!active) return;

      const rows24 = (res24h.data ?? []) as Pick<PageViewRow, "viewed_at" | "session_id">[];
      const rows7d = (res7d.data ?? []) as Pick<PageViewRow, "viewed_at">[];

      // Build 24-slot hourly buckets (oldest → newest)
      const hourlyMap: Record<number, number> = {};
      for (let i = 23; i >= 0; i--) {
        const slotHour = new Date(now.getTime() - i * 3600 * 1000).getHours();
        hourlyMap[slotHour] = 0;
      }
      for (const r of rows24) {
        const h = new Date(r.viewed_at).getHours();
        if (h in hourlyMap) hourlyMap[h] = (hourlyMap[h] ?? 0) + 1;
      }
      const hourly: HourlyPoint[] = Object.entries(hourlyMap).map(([h, views]) => ({
        hour: `${String(h).padStart(2, "0")}:00`,
        views,
      }));

      // Build 7-slot daily buckets (oldest → newest)
      const dailyPoints: DailyPoint[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 86400 * 1000);
        const key = d.toLocaleDateString(undefined, { weekday: "short" });
        const dayStart = new Date(d); dayStart.setHours(0, 0, 0, 0);
        const dayEnd   = new Date(d); dayEnd.setHours(23, 59, 59, 999);
        const views = rows7d.filter((r) => {
          const t = new Date(r.viewed_at).getTime();
          return t >= dayStart.getTime() && t <= dayEnd.getTime();
        }).length;
        dailyPoints.push({ day: key, views });
      }

      const todayViews = rows24.filter((r) => new Date(r.viewed_at) >= todayStart).length;
      const activeSessions = new Set(
        rows24.filter((r) => r.viewed_at >= m30ago).map((r) => r.session_id)
      ).size;

      setVisitorData({ hourly, daily: dailyPoints, todayViews, activeSessions });
    })();

    return () => { active = false; };
  }, [canViewAnalytics]);

  const cards = [
    { label: "Blog Posts",       value: stats.totalPosts,     icon: FileText,    to: "/admin/blog" as const },
    { label: "Published Posts",  value: stats.publishedPosts, icon: CheckCircle2, to: "/admin/blog" as const },
    {
      label: "Team Members",
      value: stats.teamMembers,
      icon: Users,
      to: "/admin/team" as const,
      sub: "Manage team →",
    },
    {
      label: "Last Login",
      value: stats.lastLogin ? formatDateTime(stats.lastLogin) : "—",
      icon: Clock,
      small: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          {greeting()},{" "}
          <span className="gradient-text">{profile?.full_name ?? "there"}</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's what's happening across your site.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {c.label}
                </span>
                <c.icon className="h-4 w-4 text-primary/60" />
              </div>
              <div className={`mt-3 font-display font-bold text-foreground ${"small" in c && c.small ? "text-sm" : "text-3xl"}`}>
                {loading ? "…" : c.value}
              </div>
              {"sub" in c && c.sub && (
                <p className="mt-1.5 text-xs text-primary font-semibold flex items-center gap-1">
                  {c.sub} <ArrowRight className="h-3 w-3" />
                </p>
              )}
            </>
          );
          return "to" in c && c.to ? (
            <Link key={c.label} to={c.to} className="glass rounded-2xl p-5 hover:bg-primary/5 transition-colors duration-200">
              {inner}
            </Link>
          ) : (
            <div key={c.label} className="glass rounded-2xl p-5">{inner}</div>
          );
        })}
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-lg font-semibold text-foreground">Recent Activity</h3>
          <Link to="/admin/security" className="text-xs text-primary font-semibold hover:underline underline-offset-2">
            Full history →
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5 mb-5">
          {isOwner ? "Latest logins and content updates across all users." : "Your last sign-ins and content updates."}
        </p>

        <div className="space-y-1">
          {loading ? (
            <p className="text-sm text-muted-foreground py-4 text-center">Loading…</p>
          ) : activity.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No activity yet.</p>
          ) : (
            activity.map((item) => (
              <div key={`${item.kind}-${item.id}`} className="flex items-start gap-3 py-2.5 border-b border-border/20 last:border-0">
                <div className="mt-0.5 shrink-0">
                  {item.kind === "login" ? (
                    item.success
                      ? <Shield className="h-4 w-4 text-emerald-500" />
                      : <XCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <FileText className="h-4 w-4 text-primary/70" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  {item.kind === "login" ? (
                    <p className="text-sm text-foreground">
                      {isOwner && <span className="font-medium">{item.userName} · </span>}
                      {item.success ? "Signed in" : "Failed sign-in"}
                      {item.ip && <span className="text-muted-foreground text-xs ml-1.5">{item.ip}</span>}
                    </p>
                  ) : (
                    <p className="text-sm text-foreground truncate">
                      {isOwner && <span className="font-medium">{item.userName} · </span>}
                      <span className="text-muted-foreground">
                        {item.status === "published" ? "Published" : "Updated draft"}{" "}
                      </span>
                      &ldquo;{item.title}&rdquo;
                    </p>
                  )}
                </div>
                <time className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                  {formatDateTime(item.at)}
                </time>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3 font-semibold shadow-elegant text-sm hover:opacity-90 transition-all duration-200"
          >
            New Blog Post
          </Link>
          <Link
            to="/admin/pages/services"
            className="inline-flex items-center gap-2 rounded-2xl glass border border-border/40 px-7 py-3 font-semibold text-sm hover:bg-primary/5 transition-all duration-200"
          >
            Manage Services
          </Link>
          {isOwner && (
            <Link
              to="/admin/team"
              className="inline-flex items-center gap-2 rounded-2xl glass border border-border/40 px-7 py-3 font-semibold text-sm hover:bg-primary/5 transition-all duration-200"
            >
              Team Members
            </Link>
          )}
        </div>
      </div>

      {canViewAnalytics && (
        <div className="glass rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">Visitor Activity</h3>
            <Link to="/admin/security" className="text-xs text-primary font-semibold hover:underline underline-offset-2">
              Full analytics →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Today's Views</span>
                <Eye className="h-4 w-4 text-primary/60" />
              </div>
              <p className="text-3xl font-display font-bold text-foreground">{visitorData.todayViews}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active (30m)</span>
                <Activity className="h-4 w-4 text-primary/60" />
              </div>
              <p className="text-3xl font-display font-bold text-foreground">{visitorData.activeSessions}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Last 24 hours</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={visitorData.hourly} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} interval={5} />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                  cursor={{ fill: "var(--primary)", fillOpacity: 0.08 }}
                />
                <Bar dataKey="views" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Last 7 days</p>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={visitorData.daily} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--primary)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                  cursor={{ stroke: "var(--primary)", strokeOpacity: 0.3 }}
                />
                <Area dataKey="views" stroke="var(--primary)" strokeWidth={2} fill="url(#visitorGrad)" dot={false} activeDot={{ r: 4, fill: "var(--primary)" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
