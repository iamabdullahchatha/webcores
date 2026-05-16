import type { ReactNode } from "react";

type SectionShellProps = {
  heading: string;
  children: ReactNode;
  onSave?: () => void;
  saving?: boolean;
  footer?: ReactNode;
};

export function SectionShell({ heading, children, onSave, saving, footer }: SectionShellProps) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border/40">
        <h3 className="font-display text-base font-semibold text-foreground">{heading}</h3>
      </div>
      <div className="p-6 space-y-5">{children}</div>
      {(onSave || footer) && (
        <div className="px-6 py-4 border-t border-border/40 flex items-center justify-end gap-3">
          {footer}
          {onSave && (
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
