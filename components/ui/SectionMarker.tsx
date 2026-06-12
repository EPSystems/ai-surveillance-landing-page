/** Technical section index — "[ 03 / Бензиностанции ]" */
export function SectionMarker({ index, label }: { index: string; label: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
      [ {index} / {label} ]
    </p>
  );
}
