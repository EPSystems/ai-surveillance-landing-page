"use client";

import { motion } from "framer-motion";
import { ArrowRight, Fuel, ShieldCheck, Warehouse } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { preselectContactType } from "@/lib/contact-event";

type Vertical = {
  icon: typeof Fuel;
  label: string;
  headline: string;
  text: string;
  bullets: string[];
  cta: { label: string; href: string; onClick?: () => void };
  /** Renders a muted "pilot programme" status pill instead of treating it as a live vertical. */
  status?: string;
};

const verticals: Vertical[] = [
  {
    icon: Fuel,
    label: "Бензиностанции",
    headline: "Спрете drive-off кражбите",
    text: "ANPR разпознава номера на входа и алармира персонала, преди колонката да е активирана.",
    bullets: ["Разпознаване на регистрационни номера", "Сигнал с видеоклип за секунди", "Бърза възвръщаемост"],
    cta: { label: "Вижте за бензиностанции", href: "#petrol-stations" },
  },
  {
    icon: Warehouse,
    label: "Складове и логистика",
    headline: "Вижте всичко след работно време",
    text: "Аларми за зони с ограничен достъп и движение извън работно време — без видеото да напуска обекта.",
    bullets: ["Зони с ограничен достъп", "Аларми извън работно време", "Обработка локално, GDPR-съвместимо"],
    cta: {
      label: "Заявете пилот за склад",
      href: "#contact",
      onClick: () => preselectContactType("warehouse"),
    },
    status: "Пилотна програма",
  },
  {
    icon: ShieldCheck,
    label: "Охранителни фирми",
    headline: "Добавете AI под вашия бранд",
    text: "White-label платформа на вашия домейн и лого — нов приходен поток без инвестиция в R&D.",
    bullets: ["Изцяло брандиран dashboard", "Партньорски марж 40–60 %", "Без хардуерни проекти"],
    cta: {
      label: "Вижте за партньори",
      href: "#security-firms",
      onClick: () => preselectContactType("security"),
    },
  },
];

export function WhoItsForSection() {
  return (
    <section id="verticals" className="border-t border-edge py-20 md:py-28">
      <div className="container">
        <SectionMarker index="03" label="За кого е" />
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl">
          Един AI слой. <span className="text-accent">Три индустрии.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-secondary">
          Работи върху камерите, които вече имате. Открийте вашата индустрия по-долу.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {verticals.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              {...(v.label === "Складове и логистика" ? { id: "warehouses" } : {})}
            >
              <Card accentEdge accentShadow className="flex h-full flex-col p-7">
                <div className="flex items-center justify-between gap-3">
                  <v.icon aria-hidden="true" size={28} strokeWidth={1.75} className="text-accent" />
                  {v.status && (
                    <span className="border border-edge px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-secondary">
                      {v.status}
                    </span>
                  )}
                </div>

                <p className="mt-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {v.label}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-snug tracking-wide">
                  {v.headline}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-secondary">{v.text}</p>

                <ul className="mt-5 space-y-2.5">
                  {v.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-accent"
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href={v.cta.href}
                  onClick={v.cta.onClick}
                  className="group mt-7 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-accent"
                >
                  {v.cta.label}
                  <ArrowRight
                    aria-hidden="true"
                    size={17}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-ink-secondary">
          Друга индустрия — магазин, автокъща, производство? Системата работи навсякъде, където има
          IP камери.{" "}
          <a href="#contact" className="text-accent underline-offset-4 hover:underline">
            Свържете се с нас
          </a>{" "}
          и ще преценим заедно.
        </p>
      </div>
    </section>
  );
}
