"use client";

import { motion } from "framer-motion";
import { Check, Link2, Rocket, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { preselectContactType } from "@/lib/contact-event";

const features = [
  {
    icon: Rocket,
    title: "Готово за дни",
    text: "Брандиран dashboard на вашия домейн. Вашето лого. Вашите цветове. Внедряване за под седмица.",
  },
  {
    icon: TrendingUp,
    title: "Вашият марж, вашата цена",
    text: "Ние доставяме на цена на едро. Вие определяте крайната. Типичен партньорски марж: 40–60 %.",
  },
  {
    icon: Link2,
    title: "Без хардуерни битки",
    text: "Свързваме се с наличните камери на клиентите ви. Без принудителни ъпгрейди. Без изгубени сделки.",
  },
];

const partnerPerks = [
  ["White-label уеб dashboard", "Собствен домейн + SSL", "Управление на под-акаунти", "Цени на едро на камера"],
  ["Ко-брандирано мобилно приложение (по-висок клас)", "Личен onboarding", "Партньорски портал", "Готови търговски материали"],
];

export function WhiteLabelSection() {
  return (
    <section id="security-firms" className="border-t border-edge bg-surface-raised py-20 md:py-28">
      <div className="container">
        <SectionMarker index="04" label="White-label" />
        <h2 className="mt-5 max-w-4xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl">
          Вашият бранд. Нашият AI.{" "}
          <span className="text-accent">Клиентите ви няма да усетят разликата.</span>
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Card accentShadow className="h-full p-7">
                <f.icon aria-hidden="true" size={26} strokeWidth={1.75} className="text-accent" />
                <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-wide">
                  {f.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-secondary">{f.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 border-t border-edge pt-10">
          <h3 className="font-display text-xl font-bold uppercase tracking-wide">
            Какво получават партньорите
          </h3>
          <div className="mt-6 grid gap-x-12 gap-y-3.5 sm:grid-cols-2">
            {partnerPerks.flat().map((perk) => (
              <p key={perk} className="flex items-start gap-3 text-ink-secondary">
                <Check
                  aria-hidden="true"
                  size={17}
                  strokeWidth={2.5}
                  className="mt-1 shrink-0 text-accent"
                />
                {perk}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-5">
          <Button href="#contact" size="lg" onClick={() => preselectContactType("security")}>
            Кандидатствай за партньорски акаунт
          </Button>
          <p className="text-sm text-ink-secondary">
            В момента приемаме избрани партньори в София, Пловдив, Варна и Бургас.
          </p>
        </div>
      </div>
    </section>
  );
}
