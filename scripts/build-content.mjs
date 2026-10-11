// Compiles the blog: reads content/blog/*.md, validates the frontmatter,
// renders Markdown to HTML and writes lib/generated/posts.json, which the
// blog pages, sitemap, RSS feed, proxy and llms.txt all read.
// Runs before `next dev` and `next build` (see package.json).
//
// Frontmatter (YAML between --- lines at the top of each post):
//   title:       required, the H1 (aim for under 65 characters)
//   description: required, the meta description (aim for 140–160 characters)
//   date:        required, YYYY-MM-DD. Posts dated in the future stay hidden
//                until a build runs on or after that date.
//   updated:     optional, YYYY-MM-DD, shown as "Updated"
//   category:    required, e.g. "Pricing", "Local SEO", "Shopify"
//   keyword:     optional, the main search phrase the post targets
//   takeaways:   required, 2–5 short bullet points shown at the top
//   faqs:        optional, list of { q, a } shown at the end and as FAQ schema
//   related:     optional, list of service or market slugs to link to
//   draft:       optional, true hides the post everywhere

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, basename } from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

const root = new URL("..", import.meta.url).pathname;
const contentDir = join(root, "content", "blog");
const outDir = join(root, "lib", "generated");

const slugify = (s) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");

const isDate = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
const toDateString = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v);

function render(markdown) {
  const toc = [];
  const used = new Map();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        let id = slugify(html) || "section";
        const n = used.get(id) ?? 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n + 1}`;
        if (depth === 2) toc.push({ id, text: html.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${html}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
    },
  });
  let html = marked.parse(markdown);
  // Wide tables scroll sideways on phones instead of breaking the layout.
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
  const words = markdown.replace(/[#>*_`\-|[\]()]/g, " ").split(/\s+/).filter(Boolean).length;
  return { html, toc, words, readingMinutes: Math.max(1, Math.round(words / 230)) };
}

async function main() {
  await mkdir(outDir, { recursive: true });
  let files = [];
  try {
    files = (await readdir(contentDir)).filter((f) => f.endsWith(".md"));
  } catch {
    // No blog folder yet: write an empty list.
  }
  const today = new Date().toISOString().slice(0, 10);
  const errors = [];
  const posts = [];

  for (const file of files) {
    const slug = basename(file, ".md");
    const raw = await readFile(join(contentDir, file), "utf8");
    const { data, content } = matter(raw);
    const fm = { ...data, date: toDateString(data.date), updated: toDateString(data.updated) };
    const where = `content/blog/${file}`;

    if (!/^[a-z0-9-]+$/.test(slug)) errors.push(`${where}: file name must be lowercase letters, numbers and dashes`);
    for (const key of ["title", "description", "category"]) {
      if (typeof fm[key] !== "string" || !fm[key].trim()) errors.push(`${where}: missing "${key}"`);
    }
    if (!isDate(fm.date)) errors.push(`${where}: "date" must be YYYY-MM-DD`);
    if (fm.updated && !isDate(fm.updated)) errors.push(`${where}: "updated" must be YYYY-MM-DD`);
    if (!Array.isArray(fm.takeaways) || fm.takeaways.length < 1) errors.push(`${where}: add at least one "takeaways" bullet`);
    if (fm.faqs && (!Array.isArray(fm.faqs) || fm.faqs.some((f) => !f?.q || !f?.a))) errors.push(`${where}: each faq needs "q" and "a"`);

    if (fm.draft === true || (isDate(fm.date) && fm.date > today)) continue;

    const { html, toc, words, readingMinutes } = render(content);
    posts.push({
      slug,
      title: fm.title,
      description: fm.description,
      date: fm.date,
      updated: fm.updated || fm.date,
      category: fm.category,
      keyword: fm.keyword || "",
      takeaways: fm.takeaways || [],
      faqs: fm.faqs || [],
      related: fm.related || [],
      toc,
      words,
      readingMinutes,
      html,
    });
  }

  if (errors.length) {
    console.error("Blog content errors:\n  " + errors.join("\n  "));
    process.exit(1);
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  await writeFile(join(outDir, "posts.json"), JSON.stringify(posts, null, 2) + "\n");
  console.log(`blog: ${posts.length} post(s) compiled`);
}

main();
