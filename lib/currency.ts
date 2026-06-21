/**
 * Fixed EUR↔BGN conversion for compliant dual-currency display.
 *
 * Bulgaria's lev is pegged at the fixed rate 1 € = 1.95583 лв. Until the
 * euro-changeover transition ends, every price shown to a BG audience must
 * carry the BGN equivalent side-by-side at this exact rate
 * (see business-plan GTM §4.2.5). Keep this the single source of the rate.
 */
export const EUR_TO_BGN = 1.95583;

/** "19,56" — Bulgarian formatting (comma decimal, space thousands), deterministic across SSR/CSR. */
export function toBGN(eur: number): string {
  const [int, dec] = (eur * EUR_TO_BGN).toFixed(2).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped},${dec}`;
}

/** "≈ 19,56 лв." — the inline BGN equivalent shown next to a EUR price. */
export function bgnLabel(eur: number): string {
  return `≈ ${toBGN(eur)} лв.`;
}
