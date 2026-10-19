import { ogSize, renderOg } from "@/lib/og";

export const alt = "Devlonic Solutions: AI automation agency";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOg("AI that answers every call and runs the follow-up.", "AI automation agency", "Voice agents, chatbots, automation and CRM");
}
