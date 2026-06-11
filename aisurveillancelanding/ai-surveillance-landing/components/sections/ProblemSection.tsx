"use client";

import { motion } from "framer-motion";
import { Fuel, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionMarker } from "@/components/ui/SectionMarker";

const problems = [
  {
    icon: Fuel,
    audience: "За бензиностанции",
    headline: "Камерите ви записват всеки drive-off. Записът обаче не връща парите.",
    bullets: [
      "Drive-off кражбите струват на българските бензиностанции милиони всяка година.",
      "Персоналът не може да гледа всички камери, докато обслужва клиенти.",
      "Класическото видеонаблюдение е архив за после — не е превенция.",
    ],
  },
  {
    icon: ShieldAlert,
    audience: "За охранителни фирми",
    headline: "Клиентите ви питат за AI. Конкурентите ви вече го предлагат.",
    bullets: [
      "Имате инфраструктура за мониторинг, но нямате собствен AI продукт.",
      "Изграждането на AI софтуер от нулата струва над €50 000.",
      "Всеки месец без AI услуга в портфолиото е риск от отлив на клиенти.",
    ],
  },
];

export function ProblemSection() {
  return (
    <section className="border-t border-edge py-20 md:py-28">
      <div className="container">
        <SectionMarker index="01" label="Проблемът" />

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-8">
          {problems.map((p, i) => (
            <motion.div
              key={p.audience}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Card accentEdge accentShadow className="h-full p-7 md:p-9">
                <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  <p.icon aria-hidden="true" size={16} strokeWidth={2} />
                  {p.audience}
                </p>
                <h2 className="mt-5 font-display text-2xl font-bold uppercase leading-snug tracking-wide md:text-3xl">
                  {p.headline}
                </h2>
                <ul className="mt-6 space-y-3.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed text-ink-secondary">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-accent"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
