// Static placeholder shown while the lazy-loaded PostForm (and its ~899KB
// rich-text editor) downloads. Matches the admin dark/glass theme — no spinner,
// just pulsing glass boxes that mirror the form's rough layout.
export function PostFormSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden="true">
      {/* Title input */}
      <div className="h-12 rounded-xl border border-white/10 bg-white/5" />

      {/* Slug + meta row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-10 rounded-xl border border-white/10 bg-white/5" />
        <div className="h-10 rounded-xl border border-white/10 bg-white/5" />
      </div>

      {/* Excerpt */}
      <div className="h-20 rounded-xl border border-white/10 bg-white/5" />

      {/* Rich-text editor area (the heavy part) */}
      <div className="h-120 rounded-2xl border border-white/10 bg-white/5" />

      {/* Action buttons */}
      <div className="flex gap-3">
        <div className="h-11 w-32 rounded-xl border border-white/10 bg-white/5" />
        <div className="h-11 w-32 rounded-xl border border-white/10 bg-white/5" />
      </div>

      <span className="sr-only">Loading editor…</span>
    </div>
  );
}
