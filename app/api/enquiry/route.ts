import { site } from "@/lib/site";

// Receives quote requests from the form and emails them to the team.
// Delivery, in order of preference:
//   1. Resend, when RESEND_API_KEY is set (LEAD_TO_EMAIL overrides the inbox,
//      LEAD_FROM_EMAIL must be a sender on a domain verified in Resend).
//   2. FormSubmit (no key needed). The very first submission makes FormSubmit
//      email an activation link to the inbox; click it once and every lead
//      after that is delivered.

type Payload = {
  name?: string; email?: string; phone?: string; business?: string; message?: string;
  need?: string[]; industry?: string; location?: string; budget?: string; timeline?: string;
  page?: string; company_site?: string;
};

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in: pretend success, send nothing.
  if (clean(body.company_site)) return Response.json({ ok: true });

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    business: clean(body.business, 160),
    need: Array.isArray(body.need) ? body.need.map((n) => clean(n, 80)).filter(Boolean).join(", ") : "",
    industry: clean(body.industry, 80),
    location: clean(body.location, 80),
    budget: clean(body.budget, 80),
    timeline: clean(body.timeline, 80),
    message: clean(body.message),
    page: clean(body.page, 200),
  };

  if (lead.name.length < 2 || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return Response.json({ ok: false, error: "Name and a valid email are required." }, { status: 422 });
  }

  const to = process.env.LEAD_TO_EMAIL || site.email;
  const subject = `New quote request: ${lead.name}${lead.business ? ` (${lead.business})` : ""}`;
  const rows: [string, string][] = [
    ["Name", lead.name], ["Email", lead.email], ["Phone", lead.phone], ["Business", lead.business],
    ["Needs", lead.need], ["Industry", lead.industry], ["Location", lead.location],
    ["Budget", lead.budget], ["Timeline", lead.timeline], ["Message", lead.message], ["Sent from page", lead.page],
  ];
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL || "Devlonic website <onboarding@resend.dev>",
          to: [to],
          reply_to: lead.email,
          subject,
          text,
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
      return Response.json({ ok: true });
    }

    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: subject,
        _replyto: lead.email,
        _template: "table",
        _captcha: "false",
        ...Object.fromEntries(rows.filter(([, v]) => v)),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    if (!res.ok || String(data.success) !== "true") {
      throw new Error(`FormSubmit: ${data.message ?? res.status}`);
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Enquiry delivery failed", err);
    return Response.json({ ok: false, error: "Delivery failed." }, { status: 502 });
  }
}
