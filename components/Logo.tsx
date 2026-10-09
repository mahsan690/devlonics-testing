import paths from "@/lib/logo-paths.json";

// The Devlonic wordmark as inline SVG: the mark stays brand orange,
// the text follows the surrounding text color (black on light, white on dark).
export function Logo({ className = "h-9 w-auto", title = "Devlonic Solutions" }: { className?: string; title?: string }) {
  return (
    <svg viewBox={paths.viewBox} className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <path fill="#E94B27" transform={paths.mark.transform} d={paths.mark.d} />
      <path fill="currentColor" d={paths.text} />
    </svg>
  );
}

export function Mark({ className = "h-8 w-auto" }: { className?: string }) {
  const m = paths.markOnly;
  return (
    <svg viewBox={`0 0 ${m.w} ${m.h}`} className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill="#E94B27" d={m.d} />
    </svg>
  );
}
