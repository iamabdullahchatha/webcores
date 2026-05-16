import type { ReactNode } from "react";

export const inputClass =
  "w-full glass rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/50 bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-foreground";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ label, htmlFor, error, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
