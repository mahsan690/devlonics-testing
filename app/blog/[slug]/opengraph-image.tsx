import { ogSize, renderOg } from "@/lib/og";
import { allPosts, getPost } from "@/lib/blog";

export const alt = "Devlonic Solutions blog";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOg(post?.title ?? "Devlonic Solutions blog", post ? `Devlonic blog · ${post.category}` : "Devlonic blog");
}
