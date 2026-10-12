import { site } from "@/lib/site";
import { leadSubject, leadText, type Lead } from "@/lib/lead";

// Receives quote requests from the form.
//
// With RESEND_API_KEY set (and LEAD_FROM_EMAIL a sender on a domain verified
// in Resend), the request is emailed from here to every inbox and the response
// says { delivered: true }.
//
// Without it, the request is validated and the response says
// { delivered: false }: the form then delivers it from the visitor's browser
// through FormSubmit (see lib/lead.ts). FormSubmit can't be called from here
// because it blocks requests from cloud servers. The form also falls back to
// FormSubmit if Resend fails, so a lead is never lost to a server error.

type Payload = {
  name?: string; email?: string; phone?: string; business?: string; message?: string;
  need?: string[] | string; industry?: string; budget?: string; timeline?: string;
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

  // Honeypot filled in: pretend it was delivered, send nothing.
  if (clean(body.company_site)) return Response.json({ ok: true, delivered: true });

  const lead: Lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    business: clean(body.business, 160),
    need: Array.isArray(body.need) ? body.need.map((n) => clean(n, 80)).filter(Boolean).join(", ") : clean(body.need, 400),
    industry: clean(body.industry, 80),
    budget: clean(body.budget, 80),
    timeline: clean(body.timeline, 80),
    message: clean(body.message),
    page: clean(body.page, 200),
  };

  if (lead.name.length < 2 || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return Response.json({ ok: false, error: "Name and a valid email are required." }, { status: 422 });
  }

  if (!process.env.RESEND_API_KEY) return Response.json({ ok: true, delivered: false });

  const inboxes = (process.env.LEAD_TO_EMAIL ? process.env.LEAD_TO_EMAIL.split(",") : [...site.leadInboxes])
    .map((e) => e.trim())
    .filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || "Devlonic website <onboarding@resend.dev>",
        to: inboxes,
        reply_to: lead.email,
        subject: leadSubject(lead),
        text: leadText(lead),
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return Response.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("Enquiry delivery through Resend failed; the form will fall back to FormSubmit.", err);
    return Response.json({ ok: true, delivered: false });
  }
}
