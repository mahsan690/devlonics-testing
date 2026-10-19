"use client";

import { useEffect, useState } from "react";

// A late-night call handled by an AI voice receptionist, playing line by line.
// Every line is always in the page (screen readers get the whole call, and the
// card never changes height); the animation only fades lines in.
const lines: { who: "caller" | "ai"; text: string }[] = [
  { who: "caller", text: "Hi, our AC just stopped and it's really hot in here. Can someone come out?" },
  { who: "ai", text: "Sorry to hear that. I can get a technician to you first thing. What's your zip code?" },
  { who: "caller", text: "75024." },
  { who: "ai", text: "We cover Plano. I have 8:00 or 10:30 tomorrow morning. Which works better?" },
  { who: "caller", text: "8:00, please." },
  { who: "ai", text: "You're booked for 8:00 a.m. I've just texted you a confirmation." },
];
const events = [
  { label: "Job booked", tool: "Google Calendar" },
  { label: "Lead logged", tool: "Google Sheets" },
  { label: "Call summary posted", tool: "Slack #calls" },
];
const TOTAL = lines.length + events.length;

export function CallConsole({ className = "" }: { className?: string }) {
  const [shown, setShown] = useState(TOTAL);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let step = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      step = step >= TOTAL ? 0 : step + 1;
      setShown(step);
      timer = setTimeout(tick, step === TOTAL ? 5000 : step === 0 ? 700 : step > lines.length ? 650 : 1500);
    };
    timer = setTimeout(() => { setShown(0); timer = setTimeout(tick, 600); }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const vis = (i: number) => (i < shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2");

  return (
    <figure className={`overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#121212] shadow-[0_40px_90px_-30px_rgba(233,75,39,0.45)] ${className}`}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
        <span className="flex items-center gap-2.5 text-sm font-semibold">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
          </span>
          AI receptionist · incoming call
        </span>
        <span className="font-mono text-xs text-ash">2:14 a.m.</span>
      </figcaption>

      <ol className="space-y-3 px-5 py-5">
        {lines.map((l, i) => (
          <li key={i} className={`flex transition-all duration-500 ${vis(i)} ${l.who === "ai" ? "justify-end" : ""}`}>
            <span
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.95rem] leading-snug ${
                l.who === "ai" ? "rounded-br-md bg-signal text-ink" : "rounded-bl-md bg-white/[0.07] text-paper"
              }`}
            >
              <span className="sr-only">{l.who === "ai" ? "AI receptionist: " : "Caller: "}</span>
              {l.text}
            </span>
          </li>
        ))}
      </ol>

      <ul className="grid gap-2 border-t border-white/10 px-5 py-4 sm:grid-cols-3">
        {events.map((e, i) => (
          <li key={e.label} className={`flex items-start gap-2 text-sm transition-all duration-500 ${vis(lines.length + i)}`}>
            <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden="true">
              <path d="m4.5 10.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              <span className="block font-semibold leading-tight">{e.label}</span>
              <span className="block text-xs text-ash">{e.tool}</span>
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
