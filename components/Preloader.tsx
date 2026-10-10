"use client";

import { useEffect, useRef, useState } from "react";
import paths from "@/lib/logo-paths.json";

// First-visit preloader. The Devlonic mark fills with orange as the page loads,
// tilts toward the cursor, and any click or key skips it. It shows once per
// browser session, never for reduced-motion visitors, and a CSS fallback in
// globals.css lifts it after 4s even if scripts fail.

export function Preloader() {
  const [pct, setPct] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const m = paths.markOnly;

  useEffect(() => {
    const html = document.documentElement;
    const finish = () => {
      html.dataset.preloaded = "1";
      window.dispatchEvent(new Event("dv:preloaded"));
    };
    if (html.classList.contains("no-preloader")) {
      finish();
      return;
    }

    let target = 72;
    let value = 0;
    let raf = 0;
    let ended = false;
    const t0 = performance.now();
    const MIN = 900;
    const MAX = 2600;

    const end = () => {
      if (ended) return;
      ended = true;
      setPct(100);
      try { sessionStorage.setItem("dv-seen", "1"); } catch {}
      html.classList.add("preloader-done");
      window.setTimeout(finish, 450);
    };

    const loop = (now: number) => {
      value += (target - value) * 0.08;
      setPct(Math.round(value));
      const elapsed = now - t0;
      if ((target === 100 && value > 99 && elapsed > MIN) || elapsed > MAX) return end();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.fonts?.ready.then(() => { target = Math.max(target, 88); });
    const onLoad = () => { target = 100; };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    const skip = () => end();
    const tilt = (e: PointerEvent) => {
      if (!mark.current) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mark.current.style.transform = `rotateY(${x * 28}deg) rotateX(${-y * 22}deg)`;
    };
    const node = root.current;
    node?.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointermove", tilt);

    return () => {
      cancelAnimationFrame(raf);
      node?.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointermove", tilt);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader-panel">
        <div className="[perspective:900px]">
          <div ref={mark} className="relative h-40 w-auto transition-transform duration-300 ease-out sm:h-48" style={{ aspectRatio: `${m.w} / ${m.h}` }}>
            <svg viewBox={`0 0 ${m.w} ${m.h}`} className="absolute inset-0 h-full w-full">
              <path d={m.d} fill="none" stroke="rgba(233,75,39,0.35)" strokeWidth="14" />
            </svg>
            <svg viewBox={`0 0 ${m.w} ${m.h}`} className="absolute inset-0 h-full w-full" style={{ clipPath: `inset(${100 - pct}% 0 0 0)` }}>
              <path d={m.d} fill="#E94B27" />
            </svg>
          </div>
        </div>
        <div className="mt-8 flex w-48 items-center justify-between font-display text-sm font-bold text-paper/70">
          <span>Devlonic</span>
          <span className="tabular-nums text-paper">{pct}%</span>
        </div>
        <div className="mt-2 h-px w-48 bg-white/15">
          <div className="h-full bg-signal" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-6 text-xs text-ash">Click anywhere to skip</p>
      </div>
    </div>
  );
}
