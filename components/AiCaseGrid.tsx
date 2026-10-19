"use client";

import { useState } from "react";
import { aiCaseStudies, aiCategories, type AiCategory } from "@/lib/ai";
import { AiCaseCard } from "./AiParts";

// All case studies with filter buttons. Every card is in the HTML, so search
// engines see all of them; the filter only hides cards visually.
export function AiCaseGrid() {
  const [filter, setFilter] = useState<AiCategory | "all">("all");
  const options = [
    { id: "all" as const, label: "All", count: aiCaseStudies.length },
    ...aiCategories.map((c) => ({ id: c.id, label: c.short, count: aiCaseStudies.filter((cs) => cs.category === c.id).length })),
  ];

  return (
    <div>
      <div role="group" aria-label="Filter case studies" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {options.map((o) => {
          const on = filter === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(o.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
                on ? "bg-ink text-paper" : "bg-paper text-ink shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
              }`}
            >
              {o.label} <span className={on ? "text-signal" : "text-graphite"}>{o.count}</span>
            </button>
          );
        })}
      </div>
      <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {aiCaseStudies.map((cs) => (
          <li key={cs.slug} hidden={filter !== "all" && cs.category !== filter}>
            <AiCaseCard cs={cs} />
          </li>
        ))}
      </ul>
    </div>
  );
}
