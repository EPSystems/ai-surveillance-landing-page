# CLAUDE.md

Guidance for working in this repository.

## What this is

Single-page marketing site for E&P Systems' AI video-surveillance SaaS (brand
placeholder: **SecureVision**), targeting the **Bulgarian market**. Two audiences:
petrol stations (ANPR / drive-off prevention) and a white-label program for
licensed security firms. **All visible copy is in Bulgarian (Cyrillic)** —
preserve the language when editing UI text.

The page is fully static (SSG). The only server code is the `/api/contact`
route, which emails form submissions via Resend.

## Stack

Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS v3 · Framer Motion
· React Hook Form + Zod · Resend · Plausible · lucide-react.

## Commands

```bash
npm run dev         # dev server at http://localhost:3000
npm run build       # production build
npm start           # serve the production build
npm run typecheck   # tsc --noEmit  (run this to validate; there is no test suite)
```

There is no linter or test runner configured — `npm run typecheck` is the
verification gate.

## Layout

```
app/
  layout.tsx            root layout: fonts, metadata, Plausible, MotionProvider
  page.tsx              the single page — composes all sections in order; force-static + JSON-LD
  globals.css           design tokens (CSS vars) + base styles + grid utility
  api/contact/route.ts  POST handler: validates with contactSchema, sends via Resend
components/
  sections/             one component per page section (Hero, PricingSection, ...)
  ui/                   reusable primitives (Button, Card, Badge, Accordion, ...)
  MotionProvider.tsx    "use client" wrapper for Framer Motion reduced-motion config
lib/
  site.ts               brand/contact constants + nav links (single source of truth)
  contact-schema.ts     Zod schema shared by the client form AND the API route
  contact-event.ts      browser CustomEvent bus for cross-section form preselect
  utils.ts              cn() — clsx + tailwind-merge
```

Path alias: `@/*` maps to the repo root (e.g. `@/lib/site`).

## Conventions

- **Server vs client components.** Default to server components. Add `"use
  client"` only when needed (Framer Motion, hooks, form state) — e.g. `Hero`,
  `ContactSection`, `MotionProvider`. UI primitives like `Button`/`Card` are
  server components.
- **Brand & contact info live in `lib/site.ts`.** Never hardcode the brand name,
  phone, email, or nav links — import from there. `BRAND` propagates to navbar,
  metadata, JSON-LD and footer.
- **The contact Zod schema is shared.** `lib/contact-schema.ts` is used by both
  the client form (`zodResolver`) and the server route (`safeParse`) so they
  cannot drift. Change validation in one place only.
- **Styling is utility-first Tailwind** with `cn()` for merging. Use the
  semantic color tokens (`surface`, `accent`, `ink`, `edge`, `alert`) rather
  than raw hex.
- **Design tokens are mirrored in two places that MUST stay in sync:** CSS
  variables in `app/globals.css` and hex literals in `tailwind.config.ts`
  (literals, not `var()`, so Tailwind `/alpha` modifiers work). Edit both.
- **Visual style:** dark "technical/industrial" theme — hard offset shadows
  (`shadow-hard*`), uppercase condensed display font, monospace technical labels,
  lime accent `#B9FF66`. Press-down button interaction travels into its shadow.
- **Accessibility matters here:** keep `aria-*` attributes, `role` markers,
  `aria-live` regions, and `aria-hidden` on decorative elements. Animations
  honor `prefers-reduced-motion` (via `MotionProvider` + a CSS fallback in
  `globals.css`).
- **Fonts:** Fira Sans Condensed (display) + Manrope (body), both with Cyrillic
  subsets, wired via `--font-display` / `--font-body` in `app/layout.tsx`. The
  PRD's original Barlow Condensed / DM Sans were rejected for lacking Cyrillic.

## Environment variables

Only `RESEND_API_KEY` is required for the contact form to deliver. Optional:
`RESEND_FROM` (defaults to Resend's sandbox sender), `CONTACT_EMAIL`,
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `NEXT_PUBLIC_SITE_URL`. See README.md for the
full table and the pre-launch placeholder checklist.

## Gotchas

- The Hero `<h1>` is intentionally NOT animated — it's the LCP element, so
  SSR-ing it at `opacity:0` would hurt Largest Contentful Paint. Don't wrap it
  in a `motion` entrance animation.
- `lib/contact-event.ts` is browser-only — call its functions from client
  components inside effects.
- `page.tsx` exports `dynamic = "force-static"`; the route stays prerendered.
