import { ogSize, renderOg } from "@/lib/og";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export const alt = "Devlonic Solutions case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return renderOg(cs?.card ?? "Case study", `Case study · ${cs?.industry ?? "Devlonic"}`, "Marketing for local service businesses");
}
