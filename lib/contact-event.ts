import type { ContactType } from "@/lib/contact-schema";

/**
 * Lightweight cross-section channel: lets the white-label CTA pre-select
 * "Охранителна фирма" in the contact form without coupling the two sections.
 * Browser-only — call from client components.
 */
const EVENT = "contact:preselect";

export function preselectContactType(type: ContactType) {
  window.dispatchEvent(new CustomEvent<ContactType>(EVENT, { detail: type }));
}

export function onContactPreselect(callback: (type: ContactType) => void) {
  const handler = (e: Event) => callback((e as CustomEvent<ContactType>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
