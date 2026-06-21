"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown, Clock, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { onContactPreselect } from "@/lib/contact-event";
import {
  contactSchema,
  contactTypeLabels,
  contactTypes,
  type ContactPayload,
} from "@/lib/contact-schema";
import { CONTACT_EMAIL, PHONE_DISPLAY } from "@/lib/site";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-sm border border-edge bg-surface px-3.5 py-3 text-ink placeholder:text-ink-secondary focus:border-accent focus:outline-none";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-alert">
      {message}
    </p>
  );
}

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      type: "petrol",
      cameras: 4,
      message: "",
      consent: false,
    },
  });

  useEffect(
    () => onContactPreselect((type) => setValue("type", type, { shouldValidate: false })),
    [setValue]
  );

  const onSubmit = async (values: ContactPayload) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;
      if (res.ok && json?.success) {
        setStatus("success");
      } else {
        setServerError(json?.error ?? "Възникна грешка при изпращането.");
        setStatus("error");
      }
    } catch {
      setServerError("Връзката не успя. Проверете интернета си и опитайте отново.");
      setStatus("error");
    }
  };

  const submit = handleSubmit(onSubmit);

  return (
    <section id="contact" className="border-t border-edge bg-surface-raised py-20 md:py-28">
      <div className="container">
        <SectionMarker index="09" label="Контакт" />
        <h2
          id="contact-heading"
          className="mt-5 max-w-3xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl"
        >
          Да поговорим <span className="text-accent">за вашия обект</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-secondary">
          Безплатно демо. Без ангажимент. Отговаряме до 1 работен ден.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Card className="p-7 md:p-9">
            <div aria-live="polite">
              {status === "success" ? (
                <div className="flex flex-col items-start gap-4 py-10">
                  <span className="flex h-12 w-12 items-center justify-center bg-accent text-black">
                    <Check aria-hidden="true" size={26} strokeWidth={3} />
                  </span>
                  <p className="font-display text-2xl font-bold uppercase tracking-wide">
                    Получено.
                  </p>
                  <p className="text-ink-secondary">Ще се свържем с вас до 1 работен ден.</p>
                </div>
              ) : (
                <div
                  role="form"
                  aria-labelledby="contact-heading"
                  className="grid gap-5"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") {
                      e.preventDefault();
                      void submit();
                    }
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-name" className="mb-1.5 block text-sm font-medium">
                        Име *
                      </label>
                      <input
                        id="f-name"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        aria-describedby="f-name-err"
                        className={inputClasses}
                        {...register("name")}
                      />
                      <FieldError id="f-name-err" message={errors.name?.message} />
                    </div>
                    <div>
                      <label htmlFor="f-phone" className="mb-1.5 block text-sm font-medium">
                        Телефон *
                      </label>
                      <input
                        id="f-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="088 812 3456"
                        aria-invalid={!!errors.phone}
                        aria-describedby="f-phone-err"
                        className={inputClasses}
                        {...register("phone")}
                      />
                      <FieldError id="f-phone-err" message={errors.phone?.message} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="f-email" className="mb-1.5 block text-sm font-medium">
                      Имейл <span className="text-ink-secondary">(по избор)</span>
                    </label>
                    <input
                      id="f-email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby="f-email-err"
                      className={inputClasses}
                      {...register("email")}
                    />
                    <FieldError id="f-email-err" message={errors.email?.message} />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-type" className="mb-1.5 block text-sm font-medium">
                        Вие сте
                      </label>
                      <div className="relative">
                        <select
                          id="f-type"
                          className={cn(inputClasses, "appearance-none pr-10")}
                          {...register("type")}
                        >
                          {contactTypes.map((t) => (
                            <option key={t} value={t}>
                              {contactTypeLabels[t]}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          aria-hidden="true"
                          size={18}
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-accent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="f-cameras" className="mb-1.5 block text-sm font-medium">
                        Брой камери <span className="text-ink-secondary">(приблизително)</span>
                      </label>
                      <input
                        id="f-cameras"
                        type="number"
                        min={1}
                        max={500}
                        aria-invalid={!!errors.cameras}
                        aria-describedby="f-cameras-err"
                        className={inputClasses}
                        {...register("cameras", { valueAsNumber: true })}
                      />
                      <FieldError id="f-cameras-err" message={errors.cameras?.message} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="f-message" className="mb-1.5 block text-sm font-medium">
                      Съобщение <span className="text-ink-secondary">(по избор)</span>
                    </label>
                    <textarea
                      id="f-message"
                      rows={4}
                      aria-invalid={!!errors.message}
                      aria-describedby="f-message-err"
                      className={inputClasses}
                      {...register("message")}
                    />
                    <FieldError id="f-message-err" message={errors.message?.message} />
                  </div>

                  <div>
                    <label htmlFor="f-consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-secondary">
                      <input
                        id="f-consent"
                        type="checkbox"
                        aria-invalid={!!errors.consent}
                        aria-describedby="f-consent-err"
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[#B9FF66]"
                        {...register("consent")}
                      />
                      Съгласен/на съм личните ми данни да бъдат обработени за целите на
                      консултацията. *
                    </label>
                    <FieldError id="f-consent-err" message={errors.consent?.message} />
                  </div>

                  {status === "error" && serverError && (
                    <p
                      role="alert"
                      className="border border-alert/50 bg-alert/10 px-4 py-3 text-sm text-alert"
                    >
                      {serverError} Опитайте отново или ни се обадете директно.
                    </p>
                  )}

                  <Button
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                    onClick={() => void submit()}
                  >
                    {isSubmitting ? "Изпращане…" : "Заяви безплатно демо"}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <div className="space-y-8 lg:pt-2">
            <div>
              <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-ink-secondary">
                <Phone aria-hidden="true" size={14} /> Обадете се директно
              </p>
              <p className="mt-3 font-display text-4xl font-black tracking-wide text-ink md:text-5xl">
                {PHONE_DISPLAY}
              </p>
              <p className="mt-2 text-sm text-ink-secondary">
                Понеделник – петък, 09:00 – 18:00 ч.
              </p>
            </div>

            <div>
              <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-ink-secondary">
                <Mail aria-hidden="true" size={14} /> Или ни пишете
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 inline-block text-lg font-medium text-accent underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="border-t border-edge pt-7">
              <p className="flex items-center gap-2.5 text-sm text-ink-secondary">
                <Clock aria-hidden="true" size={15} className="text-accent" />
                Отговаряме до 1 работен ден — обещано.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
