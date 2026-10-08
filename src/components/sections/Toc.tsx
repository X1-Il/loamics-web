"use client";

import { useEffect, useState } from "react";

/** Scroll-spy table of contents. */
export function Toc({ items, label }: { items: { id: string; text: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-[calc(var(--header-h)+40px)] pt-16">
      <p className="t-eyebrow">{label}</p>
      <ol className="mt-5 space-y-1 border-l border-line">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "location" : undefined}
              className={`-ml-px block border-l py-1.5 pl-4 text-sm leading-snug transition-colors ${
                active === it.id ? "border-violet text-ink" : "border-transparent text-ink-3 hover:text-ink-2"
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
