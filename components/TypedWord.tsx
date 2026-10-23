"use client";

import { useEffect, useState } from "react";
import { onPreloaded } from "@/lib/preload";

export const HERO_WORDS = ["get found.", "earn reviews.", "book jobs.", "convert."];

// The last word of the hero headline: it deletes itself and types the next
// one, on a loop. The first word is rendered on the server, so search engines
// and no-JS visitors read "Built to get found." Reduced motion keeps it still.
export function TypedWord({ words = HERO_WORDS }: { words?: string[] }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    let timer = 0;
    const wait = (ms: number) => new Promise<void>((resolve) => { timer = window.setTimeout(resolve, ms); });

    const loop = async () => {
      let i = 0;
      while (alive) {
        await wait(2300);
        for (let n = words[i].length - 1; n >= 0 && alive; n--) { setText(words[i].slice(0, n)); await wait(42); }
        i = (i + 1) % words.length;
        await wait(260);
        for (let n = 1; n <= words[i].length && alive; n++) { setText(words[i].slice(0, n)); await wait(85); }
      }
    };

    // Start once the preloader has lifted, so the first change is seen.
    const stop = onPreloaded(() => { if (alive) loop(); });
    return () => { alive = false; window.clearTimeout(timer); stop(); };
  }, [words]);

  return (
    <>
      {/* A zero-width space keeps the line's height while the word is empty. */}
      {text || "​"}
      <span aria-hidden="true" className="typed-caret" />
    </>
  );
}
