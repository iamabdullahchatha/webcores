import { useCallback, useRef, useState } from "react";
import { Upload, X, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { getSupabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type MediaInsert = Database["public"]["Tables"]["media_library"]["Insert"];

type Props = {
  bucket: "blog-images" | "site-media";
  onUpload: (url: string) => void;
  currentUrl?: string;
  accept?: string;
};

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export function ImageUpload({ bucket, onUpload, currentUrl, accept = "image/*" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(!!currentUrl);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File) => {
      setError(null);

      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        return;
      }
      if (file.size > MAX_BYTES) {
        setError("File exceeds 5 MB limit.");
        return;
      }

      // Local preview immediately
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setDone(false);
      setUploading(true);
      setProgress(10);

      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      setProgress(30);

      const sb = getSupabase();
      const { data, error: upErr } = await sb.storage
        .from(bucket)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (upErr || !data) {
        setError(upErr?.message ?? "Upload failed.");
        setUploading(false);
        setProgress(0);
        return;
      }

      setProgress(80);

      const { data: urlData } = sb.storage.from(bucket).getPublicUrl(data.path);
      const publicUrl = urlData.publicUrl;

      // Insert into media_library (best-effort)
      const mediaPayload: MediaInsert = {
        file_path: data.path,
        public_url: publicUrl,
        mime_type: file.type,
        file_size_kb: Math.round(file.size / 1024),
        bucket,
        alt_text: null,
        uploaded_by: null,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (sb.from("media_library") as any).insert(mediaPayload);

      setProgress(100);
      setDone(true);
      setUploading(false);
      onUpload(publicUrl);
    },
    [bucket, onUpload],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) upload(file);
    },
    [upload],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) upload(file);
    },
    [upload],
  );

  const reset = () => {
    setPreview(null);
    setDone(false);
    setProgress(0);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-border/40">
          <img
            src={preview}
            alt="Cover preview"
            className="w-full aspect-video object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {done && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5">
                <CheckCircle2 className="h-3 w-3" />
                Uploaded
              </span>
            )}
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-background/80 border border-border/40 p-1 hover:bg-background transition-colors duration-200"
              title="Replace image"
            >
              <X className="h-3.5 w-3.5 text-foreground" />
            </button>
          </div>
          {uploading && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/40">
              <div
                className="h-full gradient-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`w-full flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-8 px-4 transition-all duration-200 ${
            dragging
              ? "border-primary/60 bg-primary/5 shadow-glow"
              : "border-border/50 bg-muted/30 hover:border-primary/40 hover:bg-primary/5"
          }`}
        >
          {uploading ? (
            <div className="h-5 w-5 animate-spin-slow rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
          )}
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {uploading ? "Uploading…" : "Drop image here or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, WebP · max 5 MB</p>
          </div>
          {uploading && (
            <div className="w-full max-w-xs h-1 rounded-full bg-muted/40">
              <div
                className="h-full rounded-full gradient-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-background/60 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted/60 transition-colors duration-200">
            <Upload className="h-3.5 w-3.5" />
            Browse files
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={onFileChange}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
