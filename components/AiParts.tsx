import Image from "next/image";
import Link from "next/link";
import { aiCaseStudies, aiCategories, type AiCaseStudy } from "@/lib/ai";

const shortLabel = (id: AiCaseStudy["category"]) => aiCategories.find((c) => c.id === id)?.short ?? id;

// Case study card: the 4:3 cover, category, title and one line.
// `data-tilt` lets InteractiveFX tilt the cover toward the cursor.
export function AiCaseCard({ cs, dark = false, priority = false }: { cs: AiCaseStudy; dark?: boolean; priority?: boolean }) {
  return (
    <Link href={`/ai/case-studies/${cs.slug}`} className="group block h-full">
      <div
        data-tilt
        className={`relative aspect-[4/3] overflow-hidden rounded-[1.25rem] ${dark ? "shadow-[0_0_0_1px_rgba(255,255,255,0.12)]" : "shadow-[0_0_0_1px_var(--color-line)]"}`}
      >
        <Image
          src={`/ai/${cs.slug}.webp`}
          alt={`${cs.card}: case study cover`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4">
        <span className={`text-sm font-semibold ${dark ? "text-signal" : "text-signal-ink"}`}>
          {shortLabel(cs.category)} · {cs.industry}
        </span>
        <h3 className="mt-1.5 font-display text-xl font-bold leading-tight tracking-tight">{cs.card}</h3>
        <p className={`mt-1.5 text-[0.975rem] ${dark ? "text-ash" : "text-graphite"}`}>{cs.summary}</p>
        <span className="mt-3 inline-block text-[0.95rem] font-semibold underline decoration-signal decoration-2 underline-offset-4">
          Read the case study
        </span>
      </div>
    </Link>
  );
}

// Home page teaser: the AI offer in one dark band with three case studies.
export function AiTeaser() {
  const featured = aiCaseStudies.filter((c) => c.featured);
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper md:py-28" aria-labelledby="ai-automation">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(233,75,39,0.2), transparent)" }} />
      <div className="wrap relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-signal px-3 py-1 text-sm font-semibold text-ink">New: AI automation</span>
            <h2 id="ai-automation" className="t-h2 mt-5">AI agents that answer calls, reply to customers and update your CRM.</h2>
            <p className="t-lede mt-5 text-ash">
              Voice receptionists, WhatsApp and website chatbots, n8n workflows, and HubSpot, ClickUp and monday.com systems, built around how your business already works. {aiCaseStudies.length} case studies so far.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/ai" data-magnetic className="btn btn-signal">Explore AI automation</Link>
            <Link href="/ai#case-studies" className="btn btn-ghost">All {aiCaseStudies.length} case studies</Link>
          </div>
        </div>
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((cs) => (
            <li key={cs.slug}><AiCaseCard cs={cs} dark /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-5 w-5 shrink-0 ${className}`} aria-hidden="true">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// One line icon per offer.
export function OfferIcon({ id, className = "h-8 w-8" }: { id: AiCaseStudy["category"]; className?: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<AiCaseStudy["category"], React.ReactNode> = {
    agents: (<><path d="M4 5.5h16v10H10l-4.5 3.5v-3.5H4z" {...c} /><path d="M8.5 9.5v2M11 8.5v4M13.5 9v3M16 10v1" {...c} /></>),
    automation: (<><circle cx="6" cy="6" r="2.2" {...c} /><circle cx="18" cy="12" r="2.2" {...c} /><circle cx="6" cy="18" r="2.2" {...c} /><path d="M8.2 6.5c4 .5 6 2.5 7.6 4.6M8.2 17.5c4-.5 6-2.5 7.6-4.6" {...c} /></>),
    crm: (<><path d="M3.5 6h17M3.5 12h17M3.5 18h17" {...c} /><path d="M8 4v4M15 10v4M11 16v4" {...c} /></>),
    operations: (<><rect x="3.5" y="4" width="17" height="16" rx="2" {...c} /><path d="M3.5 9h17M9 9v11M13 13h4.5M13 16.5h3" {...c} /></>),
    apps: (<><rect x="3.5" y="4.5" width="17" height="12" rx="1.5" {...c} /><path d="M8 20h8M12 16.5V20M7 13l2.5-3 2.5 2 4-4.5" {...c} /></>),
  };
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true">{paths[id]}</svg>;
}
