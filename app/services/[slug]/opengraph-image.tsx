import { ogSize, renderOg } from "@/lib/og";
import { getService, services } from "@/lib/services";

export const alt = "Devlonic Solutions service";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  return renderOg(s?.heroTitle ?? "Devlonic Solutions", s?.name ?? "Devlonic Solutions");
}
