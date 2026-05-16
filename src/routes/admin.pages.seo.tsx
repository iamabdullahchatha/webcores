import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { pageSeo } from "@/lib/seo";
import type { PageKey } from "@/lib/seo";
import { usePageSeoOverrides } from "@/lib/content/usePageSeoOverrides";
import { SectionShell } from "@/components/admin/ui/SectionShell";
import { FormField, inputClass } from "@/components/admin/ui/FormField";

export const Route = createFileRoute("/admin/pages/seo")({
  component: SeoEditorPage,
});

const PAGE_KEYS: PageKey[] = [
  "home",
  "about",
  "services",
  "contact",
  "blog",
  "webDevelopment",
  "softwareDevelopment",
  "itConsultation",
  "cmsDevelopment",
  "seoGeo",
  "graphicDesign",
  "faqs",
  "sitemapHtml",
];

function tabValue(t: string) {
  return t.toLowerCase().replace(/\s+/g, "-");
}

function tabCls(active: boolean) {
  return `px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
    active
      ? "gradient-primary text-primary-foreground shadow-elegant"
      : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
  }`;
}

type TabFields = {
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  og_title: string;
  og_description: string;
  useOgOverride: boolean;
};

const EMPTY: TabFields = {
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  og_title: "",
  og_description: "",
  useOgOverride: false,
};

function SeoTab({
  pageKey,
  overrides,
  qc,
}: {
  pageKey: PageKey;
  overrides: Record<string, { seo_title: string | null; seo_description: string | null; seo_keywords: string | null; og_title: string | null; og_description: string | null }>;
  qc: ReturnType<typeof useQueryClient>;
}) {
  const page = pageSeo[pageKey];
  const [fields, setFields] = useState<TabFields>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const row = overrides[pageKey];
    if (row) {
      setFields({
        seo_title: row.seo_title ?? "",
        seo_description: row.seo_description ?? "",
        seo_keywords: row.seo_keywords ?? "",
        og_title: row.og_title ?? "",
        og_description: row.og_description ?? "",
        useOgOverride: !!(row.og_title || row.og_description),
      });
    } else {
      setFields(EMPTY);
    }
  }, [overrides, pageKey]);

  function set<K extends keyof TabFields>(key: K, value: TabFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    try {
      const { error } = await (supabase as any)
        .from("page_seo_overrides")
        .upsert({
          id: pageKey,
          seo_title: fields.seo_title || null,
          seo_description: fields.seo_description || null,
          seo_keywords: fields.seo_keywords || null,
          og_title: fields.useOgOverride ? fields.og_title || null : null,
          og_description: fields.useOgOverride ? fields.og_description || null : null,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      await qc.invalidateQueries({ queryKey: ["content", "page-seo-overrides"] });
      toast.success(`SEO saved for ${page.label}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save SEO settings.");
    } finally {
      setSaving(false);
    }
  }

  const titleLen = fields.seo_title.length;
  const descLen = fields.seo_description.length;
  const keywordsPlaceholder = Array.isArray(page.keywords) ? page.keywords.join(", ") : "";

  return (
    <SectionShell heading={`${page.label} — SEO Settings`} onSave={save} saving={saving}>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <FormField label="SEO Title" htmlFor={`seo-title-${pageKey}`} hint={`Overrides default: "${page.title}"`}>
            <input
              id={`seo-title-${pageKey}`}
              type="text"
              maxLength={70}
              className={inputClass}
              value={fields.seo_title}
              placeholder={page.title}
              onChange={(e) => set("seo_title", e.target.value)}
            />
            <p className={`text-xs mt-1 ${titleLen > 60 ? "text-destructive" : "text-muted-foreground"}`}>
              {titleLen}/60 characters
            </p>
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="Meta Description" htmlFor={`seo-desc-${pageKey}`} hint={`Overrides default: "${page.description.slice(0, 80)}…"`}>
            <textarea
              id={`seo-desc-${pageKey}`}
              rows={3}
              maxLength={200}
              className={inputClass}
              value={fields.seo_description}
              placeholder={page.description}
              onChange={(e) => set("seo_description", e.target.value)}
            />
            <p className={`text-xs mt-1 ${descLen > 160 ? "text-destructive" : "text-muted-foreground"}`}>
              {descLen}/160 characters
            </p>
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="Keywords" htmlFor={`seo-kw-${pageKey}`} hint="Comma-separated. Overrides default keywords.">
            <input
              id={`seo-kw-${pageKey}`}
              type="text"
              className={inputClass}
              value={fields.seo_keywords}
              placeholder={keywordsPlaceholder}
              onChange={(e) => set("seo_keywords", e.target.value)}
            />
          </FormField>
        </div>
      </div>

      <hr className="border-border/30 my-1" />

      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
        Open Graph Overrides (optional)
      </p>

      <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer select-none mb-4">
        <input
          type="checkbox"
          checked={fields.useOgOverride}
          onChange={(e) => set("useOgOverride", e.target.checked)}
          className="h-4 w-4 rounded accent-primary"
        />
        Override OG tags
      </label>

      {fields.useOgOverride && (
        <div className="space-y-5">
          <FormField label="OG Title" htmlFor={`og-title-${pageKey}`} hint="Shown when shared on social media">
            <input
              id={`og-title-${pageKey}`}
              type="text"
              maxLength={100}
              className={inputClass}
              value={fields.og_title}
              placeholder={fields.seo_title || page.title}
              onChange={(e) => set("og_title", e.target.value)}
            />
          </FormField>
          <FormField label="OG Description" htmlFor={`og-desc-${pageKey}`} hint="Social media share description">
            <textarea
              id={`og-desc-${pageKey}`}
              rows={2}
              maxLength={200}
              className={inputClass}
              value={fields.og_description}
              placeholder={fields.seo_description || page.description}
              onChange={(e) => set("og_description", e.target.value)}
            />
          </FormField>
        </div>
      )}
    </SectionShell>
  );
}

function SeoEditorPage() {
  const qc = useQueryClient();
  const { data: overrides = {} } = usePageSeoOverrides();
  const [active, setActive] = useState(tabValue(pageSeo[PAGE_KEYS[0]].label));

  return (
    <div className="space-y-6">
      <Tabs.Root value={active} onValueChange={setActive}>
        <div className="overflow-x-auto pb-1">
          <Tabs.List className="flex gap-1 min-w-max">
            {PAGE_KEYS.map((key) => {
              const tv = tabValue(pageSeo[key].label);
              return (
                <Tabs.Trigger key={key} value={tv} asChild>
                  <button type="button" className={tabCls(active === tv)}>
                    {pageSeo[key].label}
                  </button>
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>
        </div>

        {PAGE_KEYS.map((key) => {
          const tv = tabValue(pageSeo[key].label);
          return (
            <Tabs.Content key={key} value={tv} forceMount className={active === tv ? "" : "hidden"}>
              <SeoTab pageKey={key} overrides={overrides} qc={qc} />
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </div>
  );
}
