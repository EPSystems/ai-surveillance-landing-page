import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, contactTypeLabels } from "@/lib/contact-schema";
import { BRAND, CONTACT_EMAIL } from "@/lib/site";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Невалиден формат на заявката." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Невалидни данни." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — the contact form cannot deliver email.");
    return NextResponse.json(
      {
        success: false,
        error: "Услугата за съобщения не е конфигурирана. Моля, обадете се на посочения телефон.",
      },
      { status: 500 }
    );
  }

  const data = parsed.data;
  const to = process.env.CONTACT_EMAIL ?? CONTACT_EMAIL;
  // onboarding@resend.dev is Resend's sandbox sender (delivers only to the
  // account owner) — set RESEND_FROM to an address on a verified domain in prod.
  const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";

  const rows: Array<[string, string]> = [
    ["Име", escapeHtml(data.name)],
    ["Телефон", `<a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>`],
    ["Имейл", data.email ? escapeHtml(data.email) : "—"],
    ["Тип клиент", escapeHtml(contactTypeLabels[data.type])],
    ["Брой камери", String(data.cameras)],
    ["Съобщение", data.message ? escapeHtml(data.message) : "—"],
    ["Съгласие (GDPR)", "Да"],
    ["Получено", new Date().toLocaleString("bg-BG", { timeZone: "Europe/Sofia" })],
  ];

  const html = `
    <h2 style="font-family:sans-serif">Нова заявка за демо — ${escapeHtml(BRAND)}</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="border:1px solid #ddd;font-weight:bold;white-space:nowrap">${label}</td><td style="border:1px solid #ddd">${value}</td></tr>`
        )
        .join("\n")}
    </table>`;

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: `${BRAND} Landing <${from}>`,
      to,
      reply_to: data.email || undefined,
      subject: `New Demo Request — ${contactTypeLabels[data.type]} — ${data.name}`,
      html,
    });

    if (result.error) {
      console.error("Resend rejected the email:", result.error);
      return NextResponse.json(
        { success: false, error: "Изпращането не успя. Моля, опитайте отново." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form delivery failed:", err);
    return NextResponse.json(
      { success: false, error: "Изпращането не успя. Моля, опитайте отново." },
      { status: 502 }
    );
  }
}
