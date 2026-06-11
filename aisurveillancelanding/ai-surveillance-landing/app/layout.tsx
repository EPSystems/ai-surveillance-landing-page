import type { Metadata, Viewport } from "next";
import { Fira_Sans_Condensed, Manrope } from "next/font/google";
import Script from "next/script";
import { MotionProvider } from "@/components/MotionProvider";
import { BRAND, PLAUSIBLE_FALLBACK_DOMAIN } from "@/lib/site";
import "./globals.css";

/*
  Display + body faces with full Cyrillic coverage. The PRD's first choices
  (Barlow Condensed / DM Sans) ship no Cyrillic subset on Google Fonts, which
  would break the Bulgarian copy — Fira Sans Condensed and Manrope are the
  closest pairing that keeps the condensed-industrial 700/900 display weights.
  Swap the faces here; everything downstream consumes the CSS variables.
*/
const display = Fira_Sans_Condensed({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.bg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${BRAND} — AI видеонаблюдение за бензиностанции и охранителни фирми`,
  description:
    "AI видеонаблюдение, което работи с вашите съществуващи камери. Drive-off защита за бензиностанции. Бяла марка за охранителни фирми. От €10/камера/месец.",
  keywords: [
    "AI видеонаблюдение",
    "видеонаблюдение изкуствен интелект",
    "drive-off кражби бензиностанция",
    "бяла марка охранителен софтуер",
    "ANPR България",
  ],
  openGraph: {
    title: `${BRAND} — AI Surveillance Software Bulgaria`,
    description:
      "AI video analytics for petrol stations and security firms. Works with existing cameras. From €10/camera/month.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? PLAUSIBLE_FALLBACK_DOMAIN;

  return (
    <html lang="bg" className={`${display.variable} ${body.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
        <Script
          defer
          strategy="afterInteractive"
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      </body>
    </html>
  );
}
