import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BRAND, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Политика за поверителност — ${BRAND}`,
  description: "Информация за обработката на лични данни от SecureVision съгласно GDPR.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="container py-28 md:py-36">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl">
          Политика за <span className="text-accent">поверителност</span>
        </h1>
        <p className="mt-4 text-sm text-ink-secondary">Последна актуализация: юни 2026 г.</p>

        <div className="prose-policy mt-14 max-w-3xl space-y-10 text-ink-secondary leading-relaxed">

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              1. Администратор на лични данни
            </h2>
            <p>
              Администратор на личните ви данни е <strong className="text-ink">E&amp;P Systems</strong>{" "}
              (търговска марка <strong className="text-ink">{BRAND}</strong>). За въпроси, свързани с
              обработката на данни, можете да се свържете с нас на:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              2. Какви данни събираме
            </h2>
            <p>Събираме само данните, които вие доброволно предоставяте чрез контактната форма:</p>
            <ul className="mt-3 space-y-1.5 pl-5 list-disc">
              <li>Име (задължително)</li>
              <li>Телефонен номер (задължително)</li>
              <li>Имейл адрес (по избор)</li>
              <li>Тип клиент (бензиностанция / охранителна фирма / друг)</li>
              <li>Приблизителен брой камери</li>
              <li>Свободен текст (съобщение, по избор)</li>
            </ul>
            <p className="mt-3">
              Освен това нашата аналитична платформа (Plausible Analytics) събира анонимизирани
              данни за посещенията — без лични данни и без бисквитки. Вижте{" "}
              <a href="/cookie-policy" className="text-accent hover:underline">
                Политиката за бисквитки
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              3. Цел и правно основание
            </h2>
            <p>
              Данните се обработват единствено за целите на отговор на вашата заявка за безплатно
              демо и провеждане на консултация. Правното основание е вашето изрично съгласие
              (чл. 6, ал. 1, буква „а" от GDPR), дадено чрез маркиране на полето за съгласие в
              контактната форма.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              4. Срок на съхранение
            </h2>
            <p>
              Данните ви се съхраняват за срок от <strong className="text-ink">12 месеца</strong>{" "}
              от датата на получаване, освен ако не бъде сключен договор — в такъв случай
              данните се съхраняват съгласно законовите счетоводни изисквания (до 5 години).
              След изтичане на срока данните се изтриват безвъзвратно.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              5. Получатели и обработващи
            </h2>
            <p>Данните ви не се продават и не се споделят с трети страни за маркетингови цели. Използваме следните обработващи лични данни:</p>
            <ul className="mt-3 space-y-1.5 pl-5 list-disc">
              <li>
                <strong className="text-ink">Resend Inc.</strong> — доставка на имейл с вашите данни
                от формата до нашия входящ имейл. Данните се обработват в съответствие с GDPR.
              </li>
              <li>
                <strong className="text-ink">Vercel Inc.</strong> — хостинг на приложението. Данните
                от формата се обработват в сървъри в ЕС/ЕИП.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              6. Вашите права
            </h2>
            <p>Съгласно GDPR имате следните права:</p>
            <ul className="mt-3 space-y-1.5 pl-5 list-disc">
              <li>Право на достъп до данните, които съхраняваме за вас</li>
              <li>Право на коригиране на неточни данни</li>
              <li>Право на изтриване („право да бъдете забравени")</li>
              <li>Право на преносимост на данните</li>
              <li>Право на възражение срещу обработването</li>
              <li>Право на оттегляне на съгласието по всяко време</li>
            </ul>
            <p className="mt-3">
              За упражняване на правата си изпратете имейл до{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
                {CONTACT_EMAIL}
              </a>
              . Отговаряме до 30 дни.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              7. Право на жалба
            </h2>
            <p>
              Ако смятате, че правата ви са нарушени, имате право да подадете жалба до{" "}
              <strong className="text-ink">Комисия за защита на личните данни (КЗЛД)</strong>,
              гр. София, бул. „Проф. Цветан Лазаров" № 2,{" "}
              <a
                href="https://www.cpdp.bg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                www.cpdp.bg
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              8. Промени в политиката
            </h2>
            <p>
              При съществена промяна в начина на обработка на данните ще актуализираме тази
              страница и ще посочим новата дата на актуализация в горната част.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
