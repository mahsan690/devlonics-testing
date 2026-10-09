import { ogSize, renderOg } from "@/lib/og";
import { getState, states } from "@/lib/states";

export const alt = "Devlonic Solutions web design by state";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const st = getState(state);
  return renderOg(st?.heroTitle ?? "Devlonic Solutions", st ? `Devlonic Solutions in ${st.name}` : "Devlonic Solutions");
}
