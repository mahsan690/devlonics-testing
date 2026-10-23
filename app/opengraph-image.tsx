import { ogSize, renderOg } from "@/lib/og";

export const alt = "Devlonic Solutions: marketing for local service businesses";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOg("More calls, more reviews, more booked jobs.", "Marketing for local service businesses");
}
