import { cn } from "@/lib/utils";

export function Card({
  className,
  accentShadow = false,
  accentEdge = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** Hard 4px accent shadow (neo-brutalist) */
  accentShadow?: boolean;
  /** 2px accent rule on the left edge */
  accentEdge?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border border-edge bg-surface-card",
        accentEdge && "border-l-2 border-l-accent",
        accentShadow && "shadow-hard",
        className
      )}
      {...props}
    />
  );
}
