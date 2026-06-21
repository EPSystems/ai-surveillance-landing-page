"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { bgnLabel } from "@/lib/currency";
import { cn } from "@/lib/utils";

type Tier = {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  highlight?: boolean;
  /** Per-camera monthly rate for the calculator; omit for custom/contact tiers. */
  unitPrice?: number;
  /** Prefix estimate with „от“ (white-label minimum rates). */
  estimateFrom?: boolean;
};

const directTiers: Tier[] = [
  {
    id: "basic",
    name: "Basic",
    price: "€10",
    priceNote: "/камера/мес.",
    unitPrice: 10,
    features: ["Детекция на движение", "Контрол на зони", "Сигнали 24/7", "7 дни съхранение"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "€18",
    priceNote: "/камера/мес.",
    unitPrice: 18,
    highlight: true,
    features: [
      "Всичко от Basic",
      "ANPR / drive-off защита",
      "Аларми извън работно време",
      "30 дни съхранение",
    ],
  },
  {
    id: "site-pack",
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
    id: "reseller",
    name: "Reseller",
    price: "от €6",
    priceNote: "/камера/мес.",
    unitPrice: 6,
    estimateFrom: true,
    features: ["Ко-брандиран dashboard", "Минимум 10 камери", "Вие определяте крайната цена"],
  },
  {
    id: "white-label",
    name: "White-Label",
    price: "от €8",
    priceNote: "/камера/мес.",
    unitPrice: 8,
    estimateFrom: true,
    features: ["Изцяло брандиран dashboard + домейн", "Минимум 20 камери", "Под-акаунти за вашите клиенти"],
  },
  {
    id: "oem",
    name: "OEM / Full Custom",
    price: "Свържете се",
    features: ["Собствено мобилно приложение", "Гарантирано SLA", "Личен акаунт мениджър"],
  },
];

function TierCard({
  tier,
  selected,
  onSelect,
}: {
  tier: Tier;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      accentShadow={selected}
      className={cn(
        "relative cursor-pointer p-6 transition-all duration-200 hover:border-accent/60 h-full flex flex-col justify-between",
        selected ? "border-accent bg-surface-raised" : tier.highlight ? "border-accent/40 bg-surface-card" : "bg-surface-card"
      )}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          {tier.highlight && (
            <span className="absolute -top-3 right-5 bg-accent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black z-20">
              Най-избиран
            </span>
          )}
          <div className="flex flex-col gap-2">
            <h4 className="font-display text-xl font-bold uppercase tracking-wide text-ink">{tier.name}</h4>
            <p className="flex items-baseline gap-1 flex-wrap">
              <span className="font-display text-3xl font-black text-accent">{tier.price}</span>
              {tier.priceNote && <span className="text-sm text-ink-secondary">{tier.priceNote}</span>}
            </p>
            {tier.unitPrice != null && (
              <p className="text-xs text-ink-secondary">
                {bgnLabel(tier.unitPrice)}
                {tier.priceNote}
              </p>
            )}
          </div>
          <ul className="mt-5 space-y-2.5 border-t border-edge pt-5">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                <Check aria-hidden="true" size={15} strokeWidth={2.5} className="mt-0.5 shrink-0 text-accent" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 pt-4 border-t border-edge/30">
          <div
            className={cn(
              "w-full text-center py-2.5 font-display text-xs font-bold uppercase tracking-wider border transition-all duration-150",
              selected
                ? "bg-accent border-accent text-black font-black"
                : "border-edge text-ink-secondary hover:border-accent/40 hover:text-ink"
            )}
          >
            {selected ? "Избран" : "Избери план"}
          </div>
        </div>
      </div>
    </Card>
  );
}

function Calculator({ tier }: { tier: Tier }) {
  const [cameras, setCameras] = useState(6);
  const clamped = Math.min(500, Math.max(1, cameras || 1));

  const estimate =
    tier.unitPrice != null
      ? `${tier.estimateFrom ? "от " : ""}€${clamped * tier.unitPrice}`
      : tier.price;

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
          disabled={tier.unitPrice == null}
          value={tier.unitPrice == null ? "" : (Number.isNaN(cameras) ? "" : cameras)}
          placeholder={tier.unitPrice == null ? "—" : ""}
          onChange={(e) => setCameras(e.target.valueAsNumber)}
          onBlur={() => setCameras(clamped)}
          className="mt-3 block w-32 rounded-sm border border-edge bg-surface px-3.5 py-2.5 font-mono text-lg text-ink focus:border-accent focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        />
      </div>
      <div aria-live="polite" className="text-lg text-ink-secondary">
        {tier.unitPrice != null ? (
          <p>
            Ориентировъчно месечно:{" "}
            <span className="font-display text-3xl font-black text-accent">{estimate}</span>{" "}
            <span className="text-sm">
              ({tier.estimateFrom ? "от " : ""}
              {bgnLabel(clamped * tier.unitPrice)})
            </span>{" "}
            <span className="text-sm">(план {tier.name})</span>
          </p>
        ) : (
          <p>
            Цена за плана:{" "}
            <span className="font-display text-3xl font-black text-accent">{tier.price}</span>{" "}
            <span className="text-sm">(план {tier.name})</span>
          </p>
        )}
      </div>
    </Card>
  );
}

