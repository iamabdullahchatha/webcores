import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, CheckCircle2, Users, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

type LoginRow = Database["public"]["Tables"]["login_history"]["Row"];

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

  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    teamMembers: 0,
    lastLogin: null as string | null,
  });
  const [activity, setActivity] = useState<LoginRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    let active = true;

    (async () => {
      const [postsTotal, postsPublished, team, recent] = await Promise.all([
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase
          .from("blog_posts")
          .select("*", { count: "exact", head: true })
          .eq("status", "published"),
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true),
        supabase
          .from("login_history")
          .select("*")
          .eq("user_id", userId)
          .order("logged_in_at", { ascending: false })
          .limit(10),
      ]);

      if (!active) return;

      const rows = (recent.data ?? []) as LoginRow[];
      // Most recent successful login excluding the current session's row
      // is "last login"; fall back to latest of any kind.
      const lastLogin = rows.length > 1 ? rows[1].logged_in_at : rows[0]?.logged_in_at ?? null;

      setStats({
        totalPosts: postsTotal.count ?? 0,
        publishedPosts: postsPublished.count ?? 0,
        teamMembers: team.count ?? 0,
        lastLogin,
      });
      setActivity(rows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [userId]);

  const cards = [
    { label: "Blog Posts", value: stats.totalPosts, icon: FileText },
    { label: "Published Posts", value: stats.publishedPosts, icon: CheckCircle2 },
    { label: "Team Members", value: stats.teamMembers, icon: Users },
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
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {c.label}
              </span>
              <c.icon className="h-4 w-4 text-primary/60" />
            </div>
            <div
              className={`mt-3 font-display font-bold text-foreground ${
                c.small ? "text-sm" : "text-3xl"
              }`}
            >
              {loading ? "…" : c.value}
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Recent Activity
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Your last 10 sign-in attempts.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40">
                <th className="pb-3 pr-4">Date / Time</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : activity.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-muted-foreground">
                    No activity yet.
                  </td>
                </tr>
              ) : (
                activity.map((row) => (
                  <tr key={row.id} className="border-b border-border/20 last:border-0">
                    <td className="py-3 pr-4 text-foreground">
                      {formatDateTime(row.logged_in_at)}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            row.success ? "bg-emerald-500" : "bg-destructive"
                          }`}
                        />
                        <span className="text-muted-foreground">
                          {row.success ? "Success" : "Failed"}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {row.ip_address ?? "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-3">
          Quick Actions
        </h3>
        <button
          type="button"
          disabled
          title="Available in a later phase"
          className="inline-flex items-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3 font-semibold shadow-elegant text-sm opacity-50 pointer-events-none"
        >
          New Blog Post
        </button>
      </div>
    </div>
  );
}
