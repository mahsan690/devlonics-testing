import { ogSize, renderOg } from "@/lib/og";
import { aiCaseStudies, getAiCaseStudy } from "@/lib/ai";

export const alt = "Devlonic Solutions AI case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return aiCaseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getAiCaseStudy(slug);
  return renderOg(cs?.card ?? "AI case study", `AI case study · ${cs?.industry ?? "Devlonic"}`, "Voice agents, chatbots, automation and CRM");
}
