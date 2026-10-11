import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Terms of Use",
  description: "The terms for using the Devlonic Solutions website, including how site content, portfolio projects and links to other sites are handled.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }]}
        title="Website terms of use"
        lede="Last updated October 10, 2026."
      />
      <section className="pb-24">
        <div className="wrap">
          <div className="prose-dv max-w-[68ch] text-[1.0625rem]">
            <p>
              These terms cover your use of this website. Client projects are governed by the written quote and agreement for that project,
              not by this page.
            </p>
            <h2>Using this site</h2>
            <p>
              You&apos;re welcome to browse this site and contact us through it. Please don&apos;t misuse the quote form, attempt to disrupt the
              site, or copy its content or design for commercial use without permission.
            </p>
            <h2>Information on this site</h2>
            <p>
              We aim to keep everything here accurate and current, but it&apos;s general information, not a quote. Prices, timelines and
              deliverables for any project are confirmed in writing before work begins.
            </p>
            <h2>Portfolio and client names</h2>
            <p>
              Projects and client names shown on this site are our own work for those clients. Third-party names and trademarks belong to
              their owners.
            </p>
            <h2>Links to other sites</h2>
            <p>We may link to other websites. We aren&apos;t responsible for their content or privacy practices.</p>
            <h2>Contact</h2>
            <p>
              Questions about these terms can go to <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
