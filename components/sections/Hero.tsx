"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DetectionFrame } from "@/components/ui/DetectionFrame";

const TRUST_ITEMS = [
  "Работи със съществуващите камери",
  "GDPR съвместимо",
  "Без подмяна на камери",
  "Отказ по всяко време",
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28">
      {/* Atmosphere + technical overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(185,255,102,0.07),transparent_62%)]"
      />
      <div aria-hidden="true" className="bg-grid animate-grid-pan absolute -inset-16" />

      {/* Decorative detection boxes */}
      <div aria-hidden="true" className="absolute left-[6%] top-[20%] hidden h-24 w-36 lg:block">
        <DetectionFrame pulse />
        <span className="absolute -top-5 left-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          obj_01 · 0.92
        </span>
      </div>
      <div aria-hidden="true" className="absolute bottom-[18%] right-[8%] hidden h-40 w-56 xl:block">
        <DetectionFrame pulse className="[animation-delay:1.2s]" />
        <span className="absolute -top-5 right-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          zone_B · active
        </span>
      </div>
      <div aria-hidden="true" className="absolute right-[16%] top-[16%] hidden h-14 w-20 md:block">
        <DetectionFrame pulse className="[animation-delay:2.1s]" corner="h-2 w-2" />
      </div>

      <div className="container relative">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <Badge>AI видеонаблюдение · Само софтуер</Badge>
        </motion.div>

        {/* Static (no entrance animation): this is the LCP element — SSR-ing it
            at opacity:0 would push LCP past hydration. */}
        <h1 className="mt-7 max-w-5xl font-display text-[clamp(3rem,9vw,6rem)] font-black uppercase leading-[0.95] tracking-tight">
          Вашите камери вече
          <br />
          виждат всичко.
          <span className="block text-accent">Сега и действат.</span>
        </h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-secondary"
        >
          AI видеоанализ, който работи с камерите, които вече имате. Без подмяна на камери.
          Без лиценз за охранителна дейност. Отказ по всяко време.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Button href="#contact" size="lg">
            Запази безплатно демо
          </Button>
          <Button href="#security-firms" variant="ghost" size="lg">
            White-label за охранителни фирми
            <ArrowRight aria-hidden="true" size={20} strokeWidth={2} />
          </Button>
        </motion.div>

        <motion.ul
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-edge pt-6"
        >
          {TRUST_ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-ink-secondary">
              <Check aria-hidden="true" size={15} strokeWidth={2.5} className="text-accent" />
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
