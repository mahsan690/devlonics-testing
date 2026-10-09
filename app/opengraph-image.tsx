import { ogSize, renderOg } from "@/lib/og";

export const alt = "Devlonic Solutions: websites that earn their keep";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOg("Websites that earn their keep.");
}
