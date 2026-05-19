import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { Mail, Users, UserMinus, UserCheck } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useRequireRole } from "@/lib/auth/useRequireRole";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/lib/supabase/types";

export const Route = createFileRoute("/admin/newsletter")({
  component: NewsletterPage,
});

type Subscriber = Database["public"]["Tables"]["newsletter_subscribers"]["Row"];
type ActiveFilter = "all" | "active" | "unsubscribed";

const inputClass =
  "glass rounded-xl px-3 py-2 text-sm bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-foreground placeholder:text-muted-foreground/50";

function exportCsv(active: Subscriber[]) {
  const csv = [
    "email,source,subscribed_at",
    ...active.map((r) => `${r.email},${r.source ?? ""},${r.subscribed_at}`),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "subscribers.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function NewsletterPage() {
  useRequireRole(["owner", "admin", "editor"]);
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");

  const { data: rows = [], isLoading } = useQuery<Subscriber[]>({
    queryKey: ["newsletter-subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Subscriber[];
    },
    staleTime: 60_000,
  });

  const totalActive = rows.filter((r) => r.is_active).length;
  const totalUnsub = rows.length - totalActive;

  const filtered = rows.filter((r) => {
    if (activeFilter === "active" && !r.is_active) return false;
    if (activeFilter === "unsubscribed" && r.is_active) return false;
    if (search) return r.email.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  async function toggleActive(r: Subscriber) {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ is_active: !r.is_active } as unknown as Subscriber)
      .eq("id", r.id);
    if (error) { toast.error(error.message); return; }
    await qc.invalidateQueries({ queryKey: ["newsletter-subscribers"] });
    toast.success(r.is_active ? "Subscriber unsubscribed." : "Subscriber re-subscribed.");
  }

  const FILTER_TABS: { label: string; value: ActiveFilter }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Unsubscribed", value: "unsubscribed" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-foreground">Newsletter Subscribers</h2>
            {totalActive > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                {totalActive}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {rows.length} subscriber{rows.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          type="button"
          onClick={() => exportCsv(rows.filter((r) => r.is_active))}
          disabled={totalActive === 0}
          className="inline-flex items-center gap-2 rounded-xl glass border border-border/40 px-4 py-2 text-sm font-semibold hover:bg-primary/5 hover:border-border/70 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none shrink-0"
        >
          <Mail className="h-4 w-4" />
          Export Active (.csv)
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total</span>
            <Users className="h-4 w-4 text-primary/60" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">{isLoading ? "…" : rows.length}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active</span>
            <UserCheck className="h-4 w-4 text-emerald-500/70" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">{isLoading ? "…" : totalActive}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Unsubscribed</span>
            <UserMinus className="h-4 w-4 text-muted-foreground/60" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">{isLoading ? "…" : totalUnsub}</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <input
          type="search"
          placeholder="Search by email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} sm:w-64`}
        />
        <div className="flex items-center gap-1 p-1 glass rounded-xl border border-border/40">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveFilter(tab.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                activeFilter === tab.value
                  ? "gradient-primary text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="divide-y divide-border/20">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-24 rounded-lg ml-auto" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Mail className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-muted-foreground text-sm">
              {search || activeFilter !== "all"
                ? "No subscribers match your filters."
                : "No subscribers yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40">
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Source</th>
                  <th className="px-6 py-3 hidden md:table-cell">Subscribed</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-border/20 last:border-0 hover:bg-primary/5 transition-colors duration-150"
                  >
                    <td className="px-6 py-3 font-medium text-foreground">
                      <a href={`mailto:${r.email}`} className="hover:text-primary transition-colors">
                        {r.email}
                      </a>
                    </td>
                    <td className="px-6 py-3 hidden sm:table-cell">
                      {r.source ? (
                        <span className="inline-block rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-semibold">
                          {r.source}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3 hidden md:table-cell text-muted-foreground text-xs whitespace-nowrap">
                      {format(new Date(r.subscribed_at), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-3">
                      {r.is_active ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                          <span className="w-2 h-2 rounded-full bg-muted-foreground/40" /> Unsubscribed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-right">
                      {r.is_active ? (
                        <button
                          type="button"
                          onClick={() => toggleActive(r)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-destructive/10 text-destructive px-3 py-1.5 text-xs font-semibold hover:bg-destructive/20 transition-colors duration-150"
                        >
                          <UserMinus className="h-3 w-3" /> Unsubscribe
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleActive(r)}
                          className="inline-flex items-center gap-1.5 rounded-lg glass border border-border/40 px-3 py-1.5 text-xs font-semibold hover:bg-primary/10 hover:border-primary/30 transition-colors duration-150"
                        >
                          <UserCheck className="h-3 w-3" /> Re-subscribe
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
