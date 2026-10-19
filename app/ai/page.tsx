import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Blocks";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { QuoteWizard } from "@/components/QuoteWizard";
import { CallConsole } from "@/components/CallConsole";
import { AiCaseGrid } from "@/components/AiCaseGrid";
import { AiCaseCard, Check, OfferIcon } from "@/components/AiParts";
import {
  aiAnswer, aiCaseStudies, aiFaqs, aiFixes, aiIndustries, aiOffers, aiProcess, aiTools, getAiCaseStudy,
  type AiCaseStudy,
} from "@/lib/ai";
import { breadcrumbSchema, faqSchema, aiServiceSchema, aiCaseListSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Automation Agency: Voice Agents, Chatbots, CRM",
  description:
    "AI automation agency for small businesses: AI receptionists and voice agents, WhatsApp and website chatbots, n8n workflows and HubSpot CRM. 17 case studies.",
  alternates: { canonical: "/ai" },
  openGraph: {
    title: "AI automation agency: voice agents, chatbots and CRM systems",
    description: "AI receptionists, chatbots, workflow automation and CRM systems built around how your business works. 17 case studies.",
    url: "/ai",
  },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "AI automation", path: "/ai" }];

const voice = getAiCaseStudy("ai-voice-receptionist-home-services") as AiCaseStudy;
const voiceFlow = [
  { title: "Call comes in", body: "The VAPI agent answers on the first ring, day or night." },
  { title: "Intent and lookup", body: "Speech to text, intent detected, service data searched live." },
  { title: "Booked or routed", body: "Job booked into the calendar; emergencies go to the on-call tech." },
  { title: "After the call", body: "n8n posts a Slack summary and logs the lead in Google Sheets." },
];

