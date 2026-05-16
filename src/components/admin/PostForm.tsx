/**
 * Shared blog post form used by both /admin/blog/new and /admin/blog/$id.
 * Caller owns the save/publish actions and passes them as props.
 */
import { useCallback, useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Calendar, ChevronDown, ChevronUp, Clock, ExternalLink } from "lucide-react";
import { FormField, inputClass } from "@/components/admin/ui/FormField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { DirtyBanner } from "@/components/admin/ui/DirtyBanner";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { supabase } from "@/lib/supabase/client";

export type PostFormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  cover_image_alt: string;
  tags: string;
  status: "draft" | "published";
  published_at: Date | null;
  seo_title: string;
  seo_description: string;
};

export type PostFormErrors = Partial<Record<keyof PostFormData, string>>;

type Props = {
  initial: PostFormData;
  errors: PostFormErrors;
  onSaveDraft: (data: PostFormData) => Promise<void>;
  onPublish: (data: PostFormData) => Promise<void>;
  saving: boolean;
  lastSaved: Date | null;
  viewSlug?: string;
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function PostForm({
  initial,
  errors,
  onSaveDraft,
  onPublish,
  saving,
  lastSaved,
  viewSlug,
}: Props) {
  const [data, setData] = useState<PostFormData>(initial);
  const [dirty, setDirty] = useState(false);
  const [slugManual, setSlugManual] = useState(!!initial.slug);
  const [seoOpen, setSeoOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugTaken, setSlugTaken] = useState(false);

  const set = useCallback(
    <K extends keyof PostFormData>(key: K, value: PostFormData[K]) => {
      setData((prev) => {
        const next = { ...prev, [key]: value };
        if (key === "title" && !slugManual) {
          next.slug = slugify(value as string);
        }
        if (key === "title" && !prev.seo_title) {
          next.seo_title = value as string;
        }
        if (key === "excerpt" && !prev.seo_description) {
          next.seo_description = value as string;
        }
        return next;
      });
      setDirty(true);
    },
    [slugManual],
  );

  // Slug uniqueness check (debounced)
  useEffect(() => {
    if (!data.slug) return;
    const t = setTimeout(async () => {
      setSlugChecking(true);
      const { data: existing } = await supabase
        .from("blog_posts")
        .select("id")
        .eq("slug", data.slug)
        .maybeSingle();
      // If editing (initial.slug === data.slug), not taken
      setSlugTaken(!!existing && initial.slug !== data.slug);
      setSlugChecking(false);
    }, 600);
    return () => clearTimeout(t);
  }, [data.slug, initial.slug]);

  const rt = readingTime(data.content);
  const isDraft = data.status === "draft";

  function handleDiscard() {
    setData(initial);
    setDirty(false);
  }

  return (
    <div className="space-y-4">
      {/* Dirty banner */}
      {dirty && (
        <DirtyBanner
          onSave={() => onSaveDraft(data)}
          onDiscard={handleDiscard}
          saving={saving}
        />
      )}

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* LEFT — main content */}
        <div className="space-y-5">
          {/* Title */}
          <FormField label="Title" htmlFor="post-title" error={errors.title}>
            <input
              id="post-title"
              type="text"
              value={data.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Post title"
              maxLength={120}
              className={`${inputClass} font-display font-semibold text-xl`}
            />
          </FormField>

          {/* Slug */}
          <FormField
            label="Slug"
            htmlFor="post-slug"
            error={slugTaken ? "Slug already in use" : errors.slug}
            hint={slugChecking ? "Checking availability…" : undefined}
          >
            <input
              id="post-slug"
              type="text"
              value={data.slug}
              onChange={(e) => {
                setSlugManual(true);
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
              }}
              placeholder="post-url-slug"
              className={inputClass}
            />
          </FormField>

          {/* Excerpt */}
          <FormField label="Excerpt" htmlFor="post-excerpt" error={errors.excerpt}>
            <textarea
              id="post-excerpt"
              value={data.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Short summary shown on the blog listing…"
              rows={3}
              maxLength={300}
              className={`${inputClass} resize-none`}
            />
            <p className="text-xs text-muted-foreground text-right">
              {data.excerpt.length}/300
            </p>
          </FormField>

          {/* Markdown editor */}
          <FormField label="Content" htmlFor="post-content" error={errors.content}>
            <div data-color-mode="dark">
              <MDEditor
                value={data.content}
                onChange={(v) => set("content", v ?? "")}
                height={480}
                preview="edit"
                style={{
                  background: "var(--card)",
                  borderRadius: "0.75rem",
                  border: "1px solid color-mix(in oklab, var(--border) 40%, transparent)",
                }}
              />
            </div>
          </FormField>
        </div>

        {/* RIGHT — settings panel */}
        <div className="lg:sticky lg:top-24 space-y-4">
          {/* Cover image */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Cover Image
            </h3>
            <ImageUpload
              bucket="blog-images"
              currentUrl={data.cover_image_url || undefined}
              onUpload={(url) => set("cover_image_url", url)}
            />
            {data.cover_image_url && (
              <FormField label="Alt text" htmlFor="post-cover-alt">
                <input
                  id="post-cover-alt"
                  type="text"
                  value={data.cover_image_alt}
                  onChange={(e) => set("cover_image_alt", e.target.value)}
                  placeholder="Describe the image…"
                  className={inputClass}
                />
              </FormField>
            )}
          </div>

          {/* Tags */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Tags
            </h3>
            <FormField label="Tags (comma-separated)" htmlFor="post-tags">
              <input
                id="post-tags"
                type="text"
                value={data.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="SEO, Dubai, Web Design"
                className={inputClass}
              />
            </FormField>
          </div>

          {/* Status + Published date */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Status
            </h3>
            <div className="flex gap-2">
              {(["draft", "published"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    set("status", s);
                    if (s === "published" && !data.published_at) {
                      set("published_at", new Date());
                    }
                  }}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                    data.status === s
                      ? s === "published"
                        ? "gradient-primary text-primary-foreground shadow-elegant"
                        : "bg-muted text-muted-foreground"
                      : "border border-border/40 text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Published date */}
            <div>
              <button
                type="button"
                onClick={() => setShowDatePicker((v) => !v)}
                className="w-full flex items-center justify-between text-sm text-foreground hover:text-primary transition-colors duration-200"
              >
                <span className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  {data.published_at
                    ? new Date(data.published_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Set publish date"}
                </span>
                {showDatePicker ? (
                  <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </button>
              {showDatePicker && (
                <div className="mt-2">
                  <DayPicker
                    mode="single"
                    selected={data.published_at ?? undefined}
                    onSelect={(d) => {
                      set("published_at", d ?? null);
                      setShowDatePicker(false);
                    }}
                    classNames={{
                      root: "text-sm",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Reading time chip */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>~{rt} min read</span>
              <span className="ml-auto">
                <StatusBadge status={data.status} />
              </span>
            </div>
          </div>

          {/* SEO — collapsible */}
          <div className="glass rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setSeoOpen((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              SEO Settings
              {seoOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
            {seoOpen && (
              <div className="px-5 pb-5 space-y-4 border-t border-border/40">
                <FormField label="SEO Title" htmlFor="post-seo-title">
                  <input
                    id="post-seo-title"
                    type="text"
                    value={data.seo_title}
                    onChange={(e) => set("seo_title", e.target.value)}
                    placeholder="Same as title by default"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="SEO Description" htmlFor="post-seo-desc">
                  <textarea
                    id="post-seo-desc"
                    value={data.seo_description}
                    onChange={(e) => set("seo_description", e.target.value)}
                    placeholder="Same as excerpt by default"
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </FormField>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 left-0 right-0 z-20 bg-background/80 backdrop-blur border-t border-border/40 px-0 py-3 flex items-center justify-between gap-4">
        <div className="text-xs text-muted-foreground">
          {lastSaved
            ? `Last saved: ${lastSaved.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`
            : "Last saved: never"}
          {viewSlug && (
            <a
              href={`/blog/${viewSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-1 text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              View live
            </a>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => { setDirty(false); onSaveDraft(data); }}
            className="rounded-xl border border-border/40 bg-background/60 text-foreground px-4 py-2 text-sm font-semibold hover:bg-muted/60 transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none"
          >
            {saving && isDraft ? "Saving…" : "Save Draft"}
          </button>
          <button
            type="button"
            disabled={saving || slugTaken}
            onClick={() => { setDirty(false); onPublish({ ...data, status: "published" }); }}
            className="inline-flex items-center gap-2 rounded-xl gradient-primary text-primary-foreground px-5 py-2 text-sm font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
          >
            {saving && !isDraft ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
