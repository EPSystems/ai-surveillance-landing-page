import { ContactSection } from "@/components/sections/ContactSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Navbar } from "@/components/sections/Navbar";
import { PetrolSection } from "@/components/sections/PetrolSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { WhiteLabelSection } from "@/components/sections/WhiteLabelSection";
import { BRAND } from "@/lib/site";

export const dynamic = "force-static";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND,
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "10",
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "10",
      priceCurrency: "EUR",
      unitText: "camera/month",
    },
  },
  areaServed: "BG",
  description:
    "AI video surveillance software for Bulgarian businesses. Works with existing cameras.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <PetrolSection />
        <WhiteLabelSection />
        <PricingSection />
        <TrustSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