export function PricingSection() {
  const defaultDirectId = directTiers.find((t) => t.highlight)?.id ?? directTiers[0].id;
  const [selectedDirectId, setSelectedDirectId] = useState(defaultDirectId);
  const [selectedWhiteLabelId, setSelectedWhiteLabelId] = useState(whiteLabelTiers[0].id);
  const [activeGroup, setActiveGroup] = useState<"direct" | "whitelabel">("direct");

  const currentTiers = activeGroup === "direct" ? directTiers : whiteLabelTiers;
  const currentSelectedId = activeGroup === "direct" ? selectedDirectId : selectedWhiteLabelId;

  const handleSelectTier = (id: string) => {
    if (activeGroup === "direct") {
      setSelectedDirectId(id);
    } else {
      setSelectedWhiteLabelId(id);
    }
  };

  const calcTier = currentTiers.find((t) => t.id === currentSelectedId) ?? currentTiers[0];

  return (
    <section id="pricing" className="border-t border-edge py-20 md:py-28">
      <div className="container">
        <SectionMarker index="06" label="Цени" />
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl">
          Прозрачни цени. <span className="text-accent">Без изненади.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-secondary">
          За разлика от конкуренти, които се крият зад „обади се за оферта“ — ние публикуваме
          числата си.
        </p>

        {/* Tab/Group Selector */}
        <div className="mt-12 flex flex-col items-center justify-center">
          <div className="relative flex w-full max-w-lg border border-edge bg-surface p-1">
            <button
              onClick={() => setActiveGroup("direct")}
              className={cn(
                "relative z-10 w-1/2 py-3 font-display text-sm font-bold uppercase tracking-wide transition-colors duration-200",
                activeGroup === "direct" ? "text-black font-black" : "text-ink-secondary hover:text-ink"
              )}
            >
              {activeGroup === "direct" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-20">Директни планове</span>
            </button>
            <button
              onClick={() => setActiveGroup("whitelabel")}
              className={cn(
                "relative z-10 w-1/2 py-3 font-display text-sm font-bold uppercase tracking-wide transition-colors duration-200",
                activeGroup === "whitelabel" ? "text-black font-black" : "text-ink-secondary hover:text-ink"
              )}
            >
              {activeGroup === "whitelabel" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-20">White-Label за партньори</span>
            </button>
          </div>
          <p className="mt-4 text-center text-sm text-ink-secondary max-w-md h-10 flex items-center justify-center">
            {activeGroup === "direct"
              ? "Предназначени за крайни клиенти — самостоятелни обекти, складове, магазини и бензиностанции."
              : "Предназначени за охранителни фирми и интегратори, предлагащи услугата под собствен бранд."}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-10 min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid gap-6 md:grid-cols-3"
              role="radiogroup"
              aria-label={activeGroup === "direct" ? "Директни планове" : "White-label планове"}
            >
              {currentTiers.map((t) => (
                <TierCard
                  key={t.id}
                  tier={t}
                  selected={currentSelectedId === t.id}
                  onSelect={() => handleSelectTier(t.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-10 border-t border-edge pt-6 text-sm text-ink-secondary">
          Всички цени са с включен ДДС · Без такса за инсталация · Отказ по всяко време ·
          Финалната цена се потвърждава след безплатен оглед на обекта
        </p>
        <p className="mt-3 text-xs text-ink-secondary">
          Цените са в евро; левовата равностойност е по фиксирания курс 1 € = 1,95583 лв.
        </p>

        <Calculator tier={calcTier} />
      </div>
    </section>
  );
}
