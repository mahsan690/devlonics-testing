import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/blog";
import { site } from "@/lib/site";

export function PostMeta({ post, className = "" }: { post: Post; className?: string }) {
  const updated = post.updated !== post.date;
  return (
    <p className={`flex flex-wrap gap-x-4 gap-y-1 text-sm text-graphite ${className}`}>
      <span>By <Link href="/about#founder" className="link text-ink">{site.founder.name}</Link></span>
      <span>{updated ? "Updated " : ""}<time dateTime={post.updated}>{formatDate(post.updated)}</time></span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}

export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-paper p-7 transition-colors hover:border-ink">
      {post.image && (
        <div className="relative -mx-7 -mt-7 mb-6 aspect-[16/9] overflow-hidden border-b border-line bg-fog">
          <Image
            src={post.image}
            alt=""
            fill
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <span className="self-start rounded-full bg-fog px-3 py-1 text-xs font-semibold">{post.category}</span>
      <h3 className={`mt-5 font-display font-bold tracking-tight ${large ? "text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.08]" : "text-xl leading-snug"}`}>
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-graphite">{post.description}</p>
      <p className="mt-auto pt-6 text-sm text-graphite">
        <time dateTime={post.updated}>{formatDate(post.updated)}</time> · {post.readingMinutes} min read
      </p>
    </article>
  );
}

export function AuthorBox() {
  return (
    <aside id="author" className="flex flex-col gap-5 rounded-[1.5rem] bg-fog p-7 sm:flex-row sm:items-start">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg font-bold text-paper" aria-hidden="true">
        MA
      </span>
      <div>
        <p className="font-display text-lg font-bold tracking-tight">{site.founder.name}</p>
        <p className="text-sm text-graphite">{site.founder.role}, {site.name}</p>
        <p className="mt-3 max-w-[60ch] text-[0.975rem]">
          Muhammad is a Top Rated WordPress developer with {site.yearsExperience} years of experience and {site.projectsDelivered} websites
          built for clients in the US, UK, UAE and Australia. He writes about how local service businesses get found, earn reviews and turn more leads into booked jobs.
        </p>
        <p className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
          <a href={site.founder.linkedin} target="_blank" rel="noopener" className="link">LinkedIn</a>
          <a href={site.profiles.upwork} target="_blank" rel="noopener" className="link">Upwork profile</a>
          <Link href="/about" className="link">About Devlonic</Link>
        </p>
      </div>
    </aside>
  );
}
