import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Copy, Trash2, Image as ImageIcon, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";

export const Route = createFileRoute("/admin/media")({
  component: MediaLibrary,
});

type StorageFile = {
  name: string;
  url: string;
  createdAt: string;
};

function MediaLibrary() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadFiles = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("site-media").list("", {
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) { toast.error("Failed to load media."); setLoading(false); return; }

    const mapped = (data ?? [])
      .filter((f) => f.name !== ".emptyFolderPlaceholder")
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from("site-media").getPublicUrl(f.name).data.publicUrl,
        createdAt: f.created_at ?? "",
      }));
    setFiles(mapped);
    setLoading(false);
  }, []);

  useEffect(() => { void loadFiles(); }, [loadFiles]);

  function copyUrl(url: string) {
    void navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard.");
  }

  async function deleteFile() {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase.storage.from("site-media").remove([deleteTarget]);
    setDeleting(false);
    setDeleteTarget(null);
    if (error) { toast.error("Failed to delete file."); return; }
    toast.success("File deleted.");
    void loadFiles();
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/40 flex items-center gap-2">
          <Upload className="h-4 w-4 text-primary" />
          <h3 className="font-display text-base font-semibold">Upload File</h3>
        </div>
        <div className="p-6">
          <ImageUpload
            bucket="site-media"
            onUpload={() => { void loadFiles(); }}
          />
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/40 flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-primary" />
          <h3 className="font-display text-base font-semibold">
            Media Library
            {!loading && <span className="ml-2 text-xs font-normal text-muted-foreground">({files.length} files)</span>}
          </h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-muted/20 animate-pulse" />
            ))}
          </div>
        ) : files.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted-foreground text-sm">
            No files uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6">
            {files.map((file) => (
              <div key={file.name} className="group relative rounded-xl overflow-hidden border border-border/30 bg-muted/10">
                <div className="aspect-square">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-2">
                  <button
                    type="button"
                    onClick={() => copyUrl(file.url)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-background/90 text-foreground px-3 py-1.5 text-xs font-semibold hover:bg-background transition-colors w-full justify-center"
                  >
                    <Copy className="h-3.5 w-3.5" /> Copy URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(file.name)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-destructive/90 text-destructive-foreground px-3 py-1.5 text-xs font-semibold hover:bg-destructive transition-colors w-full justify-center"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
                <p className="px-2 py-1.5 text-xs text-muted-foreground truncate border-t border-border/20">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(v) => { if (!v) setDeleteTarget(null); }}
        title="Delete file?"
        description="This will permanently remove the file from storage. Any pages using this image will show a broken image."
        onConfirm={deleteFile}
        loading={deleting}
      />
    </div>
  );
}
