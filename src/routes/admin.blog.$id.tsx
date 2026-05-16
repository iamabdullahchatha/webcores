import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Trash2 } from "lucide-react";
import { supabase, getSupabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { PostForm, type PostFormData, type PostFormErrors } from "@/components/admin/PostForm";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";

type BlogUpdate = Database["public"]["Tables"]["blog_posts"]["Update"];

export const Route = createFileRoute("/admin/blog/$id")({
  component: EditPost,
});

type Post = Database["public"]["Tables"]["blog_posts"]["Row"];

function rowToForm(post: Post): PostFormData {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    cover_image_url: post.cover_image_url ?? "",
    cover_image_alt: post.cover_image_alt ?? "",
    tags: post.tags?.join(", ") ?? "",
    status: post.status,
    published_at: post.published_at ? new Date(post.published_at) : null,
    seo_title: post.seo_title ?? "",
    seo_description: post.seo_description ?? "",
  };
}

function validate(data: PostFormData): PostFormErrors {
  const e: PostFormErrors = {};
  if (data.title.length < 3) e.title = "Title must be at least 3 characters.";
  if (data.title.length > 120) e.title = "Title must be under 120 characters.";
  if (!/^[a-z0-9-]+$/.test(data.slug)) e.slug = "Slug: only lowercase letters, numbers, hyphens.";
  if (data.excerpt.length > 300) e.excerpt = "Excerpt must be under 300 characters.";
  if (data.content.length < 100) e.content = "Content must be at least 100 characters.";
  return e;
}

function EditPost() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [errors, setErrors] = useState<PostFormErrors>({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!active) return;
      if (error || !data) {
        toast.error("Post not found.");
        navigate({ to: "/admin/blog" });
        return;
      }
      setPost(data as Post);
      setLoading(false);
    })();
    return () => { active = false; };
  }, [id, navigate]);

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

    const status = publish ? "published" : data.status;
    const published_at =
      publish && !data.published_at
        ? new Date().toISOString()
        : data.published_at?.toISOString() ?? null;

    const payload: BlogUpdate = {
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
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (getSupabase().from("blog_posts") as any)
      .update(payload)
      .eq("id", id) as { error: { message: string } | null };

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    // Refresh post state so form initial syncs on next render
    const { data: updated } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (updated) setPost(updated as Post);

    setLastSaved(new Date());
    toast.success(publish ? "Post published!" : "Draft saved.");
  }

  async function handleDelete() {
    setDeleting(true);
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    setDeleting(false);
    if (error) {
      toast.error("Failed to delete post.");
      return;
    }
    toast.success("Post deleted.");
    navigate({ to: "/admin/blog" });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!post) return null;

  const isPublished = post.status === "published";

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin/blog"
          className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h2 className="font-display text-2xl font-bold text-foreground flex-1 truncate">
          {post.title || "Edit Post"}
        </h2>
        <div className="flex items-center gap-2">
          {isPublished && (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/40 bg-background/60 px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted/60 transition-colors duration-200"
            >
              View live →
            </a>
          )}
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/40 text-destructive px-4 py-2 text-sm font-semibold hover:bg-destructive/10 transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <PostForm
        initial={rowToForm(post)}
        errors={errors}
        onSaveDraft={(d) => save(d, false)}
        onPublish={(d) => save(d, true)}
        saving={saving}
        lastSaved={lastSaved}
        viewSlug={isPublished ? post.slug : undefined}
      />

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this post?"
        description="This cannot be undone. The post will be permanently removed from the database."
        confirmLabel="Delete Post"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
