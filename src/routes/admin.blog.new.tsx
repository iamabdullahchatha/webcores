import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getSupabase } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthContext";
import { PostForm, type PostFormData, type PostFormErrors } from "@/components/admin/PostForm";
import type { Database } from "@/lib/supabase/types";

type BlogInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];

export const Route = createFileRoute("/admin/blog/new")({
  component: NewPost,
});

const EMPTY: PostFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  cover_image_alt: "",
  tags: "",
  status: "draft",
  published_at: null,
  seo_title: "",
  seo_description: "",
};

function validate(data: PostFormData): PostFormErrors {
  const e: PostFormErrors = {};
  if (data.title.length < 3) e.title = "Title must be at least 3 characters.";
  if (data.title.length > 120) e.title = "Title must be under 120 characters.";
  if (!/^[a-z0-9-]+$/.test(data.slug)) e.slug = "Slug: only lowercase letters, numbers, hyphens.";
  if (data.excerpt.length > 300) e.excerpt = "Excerpt must be under 300 characters.";
  if (data.content.length < 100) e.content = "Content must be at least 100 characters.";
  return e;
}

function NewPost() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [errors, setErrors] = useState<PostFormErrors>({});

  async function save(data: PostFormData, publish = false) {
    const errs = validate(data);
    if (Object.keys(errs).length) {
      setErrors(errs);
      toast.error("Please fix the errors before saving.");
      return;
    }
    setErrors({});
    setSaving(true);

    const tags = data.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const status = publish ? "published" : "draft";
    const published_at =
      publish
        ? (data.published_at?.toISOString() ?? new Date().toISOString())
        : null;

    const payload: BlogInsert = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: data.content,
      cover_image_url: data.cover_image_url || null,
      cover_image_alt: data.cover_image_alt || null,
      tags: tags.length ? tags : null,
      status,
      published_at,
      seo_title: data.seo_title || null,
      seo_description: data.seo_description || null,
      reading_time_min: Math.max(1, Math.round(data.content.trim().split(/\s+/).filter(Boolean).length / 200)),
      author_id: session?.user.id ?? null,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: inserted, error } = await (getSupabase().from("blog_posts") as any)
      .insert(payload)
      .select("id")
      .single() as { data: { id: string } | null; error: { message: string } | null };

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setLastSaved(new Date());
    toast.success(publish ? "Post published!" : "Draft saved.");
    if (inserted) navigate({ to: "/admin/blog/$id", params: { id: inserted.id } });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/blog"
          className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h2 className="font-display text-2xl font-bold text-foreground">New Post</h2>
      </div>

      <PostForm
        initial={EMPTY}
        errors={errors}
        onSaveDraft={(d) => save(d, false)}
        onPublish={(d) => save(d, true)}
        saving={saving}
        lastSaved={lastSaved}
      />
    </div>
  );
}
