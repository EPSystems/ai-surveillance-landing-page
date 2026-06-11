import { cn } from "@/lib/utils";

/**
 * Decorative "detection box" corner brackets — the recurring UI motif.
 * Purely visual; always hidden from assistive tech.
 */
export function DetectionFrame({
  className,
  pulse = false,
  corner = "h-3 w-3",
}: {
  className?: string;
  /** Subtle opacity pulse */
  pulse?: boolean;
  /** Tailwind size classes for the corner brackets */
  corner?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        pulse && "animate-pulse-frame",
        className
      )}
    >
      <span className={cn("absolute left-0 top-0 border-l-2 border-t-2 border-accent", corner)} />
      <span className={cn("absolute right-0 top-0 border-r-2 border-t-2 border-accent", corner)} />
      <span className={cn("absolute bottom-0 left-0 border-b-2 border-l-2 border-accent", corner)} />
      <span className={cn("absolute bottom-0 right-0 border-b-2 border-r-2 border-accent", corner)} />
    </div>
  );
}
