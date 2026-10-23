"use client";

import { useEffect, useState } from "react";

// A walk-through of the quote funnel we built for Florida Surface Pro:
// question, contact details, preferred time, then where the lead goes.
// All four screens are in the page (fixed height, no layout shift); the
// animation only changes which one is visible. Example details are made up.

const SCREENS = 4;

function Progress({ step }: { step: number }) {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-signal" : "bg-ink/10"}`} />
      ))}
    </div>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-signal-ink" aria-hidden="true">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function QuoteFunnelDemo({ className = "" }: { className?: string }) {
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setScreen((s) => (s + 1) % SCREENS), 2800);
    return () => clearInterval(id);
  }, []);

  const show = (i: number) =>
    `absolute inset-0 flex flex-col p-6 transition-all duration-500 ${screen === i ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"}`;

  return (
    <figure className={`overflow-hidden rounded-[1.5rem] bg-paper text-ink shadow-[0_40px_90px_-30px_rgba(233,75,39,0.5)] ${className}`}>
      <figcaption className="flex items-center justify-between border-b border-line px-6 py-3.5 text-sm">
        <span className="font-semibold">Free estimate · quote funnel</span>
        <span className="text-graphite">Step {Math.min(screen + 1, 4)} of 4</span>
      </figcaption>
      <div className="relative h-[24rem]">
        {/* 1: the first question */}
        <div className={show(0)} aria-hidden={screen !== 0}>
          <Progress step={0} />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-signal-ink">Your project</p>
          <p className="mt-1.5 font-display text-2xl font-bold tracking-tight">What would you like to upgrade?</p>
          <div className="mt-4 grid grid-cols-2 rounded-full bg-fog p-1 text-sm font-semibold">
            <span className="rounded-full bg-ink py-2 text-center text-paper">Residential</span>
            <span className="py-2 text-center text-graphite">Commercial</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {["Garage", "Patio", "Pool deck", "Something else"].map((t, i) => (
              <span key={t} className={`rounded-2xl border-2 px-4 py-4 text-center font-semibold ${i === 0 ? "border-signal bg-signal/10" : "border-line"}`}>{t}</span>
            ))}
          </div>
        </div>

        {/* 2: contact details first */}
        <div className={show(1)} aria-hidden={screen !== 1}>
          <Progress step={1} />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-signal-ink">Contact first</p>
          <p className="mt-1.5 font-display text-2xl font-bold tracking-tight">Where should we send your estimate?</p>
          <div className="mt-4 space-y-2.5 text-[0.95rem]">
            {[["Name", "Maria G."], ["Phone", "(305) 555-0142"], ["Email", "maria@example.com"]].map(([l, v]) => (
              <div key={l} className="rounded-xl border border-line px-4 py-2.5">
                <span className="block text-xs text-graphite">{l}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-auto rounded-xl bg-fog px-4 py-2.5 text-sm text-graphite">Saved now. If Maria stops here, the team still gets her details in 10 minutes.</p>
        </div>

        {/* 3: preferred time */}
        <div className={show(2)} aria-hidden={screen !== 2}>
          <Progress step={3} />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-signal-ink">Preferred time</p>
          <p className="mt-1.5 font-display text-2xl font-bold tracking-tight">When works for your free estimate?</p>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
            {[["Mon", "26"], ["Tue", "27"], ["Wed", "28"], ["ASAP", ""]].map(([d, n], i) => (
              <span key={d} className={`rounded-xl border-2 py-2.5 font-semibold ${i === 1 ? "border-signal bg-signal/10" : "border-line"}`}>
                {d}{n && <span className="block font-display text-lg">{n}</span>}
              </span>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm font-semibold">
            {["9:00 AM", "11:00 AM", "2:00 PM"].map((t, i) => (
              <span key={t} className={`rounded-full border-2 py-2 ${i === 1 ? "border-ink bg-ink text-paper" : "border-line"}`}>{t}</span>
            ))}
          </div>
          <span className="mt-auto rounded-full bg-signal py-3 text-center font-semibold">Book my free estimate</span>
        </div>

        {/* 4: where the lead goes */}
        <div className={show(3)} aria-hidden={screen !== 3}>
          <Progress step={3} />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-signal-ink">Request sent</p>
          <p className="mt-1.5 font-display text-2xl font-bold tracking-tight">Seconds later, the lead is in three places.</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {[
              ["Email to the office", "Lead received: Tue 27 at 11:00 AM"],
              ["Google Sheet", "New row with project and ad source"],
              ["Builder Prime CRM", "New client, status Lead Received"],
            ].map(([a, b]) => (
              <li key={a} className="flex gap-3 rounded-xl border border-line px-4 py-3">
                <Tick />
                <span>
                  <span className="block font-semibold leading-tight">{a}</span>
                  <span className="block text-sm text-graphite">{b}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
