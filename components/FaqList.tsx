import type { Faq } from "@/lib/services";

// Native <details> so answers are in the HTML (crawlable, works without JS)
// and keyboard accessible by default.
export function FaqList({ faqs, dark = false }: { faqs: Faq[]; dark?: boolean }) {
  return (
    <div className={`border-t ${dark ? "border-white/20" : "border-line"}`}>
      {faqs.map((f) => (
        <details key={f.q} className={`group border-b ${dark ? "border-white/20" : "border-line"}`}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="t-h3 font-display">{f.q}</h3>
            <span
              aria-hidden="true"
              className="relative mt-1.5 block h-4 w-4 shrink-0 before:absolute before:left-0 before:top-[7px] before:h-0.5 before:w-4 before:bg-signal after:absolute after:left-[7px] after:top-0 after:h-4 after:w-0.5 after:bg-signal after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <p className={`max-w-[62ch] pb-7 ${dark ? "text-ash" : "text-graphite"}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
