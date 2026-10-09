import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, StatesGrid } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { states } from "@/lib/states";

const names = states.map((s) => s.name);
const list = `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;

export const metadata: Metadata = {
  title: `Web Design by State: ${states.map((s) => s.abbr).join(", ")} and Nationwide`,
  description: `Web design, online stores and local SEO for small businesses in ${list}, and remote projects anywhere in the US.`,
  alternates: { canonical: "/web-design" },
};

const crumbs = [{ name: "Home", path: "/" }, { name: "Areas we serve", path: "/web-design" }];

export default function AreasPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        title="Areas we serve."
        lede={`We work with small businesses across the US. In ${list} we go further, with local SEO research, town and city pages, and examples from your market.`}
      />
      <section className="pb-20 md:pb-28">
        <div className="wrap"><StatesGrid /></div>
      </section>
      <section className="border-t border-line py-20 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <h2 className="t-h2 lg:col-span-5">Somewhere else in the US?</h2>
          <div className="space-y-5 text-[1.125rem] lg:col-span-7">
            <p>
              Every project runs remotely, so where you&apos;re based doesn&apos;t change how we work. You get the same fixed quote, the same
              design approval step and the same launch checklist. Calls are scheduled in your time zone.
            </p>
            <Link href="/contact?state=other" className="btn btn-signal">Get a quote</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
