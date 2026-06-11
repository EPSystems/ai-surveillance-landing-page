"use client";

import { motion } from "framer-motion";
import { Bell, Plug, ScanEye } from "lucide-react";
import { DetectionFrame } from "@/components/ui/DetectionFrame";
import { SectionMarker } from "@/components/ui/SectionMarker";

const steps = [
  {
    icon: Plug,
    title: "Свързване",
    text: "Интегрираме се със съществуващите ви IP камери през RTSP/ONVIF. Без нов хардуер. Настройка за под 24 часа.",
  },
  {
    icon: ScanEye,
    title: "Детекция",
    text: "AI анализира живия поток 24/7. Drive-off, проникване, агресия, огън и дим — маркирани за милисекунди.",
  },
  {
    icon: Bell,
    title: "Реакция",
    text: "Незабавен сигнал с видеоклип към телефона ви, екипа ви или вашия мониторинг център.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-edge py-20 md:py-28">
      <div className="container">
        <SectionMarker index="02" label="Процесът" />
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl">
          От камера до сигнал <span className="text-accent">за секунди</span>
        </h2>

        <div className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Connector line — draws on scroll entry */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-accent/50 md:block"
          />
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-6 left-7 top-7 w-px origin-top bg-accent/50 md:hidden"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex gap-5 md:block"
            >
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center border border-edge bg-surface-card text-accent">
                <DetectionFrame corner="h-2 w-2" />
                <step.icon aria-hidden="true" size={24} strokeWidth={1.75} />
              </div>
              <div className="md:mt-6">
                <p className="font-mono text-xs tracking-[0.2em] text-accent">
                  0{i + 1} /
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm leading-relaxed text-ink-secondary">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-14 border-t border-edge pt-6 text-sm text-ink-secondary">
          Съвместимо с: Hikvision · Dahua · Axis · VIVOTEK · Hanwha · всяко устройство с ONVIF
          Profile S
        </p>
      </div>
    </section>
  );
}
