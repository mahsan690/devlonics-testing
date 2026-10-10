import { ogSize, renderOg } from "@/lib/og";
import { getMarket, markets } from "@/lib/markets";

export const alt = "Devlonic Solutions: websites by industry";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = getMarket(slug);
  return renderOg(m?.heroTitle ?? "Devlonic Solutions", m ? `Websites for ${m.name}` : "Devlonic Solutions");
}
