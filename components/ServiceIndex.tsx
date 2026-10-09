"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Service } from "@/lib/services";
import type { Project } from "@/lib/work";

// Services as a list. On wide screens, hovering or focusing a row swaps the
// preview on the right to a real project of that kind.
export function ServiceIndex({ items }: { items: { service: Service; project?: Project }[] }) {
  const [active, setActive] = useState(0);
  const preview = items[active]?.project;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ul className="border-t border-line lg:col-span-7">
        {items.map(({ service }, i) => (
          <li key={service.slug} className="border-b border-line">
            <Link
              href={`/services/${service.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
            >
              <span>
                <span className={`t-h2 block font-display font-bold transition-colors ${active === i ? "lg:text-ink" : "lg:text-ink/35"} group-hover:text-ink`}>
                  {service.name}
                </span>
                <span className="mt-2 block max-w-xl text-graphite">{service.short}</span>
              </span>
              <span className="text-[0.95rem] font-semibold underline decoration-signal decoration-2 underline-offset-4">
                Learn more
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          {preview && (
            <figure>
              <div className="relative aspect-[1.18] overflow-hidden rounded-[1.5rem] bg-fog">
                <Image
                  key={preview.file}
                  src={`/work/${preview.file}`}
                  alt={`${preview.name}: ${preview.type}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-graphite">
                <span className="font-semibold text-ink">{preview.name}</span>, {preview.type.toLowerCase()}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </div>
  );
}
