"use client";

import { useEffect, useRef } from "react";
import { HeroMark3D } from "./HeroMark3D";
import { onPreloaded } from "@/lib/preload";
import { QuoteWizard } from "./QuoteWizard";
import { site } from "@/lib/site";

// Black hero: headline and the quote form on the left, the 3D mark on the right.
// The headline lines rise in once, timed with the mark's own intro.
export function HomeHero() {
  const headline = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: ReturnType<(typeof import("gsap"))["gsap"]["context"]> | undefined;
    let cancelled = false;
    let stop = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      if (!headline.current || cancelled) return;
      const scope = headline.current.parentElement ?? undefined;
      // Hold the lines down until the preloader lifts, then reveal them.
      ctx = gsap.context(() => {
        gsap.set(".hero-line > span", { yPercent: 110 });
        gsap.set(".hero-after", { opacity: 0, y: 16 });
      }, scope);
      stop = onPreloaded(() => {
        ctx?.add(() => {
          gsap.to(".hero-line > span", { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, delay: 0.05 });
          gsap.to(".hero-after", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.45, stagger: 0.08 });
        });
      });
    })();
    return () => { cancelled = true; stop(); ctx?.revert(); };
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-28 text-paper md:pb-24 md:pt-36">
      {/* Phones: the mark sits behind the headline as a dimmed backdrop. Desktop: full strength on the right. */}
      <HeroMark3D className="pointer-events-none absolute right-[-34%] top-14 h-[56vh] w-[100vw] opacity-35 sm:right-[-12%] sm:opacity-50 lg:right-[1%] lg:top-24 lg:h-[76vh] lg:w-[44vw] lg:opacity-100" />

      <div className="wrap relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {/* The H1 opens with what we do (for search), then the brand line. */}
          <h1 ref={headline}>
            <span className="hero-after mb-5 block max-w-xl font-sans text-[1.0625rem] font-semibold leading-snug tracking-normal text-signal sm:text-lg">
              Web design and Shopify development for service businesses
            </span>
            <span className="t-hero block max-w-[12ch]">
              <span className="hero-line block overflow-hidden pb-[0.06em]"><span className="block">Websites that</span></span>
              <span className="hero-line block overflow-hidden pb-[0.06em]"><span className="block">earn their keep.</span></span>
            </span>
          </h1>
          <p className="hero-after t-lede mt-7 max-w-xl text-ash">
            Lead generation websites for HVAC, plumbing, roofing, cleaning and other home service companies, and Shopify stores
            for ecommerce brands, plus the local SEO and ads that bring customers to them.
          </p>
          <ul className="hero-after mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-paper/85">
            <li>Top Rated on Upwork</li>
            <li>{site.projectsDelivered} websites and stores built</li>
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
