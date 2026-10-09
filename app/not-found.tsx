import Link from "next/link";
import { Mark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] items-center bg-ink pb-20 pt-32 text-paper">
      <div className="wrap grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <h1 className="t-h1">This page doesn&apos;t exist.</h1>
          <p className="t-lede mt-6 max-w-xl text-ash">
            The link may be old or mistyped. Try the homepage, browse our services, or get in touch and we&apos;ll point you the right way.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-signal">Go to the homepage</Link>
            <Link href="/services" className="btn btn-ghost">Browse services</Link>
          </div>
        </div>
        <div className="hidden md:col-span-4 md:block"><Mark className="ml-auto h-64 w-auto" /></div>
      </div>
    </section>
  );
}
