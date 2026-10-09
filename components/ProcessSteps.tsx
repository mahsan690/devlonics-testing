"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

const steps = [
  {
    title: "Tell us what you need",
    body: "Answer a few quick questions about your business and project. It takes about two minutes and there's no sales call to sit through.",
  },
  {
    title: "Get a fixed quote",
    body: `Within ${site.quoteTurnaround} you get a written plan: what we'll build, the price, and the timeline. No obligation.`,
  },
  {
    title: "Approve the design, then we build",
    body: "You see and sign off the design before development starts. While we build, you get regular previews and nothing goes live without your OK.",
  },
  {
    title: "Launch and look after",
    body: "We put the site live on your domain, set up tracking and search console, and keep it updated and backed up on an optional care plan.",
  },
];

// The orange rule fills as you scroll through the steps: it shows how far
// along the process you are, so the motion carries meaning.
export function ProcessSteps() {
  const root = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current || !bar.current) {
      if (bar.current) bar.current.style.transform = "scaleY(1)";
      return;
    }
    let kill = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const tween = gsap.fromTo(
        bar.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: 0.4 } },
      );
      kill = () => { tween.scrollTrigger?.kill(); tween.kill(); };
    })();
    return () => kill();
  }, []);

  return (
    <ol ref={root} className="relative space-y-12 pl-14 sm:pl-20">
      <div className="absolute bottom-2 left-[1.15rem] top-2 w-0.5 bg-line sm:left-[1.65rem]" aria-hidden="true">
        <div ref={bar} className="h-full w-full origin-top scale-y-0 bg-signal" />
      </div>
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <span
            className="absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-lg font-bold text-paper sm:-left-20 sm:h-14 sm:w-14 sm:text-xl"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <h3 className="t-h3 pt-1.5 sm:pt-3">{s.title}</h3>
          <p className="mt-2 max-w-[56ch] text-graphite">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
