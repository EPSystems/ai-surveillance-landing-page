"use client";

import { useState } from "react";
import { AccordionItem } from "@/components/ui/Accordion";
import { SectionMarker } from "@/components/ui/SectionMarker";

const faqs = [
  {
    bg: "Трябват ли ми нови камери?",
    en: "Do I need new cameras?",
    answer:
      "Не. AI обработката се извършва на наши сървъри, а не на камерите ви. Свързваме се със съществуващото ви видеонаблюдение през RTSP или ONVIF. Повечето IP камери от всеки производител са съвместими.",
  },
  {
    bg: "Колко струва AI видеонаблюдението?",
    en: "How much does AI surveillance cost?",
    answer:
      "От €10 на камера на месец за план Basic или €18/камера/месец за Pro (включва ANPR и drive-off защита). Всички цени са с включен ДДС. Вижте пълните цени по-горе.",
  },
  {
    bg: "Нужен ли е охранителен лиценз, за да ползвам системата?",
    en: "Do I need a security licence to use this?",
    answer:
      "Не. Ние продаваме само софтуер — без охранителна или мониторинг услуга. Не е необходим лиценз за частна охранителна дейност, за да се абонирате за платформата. Ако искате жива охрана или реакция на място, можем да ви свържем с лицензирани партньорски фирми.",
  },
  {
    bg: "Как работи защитата срещу drive-off кражби?",
    en: "How does drive-off prevention work?",
    answer:
      "Нашият ANPR двигател (автоматично разпознаване на регистрационни номера) чете номерата при влизане на пистата. Те се сверяват срещу споделен регистър на drive-off нарушители. При съвпадение получавате сигнал за секунди — преди горивото да е заредено. На поддържани системи е налична и интеграция за блокиране на колонката.",
  },
  {
    bg: "Системата GDPR съвместима ли е?",
    en: "Is the system GDPR compliant?",
    answer:
      "Да. Не използваме лицево разпознаване или биометрична идентификация. Цялото видео се обработва в инфраструктура в ЕС. С всеки акаунт се предоставя договор за обработка на данни (DPA). Съветваме клиентите си и за изискванията за обозначителни табели и настройките за съхранение на записите.",
  },
  {
    bg: "Мога ли да се откажа по всяко време?",
    en: "Can I cancel anytime?",
    answer:
      "Да. Стандартните планове нямат дългосрочни договори. Отказвате с 30-дневно предизвестие. Без такси за прекратяване.",
  },
  {
    bg: "(За охранителни фирми) Ще разберат ли клиентите ми, че използвате вашата платформа?",
    en: "Will my clients know the platform is powered by you?",
    answer:
      "Не. В плановете White-Label и OEM клиентите виждат само вашия бранд — вашия домейн, вашето лого, вашето име на приложението. Нашата платформа не се споменава никъде в клиентското изживяване.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-edge py-20 md:py-28">
      <div className="container">
        <SectionMarker index="07" label="Въпроси" />
        <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl">
          Често задавани <span className="text-accent">въпроси</span>
        </h2>

        <div className="mt-12 max-w-3xl border-t border-edge">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.en}
              id={`faq-${i}`}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              question={faq.bg}
              questionSecondary={faq.en}
            >
              {faq.answer}
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}
