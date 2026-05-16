import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { UAParser } from "ua-parser-js";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthContext";
import type { Database } from "@/lib/supabase/types";

export const Route = createFileRoute("/admin/security")({
  component: SecurityPage,
});

type LoginRow = Database["public"]["Tables"]["login_history"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

const PAGE_SIZE = 25;

function parseUA(ua: string | null): string {
  if (!ua) return "—";
  const p = new UAParser(ua);
  const browser = p.getBrowser().name ?? "Unknown";
  const os = p.getOS().name ?? "Unknown";
  return `${browser} · ${os}`;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function SummaryCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold text-foreground font-display">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function SecurityPage() {
  const { profile: me, session } = useAuth();
  const isOwner = me?.role === "owner";
  const myId = session?.user.id ?? "";

  const [users, setUsers] = useState<ProfileRow[]>([]);
  const [filterUser, setFilterUser] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"all" | "success" | "failed">("all");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  const [rows, setRows] = useState<LoginRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({ today: 0, failed: 0, activeUsers: 0 });

  // Load user list for filter (owner only)
  useEffect(() => {
    if (!isOwner) return;
    supabase.from("profiles").select("id, full_name, email").order("full_name").then(({ data }) => {
      setUsers((data ?? []) as unknown as ProfileRow[]);
    });
  }, [isOwner]);

  // Load summary stats (owner only)
  useEffect(() => {
    if (!isOwner) return;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const iso = todayStart.toISOString();

    Promise.all([
      supabase.from("login_history").select("*", { count: "exact", head: true }).gte("logged_in_at", iso),
      supabase.from("login_history").select("*", { count: "exact", head: true }).gte("logged_in_at", iso).eq("success", false),
      supabase.from("login_history").select("user_id", { count: "exact", head: true }).gte("logged_in_at", new Date(Date.now() - 30 * 86400000).toISOString()).eq("success", true),
    ]).then(([t, f, a]) => {
      setSummary({ today: t.count ?? 0, failed: f.count ?? 0, activeUsers: a.count ?? 0 });
    });
  }, [isOwner]);

  const loadRows = useCallback(async () => {
    setLoading(true);
    let q = supabase
      .from("login_history")
      .select("*", { count: "exact" })
      .order("logged_in_at", { ascending: false })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    // Non-owners see only their own records
    if (!isOwner) {
      q = q.eq("user_id", myId);
    } else if (filterUser) {
      q = q.eq("user_id", filterUser);
    }

    if (filterStatus === "success") q = q.eq("success", true);
    if (filterStatus === "failed") q = q.eq("success", false);
    if (filterFrom) q = q.gte("logged_in_at", new Date(filterFrom).toISOString());
    if (filterTo) {
      const to = new Date(filterTo);
      to.setHours(23, 59, 59, 999);
      q = q.lte("logged_in_at", to.toISOString());
    }

    const { data, count } = await q;
    setRows((data ?? []) as LoginRow[]);
    setTotal(count ?? 0);
    setLoading(false);
  }, [isOwner, myId, filterUser, filterStatus, filterFrom, filterTo, page]);

  useEffect(() => { void loadRows(); }, [loadRows]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Summary (owner only) */}
      {isOwner && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard label="Logins today" value={summary.today} />
          <SummaryCard label="Failed attempts today" value={summary.failed} sub="May indicate a brute-force attempt if high" />
          <SummaryCard label="Active users (30 days)" value={summary.activeUsers} />
        </div>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/40 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <h3 className="font-display text-base font-semibold">Login History</h3>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-4 border-b border-border/30 flex flex-wrap gap-3 items-end">
          {isOwner && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-muted-foreground">User</label>
              <select
                value={filterUser}
                onChange={(e) => { setFilterUser(e.target.value); setPage(0); }}
                className="glass rounded-xl px-3 py-2 text-sm bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none min-w-[180px]"
              >
                <option value="" className="bg-background">All users</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id} className="bg-background">{u.full_name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value as typeof filterStatus); setPage(0); }}
              className="glass rounded-xl px-3 py-2 text-sm bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none"
            >
              <option value="all" className="bg-background">All</option>
              <option value="success" className="bg-background">Successful</option>
              <option value="failed" className="bg-background">Failed</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">From</label>
            <input
              type="date"
              value={filterFrom}
              onChange={(e) => { setFilterFrom(e.target.value); setPage(0); }}
              className="glass rounded-xl px-3 py-2 text-sm bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">To</label>
            <input
              type="date"
              value={filterTo}
              onChange={(e) => { setFilterTo(e.target.value); setPage(0); }}
              className="glass rounded-xl px-3 py-2 text-sm bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none"
            />
          </div>

          {(filterUser || filterStatus !== "all" || filterFrom || filterTo) && (
            <button
              type="button"
              onClick={() => { setFilterUser(""); setFilterStatus("all"); setFilterFrom(""); setFilterTo(""); setPage(0); }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-4 underline underline-offset-2"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 text-left">
                {isOwner && <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">User</th>}
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Date & Time</th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">IP Address</th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Browser / OS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={isOwner ? 5 : 4} className="px-6 py-8 text-center text-muted-foreground">Loading…</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={isOwner ? 5 : 4} className="px-6 py-8 text-center text-muted-foreground">No records found.</td></tr>
              ) : rows.map((row) => {
                const userLabel = isOwner
                  ? (users.find((u) => u.id === row.user_id)?.full_name ?? row.email ?? row.user_id?.slice(0, 8) ?? "—")
                  : null;
                return (
                  <tr key={row.id} className="border-b border-border/20 hover:bg-primary/3 transition-colors duration-150">
                    {isOwner && (
                      <td className="px-6 py-3 text-sm text-foreground font-medium">{userLabel}</td>
                    )}
                    <td className="px-6 py-3 text-muted-foreground whitespace-nowrap">{fmt(row.logged_in_at)}</td>
                    <td className="px-6 py-3">
                      {row.success ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-destructive">
                          <XCircle className="h-3.5 w-3.5" /> Failed
                          {row.failure_reason && (
                            <span className="text-muted-foreground font-normal">· {row.failure_reason}</span>
                          )}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground font-mono text-xs">{row.ip_address ?? "—"}</td>
                    <td className="px-6 py-3 text-muted-foreground text-xs">{parseUA(row.user_agent)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-border/30 flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="p-1.5 rounded-lg glass border border-border/40 hover:border-border/70 disabled:opacity-40 transition-colors duration-150"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs text-muted-foreground px-1">{page + 1} / {totalPages}</span>
              <button
                type="button"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="p-1.5 rounded-lg glass border border-border/40 hover:border-border/70 disabled:opacity-40 transition-colors duration-150"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
