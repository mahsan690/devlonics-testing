// Collects Google and Bing autocomplete suggestions (US English) for every
// seed in research/keyword-seeds.txt and writes research/keyword-suggestions.json.
// Autocomplete shows how people actually phrase searches; it has no volumes.
// Runs in the "Keyword suggestions" GitHub workflow (the editing environment
// can't reach Google directly).
import { readFileSync, writeFileSync } from "node:fs";

const seeds = readFileSync("research/keyword-seeds.txt", "utf8")
  .split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (url) => {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) return [];
    const data = JSON.parse(await res.text());
    return Array.isArray(data?.[1]) ? data[1] : [];
  } catch { return []; }
};

const results = {};
for (const seed of seeds) {
  const q = encodeURIComponent(seed);
  const google = await get(`https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=${q}`);
  const bing = await get(`https://api.bing.com/osjson.aspx?market=en-US&query=${q}`);
  results[seed] = { google, bing };
  console.log(`${seed}: ${google.length} Google, ${bing.length} Bing`);
  await sleep(400);
}
writeFileSync("research/keyword-suggestions.json", JSON.stringify({ collected: new Date().toISOString(), results }, null, 2) + "\n");
