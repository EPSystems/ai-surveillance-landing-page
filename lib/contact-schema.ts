import { z } from "zod";

export const contactTypes = ["petrol", "warehouse", "business", "security", "other"] as const;
export type ContactType = (typeof contactTypes)[number];

export const contactTypeLabels: Record<ContactType, string> = {
  petrol: "Собственик на бензиностанция",
  warehouse: "Склад / логистика",
  business: "Друг бизнес",
  security: "Охранителна фирма",
  other: "Друго",
};

/** Bulgarian phone: +359 or 0 prefix followed by 8–9 digits (spaces/dashes/dots/parens tolerated in input). */
const BG_PHONE = /^(\+359|0)\d{8,9}$/;

/**
 * Shared between the client form (zodResolver) and the API route so the two
 * can never drift apart.
 */
export const contactSchema = z.object({
  name: z
    .string({ required_error: "Моля, въведете вашето име." })
    .trim()
    .min(2, "Моля, въведете вашето име."),
  phone: z
    .string({ required_error: "Моля, въведете телефонен номер." })
    .transform((v) => v.replace(/[\s\-().]/g, ""))
    .pipe(
      z.string().regex(BG_PHONE, "Моля, въведете валиден български телефонен номер (напр. 088 812 3456).")
    ),
  email: z
    .string()
    .trim()
    .email("Моля, въведете валиден имейл адрес.")
    .optional()
    .or(z.literal("")),
  type: z.enum(contactTypes, {
    errorMap: () => ({ message: "Моля, изберете валиден тип клиент." }),
  }),
  cameras: z.coerce
    .number({
      required_error: "Моля, въведете брой камери.",
      invalid_type_error: "Моля, въведете брой камери.",
    })
    .int("Моля, въведете цяло число.")
    .min(1, "Минимум 1 камера.")
    .max(500, "За над 500 камери ни пишете директно."),
  message: z.string().trim().max(2000, "Съобщението е твърде дълго (макс. 2000 знака).").optional(),
  consent: z
    .boolean({ required_error: "Необходимо е съгласие за обработка на личните данни." })
    .refine((v) => v === true, {
      message: "Необходимо е съгласие за обработка на личните данни.",
    }),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;
