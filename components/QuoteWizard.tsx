"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { site } from "@/lib/site";
import { leadMailto, sendViaFormSubmit, type Lead } from "@/lib/lead";

type Choice = { value: string; label: string };
type MultiStep = { id: "need"; kind: "multi"; title: string; help: string; choices: Choice[] };
type SingleStep = { id: string; kind: "single"; title: string; help: string; choices: Choice[]; optional?: boolean };
type Step = MultiStep | SingleStep | { id: "contact"; kind: "contact"; title: string; help: string };

// First question. Values match `wizardChoice` in lib/services.ts, so links like
// /contact?need=reviews open with that answer picked.
const NEED_STEP: MultiStep = {
  id: "need", kind: "multi", title: "What do you need help with?", help: "Pick as many as you need. Each one gets its own question.",
  choices: [
    { value: "website", label: "Website or redesign" },
    { value: "reviews", label: "More reviews" },
    { value: "profile", label: "Google Business Profile" },
    { value: "leads", label: "Lead flow to email and CRM" },
    { value: "ads", label: "Local ads" },
    { value: "automation", label: "Automation" },
    { value: "unsure", label: "Not sure yet" },
  ],
};

// One follow-up question per thing picked above, asked in this order.
const FOLLOW_UPS: Record<string, SingleStep> = {
  website: {
    id: "website", kind: "single", title: "New website or a redesign?", help: "Pick the closest fit.",
    choices: [
      { value: "redesign", label: "Redesign of my current site" },
      { value: "new", label: "A new website" },
      { value: "landing", label: "A landing page for ads" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  reviews: {
    id: "reviews", kind: "single", title: "What do you need with reviews?", help: "Pick the closest fit.",
    choices: [
      { value: "more", label: "Getting more Google reviews" },
      { value: "replies", label: "Replying to every review" },
      { value: "bad", label: "Handling bad or unfair reviews" },
      { value: "all", label: "All of it" },
    ],
  },
  profile: {
    id: "profile", kind: "single", title: "What's going on with your Google profile?", help: "Pick the closest fit.",
    choices: [
      { value: "setup", label: "Not set up or not verified" },
      { value: "maps", label: "Set up, but not showing in Maps" },
      { value: "suspended", label: "Suspended or having problems" },
      { value: "manage", label: "I want it managed for me" },
    ],
  },
  leads: {
    id: "leads", kind: "single", title: "Which CRM or job software do you use?", help: "Leads can go straight into it.",
    choices: [
      { value: "jobber", label: "Jobber" },
      { value: "housecall", label: "Housecall Pro" },
      { value: "servicetitan", label: "ServiceTitan" },
      { value: "hubspot", label: "HubSpot or GoHighLevel" },
      { value: "other", label: "Something else" },
      { value: "none", label: "None yet, just email" },
    ],
  },
  ads: {
    id: "ads", kind: "single", title: "Where do you want to advertise?", help: "Pick the closest fit.",
    choices: [
      { value: "lsa", label: "Google Local Services Ads" },
      { value: "google", label: "Google search ads" },
      { value: "meta", label: "Facebook and Instagram" },
      { value: "unsure", label: "Help me choose" },
    ],
  },
  automation: {
    id: "automation", kind: "single", title: "What should run on its own?", help: "Pick the closest fit.",
    choices: [
      { value: "missed-calls", label: "Text back missed calls" },
      { value: "receptionist", label: "Answer calls after hours (AI receptionist)" },
      { value: "follow-ups", label: "Follow-ups, reminders and review requests" },
      { value: "other", label: "Something else" },
    ],
  },
};

const TAIL: Step[] = [
  {
    id: "industry", kind: "single", title: "What does your business do?", help: "Pick the closest fit.",
    // Values match the `wizard` field of each market in lib/markets.ts.
    choices: [
      { value: "hvac", label: "HVAC" },
      { value: "plumbing", label: "Plumbing" },
      { value: "roofing", label: "Roofing" },
      { value: "cleaning", label: "Cleaning" },
      { value: "contractors", label: "Contracting or remodeling" },
      { value: "landscaping", label: "Landscaping" },
      { value: "health", label: "Home care or clinic" },
      { value: "home-other", label: "Other home service" },
      { value: "professional", label: "Other local service" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    id: "budget", kind: "single", optional: true, title: "Roughly, what's your budget?",
    help: "Optional and not binding. It helps us suggest the right approach.",
    choices: [
      { value: "under-2k", label: "Under $2,000" },
      { value: "2k-5k", label: "$2,000 to $5,000" },
      { value: "5k-10k", label: "$5,000 to $10,000" },
      { value: "10k-plus", label: "$10,000 or more" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "timeline", kind: "single", title: "When do you want it live?", help: "Pick whichever feels right.",
    choices: [
      { value: "asap", label: "As soon as possible" },
      { value: "1-month", label: "Within a month" },
      { value: "1-3-months", label: "In 1 to 3 months" },
      { value: "flexible", label: "I'm flexible" },
    ],
  },
  { id: "contact", kind: "contact", title: "Where should we send your quote?", help: `You'll get scope, price and timeline in writing within ${site.quoteTurnaround}.` },
];

const ALL_SINGLE = [...Object.values(FOLLOW_UPS), ...TAIL.filter((s): s is SingleStep => s.kind === "single")];
const labelFor = (stepId: string, value?: string) =>
  ALL_SINGLE.find((s) => s.id === stepId)?.choices.find((c) => c.value === value)?.label ?? value ?? "";

// Older links (from before the October 2026 repositioning) still land on
// the closest current answer.
const LEGACY_NEED: Record<string, string> = { rebuild: "website", marketing: "profile", seo: "profile", software: "automation", ai: "automation" };
const initialAnswers = (need?: string, industry?: string) => {
  const picks: Record<string, string> = {};
  if (industry) picks.industry = industry;
  if (need === "rebuild") picks.website = "redesign";
  if (need && LEGACY_NEED[need]) need = LEGACY_NEED[need];
  const valid = NEED_STEP.choices.some((c) => c.value === need);
  return { need: need && valid ? [need] : [], picks };
};

export function QuoteWizard({
  initialNeed,
  initialIndustry,
  variant = "card",
  headingLevel = "h2",
}: {
  initialNeed?: string;
  initialIndustry?: string;
  variant?: "card" | "page";
  headingLevel?: "h1" | "h2";
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(() => initialAnswers(initialNeed, initialIndustry));
  const [contact, setContact] = useState({ name: "", email: "", phone: "", business: "", message: "", company_site: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "activation">("idle");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // The question list grows and shrinks with what's picked in the first step.
  const steps = useMemo<Step[]>(
    () => [
      NEED_STEP,
      ...NEED_STEP.choices.filter((c) => answers.need.includes(c.value) && FOLLOW_UPS[c.value]).map((c) => FOLLOW_UPS[c.value]),
      ...TAIL,
    ],
    [answers.need],
  );
  const total = steps.length;
  const current = steps[Math.min(step, total - 1)];
  const picked = current.kind === "single" ? answers.picks[current.id] : undefined;

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    titleRef.current?.focus();
  }, [step, status]);

  const canContinue = useMemo(() => {
    if (current.kind === "multi") return answers.need.length > 0;
    if (current.kind === "single") return Boolean(current.optional || picked);
    return contact.name.trim().length > 1 && /\S+@\S+\.\S+/.test(contact.email);
  }, [current, answers.need, picked, contact]);

  const toggleNeed = (value: string) => {
    setAnswers((a) => {
      let next = a.need.includes(value) ? a.need.filter((v) => v !== value) : [...a.need, value];
      if (value === "unsure" && next.includes("unsure")) next = ["unsure"];
      else next = next.filter((v) => v !== "unsure" || value === "unsure");
      return { ...a, need: next };
    });
  };

  const pick = (stepId: string, value: string) => {
    setAnswers((a) => ({ ...a, picks: { ...a.picks, [stepId]: value } }));
    // Single choices advance on their own, a beat after the selection shows.
    if (step < total - 1) setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 220);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (current.kind !== "contact") {
      if (canContinue) setStep((s) => Math.min(s + 1, total - 1));
      return;
    }
    if (!canContinue) {
      setError("Add your name and a valid email address so we can send your quote.");
      return;
    }
    setError("");
    setStatus("sending");
    // Bots fill the hidden field: show success, send nothing.
    if (contact.company_site.trim()) { setStatus("sent"); return; }

    const lead = buildLead();
    // 1. The server delivers it when Resend is set up (delivered: true).
    let delivered = false;
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, company_site: contact.company_site }),
      });
      if (res.status === 422) {
        setStatus("idle");
        setError("Add your name and a valid email address so we can send your quote.");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { delivered?: boolean };
      delivered = res.ok && data.delivered === true;
    } catch {
      // Network or server trouble: fall through to FormSubmit.
    }
    // 2. Otherwise the browser sends it through FormSubmit.
    if (!delivered) {
      const result = await sendViaFormSubmit(lead);
      if (result !== "sent") { setStatus(result === "activation" ? "activation" : "error"); return; }
    }
    setStatus("sent");
    track("Quote requested", { need: answers.need.join(","), industry: answers.picks.industry ?? "" });
  };

  const buildLead = (): Lead => {
    // "Website: Lead generation (calls and quote requests), App: Both"
    const need = NEED_STEP.choices
      .filter((c) => answers.need.includes(c.value))
      .map((c) => {
        const detail = FOLLOW_UPS[c.value] && answers.picks[c.value] ? labelFor(c.value, answers.picks[c.value]) : "";
        return detail ? `${c.label}: ${detail}` : c.label;
      })
      .join(", ");
    return {
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      business: contact.business.trim(),
      need,
      industry: labelFor("industry", answers.picks.industry),
      budget: labelFor("budget", answers.picks.budget),
      timeline: labelFor("timeline", answers.picks.timeline),
      message: contact.message.trim(),
      page: typeof window !== "undefined" ? window.location.pathname : "",
    };
  };

  const Heading = headingLevel;
  const shell =
    variant === "card"
      ? "rounded-[1.75rem] bg-paper text-ink p-6 sm:p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
      : "rounded-[1.75rem] bg-fog text-ink p-6 sm:p-10";

  if (status === "sent") {
    return (
      <div className={shell} role="status">
        <Heading ref={titleRef} tabIndex={-1} className="t-h2 outline-none">Request sent.</Heading>
        <p className="mt-4 max-w-md text-graphite">
          Thanks, {contact.name.split(" ")[0]}. We&apos;ll email your written quote to <strong className="text-ink">{contact.email}</strong> within {site.quoteTurnaround}.
          If it&apos;s urgent, call <a className="link text-ink" href={site.phoneHref}>{site.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={shell} noValidate aria-label="Get a quote">
      <div className="flex items-center justify-between gap-4 text-sm text-graphite">
        <span>Step {Math.min(step, total - 1) + 1} of {total}</span>
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => Math.max(0, Math.min(s, total - 1) - 1))} className="link font-medium text-ink">
            Back
          </button>
        )}
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div className="h-full rounded-full bg-signal transition-[width] duration-500 ease-out" style={{ width: `${((Math.min(step, total - 1) + 1) / total) * 100}%` }} />
      </div>

      <fieldset className="mt-6">
        <legend className="contents">
          <Heading ref={titleRef} tabIndex={-1} className="t-h3 font-display outline-none sm:text-[1.75rem]">
            {current.title}
          </Heading>
        </legend>
        <p className="mt-1.5 text-[0.95rem] text-graphite">{current.help}</p>

        {current.kind !== "contact" ? (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {current.choices.map((c) => {
              const multi = current.kind === "multi";
              const checked = multi ? answers.need.includes(c.value) : picked === c.value;
              return (
                <label
                  key={c.value}
                  className={`cursor-pointer select-none rounded-full border-[1.5px] px-4 py-2.5 text-[0.95rem] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal ${
                    checked ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink"
                  }`}
                >
                  <input
                    type={multi ? "checkbox" : "radio"}
                    name={current.id}
                    value={c.value}
                    checked={checked}
                    onChange={() => (multi ? toggleNeed(c.value) : pick(current.id, c.value))}
                    className="sr-only"
                  />
                  {c.label}
                </label>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field label="Your name" required value={contact.name} onChange={(v) => setContact({ ...contact, name: v })} autoComplete="name" />
            <Field label="Email" type="email" required value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} autoComplete="email" />
            <Field label="Phone (optional)" type="tel" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} autoComplete="tel" />
            <Field label="Business name (optional)" value={contact.business} onChange={(v) => setContact({ ...contact, business: v })} autoComplete="organization" />
            <label className="sm:col-span-2">
              <span className="text-sm font-medium">Anything else we should know? (optional)</span>
              <textarea
                rows={3}
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                className="mt-1.5 w-full rounded-xl border-[1.5px] border-line bg-paper px-4 py-3 outline-none focus:border-ink"
              />
            </label>
            {/* Honeypot: hidden from people, filled by bots */}
            <label className="absolute -left-[9999px]" aria-hidden="true">
              Website
              <input tabIndex={-1} autoComplete="off" value={contact.company_site} onChange={(e) => setContact({ ...contact, company_site: e.target.value })} />
            </label>
          </div>
        )}
      </fieldset>

      {error && <p className="mt-4 text-sm font-medium text-signal-ink" role="alert">{error}</p>}
      {(status === "error" || status === "activation") && (
        <div className="mt-4 rounded-xl border-[1.5px] border-signal/40 bg-paper p-4 text-sm" role="alert">
          <p className="font-medium text-signal-ink">
            {status === "activation"
              ? `This form is waiting for a one-time activation. The link has just been emailed to ${site.leadInboxes[0]}.`
              : "Your request didn't go through, but nothing you typed is lost."}
          </p>
          <p className="mt-1.5 text-graphite">
            Send it by email instead (your answers are already filled in), or call{" "}
            <a className="link text-ink" href={site.phoneHref}>{site.phoneDisplay}</a>.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href={leadMailto(buildLead())} className="btn btn-ink">Email my request</a>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {current.kind === "contact" ? (
          <button type="submit" className="btn btn-signal" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send my request"}
          </button>
        ) : current.kind === "multi" || (current.kind === "single" && (current.optional || picked)) ? (
          <button type="submit" className="btn btn-ink disabled:opacity-40" disabled={!canContinue}>
            {current.kind === "single" && current.optional && !picked ? "Skip" : "Next"}
          </button>
        ) : null}
        {current.kind === "contact" && (
          <p className="text-xs text-graphite">
            We only use these details to reply to you. <Link href="/privacy" className="link">Privacy policy</Link>
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label, value, onChange, type = "text", required, autoComplete,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-12 w-full rounded-xl border-[1.5px] border-line bg-paper px-4 outline-none focus:border-ink"
      />
    </label>
  );
}
