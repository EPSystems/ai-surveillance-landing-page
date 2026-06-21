import { Badge } from "@/components/ui/Badge";
import { SectionMarker } from "@/components/ui/SectionMarker";

const differentiators = [
  "Публикуваме реални показатели за точност на детекцията и нива на фалшивите аларми.",
  "30 дни безплатен тест, преди да се ангажирате с какъвто и да е абонамент.",
  "Само не-биометричен анализ — без лицево разпознаване (в съответствие с чл. 9 от GDPR).",
];

const complianceBadges = [
  "GDPR съвместимо",
  "В съответствие с EU AI Act",
  "Данни, обработвани в ЕС",
  "Осигурен DPA договор",
  "Без лицево разпознаване",
];

const cameraBrands = ["Hikvision", "Dahua", "Axis", "VIVOTEK", "Hanwha", "ONVIF"];

export function TrustSection() {
  return (
    <section className="border-t border-edge bg-surface-raised py-20 md:py-24">
      <div className="container">
        <SectionMarker index="07" label="Доверие" />

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="max-w-xl font-display text-3xl font-black uppercase leading-tight tracking-tight md:text-4xl">
              Защо сме различни от <span className="text-accent">„AI-powered“ обещанията</span>
            </h2>
            <ul className="mt-7 space-y-4">
              {differentiators.map((d) => (
                <li key={d} className="flex gap-3 leading-relaxed text-ink-secondary">
                  <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-ink-secondary">
              Съответствие
            </h3>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-6">
              {complianceBadges.map((b) => (
                <Badge key={b} hard>
                  {b}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-edge pt-8">
          <span className="text-sm font-medium text-ink">Работи с:</span>
          {cameraBrands.map((brand) => (
            <span
              key={brand}
              className="rounded-full border border-edge px-3.5 py-1 text-sm text-ink-secondary"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
