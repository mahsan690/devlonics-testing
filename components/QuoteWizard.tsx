"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { site } from "@/lib/site";
import { states } from "@/lib/states";

type Choice = { value: string; label: string };
type Step =
  | { id: "need"; kind: "multi"; title: string; help: string; choices: Choice[] }
  | { id: "industry" | "location" | "budget" | "timeline"; kind: "single"; title: string; help: string; choices: Choice[]; optional?: boolean }
  | { id: "contact"; kind: "contact"; title: string; help: string };

const STEPS: Step[] = [
  {
    id: "need", kind: "multi", title: "What do you need?", help: "Pick everything that applies.",
    choices: [
      { value: "website", label: "A new website" },
      { value: "rebuild", label: "A rebuild of my current site" },
      { value: "store", label: "An online store" },
      { value: "app", label: "An app" },
      { value: "software", label: "Custom software" },
      { value: "marketing", label: "SEO or marketing" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "industry", kind: "single", title: "What does your business do?", help: "Pick the closest fit.",
    choices: [
      { value: "home-services", label: "Home services or trades" },
      { value: "health", label: "Health or home care" },
      { value: "professional", label: "Professional services" },
      { value: "food", label: "Restaurant or food" },
      { value: "retail", label: "Retail or ecommerce" },
      { value: "property", label: "Real estate or property" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    id: "location", kind: "single", title: "Where is your business?", help: "We work with businesses anywhere in the US.",
    choices: [...states.map((s) => ({ value: s.abbr, label: s.name })), { value: "other", label: "Another state" }],
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

type Answers = { need: string[]; industry?: string; location?: string; budget?: string; timeline?: string };

export function QuoteWizard({
  initialNeed,
  initialState,
  variant = "card",
  headingLevel = "h2",
}: {
  initialNeed?: string;
  initialState?: string;
  variant?: "card" | "page";
  headingLevel?: "h1" | "h2";
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    need: initialNeed ? [initialNeed] : [],
    location: initialState,
  });
  const [contact, setContact] = useState({ name: "", email: "", phone: "", business: "", message: "", company_site: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const current = STEPS[step];
  const total = STEPS.length;

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    titleRef.current?.focus();
  }, [step, status]);

  const canContinue = useMemo(() => {
    if (current.kind === "multi") return answers.need.length > 0;
    if (current.kind === "single") return current.optional || Boolean(answers[current.id]);
    return contact.name.trim().length > 1 && /\S+@\S+\.\S+/.test(contact.email);
  }, [current, answers, contact]);

  const choose = (id: Step["id"], value: string, multi: boolean) => {
    if (multi) {
      setAnswers((a) => {
        let next = a.need.includes(value) ? a.need.filter((v) => v !== value) : [...a.need, value];
        if (value === "unsure" && next.includes("unsure")) next = ["unsure"];
        else next = next.filter((v) => v !== "unsure" || value === "unsure");
        return { ...a, need: next };
      });
    } else {
      setAnswers((a) => ({ ...a, [id]: value }));
      // Single choices advance on their own, a beat after the selection shows.
      if (step < total - 1) setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 220);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (current.kind !== "contact") {
      if (canContinue) setStep((s) => s + 1);
      return;
    }
    if (!canContinue) {
      setError("Add your name and a valid email address so we can send your quote.");
      return;
    }
    setError("");
    setStatus("sending");
    const label = (stepId: string, v?: string) =>
      (STEPS.find((s) => s.id === stepId) as { choices?: Choice[] })?.choices?.find((c) => c.value === v)?.label ?? v ?? "";
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          need: answers.need.map((v) => label("need", v)),
          industry: label("industry", answers.industry),
          location: label("location", answers.location),
          budget: label("budget", answers.budget),
          timeline: label("timeline", answers.timeline),
          page: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      track("Quote requested", { need: answers.need.join(","), location: answers.location ?? "" });
    } catch {
      setStatus("error");
    }
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
        <span>Step {step + 1} of {total}</span>
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="link font-medium text-ink">
            Back
          </button>
        )}
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div className="h-full rounded-full bg-signal transition-[width] duration-500 ease-out" style={{ width: `${((step + 1) / total) * 100}%` }} />
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
              const checked = multi ? answers.need.includes(c.value) : answers[current.id] === c.value;
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
                    onChange={() => choose(current.id, c.value, multi)}
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
      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-signal-ink" role="alert">
          Your request didn&apos;t go through. Email <a className="link" href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a className="link" href={site.phoneHref}>{site.phoneDisplay}</a> and we&apos;ll reply the same way.
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {current.kind === "contact" ? (
          <button type="submit" className="btn btn-signal" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send my request"}
          </button>
        ) : current.kind === "multi" || ("optional" in current && current.optional) ? (
          <button type="submit" className="btn btn-ink disabled:opacity-40" disabled={!canContinue}>
            {"optional" in current && current.optional && !answers[current.id as "budget"] ? "Skip" : "Next"}
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
