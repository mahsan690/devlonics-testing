import { ogSize, renderOg } from "@/lib/og";

export const alt = "Devlonic Solutions: websites built to convert";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOg("Built to convert.");
}
