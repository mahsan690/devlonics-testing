import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import paths from "./logo-paths.json";

export const ogSize = { width: 1200, height: 630 };

// Shared 1200×630 share image: black field, the orange mark large on the right,
// the page title in Bricolage on the left.
export async function renderOg(title: string, kicker = "Devlonic Solutions", footer = "Websites, reviews and leads for local service businesses") {
  const [bold, medium] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/BricolageGrotesque-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/DMSans-Medium.ttf")),
  ]);
  const m = paths.markOnly;
  const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${m.w} ${m.h}"><path fill="#E94B27" d="${m.d}"/></svg>`;
  const markSrc = `data:image/svg+xml;base64,${Buffer.from(markSvg).toString("base64")}`;
  const markH = 520;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#000", color: "#fff", padding: "64px 72px", position: "relative" }}>
        <img src={markSrc} width={Math.round((m.w / m.h) * markH)} height={markH} style={{ position: "absolute", right: 70, top: 55 }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 840, height: "100%" }}>
          <div style={{ fontFamily: "DM Sans", fontSize: 30, color: "#A3A3A3" }}>{kicker}</div>
          <div style={{ fontFamily: "Bricolage", fontSize: title.length > 48 ? 64 : 80, lineHeight: 1, letterSpacing: "-0.03em" }}>{title}</div>
          <div style={{ fontFamily: "DM Sans", fontSize: 28, color: "#E94B27" }}>{footer}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: bold, weight: 700, style: "normal" },
        { name: "DM Sans", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
