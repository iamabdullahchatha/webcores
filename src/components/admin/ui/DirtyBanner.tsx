type DirtyBannerProps = {
  onSave: () => void;
  onDiscard: () => void;
  saving?: boolean;
};

export function DirtyBanner({ onSave, onDiscard, saving }: DirtyBannerProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 text-sm">
      <span className="font-medium text-foreground">You have unsaved changes.</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDiscard}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors duration-200"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-lg gradient-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
