type Status = "draft" | "published";

export function StatusBadge({ status }: { status: Status }) {
  if (status === "published") {
    return (
      <span className="inline-flex items-center rounded-full gradient-primary text-primary-foreground px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
        Published
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
      Draft
    </span>
  );
}
