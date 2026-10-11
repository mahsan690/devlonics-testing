// Typed access to the compiled blog (lib/generated/posts.json, written by
// scripts/build-content.mjs from content/blog/*.md).
import posts from "./generated/posts.json";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  keyword: string;
  takeaways: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  toc: { id: string; text: string }[];
  words: number;
  readingMinutes: number;
  html: string;
};

export const allPosts = posts as Post[];

export const getPost = (slug: string) => allPosts.find((p) => p.slug === slug);

export const postsBySlugs = (slugs: string[]) =>
  slugs.map((s) => allPosts.find((p) => p.slug === s)).filter((p): p is Post => Boolean(p));

// Related posts: same category first, then most recent.
export const relatedPosts = (post: Post, limit = 3) =>
  [...allPosts.filter((p) => p.slug !== post.slug && p.category === post.category), ...allPosts.filter((p) => p.slug !== post.slug && p.category !== post.category)].slice(0, limit);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
