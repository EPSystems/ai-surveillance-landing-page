"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  highlight?: boolean;
};

const directTiers: Tier[] = [
  {
    name: "Basic",
    price: "€10",
    priceNote: "/камера/мес.",
    features: ["Детекция на движение", "Контрол на зони", "Сигнали 24/7", "7 дни съхранение"],
  },
  {
    name: "Pro",
    price: "€18",
    priceNote: "/камера/мес.",
    highlight: true,
    features: [
      "Всичко от Basic",
      "ANPR / drive-off защита",
      "Детекция на агресия",
      "Огън и дим",
      "30 дни съхранение",
    ],
  },
  {
    name: "Site Pack",
    price: "По договаряне",
    features: [
      "Фиксирана месечна цена на обект",
      "За обекти с 4–8 камери",
      "Pro функционалност",
      "Свържете се за оферта",
    ],
  },
];

const whiteLabelTiers: Tier[] = [
  {
    name: "Reseller",
    price: "от €6",
    priceNote: "/камера/мес.",
    features: ["Ко-брандиран dashboard", "Минимум 10 камери", "Вие определяте крайната цена"],
  },
  {
    name: "White-Label",
    price: "от €8",
    priceNote: "/камера/мес.",
    features: ["Изцяло брандиран dashboard + домейн", "Минимум 20 камери", "Под-акаунти за вашите клиенти"],
  },
  {
    name: "OEM / Full Custom",
    price: "Свържете се",
    features: ["Собствено мобилно приложение", "Гарантирано SLA", "Личен акаунт мениджър"],
  },
];

function TierCard({ tier }: { tier: Tier }) {
  return (
    <Card
      accentShadow={tier.highlight}
      className={cn("relative p-6", tier.highlight && "border-accent")}
    >
      {tier.highlight && (
        <span className="absolute -top-3 right-5 bg-accent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black">
          Най-избиран
        </span>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h4 className="font-display text-xl font-bold uppercase tracking-wide">{tier.name}</h4>
        <p>
          <span className="font-display text-3xl font-black text-accent">{tier.price}</span>
          {tier.priceNote && <span className="ml-1 text-sm text-ink-secondary">{tier.priceNote}</span>}
        </p>
      </div>
      <ul className="mt-5 space-y-2.5 border-t border-edge pt-5">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-ink-secondary">
            <Check aria-hidden="true" size={15} strokeWidth={2.5} className="mt-0.5 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Calculator() {
  const [cameras, setCameras] = useState(6);
  const clamped = Math.min(500, Math.max(1, cameras || 1));

  return (
    <Card className="mt-12 flex flex-col gap-5 p-7 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <label
          htmlFor="calc-cameras"
          className="font-display text-lg font-bold uppercase tracking-wide"
        >
          Колко камери имате?
        </label>
        <input
          id="calc-cameras"
          type="number"
          min={1}
          max={500}
          value={Number.isNaN(cameras) ? "" : cameras}
          onChange={(e) => setCameras(e.target.valueAsNumber)}
          onBlur={() => setCameras(clamped)}
          className="mt-3 block w-32 rounded-sm border border-edge bg-surface px-3.5 py-2.5 font-mono text-lg text-ink focus:border-accent focus:outline-none"
        />
      </div>
      <p aria-live="polite" className="text-lg text-ink-secondary">
        Ориентировъчно месечно:{" "}
        <span className="font-display text-3xl font-black text-accent">€{clamped * 18}</span>{" "}
        <span className="text-sm">(план Pro)</span>
      </p>
    </Card>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="border-t border-edge py-20 md:py-28">
      <div className="container">
        <SectionMarker index="05" label="Цени" />
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl">
          Прозрачни цени. <span className="text-accent">Без изненади.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-secondary">
          За разлика от конкуренти, които се крият зад „обади се за оферта“ — ние публикуваме
          числата си.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
              Директно <span className="text-ink-secondary">— бизнес и бензиностанции</span>
            </h3>
            <div className="mt-6 space-y-6">
              {directTiers.map((t) => (
                <TierCard key={t.name} tier={t} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
              White-label <span className="text-ink-secondary">— охранителни фирми</span>
            </h3>
            <div className="mt-6 space-y-6">
              {whiteLabelTiers.map((t) => (
                <TierCard key={t.name} tier={t} />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-edge pt-6 text-sm text-ink-secondary">
          Всички цени са с включен ДДС · Без такса за инсталация · Отказ по всяко време ·
          Финалната цена се потвърждава след безплатен оглед на обекта
        </p>

        <Calculator />
      </div>
    </section>
  );
}
