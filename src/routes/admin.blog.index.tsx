import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import type { Database } from "@/lib/supabase/types";

export const Route = createFileRoute("/admin/blog/")({
  component: BlogList,
});

type Post = Database["public"]["Tables"]["blog_posts"]["Row"];

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function BlogList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts((data ?? []) as Post[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const { error } = await supabase.from("blog_posts").delete().eq("id", deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (error) {
      toast.error("Failed to delete post.");
      return;
    }
    toast.success("Post deleted.");
    load();
  }

  const filtered = posts.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const inputClass =
    "glass rounded-xl px-3 py-2 text-sm bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-foreground placeholder:text-muted-foreground/50";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Blog Posts</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {posts.length} post{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          to="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-xl gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} sm:w-64`}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className={inputClass}
        >
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              className="text-muted-foreground/30"
            >
              <rect x="8" y="8" width="48" height="48" rx="8" stroke="currentColor" strokeWidth="2" />
              <path d="M20 24h24M20 32h16M20 40h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-muted-foreground text-sm">
              {search || statusFilter !== "all" ? "No posts match your filters." : "No posts yet."}
            </p>
            <Link
              to="/admin/blog/new"
              className="inline-flex items-center gap-2 rounded-xl gradient-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-elegant hover:opacity-90 transition-all duration-200"
            >
              <Plus className="h-3.5 w-3.5" />
              Create first post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40">
                  <th className="px-4 py-3 w-12">Cover</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 hidden md:table-cell">Tags</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Published</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-border/20 last:border-0 hover:bg-primary/5 transition-colors duration-150"
                  >
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted/40 shrink-0">
                        {post.cover_image_url ? (
                          <img
                            src={post.cover_image_url}
                            alt={post.cover_image_alt ?? post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="h-4 w-4 text-muted-foreground/40" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => navigate({ to: "/admin/blog/$id", params: { id: post.id } })}
                        className="font-medium text-foreground hover:text-primary transition-colors duration-200 text-left"
                      >
                        {post.title}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {post.tags?.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-muted/60 text-muted-foreground px-2 py-0.5 text-[10px] font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">
                      {formatDate(post.published_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to="/admin/blog/$id"
                          params={{ id: post.id }}
                          className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors duration-200"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteId(post.id)}
                          className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors duration-200"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete post?"
        description="This action cannot be undone. The post will be permanently removed."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
