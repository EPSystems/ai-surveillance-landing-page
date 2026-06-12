import { BRAND, NAV_LINKS, TAGLINE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-edge py-14">
      <div className="container grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold uppercase tracking-[0.18em] text-accent">
            {BRAND}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-secondary">{TAGLINE}</p>
        </div>

        <nav aria-label="Навигация в сайта">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-secondary">
            Навигация
          </p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-ink-secondary transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-secondary">
            Правна информация
          </p>
          <p className="mt-4 text-sm text-ink-secondary">
            © 2026 {BRAND} · GDPR · Политика за поверителност · Политика за бисквитки
          </p>
          <p className="mt-4 text-xs leading-relaxed text-ink-secondary">
            Само софтуерен продукт. За доставката на софтуер не се изисква и не се притежава
            лиценз за частна охранителна дейност.
          </p>
        </div>
      </div>
    </footer>
  );
}