export default function AiPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), aiServiceSchema(), faqSchema([aiAnswer, ...aiFaqs]), aiCaseListSchema(aiCaseStudies)]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-28 text-paper md:pb-24 md:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-10 h-[44rem] w-[44rem] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(233,75,39,0.22), transparent)" }} />
        <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Breadcrumbs items={crumbs} dark />
            <h1 className="mt-6">
              <span className="mb-5 block font-sans text-[1.0625rem] font-semibold tracking-normal text-signal sm:text-lg">AI automation agency</span>
              <span className="t-h1 block max-w-[18ch]">AI that answers every call, replies to every lead and runs the follow-up.</span>
            </h1>
            <p className="t-lede mt-6 max-w-2xl text-ash">
              We build AI voice agents, chatbots, workflow automations and CRM systems for small and growing US businesses. They answer calls and messages around the clock, score and route leads, and keep your tools up to date, so your team spends its time on work that needs a person.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" data-magnetic className="btn btn-signal">Get a free automation audit</a>
              <a href="#case-studies" className="btn btn-ghost">See {aiCaseStudies.length} case studies</a>
            </div>
            <ul className="mt-8 grid gap-x-6 gap-y-2.5 text-[0.95rem] sm:grid-cols-2">
              {["Built in your own accounts, so you own it", "One fixed price after a free audit", "A person stays in charge of every handoff", `Written plan within ${site.quoteTurnaround}`].map((t) => (
                <li key={t} className="flex items-center gap-2.5"><Check className="text-signal" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <CallConsole />
          </div>
        </div>

        <dl className="wrap relative mt-16 grid grid-cols-2 gap-x-8 gap-y-8 md:mt-20 lg:grid-cols-4">
          {[
            { v: String(aiCaseStudies.length), l: "AI and automation case studies" },
            { v: "24/7", l: "calls and messages answered" },
            { v: "< 2s", l: "to score and route a new lead" },
            { v: `${aiTools.length}`, l: "tools we build with and connect" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-2 border-t border-white/20 pt-4">
              <dt className="text-sm text-ash">{s.l}</dt>
              <dd className="order-first font-display text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none tracking-tight text-signal">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Tools */}
      <section aria-label="Tools we build with" className="group overflow-hidden border-b border-line bg-paper py-6">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...aiTools, ...aiTools].map((t, i) => (
            <span key={i} aria-hidden={i >= aiTools.length} className="font-display text-xl font-bold tracking-tight text-ink/70 md:text-2xl">{t}</span>
          ))}
        </div>
      </section>

      {/* Direct answer, for search and AI assistants */}
      <section className="py-16 md:py-20" aria-labelledby="answer">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <h2 id="answer" className="t-h2 lg:col-span-5">{aiAnswer.q}</h2>
          <div className="lg:col-span-7">
            <p className="t-lede">{aiAnswer.a}</p>
            <p className="mt-5 text-graphite">Most single agents and workflows go live in one to three weeks. Larger CRM and operations builds take three to six.</p>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section id="services" className="scroll-mt-24 border-t border-line py-20 md:py-28" aria-labelledby="what-we-build">
        <div className="wrap">
          <div className="max-w-3xl">
            <h2 id="what-we-build" className="t-h2">AI automation services for small businesses</h2>
            <p className="t-lede mt-5 text-graphite">Five kinds of systems, often combined: an AI receptionist that books into a CRM, which then runs the follow-up on its own.</p>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiOffers.map((o) => (
              <li key={o.id} className="flex flex-col rounded-[1.5rem] border border-line bg-paper p-7">
                <OfferIcon id={o.id} className="h-9 w-9 text-signal" />
                <h3 className="t-h3 mt-6">{o.title}</h3>
                <p className="mt-2 text-graphite">{o.body}</p>
                <ul className="ray-list mt-5 space-y-2 text-[0.975rem]">
                  {o.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <div className="mt-auto pt-6">
                  <p className="text-sm font-semibold text-graphite">Case studies</p>
                  <ul className="mt-2 space-y-1.5 text-[0.95rem]">
                    {o.cases.map((slug) => {
                      const cs = getAiCaseStudy(slug);
                      return cs ? <li key={slug}><Link href={`/ai/case-studies/${slug}`} className="link">{cs.card}</Link></li> : null;
                    })}
                  </ul>
                </div>
              </li>
            ))}
            <li className="flex flex-col justify-between rounded-[1.5rem] bg-signal p-7 text-ink">
              <div>
                <h3 className="t-h3">Not sure what to automate first?</h3>
                <p className="mt-2">Tell us where the hours go. The free audit shows which calls, messages and tasks will pay back fastest.</p>
              </div>
              <a href="#quote" className="btn btn-ink mt-8 self-start">Get a free audit</a>
            </li>
          </ul>
        </div>
      </section>

      {/* Featured case study */}
      <section className="relative overflow-hidden bg-ink py-20 text-paper md:py-28" aria-labelledby="featured">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(233,75,39,0.2), transparent)" }} />
        <div className="wrap relative">
          <div className="flex flex-wrap gap-2 text-sm font-semibold">
            <span className="rounded-full bg-signal px-3 py-1 text-ink">Featured case study</span>
            <span className="rounded-full border border-white/25 px-3 py-1">AI voice agent</span>
            <span className="rounded-full border border-white/25 px-3 py-1">{voice.industry}</span>
          </div>
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 id="featured" className="t-h2 max-w-[18ch]">An AI receptionist that answers every call, day or night.</h2>
              <p className="t-lede mt-6 text-ash">{voice.problem}</p>
              <p className="mt-4 text-paper/90">{voice.built}</p>
              <dl className="mt-10 grid grid-cols-3 gap-6">
                {voice.stats?.map((s) => (
                  <div key={s.label} className="flex flex-col gap-2 border-t border-white/20 pt-4">
                    <dt className="text-sm text-ash">{s.label}</dt>
                    <dd className="order-first font-display text-[clamp(1.9rem,3.4vw,3rem)] font-bold leading-none tracking-tight text-signal">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href={`/ai/case-studies/${voice.slug}`} data-magnetic className="btn btn-signal mt-10">Read the case study</Link>
            </div>
            <div className="lg:col-span-6">
              <div data-tilt className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] shadow-[0_40px_90px_-30px_rgba(233,75,39,0.45)]">
                <Image src={`/ai/${voice.slug}.webp`} alt="AI voice receptionist case study: call comes in, intent and lookup, booked or routed, after the call" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
          <ol className="mt-16 grid gap-4 md:grid-cols-4">
            {voiceFlow.map((f, i) => (
              <li key={f.title} className="relative rounded-2xl border border-white/15 bg-white/[0.03] p-5">
                <span className="font-display text-sm font-bold text-signal" aria-hidden="true">0{i + 1}</span>
                <span className="mt-2 block font-display text-lg font-bold tracking-tight">{f.title}</span>
                <span className="mt-1 block text-sm text-ash">{f.body}</span>
                {i < voiceFlow.length - 1 && (
                  <span aria-hidden="true" className="flow-link absolute -bottom-4 left-8 h-4 w-0.5 md:-right-4 md:bottom-auto md:left-auto md:top-1/2 md:h-0.5 md:w-4" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Where it pays off */}
      <section className="bg-fog py-20 md:py-28" aria-labelledby="pays-off">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="pays-off" className="t-h2">What can AI automate in a small business?</h2>
            <p className="t-lede mt-5 text-graphite">Start where work is repetitive and slow replies cost you money. These six usually pay back first.</p>
          </div>
          <ul className="space-y-3 lg:col-span-8">
            {aiFixes.map((f) => (
              <li key={f.problem} className="grid gap-3 rounded-[1.25rem] bg-paper p-6 md:grid-cols-[1fr_1.2fr] md:gap-8">
                <span className="font-display text-lg font-bold leading-snug tracking-tight">{f.problem}</span>
                <span className="flex gap-3 text-graphite"><Check className="mt-0.5 text-signal-ink" />{f.fix}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* All case studies */}
      <section id="case-studies" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="case-studies-title">
        <div className="wrap">
          <div className="max-w-3xl">
            <h2 id="case-studies-title" className="t-h2">{aiCaseStudies.length} AI and automation case studies</h2>
            <p className="t-lede mt-5 text-graphite">Voice agents, chatbots, n8n and Make.com workflows, HubSpot and Airtable CRMs, ClickUp and monday.com workspaces, and custom AI apps. Pick a category, or open any one for the full story and the stack.</p>
          </div>
          <div className="mt-10"><AiCaseGrid /></div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink py-20 text-paper md:py-28" aria-labelledby="process">
        <div className="wrap">
          <h2 id="process" className="t-h2 max-w-3xl">How an AI automation project works</h2>
          <ol className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {aiProcess.map((p, i) => (
              <li key={p.title} className="border-t-2 border-signal pt-6">
                <span className="font-display text-sm font-bold text-signal">0{i + 1}</span>
                <h3 className="t-h3 mt-2">{p.title}</h3>
                <p className="mt-3 text-ash">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-24" aria-labelledby="industries">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="industries" className="t-h2">Who we build AI systems for</h2>
            <p className="t-lede mt-5 text-graphite">Businesses that live on calls, enquiries and follow-ups, where a fast, consistent reply wins the job.</p>
          </div>
          <ul className="ray-list space-y-3.5 text-[1.0625rem] lg:col-span-7 lg:columns-2 lg:gap-10 [&>li]:break-inside-avoid">
            {aiIndustries.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </section>

      {/* More featured cards */}
      <section className="border-t border-line bg-fog py-20 md:py-24" aria-labelledby="more">
        <div className="wrap">
          <h2 id="more" className="t-h2">Chatbots and agents in action</h2>
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {["ai-whatsapp-assistant-auto-parts", "ai-lead-qualification-freight", "patientflow-ai-medical-tourism"].map((slug) => {
              const cs = getAiCaseStudy(slug);
              return cs ? <li key={slug}><AiCaseCard cs={cs} /></li> : null;
            })}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28" aria-labelledby="faq">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq" className="t-h2">AI automation: common questions</h2>
            <p className="mt-5 text-graphite">
              Something else on your mind? Call <a href={site.phoneHref} className="link text-ink">{site.phoneDisplay}</a> or email{" "}
              <a href={`mailto:${site.email}`} className="link text-ink">{site.email}</a>.
            </p>
          </div>
          <div className="lg:col-span-8"><FaqList faqs={aiFaqs} /></div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="scroll-mt-24 bg-ink py-20 text-paper md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="t-h2">Get a free AI automation audit.</h2>
            <ul className="mt-8 space-y-3.5 text-[1.0625rem] text-paper/90">
              <li className="flex gap-3"><Check className="mt-0.5 text-signal" />Which calls, messages and tasks to automate first</li>
              <li className="flex gap-3"><Check className="mt-0.5 text-signal" />A written plan with one fixed price within {site.quoteTurnaround}</li>
              <li className="flex gap-3"><Check className="mt-0.5 text-signal" />No obligation and no sales call to sit through</li>
            </ul>
            <p className="mt-8 text-ash">
              Prefer to talk? Call <a href={site.phoneHref} className="link text-paper">{site.phoneDisplay}</a> or email{" "}
              <a href={`mailto:${site.email}`} className="link text-paper">{site.email}</a>.
            </p>
          </div>
          <div className="lg:col-span-7">
            <QuoteWizard initialNeed="ai" />
          </div>
        </div>
      </section>
    </>
  );
}
