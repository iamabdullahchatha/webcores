/**
 * Shared blog post form used by both /admin/blog/new and /admin/blog/$id.
 * Caller owns the save/publish actions and passes them as props.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { format } from "date-fns";
import {
  Calendar, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Clock, ExternalLink, X,
} from "lucide-react";
import { FormField, inputClass } from "@/components/admin/ui/FormField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { DirtyBanner } from "@/components/admin/ui/DirtyBanner";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Switch } from "@/components/ui/switch";
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
  onSaveDraft: (data: PostFormData, opts?: { silent?: boolean }) => Promise<void>;
  onPublish: (data: PostFormData) => Promise<void>;
  saving: boolean;
  lastSaved: Date | null;
  viewSlug?: string;
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function MiniCalendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = new Date();
  const [view, setView] = useState(() => {
    const d = selected ?? today;
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const { year, month } = view;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prev = () =>
    setView(month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 });
  const next = () =>
    setView(month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 });

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="rounded-xl border border-border/40 bg-background/60 p-3 select-none">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prev}
          className="p-1 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors duration-150"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-foreground">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={next}
          className="p-1 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors duration-150"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const date = new Date(year, month, day);
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;
          const isSelected =
            selected &&
            selected.getFullYear() === year &&
            selected.getMonth() === month &&
            selected.getDate() === day;

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(date)}
              className={`mx-auto flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium transition-all duration-150 ${
                isSelected
                  ? "gradient-primary text-primary-foreground shadow-elegant"
                  : isToday
                  ? "border border-primary/50 text-primary"
                  : "text-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
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
  const [lastAutosaved, setLastAutosaved] = useState<Date | null>(null);

  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derived stats
  const wordCount = data.content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

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

  // Autosave: 60 s after last change when dirty
  useEffect(() => {
    if (!dirty) return;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(async () => {
      await onSaveDraft({ ...data, reading_time_min: readingTime } as PostFormData, { silent: true });
      setLastAutosaved(new Date());
      setDirty(false);
    }, 60_000);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirty, data.title, data.slug, data.content, data.excerpt, data.status]);

  // Keyboard save: ⌘S / Ctrl+S
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (!saving) {
          setDirty(false);
          onSaveDraft(data);
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [saving, data, onSaveDraft]);

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
      setSlugTaken(!!existing && initial.slug !== data.slug);
      setSlugChecking(false);
    }, 600);
    return () => clearTimeout(t);
  }, [data.slug, initial.slug]);

  const isDraft = data.status === "draft";

  function handleDiscard() {
    setData(initial);
    setDirty(false);
  }

  function resetSlug() {
    setSlugManual(false);
    setData((prev) => ({ ...prev, slug: slugify(prev.title) }));
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
            label={
              <span className="flex items-center gap-2">
                Slug
                {!slugManual && (
                  <span className="text-xs bg-primary/10 text-primary rounded px-1.5 py-0.5">Auto</span>
                )}
                {slugManual && (
                  <button
                    type="button"
                    onClick={resetSlug}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    ↺ Reset
                  </button>
                )}
              </span>
            }
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
            {/* Word count + reading time */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
              <span>{wordCount.toLocaleString()} words</span>
              <span>·</span>
              <span>~{readingTime} min read</span>
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

            {/* Preview */}
            {data.cover_image_url ? (
              <div className="relative rounded-xl overflow-hidden aspect-video mb-3 bg-muted/10">
                <img
                  src={data.cover_image_url}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => set("cover_image_url", "")}
                  className="absolute top-2 right-2 rounded-lg bg-background/80 p-1.5 hover:bg-background transition-colors"
                  title="Remove cover image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-border/40 aspect-video flex items-center justify-center mb-3 text-sm text-muted-foreground">
                No cover image
              </div>
            )}

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

            {/* Publish toggle */}
            <div className="flex items-center gap-3">
              <Switch
                id="publish-toggle"
                checked={data.status === "published"}
                onCheckedChange={(checked) => {
                  set("status", checked ? "published" : "draft");
                  if (checked && !data.published_at) {
                    set("published_at", new Date());
                  }
                }}
              />
              <label htmlFor="publish-toggle" className="text-sm font-medium cursor-pointer select-none">
                {data.status === "published" ? (
                  <span className="text-emerald-400">Published</span>
                ) : (
                  <span className="text-amber-400">Draft</span>
                )}
              </label>
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
                <div className="mt-3">
                  <MiniCalendar
                    selected={data.published_at}
                    onSelect={(d) => {
                      set("published_at", d);
                      setShowDatePicker(false);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Reading time chip */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>~{readingTime} min read</span>
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
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {lastAutosaved && !lastSaved && (
            <span>Autosaved {format(lastAutosaved, "HH:mm")}</span>
          )}
          {lastSaved && (
            <span>Last saved: {format(lastSaved, "HH:mm")}</span>
          )}
          {!lastSaved && !lastAutosaved && (
            <span>Last saved: never</span>
          )}
          {viewSlug && (
            <a
              href={`/blog/${viewSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              View live
            </a>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs text-muted-foreground/60">⌘S to save</span>
          {/* Visible reason when Publish is blocked — prevents the
              "click does nothing" trap when slug is already taken or
              the slug field is empty/invalid. */}
          {(slugTaken || !data.slug || !/^[a-z0-9-]+$/.test(data.slug)) && (
            <span className="hidden md:inline text-xs font-semibold text-destructive">
              {!data.slug
                ? "Add a slug to publish"
                : !/^[a-z0-9-]+$/.test(data.slug)
                ? "Slug must be lowercase letters, numbers, hyphens"
                : "Slug already in use — change it to publish"}
            </span>
          )}
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
            // NOTE: not disabled on slugTaken/invalid — instead we surface
            // a toast on click so the user knows exactly what to fix.
            // Silent disabling caused "click does nothing" publish failures.
            disabled={saving}
            onClick={() => {
              if (!data.slug) {
                toast.error("Add a slug before publishing.");
                return;
              }
              if (!/^[a-z0-9-]+$/.test(data.slug)) {
                toast.error("Slug must contain only lowercase letters, numbers, and hyphens.");
                return;
              }
              if (slugTaken) {
                toast.error("This slug is already used by another post. Change it to publish.");
                return;
              }
              setDirty(false);
              onPublish({ ...data, status: "published" });
            }}
            className="inline-flex items-center gap-2 rounded-xl gradient-primary text-primary-foreground px-5 py-2 text-sm font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
          >
            {saving && !isDraft ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
