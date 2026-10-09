// Copies portfolio and review images from the current devlonics.com media
// library into public/work. Files already in the repo are skipped, so once
// they're committed the site no longer depends on the old WordPress site.
// Never fails the build: a missing image is logged, not fatal.
import { mkdir, access, writeFile } from "node:fs/promises";

const BASE = "https://devlonics.com/wp-content/uploads/2026/05/";
const files = [
  "MaetiQ-scaled.webp", "KitsXI-Ecommerce-Store-scaled.webp", "ApplyProConsulting-scaled.webp", "Earthly-Angels.webp",
  "Javabuzz-scaled.webp", "Mobilects_Ecommerce-scaled.webp", "Indy-Cardinal-Landscaping.webp", "BazTech_Ecommerce-scaled.webp",
  "Danielas-Cleaning.webp", "Bakery_Software-scaled.webp", "Alon-Home-Care.webp", "HHHC.webp", "Ka_Metal_Scrap-scaled.webp",
  "Home_Rental-scaled.webp", "Aviary_Ecommerce-scaled.webp", "Arts_Stationery-scaled.webp", "SpotWeb-scaled.webp",
  "Fugu-scaled.webp", "Delta_Extrax-scaled.webp", "Monopoled-scaled.webp", "PNWX-scaled.webp", "ILMS-scaled.webp",
  "Earn_Web-scaled.webp", "Weather_App-scaled.webp",
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `FP-Review-${n}.webp`),
  ...[1, 2, 3, 4, 5].map((n) => `UF-Review-${n}.webp`),
];

const dir = new URL("../public/work/", import.meta.url);
await mkdir(dir, { recursive: true });

let fetched = 0, skipped = 0, failed = 0;
await Promise.all(
  files.map(async (f) => {
    const dest = new URL(f, dir);
    try { await access(dest); skipped++; return; } catch {}
    try {
      const res = await fetch(BASE + f);
      if (!res.ok) throw new Error(String(res.status));
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      fetched++;
    } catch (e) {
      failed++;
      console.warn(`portfolio: could not fetch ${f} (${e.message})`);
    }
  }),
);
console.log(`portfolio images: ${fetched} fetched, ${skipped} already present, ${failed} failed`);
