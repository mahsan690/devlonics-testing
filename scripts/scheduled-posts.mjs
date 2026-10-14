// Used by .github/workflows/publish-scheduled-posts.yml (no dependencies).
//
//   node scripts/scheduled-posts.mjs due [YYYY-MM-DD]   slugs of posts dated that day (default: today, UTC)
//   node scripts/scheduled-posts.mjs recent [days]      slugs of posts dated in the last N days up to today (default 7)
//   node scripts/scheduled-posts.mjs all                every published post slug
//   node scripts/scheduled-posts.mjs upcoming           date and slug of every future post
//
// Posts are content/blog/<slug>.md with a `date: YYYY-MM-DD` line in the
// frontmatter; `draft: true` posts are skipped.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(new URL("..", import.meta.url).pathname, "content", "blog");
const today = new Date().toISOString().slice(0, 10);

const posts = readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const fm = readFileSync(join(dir, f), "utf8").split(/^---$/m)[1] ?? "";
    const date = fm.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1] ?? "";
    const draft = /^draft:\s*true/m.test(fm);
    return { slug: f.replace(/\.md$/, ""), date, draft };
  })
  .filter((p) => p.date && !p.draft)
  .sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));

const [cmd = "due", arg] = process.argv.slice(2);
const day = arg ?? today;
if (cmd === "due") console.log(posts.filter((p) => p.date === day).map((p) => p.slug).join("\n"));
else if (cmd === "recent") {
  // Posts dated within the last N days, up to today (default 7). The workflow
  // checks each one is live, so a late or skipped scheduled run catches up.
  const days = Number(arg) || 7;
  const from = new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10);
  console.log(posts.filter((p) => p.date >= from && p.date <= today).map((p) => p.slug).join("\n"));
}
else if (cmd === "all") console.log(posts.filter((p) => p.date <= today).map((p) => p.slug).join("\n"));
else if (cmd === "upcoming") console.log(posts.filter((p) => p.date > today).map((p) => `${p.date}  ${p.slug}`).join("\n"));
else {
  console.error(`Unknown command "${cmd}"`);
  process.exit(1);
}
