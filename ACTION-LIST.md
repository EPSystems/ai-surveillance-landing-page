# SecureVision — Launch Action List

## Decision / Business

- [x] **1. Finalize brand name** — decided: SecureVision
- [ ] **2. Register a `.bg` domain** — then set `NEXT_PUBLIC_SITE_URL` in Vercel

## Code / Configuration

- [x] **3. Replace SENTINEL placeholder in `lib/site.ts`** — done: brand, phone TBD, email confirmed
- [ ] **3a. Set real phone number** — replace `02 / XXX XXXX` in `lib/site.ts:15`
- [x] **4. Privacy Policy and Cookie Policy pages** — `/privacy` and `/cookie-policy` live

## Infrastructure / Setup

- [x] **5. Set up Resend** — API key in `.env` / Vercel env vars; verify sender domain before launch
- [ ] **6. Deploy to Vercel** — import repo, set root dir to `ai-surveillance-landing-page`, add env vars
- [ ] **7. Plausible Analytics** — deferred; set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` when ready

## Testing

- [ ] **8. End-to-end test contact form in production** — submit a real demo request, verify email delivery

## Product & Operations

- [ ] **9. Confirm AI backend product exists** — ANPR engine, dashboard, EU cloud infra, white-label setup
- [ ] **10. Set up lead handling process** — CRM or inbox workflow; target: respond within 1 working day
