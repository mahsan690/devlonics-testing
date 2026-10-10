"use client";

import { useEffect } from "react";

// Site-wide pointer interactions, attached by data attributes:
//   data-tilt       the element tilts toward the cursor (portfolio tiles)
//   data-magnetic   the element leans toward the cursor (key buttons)
//   data-spotlight  sets --mx/--my so a glow can follow the cursor
// Only on devices with a precise pointer, and never with reduced motion.
export function InteractiveFX() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let tiltEl: HTMLElement | null = null;
    let magEl: HTMLElement | null = null;

    const reset = (el: HTMLElement | null) => { if (el) el.style.transform = ""; };

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;

      const t = target.closest<HTMLElement>("[data-tilt]");
      if (t !== tiltEl) { reset(tiltEl); tiltEl = t; }
      if (t) {
        const r = t.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        t.style.transform = `perspective(1100px) rotateY(${x * 7}deg) rotateX(${-y * 6}deg) translateZ(0)`;
      }

      const m = target.closest<HTMLElement>("[data-magnetic]");
      if (m !== magEl) { reset(magEl); magEl = m; }
      if (m) {
        const r = m.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        m.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`;
      }

      const s = target.closest<HTMLElement>("[data-spotlight]");
      if (s) {
        const r = s.getBoundingClientRect();
        s.style.setProperty("--mx", `${e.clientX - r.left}px`);
        s.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    const onLeave = () => { reset(tiltEl); reset(magEl); tiltEl = magEl = null; };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, []);
  return null;
}
