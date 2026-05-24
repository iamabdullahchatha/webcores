import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { Mail, Phone, User, Inbox } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useRequireRole } from "@/lib/auth/useRequireRole";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Database } from "@/lib/supabase/types";

export const Route = createFileRoute("/admin/contacts")({
  component: ContactsPage,
});

type ContactSubmission = Database["public"]["Tables"]["contact_submissions"]["Row"];
type StatusValue = ContactSubmission["status"];
type StatusFilter = "all" | StatusValue;

const STATUS_LABELS: Record<StatusValue, string> = {
  new: "New",
  in_progress: "In Progress",
  resolved: "Resolved",
};

const STATUS_CLASSES: Record<StatusValue, string> = {
  new: "bg-red-500/15 text-red-400",
  in_progress: "bg-amber-500/15 text-amber-400",
  resolved: "bg-emerald-500/15 text-emerald-400",
};

const inputClass =
  "glass rounded-xl px-3 py-2 text-sm bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-foreground placeholder:text-muted-foreground/50";

const selectClass =
  "glass rounded-lg px-2 py-1 text-xs bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none text-foreground";

function StatusPill({ status }: { status: StatusValue }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_CLASSES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function ContactsPage() {
  useRequireRole(["owner", "admin", "editor"]);
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  const { data: rows = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .eq("honeypot_triggered", false)
        .order("submitted_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ContactSubmission[];
    },
    staleTime: 60_000,
  });

  const unreadCount = rows.filter((r) => r.status === "new").length;

  const filtered = rows.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
    }
    return true;
  });

  async function updateStatus(id: string, status: StatusValue) {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status } as unknown as ContactSubmission)
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    await qc.invalidateQueries({ queryKey: ["contact-submissions"] });
    await qc.invalidateQueries({ queryKey: ["contacts-unread-count"] });
    // Keep selected panel in sync
    if (selected?.id === id) setSelected((prev) => (prev ? { ...prev, status } : prev));
    toast.success("Status updated");
  }

  const STATUS_TABS: { label: string; value: StatusFilter }[] = [
    { label: "All", value: "all" },
    { label: "New", value: "new" },
    { label: "In Progress", value: "in_progress" },
    { label: "Resolved", value: "resolved" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Contact Submissions
              </h2>
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              {rows.length} submission{rows.length !== 1 ? "s" : ""} total
            </p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <input
          type="search"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} sm:w-64`}
        />
        <div className="flex items-center gap-1 p-1 glass rounded-xl border border-border/40">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatusFilter(tab.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                statusFilter === tab.value
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
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28 hidden md:block" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-8 w-14 rounded-lg ml-auto" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Inbox className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-muted-foreground text-sm">
              {search || statusFilter !== "all"
                ? "No submissions match your filters."
                : "No contact submissions yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40">
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3 hidden lg:table-cell">Service</th>
                  <th className="px-6 py-3 hidden xl:table-cell">Subject</th>
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
                    <td className="px-6 py-3 text-muted-foreground whitespace-nowrap text-xs">
                      {format(new Date(r.submitted_at), "MMM d, HH:mm")}
                    </td>
                    <td className="px-6 py-3 font-medium text-foreground whitespace-nowrap">
                      {r.name}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">
                      <a
                        href={`mailto:${r.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {r.email}
                      </a>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground hidden lg:table-cell">
                      {r.service ?? <span className="text-muted-foreground/40">—</span>}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground hidden xl:table-cell max-w-50">
                      <span className="truncate block">
                        {r.subject ? (
                          r.subject.length > 60 ? (
                            r.subject.slice(0, 60) + "…"
                          ) : (
                            r.subject
                          )
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value as StatusValue)}
                        className={selectClass}
                      >
                        <option value="new" className="bg-background">
                          New
                        </option>
                        <option value="in_progress" className="bg-background">
                          In Progress
                        </option>
                        <option value="resolved" className="bg-background">
                          Resolved
                        </option>
                      </select>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelected(r)}
                        className="inline-flex items-center gap-1.5 rounded-lg glass border border-border/40 px-3 py-1.5 text-xs font-semibold hover:bg-primary/10 hover:border-primary/30 transition-colors duration-150"
                      >
                        View Contact Submission
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail slide-over */}
      <Sheet open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-background border-border overflow-y-auto">
          {selected && (
            <div className="space-y-6 pt-2">
              <SheetHeader>
                <SheetTitle className="font-display text-lg">Submission Detail</SheetTitle>
              </SheetHeader>

              {/* Contact card */}
              <div className="glass rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-primary/60 shrink-0" />
                  <span className="font-semibold text-foreground">{selected.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary/60 shrink-0" />
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-primary hover:underline underline-offset-2"
                  >
                    {selected.email}
                  </a>
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary/60 shrink-0" />
                    <span className="text-muted-foreground">{selected.phone}</span>
                  </div>
                )}
              </div>

              {/* Metadata fields */}
              <div className="space-y-3">
                {selected.service && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      Service
                    </p>
                    <p className="text-sm text-foreground">{selected.service}</p>
                  </div>
                )}
                {selected.subject && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      Subject
                    </p>
                    <p className="text-sm text-foreground">{selected.subject}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Message
                  </p>
                  <pre className="whitespace-pre-wrap bg-muted/20 rounded-xl p-4 text-sm text-foreground font-sans leading-relaxed">
                    {selected.message}
                  </pre>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Submitted
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selected.submitted_at), "d MMM yyyy, HH:mm")}
                  </p>
                </div>
                {selected.ip_address && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      IP Address
                    </p>
                    <p className="text-xs font-mono text-muted-foreground/70">
                      {selected.ip_address}
                    </p>
                  </div>
                )}
              </div>

              {/* Status selector */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <StatusPill status={selected.status} />
                  <select
                    value={selected.status}
                    onChange={(e) => updateStatus(selected.id, e.target.value as StatusValue)}
                    className={`${selectClass} ml-1`}
                  >
                    <option value="new" className="bg-background">
                      New
                    </option>
                    <option value="in_progress" className="bg-background">
                      In Progress
                    </option>
                    <option value="resolved" className="bg-background">
                      Resolved
                    </option>
                  </select>
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-border/40">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject ?? "Your enquiry")}`}
                  className="inline-flex items-center gap-2 rounded-xl gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-elegant hover:opacity-90 transition-all duration-200"
                >
                  <Mail className="h-4 w-4" /> Reply by Email
                </a>
                {selected.status !== "resolved" && (
                  <button
                    type="button"
                    onClick={async () => {
                      await updateStatus(selected.id, "resolved");
                      setSelected(null);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl glass border border-border/40 px-5 py-2.5 text-sm font-semibold hover:bg-primary/5 transition-all duration-200"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
