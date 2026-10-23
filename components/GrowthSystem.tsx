import Link from "next/link";
import { getService } from "@/lib/services";

// How the services fit together: four stages from a search to a booked job.
// A straight run, so a numbered row with links to the services behind each.
const stages = [
  { title: "Get found", body: "Show up in Google Maps and local searches, and in front of homeowners in your service area.", services: ["google-business-profile", "local-ads"] },
  { title: "Get chosen", body: "A website and reviews that make you look like the obvious, safe choice next to the competition.", services: ["website-design", "reputation-management"] },
  { title: "Capture every lead", body: "Quote forms and booking steps that send each enquiry to your email, phone and CRM in seconds.", services: ["lead-generation"] },
  { title: "Follow up on autopilot", body: "Missed calls texted back, quotes followed up and reviews requested without anyone having to remember.", services: ["automation"] },
];

export function GrowthSystem() {
  return (
    <section className="bg-fog py-20 md:py-28" aria-labelledby="growth-system">
      <div className="wrap">
        <div className="max-w-3xl">
          <h2 id="growth-system" className="t-h2">One system, from the search to the booked job.</h2>
          <p className="t-lede mt-5 text-graphite">
            Most service businesses don&apos;t need more marketing. They need the leaks fixed: a profile nobody updates, a website that doesn&apos;t convert, leads stuck in an inbox and calls that ring out.
          </p>
        </div>
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <li key={s.title} className="relative flex flex-col rounded-[1.5rem] bg-paper p-7">
              <span className="font-display text-sm font-bold text-signal-ink">0{i + 1}</span>
              <h3 className="t-h3 mt-3">{s.title}</h3>
              <p className="mt-2 text-graphite">{s.body}</p>
              <ul className="mt-auto space-y-1.5 pt-6 text-[0.95rem] font-semibold">
                {s.services.map((slug) => {
                  const svc = getService(slug);
                  return svc ? (
                    <li key={slug}>
                      <Link href={`/services/${slug}`} className="underline decoration-signal decoration-2 underline-offset-4 hover:text-signal-ink">{svc.name}</Link>
                    </li>
                  ) : null;
                })}
              </ul>
              {i < stages.length - 1 && (
                <span aria-hidden="true" className="flow-link absolute -right-4 top-1/2 hidden h-0.5 w-4 lg:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
