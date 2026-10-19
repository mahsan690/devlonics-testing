"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// Anything with a slug (which picks the 3D model), a name and a line of copy.
// Services link to /services/<slug>; the AI offer passes its own href.
type Item = { slug: string; name: string; short: string; href?: string };
import { ServiceStage3D } from "./ServiceStage3D";

// Services list with a 3D stage. Desktop: hovering or focusing a row swaps the
// model. Phones: the stage sits above the list and cycles while on screen,
// until the visitor touches it.
export function ServiceIndex({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const small = window.matchMedia("(max-width: 1023px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([en]) => {
      clearInterval(timer);
      if (en.isIntersecting && small.matches && !touched.current) {
        timer = setInterval(() => setActive((a) => (a + 1) % items.length), 3200);
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [items.length]);

  const current = items[active];

  return (
    <div ref={root} className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:order-2 lg:col-span-5">
        <div className="lg:sticky lg:top-28" onPointerDown={() => (touched.current = true)}>
          <ServiceStage3D active={current.slug} label={current.name} className="aspect-[4/3] lg:aspect-[0.95]" />
        </div>
      </div>
      <ul className="border-t border-line lg:order-1 lg:col-span-7">
        {items.map((service, i) => (
          <li key={service.slug} className="border-b border-line">
            <Link
              href={service.href ?? `/services/${service.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
            >
              <span>
                <span
                  className={`t-h2 block font-display font-bold transition-colors duration-300 ${active === i ? "text-ink" : "text-ink/35"} group-hover:text-ink`}
                >
                  {service.name}
                </span>
                <span className="mt-2 block max-w-xl text-graphite">{service.short}</span>
              </span>
              <span className="text-[0.95rem] font-semibold underline decoration-signal decoration-2 underline-offset-4">
                Learn more
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
