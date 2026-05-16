import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, CheckCircle2, Users, Clock, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

type LoginRow = Database["public"]["Tables"]["login_history"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

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

  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    teamMembers: 0,
    lastLogin: null as string | null,
  });
  const [activity, setActivity] = useState<(LoginRow & { userName?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    let active = true;

    (async () => {
      const [postsTotal, postsPublished, team] = await Promise.all([
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_active", true),
      ]);

      // Activity: owner sees all users, others see only themselves
      const activityQuery = isOwner
        ? supabase.from("login_history").select("*").order("logged_in_at", { ascending: false }).limit(10)
        : supabase.from("login_history").select("*").eq("user_id", userId).order("logged_in_at", { ascending: false }).limit(10);

      const recent = await activityQuery;

      // For owner view, also fetch profile names to display
      let profileMap: Record<string, string> = {};
      if (isOwner && recent.data?.length) {
        const userIds = [...new Set((recent.data as LoginRow[]).map((r) => r.user_id).filter(Boolean))] as string[];
        const { data: profiles } = await supabase.from("profiles").select("id, full_name").in("id", userIds);
        profileMap = Object.fromEntries((profiles ?? []).map((p: Pick<ProfileRow, "id" | "full_name">) => [p.id, p.full_name]));
      }

      if (!active) return;

      const rows = (recent.data ?? []) as LoginRow[];
      const lastLogin = rows.length > 1 ? rows[1].logged_in_at : rows[0]?.logged_in_at ?? null;

      setStats({
        totalPosts: postsTotal.count ?? 0,
        publishedPosts: postsPublished.count ?? 0,
        teamMembers: team.count ?? 0,
        lastLogin,
      });
      setActivity(rows.map((r) => ({ ...r, userName: profileMap[r.user_id ?? ""] })));
      setLoading(false);
    })();

    return () => { active = false; };
  }, [userId, isOwner]);

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
          {isOwner ? "Latest sign-in attempts across all users." : "Your last 10 sign-in attempts."}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40">
                {isOwner && <th className="pb-3 pr-4">User</th>}
                <th className="pb-3 pr-4">Date / Time</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={isOwner ? 4 : 3} className="py-6 text-center text-muted-foreground">Loading…</td></tr>
              ) : activity.length === 0 ? (
                <tr><td colSpan={isOwner ? 4 : 3} className="py-6 text-center text-muted-foreground">No activity yet.</td></tr>
              ) : (
                activity.map((row) => (
                  <tr key={row.id} className="border-b border-border/20 last:border-0">
                    {isOwner && (
                      <td className="py-3 pr-4 text-foreground font-medium text-xs">
                        {row.userName ?? row.email ?? "—"}
                      </td>
                    )}
                    <td className="py-3 pr-4 text-foreground">{formatDateTime(row.logged_in_at)}</td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center gap-2">
                        <span className={`inline-block w-2 h-2 rounded-full ${row.success ? "bg-emerald-500" : "bg-destructive"}`} />
                        <span className="text-muted-foreground">{row.success ? "Success" : "Failed"}</span>
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{row.ip_address ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
    </div>
  );
}
