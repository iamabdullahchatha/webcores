import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { SortableList, type SortableItem } from "@/components/admin/SortableList";
import { SectionShell } from "@/components/admin/ui/SectionShell";
import { FormField, inputClass } from "@/components/admin/ui/FormField";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";

export const Route = createFileRoute("/admin/pages/services/$id")({
  component: ServiceEditor,
});

type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type SectionRow = Database["public"]["Tables"]["service_page_content"]["Row"];

const SECTION_TYPES = [
  "hero", "overview", "features", "deliverables",
  "tech_stack", "process", "stats", "testimonials", "faqs", "cta",
] as const;

function ServiceEditor() {
  const { id } = Route.useParams();
  const qc = useQueryClient();

  const [service, setService] = useState<ServiceRow | null>(null);
  const [sections, setSections] = useState<(SectionRow & SortableItem)[]>([]);
  const [jsonText, setJsonText] = useState<Record<string, string>>({});
  const [jsonErr, setJsonErr] = useState<Record<string, string>>({});
  const [savingMeta, setSavingMeta] = useState(false);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [addType, setAddType] = useState<(typeof SECTION_TYPES)[number]>("hero");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: svc } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
      if (!svc) { setLoading(false); return; }
      const s = svc as unknown as ServiceRow;
      setService(s);

      const { data: secs } = await supabase
        .from("service_page_content")
        .select("*")
        .eq("service_slug", s.slug)
        .order("sort_order");

      const rows = (secs ?? []) as unknown as SectionRow[];
      setSections(rows.map((r) => ({ ...r })));
      const jt: Record<string, string> = {};
      for (const r of rows) jt[r.id] = JSON.stringify(r.data_json ?? {}, null, 2);
      setJsonText(jt);
      setLoading(false);
    })();
  }, [id]);

  function updateMeta(patch: Partial<ServiceRow>) {
    setService((p) => (p ? { ...p, ...patch } : p));
  }

  async function saveMeta() {
    if (!service) return;
    setSavingMeta(true);
    const { error } = await supabase
      .from("services")
      .update({
        title: service.title,
        slug: service.slug,
        tag: service.tag,
        metric: service.metric,
        image_url: service.image_url,
        cta_text: service.cta_text,
        is_active: service.is_active,
      } as unknown as ServiceRow)
      .eq("id", service.id);
    setSavingMeta(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Service details saved");
    qc.invalidateQueries({ queryKey: ["content", "services"] });
    qc.invalidateQueries({ queryKey: ["content", "service-page", service.slug] });
  }

  function updateSection(rowId: string, patch: Partial<SectionRow>) {
    setSections((prev) => prev.map((r) => (r.id === rowId ? { ...r, ...patch } : r)));
  }

  async function saveOrder(newRows: typeof sections) {
    setSections(newRows);
    await Promise.all(
      newRows.map((r, i) =>
        supabase.from("service_page_content").update({ sort_order: i + 1 } as unknown as SectionRow).eq("id", r.id),
      ),
    );
    if (service) qc.invalidateQueries({ queryKey: ["content", "service-page", service.slug] });
  }

  async function saveSection(rowId: string) {
    const row = sections.find((r) => r.id === rowId);
    if (!row) return;

    let parsed: unknown = {};
    const raw = jsonText[rowId] ?? "{}";
    try {
      parsed = JSON.parse(raw);
      setJsonErr((p) => ({ ...p, [rowId]: "" }));
    } catch (e) {
      setJsonErr((p) => ({ ...p, [rowId]: e instanceof Error ? e.message : "Invalid JSON" }));
      toast.error("Fix the JSON before saving this section");
      return;
    }

    setSavingSection(rowId);
    const { error } = await supabase
      .from("service_page_content")
      .update({
        heading: row.heading,
        subheading: row.subheading,
        body: row.body,
        data_json: parsed as Database["public"]["Tables"]["service_page_content"]["Row"]["data_json"],
        is_visible: row.is_visible,
      } as unknown as SectionRow)
      .eq("id", rowId);
    setSavingSection(null);
    if (error) { toast.error(error.message); return; }
    toast.success("Section saved");
    if (service) qc.invalidateQueries({ queryKey: ["content", "service-page", service.slug] });
  }

  async function addSection() {
    if (!service) return;
    const { data, error } = await supabase
      .from("service_page_content")
      .insert({
        service_slug: service.slug,
        section_type: addType,
        heading: "New section",
        sort_order: sections.length + 1,
      } as unknown as SectionRow)
      .select()
      .single();
    if (error) { toast.error(error.message); return; }
    const r = data as unknown as SectionRow;
    setSections((p) => [...p, { ...r }]);
    setJsonText((p) => ({ ...p, [r.id]: JSON.stringify(r.data_json ?? {}, null, 2) }));
    if (service) qc.invalidateQueries({ queryKey: ["content", "service-page", service.slug] });
  }

  async function deleteSection(rowId: string) {
    setDeleting(rowId);
    await supabase.from("service_page_content").delete().eq("id", rowId);
    setDeleting(null);
    setConfirmId(null);
    setSections((p) => p.filter((r) => r.id !== rowId));
    if (service) qc.invalidateQueries({ queryKey: ["content", "service-page", service.slug] });
  }

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">Service not found.</p>
        <Link to="/admin/pages/services" className="mt-4 inline-flex items-center gap-2 text-primary font-semibold text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to services
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/admin/pages/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-150">
        <ArrowLeft className="h-4 w-4" /> All services
      </Link>

      {/* ─── Service meta ─── */}
      <SectionShell heading={`${service.title} — Page Settings`} onSave={saveMeta} saving={savingMeta}>
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Title" htmlFor="svc-title">
            <input id="svc-title" className={inputClass} value={service.title ?? ""} onChange={(e) => updateMeta({ title: e.target.value })} />
          </FormField>
          <FormField label="Slug" htmlFor="svc-slug" hint="Changing this changes the public URL.">
            <input id="svc-slug" className={inputClass} value={service.slug ?? ""} onChange={(e) => updateMeta({ slug: e.target.value })} />
          </FormField>
          <FormField label="Tag" htmlFor="svc-tag">
            <input id="svc-tag" className={inputClass} value={service.tag ?? ""} onChange={(e) => updateMeta({ tag: e.target.value })} />
          </FormField>
          <FormField label="Metric" htmlFor="svc-metric">
            <input id="svc-metric" className={inputClass} value={service.metric ?? ""} onChange={(e) => updateMeta({ metric: e.target.value })} />
          </FormField>
          <FormField label="Image slug" htmlFor="svc-image" hint="e.g. it-consulting (maps to a bundled asset).">
            <input id="svc-image" className={inputClass} value={service.image_url ?? ""} onChange={(e) => updateMeta({ image_url: e.target.value })} />
          </FormField>
          <FormField label="CTA text" htmlFor="svc-cta">
            <input id="svc-cta" className={inputClass} value={service.cta_text ?? ""} onChange={(e) => updateMeta({ cta_text: e.target.value })} />
          </FormField>
        </div>
        <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer select-none">
          <input type="checkbox" checked={service.is_active} onChange={(e) => updateMeta({ is_active: e.target.checked })} className="h-4 w-4 rounded accent-primary" />
          Active (visible on the public site)
        </label>
      </SectionShell>

      {/* ─── Sections ─── */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">Sections</h3>
            <p className="text-xs text-muted-foreground mt-1">Drag to reorder. Edit the JSON of each section and save individually.</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={addType}
              onChange={(e) => setAddType(e.target.value as (typeof SECTION_TYPES)[number])}
              className="glass rounded-xl px-3 py-2 text-sm bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none"
            >
              {SECTION_TYPES.map((t) => (
                <option key={t} value={t} className="bg-background">{t}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={addSection}
              className="inline-flex items-center gap-1.5 rounded-xl gradient-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-elegant hover:opacity-90 transition-all duration-200"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
        </div>

        <div className="p-6">
          <SortableList
            items={sections}
            onReorder={saveOrder}
            renderItem={(row, dragHandle) => (
              <div className="glass rounded-xl border border-border/40 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30 bg-primary/3">
                  {dragHandle}
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{row.section_type}</span>
                  <span className="text-xs text-muted-foreground truncate flex-1">{row.heading}</span>
                  <button
                    type="button"
                    onClick={() => updateSection(row.id, { is_visible: !row.is_visible })}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    aria-label={row.is_visible ? "Hide section" : "Show section"}
                    title={row.is_visible ? "Visible" : "Hidden"}
                  >
                    {row.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 opacity-50" />}
                  </button>
                  <ConfirmDialog
                    open={confirmId === row.id}
                    onOpenChange={(o) => setConfirmId(o ? row.id : null)}
                    title="Delete section"
                    description="This permanently removes the section from this service page."
                    loading={deleting === row.id}
                    onConfirm={() => deleteSection(row.id)}
                    trigger={
                      <button
                        type="button"
                        disabled={deleting === row.id}
                        className="text-muted-foreground/50 hover:text-destructive transition-colors duration-150 disabled:opacity-40"
                        aria-label="Delete section"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    }
                  />
                </div>

                <div className="p-4 space-y-4">
                  <div className="grid md:grid-cols-3 gap-3">
                    <FormField label="Heading" htmlFor={`h-${row.id}`}>
                      <input id={`h-${row.id}`} className={inputClass} value={row.heading ?? ""} onChange={(e) => updateSection(row.id, { heading: e.target.value })} />
                    </FormField>
                    <FormField label="Subheading / label" htmlFor={`sh-${row.id}`}>
                      <input id={`sh-${row.id}`} className={inputClass} value={row.subheading ?? ""} onChange={(e) => updateSection(row.id, { subheading: e.target.value })} />
                    </FormField>
                    <FormField label="Body" htmlFor={`b-${row.id}`}>
                      <input id={`b-${row.id}`} className={inputClass} value={row.body ?? ""} onChange={(e) => updateSection(row.id, { body: e.target.value })} />
                    </FormField>
                  </div>

                  <FormField label="data_json" htmlFor={`j-${row.id}`} error={jsonErr[row.id]} hint="Raw JSON for this section's structured content.">
                    <textarea
                      id={`j-${row.id}`}
                      spellCheck={false}
                      value={jsonText[row.id] ?? "{}"}
                      onChange={(e) => setJsonText((p) => ({ ...p, [row.id]: e.target.value }))}
                      className="w-full glass rounded-xl px-4 py-3 text-xs font-mono leading-relaxed bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-foreground min-h-[220px]"
                    />
                  </FormField>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => saveSection(row.id)}
                      disabled={savingSection === row.id}
                      className="inline-flex items-center gap-2 rounded-xl gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 disabled:opacity-60"
                    >
                      {savingSection === row.id ? "Saving…" : "Save section"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
