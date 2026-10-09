"use client";

import { useEffect, useRef } from "react";
import { HeroMark3D } from "./HeroMark3D";
import { QuoteWizard } from "./QuoteWizard";
import { site } from "@/lib/site";
import { states } from "@/lib/states";

// Black hero: headline and the quote form on the left, the 3D mark on the right.
// The headline lines rise in once, timed with the mark's own intro.
export function HomeHero() {
  const headline = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      if (!headline.current) return;
      ctx = gsap.context(() => {
        gsap.from(".hero-line > span", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.09, delay: 0.1 });
        gsap.from(".hero-after", { opacity: 0, y: 16, duration: 0.8, ease: "power2.out", delay: 0.55, stagger: 0.08 });
      }, headline.current.parentElement ?? undefined);
    })();
    return () => ctx?.revert();
  }, []);

  const stateList = states.map((s) => s.name);
  const statesText = `${stateList.slice(0, -1).join(", ")} and ${stateList.at(-1)}`;

  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-28 text-paper md:pb-24 md:pt-36">
      {/* Phones: the mark sits behind the headline as a dimmed backdrop. Desktop: full strength on the right. */}
      <HeroMark3D className="pointer-events-none absolute right-[-34%] top-14 h-[56vh] w-[100vw] opacity-35 sm:right-[-12%] sm:opacity-50 lg:right-[1%] lg:top-24 lg:h-[76vh] lg:w-[44vw] lg:opacity-100" />

      <div className="wrap relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 ref={headline} className="t-hero max-w-[12ch]">
            <span className="hero-line block overflow-hidden pb-[0.06em]"><span className="block">Websites that</span></span>
            <span className="hero-line block overflow-hidden pb-[0.06em]"><span className="block">earn their keep.</span></span>
          </h1>
          <p className="hero-after t-lede mt-7 max-w-xl text-ash">
            We design and build websites, online stores and custom software for small businesses in {statesText}.
            Built to turn visitors into calls, bookings and orders.
          </p>
          <ul className="hero-after mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-paper/85">
            <li>Top Rated on Upwork</li>
            <li>{site.yearsExperience} years building websites</li>
            <li>Fixed price, agreed up front</li>
          </ul>
          <div className="hero-after mt-10 max-w-xl">
            <QuoteWizard />
          </div>
        </div>
      </div>
    </section>
  );
}
