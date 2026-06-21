/**
 * Single source of truth for brand + contact identity.
 *
 * The final product name is still TBD — change BRAND here and it propagates
 * to the navbar logo, page metadata, JSON-LD structured data and footer.
 */
export const BRAND = "SecureVision";

export const TAGLINE =
  "AI видеонаблюдение за бизнеса. Работи с камерите, които вече имате.";

/** Public lead inbox; the API route honors a CONTACT_EMAIL env override. */
export const CONTACT_EMAIL = "engineering@epsystems.org";

/** Placeholder until the business line is provisioned — replace before launch. */
export const PHONE_DISPLAY = "089 2962 810";

/** Used when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is not set. */
export const PLAUSIBLE_FALLBACK_DOMAIN = "your-domain.bg";

export const NAV_LINKS = [
  { href: "#how-it-works", label: "Как работи" },
  { href: "#petrol-stations", label: "Бензиностанции" },
  { href: "#security-firms", label: "За охранителни фирми" },
  { href: "#pricing", label: "Цени" },
  { href: "#faq", label: "Въпроси" },
] as const;
