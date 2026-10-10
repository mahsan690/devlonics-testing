"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials as all, type Testimonial } from "@/lib/testimonials";
import { site } from "@/lib/site";

// A stack of review cards. Drag or swipe the top card away, use the arrows,
// or the arrow keys. Advances on its own while visible, pausing on hover,
// focus and after any interaction. Reduced motion: no auto-advance, no fling.

const initials = (name: string) => name.split(" ").map((p) => p[0]).slice(0, 2).join("");

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < n ? "fill-signal" : "fill-line"}`} aria-hidden="true">
          <path d="m10 1.5 2.6 5.5 6 .7-4.4 4.1 1.1 6L10 14.9 4.7 17.8l1.1-6L1.4 7.7l6-.7L10 1.5Z" />
        </svg>
      ))}
    </span>
  );
}

export function TestimonialDeck({ items = all }: { items?: Testimonial[] }) {
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [dx, setDx] = useState(0);
  const [flying, setFlying] = useState<0 | 1 | -1>(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; id: number } | null>(null);
  const paused = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);
  const interacted = useRef(false);

  const advance = useCallback((dir: 1 | -1) => {
    if (reduce.current) {
      setOrder((o) => (dir === 1 ? [...o.slice(1), o[0]] : [o[o.length - 1], ...o.slice(0, -1)]));
      return;
    }
    if (dir === -1) {
      setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
      return;
    }
    setFlying(1);
    setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setFlying(0);
      setDx(0);
    }, 320);
  }, []);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current || !root.current) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([en]) => {
      clearInterval(timer);
      if (en.isIntersecting) timer = setInterval(() => !interacted.current && !paused.current && advance(1), 7000);
    }, { threshold: 0.4 });
    io.observe(root.current);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [advance]);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, id: e.pointerId };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    interacted.current = true;
    setDragging(true);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setDx(e.clientX - drag.current.x);
  };
  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    // Fling left or right past the threshold to move on; otherwise snap back.
    if (dx > 110) advance(1);
    else if (dx < -110) { advance(-1); setDx(0); }
    else setDx(0);
  };

  const top = items[order[0]];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-4">
        <h2 className="t-h2">What clients say</h2>
        <p className="t-lede mt-5 text-graphite">Real words from people we&apos;ve built for. Drag a card to see the next one.</p>
        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => { interacted.current = true; advance(-1); }}
            className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-ink transition-colors hover:bg-ink hover:text-paper"
            aria-label="Previous review"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
          </button>
          <button
            type="button"
            onClick={() => { interacted.current = true; advance(1); }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-signal hover:text-ink"
            aria-label="Next review"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
          </button>
          <span className="ml-2 text-sm text-graphite" aria-hidden="true">
            {order[0] + 1} of {items.length}
          </span>
        </div>
        <a href={site.profiles.trustpilot} target="_blank" rel="noopener" className="link mt-6 inline-block text-[0.95rem] font-semibold">
          Read our reviews on Trustpilot
        </a>
      </div>

      <div
        ref={root}
        className="relative lg:col-span-8"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client reviews"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { interacted.current = true; advance(1); }
          if (e.key === "ArrowLeft") { interacted.current = true; advance(-1); }
        }}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocus={() => (paused.current = true)}
        onBlur={() => (paused.current = false)}
      >
        <p className="sr-only" aria-live="polite">{`${top.name}: ${top.quote}`}</p>
        <div className="grid [perspective:1400px]">
          {order.map((idx, pos) => {
            const t = items[idx];
            const isTop = pos === 0;
            const hidden = pos > 2;
            const offset = isTop ? (flying ? 900 * flying : dx) : 0;
            const style: React.CSSProperties = {
              gridArea: "1 / 1",
              zIndex: items.length - pos,
              transform: isTop
                ? `translateX(${offset}px) rotate(${offset * 0.04}deg)`
                : `translateY(${pos * 16}px) scale(${1 - pos * 0.045}) rotate(${pos % 2 ? 1.6 : -1.6}deg)`,
              opacity: hidden ? 0 : isTop && flying ? 0 : 1,
              transition: dragging && isTop ? "none" : "transform .45s cubic-bezier(.22,1,.36,1), opacity .35s",
              pointerEvents: isTop ? "auto" : "none",
            };
            return (
              <figure
                key={idx}
                style={style}
                aria-hidden={!isTop}
                onPointerDown={isTop ? onDown : undefined}
                onPointerMove={isTop ? onMove : undefined}
                onPointerUp={isTop ? onUp : undefined}
                onPointerCancel={isTop ? onUp : undefined}
                className={`flex select-none flex-col rounded-[1.75rem] bg-paper p-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45),0_0_0_1px_var(--color-line)] sm:p-10 ${isTop ? "cursor-grab active:cursor-grabbing" : ""} touch-pan-y`}
              >
                <svg viewBox="0 0 48 36" className="h-8 w-10 fill-signal" aria-hidden="true">
                  <path d="M0 36V21.6C0 9.4 6.6 2.2 18.4 0l2 5.2C13.6 7 10.6 11 10.2 16.4H19V36H0Zm27.4 0V21.6C27.4 9.4 34 2.2 45.8 0l2 5.2c-6.8 1.8-9.8 5.8-10.2 11.2h8.8V36H27.4Z" />
                </svg>
                <blockquote className="mt-5 text-[1.125rem] leading-relaxed sm:text-[1.3rem]">{t.quote}</blockquote>
                <figcaption className="mt-auto flex flex-wrap items-center gap-4 pt-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-signal font-display text-lg font-bold text-ink" aria-hidden="true">
                    {initials(t.name)}
                  </span>
                  <span className="mr-auto">
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-graphite">{t.role}</span>
                  </span>
                  {t.source && (
                    <a href={t.source.url} target="_blank" rel="noopener" className="flex flex-col items-end gap-1 text-xs font-semibold text-graphite hover:text-ink" onPointerDown={(e) => e.stopPropagation()}>
                      <Stars n={t.source.rating} />
                      on {t.source.label}
                    </a>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
