import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Pencil, CheckCircle2, XCircle, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { FormField, inputClass } from "@/components/admin/ui/FormField";

export const Route = createFileRoute("/admin/pages/services")({
  component: ServicesListPage,
});

type ServiceRow = Database["public"]["Tables"]["services"]["Row"];

const ICON_OPTIONS = ["Lightbulb", "Layers", "Globe", "Database", "Search", "Palette", "Code2", "Shield"];
const COLOR_OPTIONS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#ec4899", "#f59e0b", "#f43f5e", "#3b82f6"];

function NewServiceDialog({ onCreated }: { onCreated: (row: ServiceRow) => void }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    tag: "",
    metric: "",
    icon_name: "Globe",
    color: "#6366f1",
    href: "",
    cta_text: "Learn more",
    sort_order: 99,
  });

  function patch(k: keyof typeof form, v: string | number) {
    setForm((p) => ({ ...p, [k]: v }));
    // Auto-derive slug from title if slug not touched
    if (k === "title" && typeof v === "string") {
      setForm((p) => ({
        ...p,
        title: v,
        slug: p.slug === autoSlug(p.title) ? autoSlug(v) : p.slug,
        href: p.href === `/services/${autoSlug(p.title)}` ? `/services/${autoSlug(v)}` : p.href,
      }));
    }
  }

  function autoSlug(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function create() {
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    const { data, error } = await supabase
      .from("services")
      .insert({
        title: form.title,
        slug: form.slug,
        description: form.description || null,
        tag: form.tag || null,
        metric: form.metric || null,
        icon_name: form.icon_name,
        color: form.color,
        href: form.href || `/services/${form.slug}`,
        cta_text: form.cta_text,
        sort_order: Number(form.sort_order),
        is_active: false,
      } as unknown as ServiceRow)
      .select()
      .single();
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Service created — add sections in the editor");
    setOpen(false);
    onCreated(data as unknown as ServiceRow);
    navigate({ to: "/admin/pages/services/$id", params: { id: (data as unknown as ServiceRow).id } });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl gradient-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow-elegant hover:opacity-90 transition-all duration-200"
      >
        <Plus className="h-3.5 w-3.5" /> New service
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass rounded-2xl border border-border/50 w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
          <h3 className="font-display text-base font-semibold">New Service</h3>
          <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Title" htmlFor="ns-title">
              <input
                id="ns-title"
                className={inputClass}
                placeholder="e.g. IT Consultation"
                value={form.title}
                onChange={(e) => patch("title", e.target.value)}
              />
            </FormField>
            <FormField label="Slug" htmlFor="ns-slug" hint="URL: /services/{slug}">
              <input
                id="ns-slug"
                className={inputClass}
                placeholder="it-consultation"
                value={form.slug}
                onChange={(e) => patch("slug", e.target.value)}
              />
            </FormField>
          </div>
          <FormField label="Description" htmlFor="ns-desc">
            <input id="ns-desc" className={inputClass} placeholder="Short description" value={form.description} onChange={(e) => patch("description", e.target.value)} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tag" htmlFor="ns-tag">
              <input id="ns-tag" className={inputClass} placeholder="e.g. Strategy" value={form.tag} onChange={(e) => patch("tag", e.target.value)} />
            </FormField>
            <FormField label="Metric" htmlFor="ns-metric">
              <input id="ns-metric" className={inputClass} placeholder="e.g. 120+ audits" value={form.metric} onChange={(e) => patch("metric", e.target.value)} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Icon" htmlFor="ns-icon">
              <select id="ns-icon" className={`${inputClass} bg-transparent`} value={form.icon_name} onChange={(e) => patch("icon_name", e.target.value)}>
                {ICON_OPTIONS.map((i) => <option key={i} value={i} className="bg-background">{i}</option>)}
              </select>
            </FormField>
            <FormField label="Accent colour" htmlFor="ns-color">
              <div className="flex items-center gap-2">
                <input type="color" id="ns-color" value={form.color} onChange={(e) => patch("color", e.target.value)} className="h-9 w-9 rounded-lg cursor-pointer border border-border/40 bg-transparent p-0.5" />
                <div className="flex gap-1 flex-wrap">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => patch("color", c)}
                      className="w-5 h-5 rounded-full border-2 transition-all duration-150"
                      style={{ background: c, borderColor: form.color === c ? "white" : "transparent" }}
                    />
                  ))}
                </div>
              </div>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="CTA text" htmlFor="ns-cta">
              <input id="ns-cta" className={inputClass} placeholder="Learn more" value={form.cta_text} onChange={(e) => patch("cta_text", e.target.value)} />
            </FormField>
            <FormField label="Sort order" htmlFor="ns-sort">
              <input id="ns-sort" type="number" min={1} className={inputClass} value={form.sort_order} onChange={(e) => patch("sort_order", Number(e.target.value))} />
            </FormField>
          </div>
          <p className="text-xs text-muted-foreground">Service will be created as <strong>inactive</strong>. Activate it after adding sections.</p>
        </div>
        <div className="px-6 py-4 border-t border-border/40 flex justify-end gap-3">
          <button type="button" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">Cancel</button>
          <button
            type="button"
            onClick={create}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 disabled:opacity-60"
          >
            {saving ? "Creating…" : "Create & edit"}
          </button>
        </div>
      </div>
    </div>
  );
}

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
      <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">Service Pages</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Edit the content of each service detail page. Changes are live immediately.
          </p>
        </div>
        <NewServiceDialog onCreated={(row) => setRows((p) => [...p, row])} />
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
