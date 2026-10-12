import { site } from "@/lib/site";

// Shared by the quote form (browser) and /api/enquiry (server).

export type Lead = {
  name: string;
  email: string;
  phone: string;
  business: string;
  need: string;
  industry: string;
  budget: string;
  timeline: string;
  message: string;
  page: string;
};

export const leadSubject = (l: Lead) => `New quote request: ${l.name}${l.business ? ` (${l.business})` : ""}`;

export const leadRows = (l: Lead): [string, string][] =>
  ([
    ["Name", l.name], ["Email", l.email], ["Phone", l.phone], ["Business", l.business],
    ["Needs", l.need], ["Industry", l.industry], ["Budget", l.budget], ["Timeline", l.timeline],
    ["Message", l.message], ["Sent from page", l.page],
  ] as [string, string][]).filter(([, v]) => v);

export const leadText = (l: Lead) => leadRows(l).map(([k, v]) => `${k}: ${v}`).join("\n");

/** A mailto link with the request already filled in, for when online delivery fails. */
export const leadMailto = (l: Lead) =>
  `mailto:${site.email}?subject=${encodeURIComponent(leadSubject(l))}&body=${encodeURIComponent(leadText(l))}`;

export type FormSubmitResult = "sent" | "activation" | "failed";

/**
 * Delivers a lead through FormSubmit (formsubmit.co). Call it from the BROWSER:
 * FormSubmit refuses requests from server and cloud IPs (it answered 403 to
 * Vercel's functions), but accepts the visitor's browser.
 *
 * Sent to the first inbox and copied (_cc) to the rest. The first submission
 * ever makes FormSubmit email an "Activate Form" link to the first inbox; that
 * submission isn't delivered, and every one after the click is.
 */
export async function sendViaFormSubmit(l: Lead, inboxes: readonly string[] = site.leadInboxes): Promise<FormSubmitResult> {
  // After activation FormSubmit offers a random alias for the address; set it here to keep the address out of page code.
  const target = process.env.NEXT_PUBLIC_FORMSUBMIT_ID || inboxes[0];
  const cc = inboxes.slice(1);
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(target)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: leadSubject(l),
        _replyto: l.email,
        _template: "table",
        _captcha: "false",
        ...(cc.length ? { _cc: cc.join(",") } : {}),
        ...Object.fromEntries(leadRows(l)),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    if (res.ok && String(data.success) === "true") return "sent";
    if (/activat/i.test(data.message ?? "")) return "activation";
    console.error("FormSubmit:", res.status, data.message);
    return "failed";
  } catch (err) {
    console.error("FormSubmit:", err);
    return "failed";
  }
}
