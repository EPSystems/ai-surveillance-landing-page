import { cn } from "@/lib/utils";

/** Pill badge — the only element allowed a full border radius. */
export function Badge({
  className,
  hard = false,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  /** Hard accent shadow variant (compliance badges) */
  hard?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-accent px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent",
        hard && "bg-surface-card shadow-hard",
        className
      )}
      {...props}
    />
  );
}
