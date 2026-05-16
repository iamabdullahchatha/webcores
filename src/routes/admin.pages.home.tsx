import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { useBeforeUnload } from "@/hooks/useBeforeUnload";
import * as Tabs from "@radix-ui/react-tabs";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Star } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { pageSeo } from "@/lib/seo";
import { SortableList, type SortableItem } from "@/components/admin/SortableList";
import { SectionShell } from "@/components/admin/ui/SectionShell";
import { FormField, inputClass } from "@/components/admin/ui/FormField";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import { ImageUpload } from "@/components/admin/ImageUpload";

export const Route = createFileRoute("/admin/pages/home")({
  component: HomepageEditor,
});

/* ─── DB row types ───────────────────────────────────────────────────── */
type HeroRow     = Database["public"]["Tables"]["home_hero"]["Row"];
type StatRow     = Database["public"]["Tables"]["home_stats"]["Row"];
type ServiceRow  = Database["public"]["Tables"]["services"]["Row"];
type ValueRow    = Database["public"]["Tables"]["why_choose_us"]["Row"];
type ProcessRow  = Database["public"]["Tables"]["process_steps"]["Row"];
type PortfolioRow= Database["public"]["Tables"]["portfolio_items"]["Row"];
type TestRow     = Database["public"]["Tables"]["testimonials"]["Row"];
type FaqRow      = Database["public"]["Tables"]["faqs"]["Row"];
type LogoRow     = Database["public"]["Tables"]["trust_logos"]["Row"];
type RegionRow   = Database["public"]["Tables"]["global_regions"]["Row"];

/* ─── Helpers ────────────────────────────────────────────────────────── */
const TABS = [
  "Hero", "Stats", "Services", "Why Us", "Process",
  "Portfolio", "Testimonials", "FAQs", "Trust Logos", "Regions",
] as const;

const tabValue = (t: string) => t.toLowerCase().replace(/\s+/g, "-");

function tabCls(active: boolean) {
  return `px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
    active
      ? "gradient-primary text-primary-foreground shadow-elegant"
      : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
  }`;
}

function toSortable<T extends { id: string }>(rows: T[]): (T & SortableItem)[] {
  return rows.map((r) => ({ ...r }));
}

/* ─── Inline editable row wrapper ────────────────────────────────────── */
function RowShell({
  dragHandle,
  children,
  onDelete,
  deleting,
  deleteTitle = "Delete item",
  deleteDesc = "This cannot be undone.",
}: {
  dragHandle: React.ReactNode;
  children: React.ReactNode;
  onDelete?: () => void;
  deleting?: boolean;
  deleteTitle?: string;
  deleteDesc?: string;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <div className="glass rounded-2xl p-4 flex gap-3 items-start">
      <div className="pt-1 shrink-0">{dragHandle}</div>
      <div className="flex-1 min-w-0">{children}</div>
      {onDelete && (
        <>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="shrink-0 text-muted-foreground/40 hover:text-destructive transition-colors duration-150 mt-1"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <ConfirmDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title={deleteTitle}
            description={deleteDesc}
            onConfirm={onDelete}
            loading={deleting}
          />
        </>
      )}
    </div>
  );
}

/* ─── Stars selector ─────────────────────────────────────────────────── */
function StarSelector({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)} className="p-0.5">
          <Star
            className="h-5 w-5 transition-colors duration-100"
            style={{ fill: n <= value ? "#f59e0b" : "transparent", color: n <= value ? "#f59e0b" : "currentColor" }}
          />
        </button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB: HERO
