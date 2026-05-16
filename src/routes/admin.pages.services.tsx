import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Pencil, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export const Route = createFileRoute("/admin/pages/services")({
  component: ServicesListPage,
});

type ServiceRow = Database["public"]["Tables"]["services"]["Row"];

function ServicesListPage() {
  const [rows, setRows] = useState<ServiceRow[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: services } = await supabase
        .from("services")
        .select("*")
        .order("sort_order");

      const { data: sections } = await supabase
        .from("service_page_content")
        .select("service_slug");

      const c: Record<string, number> = {};
      for (const s of (sections ?? []) as { service_slug: string }[]) {
        c[s.service_slug] = (c[s.service_slug] ?? 0) + 1;
      }
      setCounts(c);
      setRows((services ?? []) as unknown as ServiceRow[]);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border/40">
        <h3 className="font-display text-base font-semibold text-foreground">Service Pages</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Edit the content of each service detail page. Changes are live immediately.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 text-left">
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Service</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Sections</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Edit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id} className="border-b border-border/20 hover:bg-primary/3 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">{s.title}</div>
                  <div className="text-xs text-muted-foreground">/services/{s.slug}</div>
                </td>
                <td className="px-6 py-4">
                  {s.is_active ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <XCircle className="h-3.5 w-3.5" /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-muted-foreground">{counts[s.slug] ?? 0}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to="/admin/pages/services/$id"
                    params={{ id: s.id }}
                    className="inline-flex items-center gap-1.5 rounded-xl gradient-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow-elegant hover:opacity-90 transition-all duration-200"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
