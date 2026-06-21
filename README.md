# ai-surveillance-landing

Single-page marketing site for the E&P Systems AI video-surveillance SaaS
(brand placeholder: **SecureVision**), targeting the Bulgarian market: direct sales
to petrol stations (ANPR / drive-off prevention) and a white-label program for
licensed security firms.

**Stack:** Next.js 14 (App Router, SSG) · Tailwind CSS v3 · Framer Motion ·
React Hook Form + Zod · Resend · Plausible · lucide-react. The page is fully
static; the only server code is the `/api/contact` route (Vercel serverless
function) that emails form submissions via Resend.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY at minimum
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` for a production build; `npm run typecheck` for TS.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes (for form delivery) | Resend API key |
| `RESEND_FROM` | no | Sender; defaults to `onboarding@resend.dev` (sandbox — delivers only to the Resend account owner; use an address on a verified domain in production) |
| `CONTACT_EMAIL` | no | Lead recipient; defaults to `engineering@epsystems.org` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | no | Plausible site domain; defaults to the `your-domain.bg` placeholder |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical URL for Open Graph metadata |

## Deploy to Vercel

1. Import the repository in Vercel (framework auto-detected as Next.js — no
   `vercel.json` needed). If this folder lives inside another repository, set
   **Settings → General → Root Directory** to `ai-surveillance-landing`.
2. Add the environment variables above (at minimum `RESEND_API_KEY`).
3. Deploy. The page is prerendered statically; `/api/contact` becomes a
   serverless function.

## Moving this folder into its own repository

The app is fully self-contained — nothing references the parent repo:

```bash
cp -r ai-surveillance-landing ~/new-location && cd ~/new-location
rm -rf node_modules .next
git init && git add -A && git commit -m "Initial import"
git remote add origin <new-repo-url> && git push -u origin main
```

## Customisation notes

- **Brand name** — change `BRAND` in `lib/site.ts`; it propagates to the
  navbar, metadata, JSON-LD and footer. Phone number and lead email live in
  the same file.
- **Fonts** — the PRD specified Barlow Condensed + DM Sans, but neither ships
  a Cyrillic subset on Google Fonts, which would break the Bulgarian copy.
  The site uses **Fira Sans Condensed (700/900)** + **Manrope (400/500)** —
  the closest pairing with full Cyrillic. Both are wired through the
  `--font-display` / `--font-body` CSS variables in `app/layout.tsx`; swapping
  faces later is a one-line change there.
- **Design tokens** — CSS variables in `app/globals.css`, mirrored as hex
  literals in `tailwind.config.ts` (keep in sync).

## Before launch (placeholders to replace)

- [ ] Phone number `02 / XXX XXXX` in `lib/site.ts`
- [ ] `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` + register the site in Plausible
- [ ] `NEXT_PUBLIC_SITE_URL` once the domain is chosen
- [ ] `RESEND_FROM` on a verified Resend domain
- [ ] Privacy / cookie policy pages (footer currently shows them as plain
      text, not links, so nothing 404s)
- [ ] Final brand name in `lib/site.ts`
