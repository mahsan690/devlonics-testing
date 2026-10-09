import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Devlonic Solutions collects, uses and protects the information you share through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }]}
        title="Privacy policy"
        lede="Last updated October 10, 2026."
      />
      <section className="pb-24">
        <div className="wrap">
          <div className="prose-dv max-w-[68ch] text-[1.0625rem]">
            <p>
              This policy explains what information {site.name} (&ldquo;we&rdquo;) collects through this website and what we do with it.
              Questions can go to <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            <h2>What we collect</h2>
            <ul>
              <li><strong>Details you send us.</strong> When you use the quote form or email us, we receive your name, email address, and anything else you choose to share, such as your phone number, business name and project details.</li>
              <li><strong>Anonymous usage data.</strong> We use Vercel Web Analytics and Speed Insights to understand which pages are visited and how fast they load. These tools don&apos;t use cookies and don&apos;t identify you personally.</li>
            </ul>
            <h2>How we use it</h2>
            <p>
              We use the details you send only to reply to your enquiry, prepare a quote, and carry out any work you hire us for.
              We don&apos;t sell your information, and we don&apos;t add you to marketing lists without your permission.
            </p>
            <h2>Who else handles it</h2>
            <p>
              Form submissions are delivered to our inbox through an email delivery service, and the website is hosted by Vercel.
              These providers process data on our behalf and only as needed to provide their service.
            </p>
            <h2>How long we keep it</h2>
            <p>
              We keep enquiry details for as long as needed to respond and, if you become a client, for the length of our working
              relationship and any period required for tax or legal records.
            </p>
            <h2>Your choices</h2>
            <p>
              You can ask us at any time to see, correct or delete the information we hold about you by emailing{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>. Depending on where you live, including California, you may have additional
              rights under state privacy laws, and we&apos;ll honor those requests.
            </p>
            <h2>Changes</h2>
            <p>If we change this policy, we&apos;ll update the date at the top of this page.</p>
          </div>
        </div>
      </section>
    </>
  );
}
