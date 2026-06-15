"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DetectionFrame } from "@/components/ui/DetectionFrame";
import { SectionMarker } from "@/components/ui/SectionMarker";

const anprSteps = [
  "Регистрационният номер се разчита още на входа на станцията.",
  "Сверява се в реално време срещу споделен регистър на drive-off нарушители.",
  "Незабавен сигнал към персонала, преди колонката да е активирана — с опция за pump-block интеграция.",
];

function CountUpStat() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current || reduced) return;
    const controls = animate(0, 70, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduced]);

  return (
    <p className="font-display text-[clamp(4.5rem,9vw,7rem)] font-black leading-none text-accent">
      до <span ref={ref}>70</span>
      {" "}%<span aria-hidden="true"></span>
    </p>
  );
}

/** Stylised detection-UI mockup — decorative, built entirely in CSS. */
function DetectionMockup() {
  return (
    <div
      role="img"
      aria-label="Илюстрация на интерфейса: камера на входа разпознава регистрационен номер CB 1234 AB и изпраща сигнал за известен drive-off нарушител."
      className="relative aspect-video overflow-hidden rounded-sm border border-edge bg-[#0d0d0d] shadow-hard"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-60" />

        {/* Camera status bar */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-edge bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-secondary">
          <span>CAM 02 · вход писта</span>
          <span className="flex items-center gap-1.5">
            <span className="animate-blink h-1.5 w-1.5 rounded-full bg-alert" />
            REC 14:32:08
          </span>
        </div>

        {/* Vehicle silhouette + bounding box */}
        <div className="absolute left-[12%] top-[36%] h-[34%] w-[46%]">
          <div className="absolute bottom-0 left-0 h-1/2 w-full rounded-sm bg-[#1e1e1e]" />
          <div className="absolute bottom-[46%] left-[16%] h-[42%] w-[52%] rounded-sm bg-[#181818]" />
          <div className="absolute -bottom-1.5 left-[14%] h-3.5 w-3.5 rounded-full bg-[#262626]" />
          <div className="absolute -bottom-1.5 right-[14%] h-3.5 w-3.5 rounded-full bg-[#262626]" />

          <div className="absolute -inset-2.5 border border-accent/80">
            <DetectionFrame corner="h-2.5 w-2.5" />
            <span className="absolute -top-[1.45rem] left-0 bg-accent px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-black">
              vehicle · 0.97
            </span>
          </div>

          <span className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-accent bg-black/90 px-2.5 py-1 font-mono text-xs font-bold tracking-[0.2em] text-accent">
            CB 1234 AB
          </span>
        </div>

        {/* Scanline */}
        <div className="animate-scan absolute inset-x-0 h-px bg-accent/40" />

        {/* Alert bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 border-t border-alert/40 bg-black/75 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-alert">
          <TriangleAlert size={13} strokeWidth={2} />
          Известен drive-off нарушител — сигнал изпратен
          <span className="animate-blink ml-auto h-1.5 w-1.5 bg-alert" />
        </div>
      </div>
    </div>
  );
}

export function PetrolSection() {
  return (
    <section
      id="petrol-stations"
      className="border-t border-edge py-20 md:py-28"
    >
      <div className="container">
        <SectionMarker index="03" label="Бензиностанции" />
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl">
          Създаден за <span className="text-accent">горивния сектор</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-secondary">
          Защото drive-off кражбите не са „дали“, а „кога“.
        </p>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <CountUpStat />
            <p className="mt-2 max-w-md text-lg font-medium text-ink">
              по-малко повторни drive-off инциденти
            </p>

            <ul className="mt-9 space-y-4 border-t border-edge pt-8">
              {anprSteps.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 leading-relaxed text-ink-secondary"
                >
                  <span className="font-mono text-sm font-bold text-accent">
                    0{i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>

            <p className="mt-7 font-medium text-ink">
              Работи с наличните камери на пистата — без нов хардуер.
            </p>

            <Button href="#contact" size="lg" className="mt-8">
              Запази безплатен оглед на обекта
              <ArrowRight aria-hidden="true" size={20} strokeWidth={2} />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <DetectionMockup />
          </motion.div>
        </div>

        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-ink-secondary">
          * На база международни внедрявания на ANPR системи за превенция на
          drive-off кражби. Резултатите варират според конфигурацията на обекта.
        </p>
      </div>
    </section>
  );
}