══════════════════════════════════════════════════════════════════════ */
function HeroTab({ qc }: { qc: ReturnType<typeof useQueryClient> }) {
  const HERO_DEFAULTS = {
    badge_label: "", badge_flag: "",
    heading_line1: "", heading_line2: "",
    subtitle: "",
    cta_primary_text: "", cta_primary_href: "",
    cta_secondary_text: "", cta_secondary_href: "",
  };
  const SEO_DEFAULTS = { seo_title: "", seo_description: "", seo_keywords: "" };

  const [form, setForm] = useState(HERO_DEFAULTS);
  const savedForm = useRef(HERO_DEFAULTS);
  const [seoFields, setSeoFields] = useState(SEO_DEFAULTS);
  const savedSeo = useRef(SEO_DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const isDirty =
    JSON.stringify(form) !== JSON.stringify(savedForm.current) ||
    JSON.stringify(seoFields) !== JSON.stringify(savedSeo.current);
  useBeforeUnload(isDirty);

  useEffect(() => {
    (async () => {
      const [heroRes, seoRes] = await Promise.all([
        supabase.from("home_hero").select("*").eq("id", "main").single(),
        supabase.from("page_seo_overrides").select("*").eq("id", "home").maybeSingle(),
      ]);
      if (heroRes.data) {
        const loaded = heroRes.data as unknown as typeof HERO_DEFAULTS;
        setForm(loaded);
        savedForm.current = loaded;
      }
      if (seoRes.data) {
        const s = seoRes.data as unknown as { seo_title: string | null; seo_description: string | null; seo_keywords: string | null };
        const loaded: typeof SEO_DEFAULTS = {
          seo_title: s.seo_title ?? "",
          seo_description: s.seo_description ?? "",
          seo_keywords: s.seo_keywords ?? "",
        };
        setSeoFields(loaded);
        savedSeo.current = loaded;
      }
    })();
  }, []);

  async function save() {
    setSaving(true);
    const [heroRes, seoRes] = await Promise.all([
      supabase.from("home_hero").upsert({ id: "main", ...form } as unknown as HeroRow),
      supabase.from("page_seo_overrides").upsert({
        id: "home",
        seo_title: seoFields.seo_title || null,
        seo_description: seoFields.seo_description || null,
        seo_keywords: seoFields.seo_keywords || null,
      } as unknown as Database["public"]["Tables"]["page_seo_overrides"]["Insert"]),
    ]);
    setSaving(false);
    if (heroRes.error || seoRes.error) {
      toast.error(heroRes.error?.message ?? seoRes.error?.message ?? "Save failed");
      return;
    }
    savedForm.current = form;
    savedSeo.current = seoFields;
    setLastSaved(new Date());
    toast.success("Hero & SEO saved");
    void qc.invalidateQueries({ queryKey: ["content", "home-hero"] });
    void qc.invalidateQueries({ queryKey: ["content", "page-seo-overrides"] });
  }

  const f = (key: keyof typeof form) => (
    <input
      id={key}
      value={form[key]}
      onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
      className={inputClass}
    />
  );

  const homeSeo = pageSeo.home;
  const titleLen = seoFields.seo_title.length;
  const descLen = seoFields.seo_description.length;

  return (
    <SectionShell heading="Hero Section" onSave={save} saving={saving} lastSaved={lastSaved}>
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Badge label" htmlFor="badge_label">{f("badge_label")}</FormField>
        <FormField label="Badge flag / subtitle" htmlFor="badge_flag">{f("badge_flag")}</FormField>
        <FormField label="Heading line 1" htmlFor="heading_line1">{f("heading_line1")}</FormField>
        <FormField label="Heading line 2" htmlFor="heading_line2">{f("heading_line2")}</FormField>
      </div>
      <FormField label="Subtitle" htmlFor="subtitle">
        <textarea
          id="subtitle"
          rows={3}
          value={form.subtitle}
          onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
          className={inputClass}
        />
      </FormField>
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Primary CTA text" htmlFor="cta_primary_text">{f("cta_primary_text")}</FormField>
        <FormField label="Primary CTA href" htmlFor="cta_primary_href">{f("cta_primary_href")}</FormField>
        <FormField label="Secondary CTA text" htmlFor="cta_secondary_text">{f("cta_secondary_text")}</FormField>
        <FormField label="Secondary CTA href" htmlFor="cta_secondary_href">{f("cta_secondary_href")}</FormField>
      </div>

      <div className="border-t border-border/40 pt-5 mt-1">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">SEO Overrides</p>
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="SEO Title" htmlFor="seo_title" hint="Overrides title tag — ideal 50–60 chars">
            <input
              id="seo_title"
              value={seoFields.seo_title}
              onChange={(e) => setSeoFields((p) => ({ ...p, seo_title: e.target.value }))}
              placeholder={homeSeo.title}
              className={inputClass}
            />
            <p className={`text-xs mt-1 ${titleLen > 60 ? "text-destructive" : "text-muted-foreground"}`}>
              {titleLen}/60
            </p>
          </FormField>
          <FormField label="SEO Keywords" htmlFor="seo_keywords" hint="Comma-separated">
            <input
              id="seo_keywords"
              value={seoFields.seo_keywords}
              onChange={(e) => setSeoFields((p) => ({ ...p, seo_keywords: e.target.value }))}
              placeholder={homeSeo.keywords.join(", ")}
              className={inputClass}
            />
          </FormField>
        </div>
        <FormField label="SEO Description" htmlFor="seo_description" hint="Overrides meta description — ideal 120–160 chars">
          <textarea
            id="seo_description"
            rows={3}
            value={seoFields.seo_description}
            onChange={(e) => setSeoFields((p) => ({ ...p, seo_description: e.target.value }))}
            placeholder={homeSeo.description}
            className={inputClass}
          />
          <p className={`text-xs mt-1 ${descLen > 160 ? "text-destructive" : "text-muted-foreground"}`}>
            {descLen}/160
          </p>
        </FormField>
      </div>
    </SectionShell>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB: STATS
══════════════════════════════════════════════════════════════════════ */
function StatsTab({ qc }: { qc: ReturnType<typeof useQueryClient> }) {
  const [rows, setRows] = useState<(StatRow & SortableItem)[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("home_stats").select("*").order("sort_order").then(({ data }) => {
      if (data) setRows(toSortable(data as unknown as StatRow[]));
    });
  }, []);

  function update(id: string, patch: Partial<StatRow>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function saveOrder(newRows: typeof rows) {
    setRows(newRows);
    await Promise.all(
      newRows.map((r, i) => supabase.from("home_stats").update({ sort_order: i + 1 } as unknown as StatRow).eq("id", r.id))
    );
    qc.invalidateQueries({ queryKey: ["content", "home-stats"] });
  }

  async function saveAll() {
    setSaving(true);
    await Promise.all(
      rows.map((r) =>
        supabase.from("home_stats").upsert({ ...r, sort_order: rows.indexOf(r) + 1 } as unknown as StatRow)
      )
    );
    setSaving(false);
    toast.success("Stats saved");
    qc.invalidateQueries({ queryKey: ["content", "home-stats"] });
  }

  async function addStat() {
    const { data } = await supabase
      .from("home_stats")
      .insert({ value: "0", label: "New stat", sort_order: rows.length + 1 } as unknown as StatRow)
      .select()
      .single();
    if (data) setRows((p) => [...p, { ...(data as unknown as StatRow) }]);
  }

  async function deleteStat(id: string) {
    setDeleting(id);
    await supabase.from("home_stats").delete().eq("id", id);
    setDeleting(null);
    setRows((p) => p.filter((r) => r.id !== id));
    qc.invalidateQueries({ queryKey: ["content", "home-stats"] });
  }

  return (
    <SectionShell
      heading="Stats"
      onSave={saveAll}
      saving={saving}
      footer={
        <button type="button" onClick={addStat} className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:opacity-80 transition-opacity">
          <Plus className="h-4 w-4" /> Add stat
        </button>
      }
    >
      <SortableList
        items={rows}
        onReorder={saveOrder}
        renderItem={(row, dragHandle) => (
          <RowShell dragHandle={dragHandle} onDelete={() => deleteStat(row.id)} deleting={deleting === row.id} deleteTitle="Delete stat">
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Value</label>
                <input value={row.value} onChange={(e) => update(row.id, { value: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Label</label>
                <input value={row.label} onChange={(e) => update(row.id, { label: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Icon name</label>
                <input value={row.icon_name ?? ""} onChange={(e) => update(row.id, { icon_name: e.target.value })} placeholder="Award" className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Color</label>
                <input value={row.color ?? ""} onChange={(e) => update(row.id, { color: e.target.value })} placeholder="#f59e0b" className={inputClass + " mt-1"} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">BG</label>
                <input value={row.bg ?? ""} onChange={(e) => update(row.id, { bg: e.target.value })} placeholder="rgba(245,158,11,0.10)" className={inputClass + " mt-1"} />
              </div>
            </div>
          </RowShell>
        )}
      />
    </SectionShell>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB: SERVICES
══════════════════════════════════════════════════════════════════════ */
function ServicesTab({ qc }: { qc: ReturnType<typeof useQueryClient> }) {
  const [rows, setRows] = useState<(ServiceRow & SortableItem)[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("services").select("*").order("sort_order").then(({ data }) => {
      if (data) setRows(toSortable(data as unknown as ServiceRow[]));
    });
  }, []);

  function update(id: string, patch: Partial<ServiceRow>) {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function saveOrder(newRows: typeof rows) {
    setRows(newRows);
    await Promise.all(
      newRows.map((r, i) => supabase.from("services").update({ sort_order: i + 1 } as unknown as ServiceRow).eq("id", r.id))
    );
    qc.invalidateQueries({ queryKey: ["content", "services"] });
  }

  async function saveAll() {
    setSaving(true);
    await Promise.all(
      rows.map((r, i) =>
        supabase.from("services").update({
          title: r.title, description: r.description, tag: r.tag, metric: r.metric,
          cta_text: r.cta_text, is_active: r.is_active, sort_order: i + 1,
          icon_name: r.icon_name, color: r.color, bg: r.bg,
          image_url: r.image_url, image_alt: r.image_alt, href: r.href,
        } as unknown as ServiceRow).eq("id", r.id)
      )
    );
    setSaving(false);
    toast.success("Services saved");
    qc.invalidateQueries({ queryKey: ["content", "services"] });
  }

  return (
    <SectionShell heading="Services (homepage cards)" onSave={saveAll} saving={saving}>
      <SortableList
        items={rows}
        onReorder={saveOrder}
        renderItem={(row, dragHandle) => (
          <RowShell dragHandle={dragHandle}>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                <input value={row.title} onChange={(e) => update(row.id, { title: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tag</label>
                <input value={row.tag ?? ""} onChange={(e) => update(row.id, { tag: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Metric</label>
                <input value={row.metric ?? ""} onChange={(e) => update(row.id, { metric: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">CTA text</label>
                <input value={row.cta_text ?? ""} onChange={(e) => update(row.id, { cta_text: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Icon name</label>
                <input value={row.icon_name ?? ""} onChange={(e) => update(row.id, { icon_name: e.target.value })} placeholder="Lightbulb" className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Href</label>
                <input value={row.href ?? ""} onChange={(e) => update(row.id, { href: e.target.value })} placeholder="/services/web-development" className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Color</label>
                <input value={row.color ?? ""} onChange={(e) => update(row.id, { color: e.target.value })} placeholder="#6366f1" className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">BG</label>
                <input value={row.bg ?? ""} onChange={(e) => update(row.id, { bg: e.target.value })} placeholder="rgba(99,102,241,0.10)" className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Image alt</label>
                <input value={row.image_alt ?? ""} onChange={(e) => update(row.id, { image_alt: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                <textarea rows={2} value={row.description ?? ""} onChange={(e) => update(row.id, { description: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Card image</label>
                <ImageUpload
                  bucket="site-media"
                  currentUrl={row.image_url ?? undefined}
                  onUpload={(url) => update(row.id, { image_url: url })}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id={`svc-active-${row.id}`}
                  type="checkbox"
                  checked={row.is_active}
                  onChange={(e) => update(row.id, { is_active: e.target.checked })}
                  className="h-4 w-4 rounded accent-primary"
                />
                <label htmlFor={`svc-active-${row.id}`} className="text-xs text-muted-foreground">Active</label>
              </div>
            </div>
          </RowShell>
        )}
      />
    </SectionShell>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB: WHY US
══════════════════════════════════════════════════════════════════════ */
function WhyUsTab({ qc }: { qc: ReturnType<typeof useQueryClient> }) {
  const [rows, setRows] = useState<(ValueRow & SortableItem)[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("why_choose_us").select("*").order("sort_order").then(({ data }) => {
      if (data) setRows(toSortable(data as unknown as ValueRow[]));
    });
  }, []);

  function update(id: string, patch: Partial<ValueRow>) {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function saveOrder(newRows: typeof rows) {
    setRows(newRows);
    await Promise.all(
      newRows.map((r, i) => supabase.from("why_choose_us").update({ sort_order: i + 1 } as unknown as ValueRow).eq("id", r.id))
    );
    qc.invalidateQueries({ queryKey: ["content", "why-choose-us"] });
  }

  async function saveAll() {
    setSaving(true);
    await Promise.all(
      rows.map((r, i) =>
        supabase.from("why_choose_us").update({
          title: r.title, description: r.description, icon_name: r.icon_name,
          color: r.color, bg: r.bg, sort_order: i + 1,
        } as unknown as ValueRow).eq("id", r.id)
      )
    );
    setSaving(false);
    toast.success("Why Us saved");
    qc.invalidateQueries({ queryKey: ["content", "why-choose-us"] });
  }

  return (
    <SectionShell heading="Why Choose Us" onSave={saveAll} saving={saving}>
      <SortableList
        items={rows}
        onReorder={saveOrder}
        renderItem={(row, dragHandle) => (
          <RowShell dragHandle={dragHandle}>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                <input value={row.title} onChange={(e) => update(row.id, { title: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Icon name</label>
                <input value={row.icon_name ?? ""} onChange={(e) => update(row.id, { icon_name: e.target.value })} placeholder="Heart" className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Color</label>
                <input value={row.color ?? ""} onChange={(e) => update(row.id, { color: e.target.value })} placeholder="#6366f1" className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">BG</label>
                <input value={row.bg ?? ""} onChange={(e) => update(row.id, { bg: e.target.value })} placeholder="rgba(99,102,241,0.10)" className={inputClass + " mt-1"} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                <textarea rows={2} value={row.description ?? ""} onChange={(e) => update(row.id, { description: e.target.value })} className={inputClass + " mt-1"} />
              </div>
            </div>
          </RowShell>
        )}
      />
    </SectionShell>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB: PROCESS
══════════════════════════════════════════════════════════════════════ */
function ProcessTab({ qc }: { qc: ReturnType<typeof useQueryClient> }) {
  const [rows, setRows] = useState<(ProcessRow & SortableItem)[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("process_steps").select("*").order("sort_order").then(({ data }) => {
      if (data) setRows(toSortable(data as unknown as ProcessRow[]));
    });
  }, []);

  function update(id: string, patch: Partial<ProcessRow>) {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function saveOrder(newRows: typeof rows) {
    setRows(newRows);
    await Promise.all(
      newRows.map((r, i) => supabase.from("process_steps").update({ sort_order: i + 1 } as unknown as ProcessRow).eq("id", r.id))
    );
    qc.invalidateQueries({ queryKey: ["content", "process-steps"] });
  }

  async function saveAll() {
    setSaving(true);
    await Promise.all(
      rows.map((r, i) =>
        supabase.from("process_steps").update({ number: r.number, title: r.title, description: r.description, icon_name: r.icon_name, color: r.color, sort_order: i + 1 } as unknown as ProcessRow).eq("id", r.id)
      )
    );
    setSaving(false);
    toast.success("Process saved");
    qc.invalidateQueries({ queryKey: ["content", "process-steps"] });
  }

  return (
    <SectionShell heading="Process Steps" onSave={saveAll} saving={saving}>
      <SortableList
        items={rows}
        onReorder={saveOrder}
        renderItem={(row, dragHandle) => (
          <RowShell dragHandle={dragHandle}>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Number</label>
                <input value={row.number} onChange={(e) => update(row.id, { number: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                <input value={row.title} onChange={(e) => update(row.id, { title: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Icon name</label>
                <input value={row.icon_name ?? ""} onChange={(e) => update(row.id, { icon_name: e.target.value })} placeholder="Sparkles" className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Color</label>
                <input value={row.color ?? ""} onChange={(e) => update(row.id, { color: e.target.value })} placeholder="#ec4899" className={inputClass + " mt-1"} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                <textarea rows={2} value={row.description ?? ""} onChange={(e) => update(row.id, { description: e.target.value })} className={inputClass + " mt-1"} />
              </div>
            </div>
          </RowShell>
        )}
      />
    </SectionShell>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB: PORTFOLIO
══════════════════════════════════════════════════════════════════════ */
function PortfolioTab({ qc }: { qc: ReturnType<typeof useQueryClient> }) {
  const [rows, setRows] = useState<(PortfolioRow & SortableItem)[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("portfolio_items").select("*").order("sort_order").then(({ data }) => {
      if (data) setRows(toSortable(data as unknown as PortfolioRow[]));
    });
  }, []);

  function update(id: string, patch: Partial<PortfolioRow>) {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function saveOrder(newRows: typeof rows) {
    setRows(newRows);
    await Promise.all(
      newRows.map((r, i) => supabase.from("portfolio_items").update({ sort_order: i + 1 } as unknown as PortfolioRow).eq("id", r.id))
    );
    qc.invalidateQueries({ queryKey: ["content", "portfolio-items"] });
  }

  async function saveAll() {
    setSaving(true);
    await Promise.all(
      rows.map((r, i) =>
        supabase.from("portfolio_items").update({
          title: r.title, category: r.category, description: r.description,
          metric: r.metric, gradient_from: r.gradient_from, gradient_to: r.gradient_to,
          link_url: r.link_url, is_active: r.is_active, sort_order: i + 1,
        } as unknown as PortfolioRow).eq("id", r.id)
      )
    );
    setSaving(false);
    toast.success("Portfolio saved");
    qc.invalidateQueries({ queryKey: ["content", "portfolio-items"] });
  }

  async function addItem() {
    const { data } = await supabase
      .from("portfolio_items")
      .insert({ title: "New project", sort_order: rows.length + 1 } as unknown as PortfolioRow)
      .select().single();
    if (data) setRows((p) => [...p, { ...(data as unknown as PortfolioRow) }]);
  }

  async function deleteItem(id: string) {
    setDeleting(id);
    await supabase.from("portfolio_items").delete().eq("id", id);
    setDeleting(null);
    setRows((p) => p.filter((r) => r.id !== id));
    qc.invalidateQueries({ queryKey: ["content", "portfolio-items"] });
  }

  return (
    <SectionShell
      heading="Portfolio"
      onSave={saveAll}
      saving={saving}
      footer={
        <button type="button" onClick={addItem} className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:opacity-80 transition-opacity">
          <Plus className="h-4 w-4" /> Add item
        </button>
      }
    >
      <SortableList
        items={rows}
        onReorder={saveOrder}
        renderItem={(row, dragHandle) => (
          <RowShell dragHandle={dragHandle} onDelete={() => deleteItem(row.id)} deleting={deleting === row.id} deleteTitle="Delete portfolio item">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                <input value={row.title} onChange={(e) => update(row.id, { title: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                <input value={row.category ?? ""} onChange={(e) => update(row.id, { category: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Metric</label>
                <input value={row.metric ?? ""} onChange={(e) => update(row.id, { metric: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Link URL</label>
                <input value={row.link_url ?? ""} onChange={(e) => update(row.id, { link_url: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Gradient from</label>
                <input value={row.gradient_from ?? ""} onChange={(e) => update(row.id, { gradient_from: e.target.value })} placeholder="#1d4ed8" className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Gradient to</label>
                <input value={row.gradient_to ?? ""} onChange={(e) => update(row.id, { gradient_to: e.target.value })} placeholder="#0891b2" className={inputClass + " mt-1"} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                <textarea rows={2} value={row.description ?? ""} onChange={(e) => update(row.id, { description: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id={`port-active-${row.id}`}
                  type="checkbox"
                  checked={row.is_active}
                  onChange={(e) => update(row.id, { is_active: e.target.checked })}
                  className="h-4 w-4 rounded accent-primary"
                />
                <label htmlFor={`port-active-${row.id}`} className="text-xs text-muted-foreground">Active</label>
              </div>
            </div>
          </RowShell>
        )}
      />
    </SectionShell>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB: TESTIMONIALS
══════════════════════════════════════════════════════════════════════ */
function TestimonialsTab({ qc }: { qc: ReturnType<typeof useQueryClient> }) {
  const [rows, setRows] = useState<(TestRow & SortableItem)[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("testimonials").select("*").eq("page_scope", "home").order("sort_order").then(({ data }) => {
      if (data) setRows(toSortable(data as unknown as TestRow[]));
    });
  }, []);

  function update(id: string, patch: Partial<TestRow>) {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function saveOrder(newRows: typeof rows) {
    setRows(newRows);
    await Promise.all(
      newRows.map((r, i) => supabase.from("testimonials").update({ sort_order: i + 1 } as unknown as TestRow).eq("id", r.id))
    );
    qc.invalidateQueries({ queryKey: ["content", "testimonials", "home"] });
  }

  async function saveAll() {
    setSaving(true);
    await Promise.all(
      rows.map((r, i) =>
        supabase.from("testimonials").update({
          name: r.name, role: r.role, quote: r.quote, stars: r.stars,
          avatar_url: r.avatar_url, is_active: r.is_active, sort_order: i + 1,
        } as unknown as TestRow).eq("id", r.id)
      )
    );
    setSaving(false);
    toast.success("Testimonials saved");
    qc.invalidateQueries({ queryKey: ["content", "testimonials", "home"] });
  }

  async function addTestimonial() {
    const { data } = await supabase
      .from("testimonials")
      .insert({ name: "New client", quote: "…", stars: 5, page_scope: "home", sort_order: rows.length + 1 } as unknown as TestRow)
      .select().single();
    if (data) setRows((p) => [...p, { ...(data as unknown as TestRow) }]);
  }

  async function deleteTest(id: string) {
    setDeleting(id);
    await supabase.from("testimonials").delete().eq("id", id);
    setDeleting(null);
    setRows((p) => p.filter((r) => r.id !== id));
    qc.invalidateQueries({ queryKey: ["content", "testimonials", "home"] });
  }

  return (
    <SectionShell
      heading="Testimonials (homepage)"
      onSave={saveAll}
      saving={saving}
      footer={
        <button type="button" onClick={addTestimonial} className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:opacity-80 transition-opacity">
          <Plus className="h-4 w-4" /> Add testimonial
        </button>
      }
    >
      <SortableList
        items={rows}
        onReorder={saveOrder}
        renderItem={(row, dragHandle) => (
          <RowShell dragHandle={dragHandle} onDelete={() => deleteTest(row.id)} deleting={deleting === row.id} deleteTitle="Delete testimonial">
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                  <input value={row.name} onChange={(e) => update(row.id, { name: e.target.value })} className={inputClass + " mt-1"} />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Role / Company</label>
                  <input value={row.role ?? ""} onChange={(e) => update(row.id, { role: e.target.value })} className={inputClass + " mt-1"} />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Quote</label>
                <textarea rows={3} value={row.quote} onChange={(e) => update(row.id, { quote: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div className="flex items-center gap-6 flex-wrap">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Stars</label>
                  <StarSelector value={row.stars} onChange={(n) => update(row.id, { stars: n })} />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id={`test-active-${row.id}`}
                    type="checkbox"
                    checked={row.is_active}
                    onChange={(e) => update(row.id, { is_active: e.target.checked })}
                    className="h-4 w-4 rounded accent-primary"
                  />
                  <label htmlFor={`test-active-${row.id}`} className="text-xs text-muted-foreground">Active</label>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Avatar</label>
                <ImageUpload
                  bucket="site-media"
                  currentUrl={row.avatar_url ?? undefined}
                  onUpload={(url) => update(row.id, { avatar_url: url })}
                />
              </div>
            </div>
          </RowShell>
        )}
      />
    </SectionShell>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB: FAQS
══════════════════════════════════════════════════════════════════════ */
function FaqsTab({ qc }: { qc: ReturnType<typeof useQueryClient> }) {
  const [rows, setRows] = useState<(FaqRow & SortableItem)[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("faqs").select("*").eq("page_scope", "home").order("sort_order").then(({ data }) => {
      if (data) setRows(toSortable(data as unknown as FaqRow[]));
    });
  }, []);

  function update(id: string, patch: Partial<FaqRow>) {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function saveOrder(newRows: typeof rows) {
    setRows(newRows);
    await Promise.all(
      newRows.map((r, i) => supabase.from("faqs").update({ sort_order: i + 1 } as unknown as FaqRow).eq("id", r.id))
    );
    qc.invalidateQueries({ queryKey: ["content", "faqs", "home"] });
  }

  async function saveAll() {
    setSaving(true);
    await Promise.all(
      rows.map((r, i) =>
        supabase.from("faqs").update({ question: r.question, answer: r.answer, category: r.category, sort_order: i + 1 } as unknown as FaqRow).eq("id", r.id)
      )
    );
    setSaving(false);
    toast.success("FAQs saved");
    qc.invalidateQueries({ queryKey: ["content", "faqs", "home"] });
  }

  async function addFaq() {
    const { data } = await supabase
      .from("faqs")
      .insert({ question: "New question?", answer: "Answer here.", page_scope: "home", category: "General", sort_order: rows.length + 1 } as unknown as FaqRow)
      .select().single();
    if (data) setRows((p) => [...p, { ...(data as unknown as FaqRow) }]);
  }

  async function deleteFaq(id: string) {
    setDeleting(id);
    await supabase.from("faqs").delete().eq("id", id);
    setDeleting(null);
    setRows((p) => p.filter((r) => r.id !== id));
    qc.invalidateQueries({ queryKey: ["content", "faqs", "home"] });
  }

  return (
    <SectionShell
      heading="FAQs (homepage)"
      onSave={saveAll}
      saving={saving}
      footer={
        <button type="button" onClick={addFaq} className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:opacity-80 transition-opacity">
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      }
    >
      <SortableList
        items={rows}
        onReorder={saveOrder}
        renderItem={(row, dragHandle) => (
          <RowShell dragHandle={dragHandle} onDelete={() => deleteFaq(row.id)} deleting={deleting === row.id} deleteTitle="Delete FAQ">
            <div className="space-y-3">
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Question</label>
                  <input value={row.question} onChange={(e) => update(row.id, { question: e.target.value })} className={inputClass + " mt-1"} />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                  <input value={row.category ?? ""} onChange={(e) => update(row.id, { category: e.target.value })} placeholder="Process" className={inputClass + " mt-1"} />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Answer</label>
                <textarea rows={3} value={row.answer} onChange={(e) => update(row.id, { answer: e.target.value })} className={inputClass + " mt-1"} />
              </div>
            </div>
          </RowShell>
        )}
      />
    </SectionShell>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB: TRUST LOGOS
══════════════════════════════════════════════════════════════════════ */
function TrustLogosTab({ qc }: { qc: ReturnType<typeof useQueryClient> }) {
  const [rows, setRows] = useState<(LogoRow & SortableItem)[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("trust_logos").select("*").order("sort_order").then(({ data }) => {
      if (data) setRows(toSortable(data as unknown as LogoRow[]));
    });
  }, []);

  function update(id: string, patch: Partial<LogoRow>) {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function saveOrder(newRows: typeof rows) {
    setRows(newRows);
    await Promise.all(
      newRows.map((r, i) => supabase.from("trust_logos").update({ sort_order: i + 1 } as unknown as LogoRow).eq("id", r.id))
    );
    qc.invalidateQueries({ queryKey: ["content", "trust-logos"] });
  }

  async function saveAll() {
    setSaving(true);
    await Promise.all(
      rows.map((r, i) =>
        supabase.from("trust_logos").update({ name: r.name, logo_url: r.logo_url, is_active: r.is_active, sort_order: i + 1 } as unknown as LogoRow).eq("id", r.id)
      )
    );
    setSaving(false);
    toast.success("Trust logos saved");
    qc.invalidateQueries({ queryKey: ["content", "trust-logos"] });
  }

  async function addLogo() {
    const { data } = await supabase
      .from("trust_logos")
      .insert({ name: "New client", sort_order: rows.length + 1 } as unknown as LogoRow)
      .select().single();
    if (data) setRows((p) => [...p, { ...(data as unknown as LogoRow) }]);
  }

  async function deleteLogo(id: string) {
    setDeleting(id);
    await supabase.from("trust_logos").delete().eq("id", id);
    setDeleting(null);
    setRows((p) => p.filter((r) => r.id !== id));
    qc.invalidateQueries({ queryKey: ["content", "trust-logos"] });
  }

  return (
    <SectionShell
      heading="Trust Logos"
      onSave={saveAll}
      saving={saving}
      footer={
        <button type="button" onClick={addLogo} className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:opacity-80 transition-opacity">
          <Plus className="h-4 w-4" /> Add logo
        </button>
      }
    >
      <SortableList
        items={rows}
        onReorder={saveOrder}
        renderItem={(row, dragHandle) => (
          <RowShell dragHandle={dragHandle} onDelete={() => deleteLogo(row.id)} deleting={deleting === row.id} deleteTitle="Delete logo">
            <div className="grid sm:grid-cols-3 gap-3 items-center">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                <input value={row.name} onChange={(e) => update(row.id, { name: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div className="sm:col-span-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Logo</label>
                <ImageUpload
                  bucket="site-media"
                  currentUrl={row.logo_url ?? undefined}
                  onUpload={(url) => update(row.id, { logo_url: url })}
                />
              </div>
              <div className="flex items-center gap-2 mt-5">
                <input
                  id={`logo-active-${row.id}`}
                  type="checkbox"
                  checked={row.is_active}
                  onChange={(e) => update(row.id, { is_active: e.target.checked })}
                  className="h-4 w-4 rounded accent-primary"
                />
                <label htmlFor={`logo-active-${row.id}`} className="text-xs text-muted-foreground">Active</label>
              </div>
            </div>
          </RowShell>
        )}
      />
    </SectionShell>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB: REGIONS
══════════════════════════════════════════════════════════════════════ */
function RegionsTab({ qc }: { qc: ReturnType<typeof useQueryClient> }) {
  const [rows, setRows] = useState<(RegionRow & SortableItem)[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("global_regions").select("*").order("sort_order").then(({ data }) => {
      if (data) setRows(toSortable(data as unknown as RegionRow[]));
    });
  }, []);

  function update(id: string, patch: Partial<RegionRow>) {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function saveOrder(newRows: typeof rows) {
    setRows(newRows);
    await Promise.all(
      newRows.map((r, i) => supabase.from("global_regions").update({ sort_order: i + 1 } as unknown as RegionRow).eq("id", r.id))
    );
    qc.invalidateQueries({ queryKey: ["content", "global-regions"] });
  }

  async function saveAll() {
    setSaving(true);
    await Promise.all(
      rows.map((r, i) =>
        supabase.from("global_regions").update({ name: r.name, flag: r.flag, sort_order: i + 1 } as unknown as RegionRow).eq("id", r.id)
      )
    );
    setSaving(false);
    toast.success("Regions saved");
    qc.invalidateQueries({ queryKey: ["content", "global-regions"] });
  }

  return (
    <SectionShell heading="Global Regions" onSave={saveAll} saving={saving}>
      <SortableList
        items={rows}
        onReorder={saveOrder}
        renderItem={(row, dragHandle) => (
          <RowShell dragHandle={dragHandle}>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                <input value={row.name} onChange={(e) => update(row.id, { name: e.target.value })} className={inputClass + " mt-1"} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Flag emoji</label>
                <input value={row.flag} onChange={(e) => update(row.id, { flag: e.target.value })} className={inputClass + " mt-1"} />
              </div>
            </div>
          </RowShell>
        )}
      />
    </SectionShell>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ROOT PAGE
══════════════════════════════════════════════════════════════════════ */
function HomepageEditor() {
  const qc = useQueryClient();
  const [active, setActive] = useState(tabValue(TABS[0]));

  return (
    <div className="space-y-6">
      <Tabs.Root value={active} onValueChange={setActive}>
        {/* Scrollable tab bar */}
        <div className="overflow-x-auto pb-1">
          <Tabs.List className="flex gap-1 min-w-max">
            {TABS.map((tab) => (
              <Tabs.Trigger key={tab} value={tabValue(tab)} asChild>
                <button type="button" className={tabCls(active === tabValue(tab))}>
                  {tab}
                </button>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>

        <Tabs.Content value="hero"         forceMount className={active === "hero"          ? "" : "hidden"}><HeroTab qc={qc} /></Tabs.Content>
        <Tabs.Content value="stats"        forceMount className={active === "stats"         ? "" : "hidden"}><StatsTab qc={qc} /></Tabs.Content>
        <Tabs.Content value="services"     forceMount className={active === "services"      ? "" : "hidden"}><ServicesTab qc={qc} /></Tabs.Content>
        <Tabs.Content value="why-us"       forceMount className={active === "why-us"        ? "" : "hidden"}><WhyUsTab qc={qc} /></Tabs.Content>
        <Tabs.Content value="process"      forceMount className={active === "process"       ? "" : "hidden"}><ProcessTab qc={qc} /></Tabs.Content>
        <Tabs.Content value="portfolio"    forceMount className={active === "portfolio"     ? "" : "hidden"}><PortfolioTab qc={qc} /></Tabs.Content>
        <Tabs.Content value="testimonials" forceMount className={active === "testimonials"  ? "" : "hidden"}><TestimonialsTab qc={qc} /></Tabs.Content>
        <Tabs.Content value="faqs"         forceMount className={active === "faqs"          ? "" : "hidden"}><FaqsTab qc={qc} /></Tabs.Content>
        <Tabs.Content value="trust-logos"  forceMount className={active === "trust-logos"   ? "" : "hidden"}><TrustLogosTab qc={qc} /></Tabs.Content>
        <Tabs.Content value="regions"      forceMount className={active === "regions"       ? "" : "hidden"}><RegionsTab qc={qc} /></Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
