import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BRAND, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Политика за бисквитки — ${BRAND}`,
  description: "Информация за използването на бисквитки (cookies) на уебсайта на SecureVision.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="container py-28 md:py-36">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl">
          Политика за <span className="text-accent">бисквитки</span>
        </h1>
        <p className="mt-4 text-sm text-ink-secondary">Последна актуализация: юни 2026 г.</p>

        <div className="mt-14 max-w-3xl space-y-10 text-ink-secondary leading-relaxed">

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              1. Какво са бисквитките?
            </h2>
            <p>
              Бисквитките (cookies) са малки текстови файлове, съхранявани от браузъра ви при
              посещение на даден уебсайт. Те могат да съдържат настройки, идентификатори на
              сесии или данни за проследяване.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              2. Използваме ли бисквитки?
            </h2>
            <p>
              <strong className="text-ink">{BRAND} не поставя рекламни или проследяващи бисквитки.</strong>{" "}
              За уеб анализ използваме{" "}
              <strong className="text-ink">Plausible Analytics</strong> — инструмент с отворен код,
              проектиран да зачита поверителността. Plausible:
            </p>
            <ul className="mt-3 space-y-1.5 pl-5 list-disc">
              <li>не поставя никакви бисквитки в браузъра ви</li>
              <li>не събира лични данни</li>
              <li>не проследява потребители между различни сайтове</li>
              <li>обработва данните в рамките на ЕС</li>
              <li>е съвместим с GDPR без необходимост от банер за съгласие за аналитиката</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              3. Технически бисквитки
            </h2>
            <p>
              Вашият браузър може да съхранява технически бисквитки, необходими единствено за
              нормалното функциониране на сайта (например за запазване на сесии при зареждане на
              страницата). Тези бисквитки не съдържат лични данни и не се използват за профилиране.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              4. Управление на бисквитките
            </h2>
            <p>
              Можете да управлявате или изтриете бисквитките чрез настройките на браузъра си.
              Тъй като не поставяме проследяващи бисквитки, деактивирането им няма да промени
              функционалността на сайта.
            </p>
            <p className="mt-3">
              Инструкции за основните браузъри:
            </p>
            <ul className="mt-3 space-y-1.5 pl-5 list-disc">
              <li>Chrome: Настройки → Поверителност и сигурност → Бисквитки</li>
              <li>Firefox: Настройки → Поверителност и защита</li>
              <li>Safari: Настройки → Поверителност</li>
              <li>Edge: Настройки → Бисквитки и разрешения за сайтове</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-ink">
              5. Въпроси
            </h2>
            <p>
              При въпроси относно бисквитките или обработката на данни се свържете с нас на{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
                {CONTACT_EMAIL}
              </a>
              . За информация относно личните данни вижте{" "}
              <a href="/privacy" className="text-accent hover:underline">
                Политиката за поверителност
              </a>
              .
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
