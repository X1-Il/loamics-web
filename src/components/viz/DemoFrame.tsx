"use client";

import type { ReactNode } from "react";
import { useI18n } from "@/i18n/client";

/** Consistent chrome for every interactive explainer. */
export function DemoFrame({
  index,
  title,
  caption,
  note,
  controls,
  children,
}: {
  index?: string;
  title: string;
  caption?: ReactNode;
  note?: string;
  controls?: ReactNode;
  children: ReactNode;
}) {
  const { t } = useI18n();
  const noteText = note ?? t.common.illustrative;
  return (
    <figure className="card overflow-hidden" data-reveal>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
          </span>
          <span className="t-eyebrow">
            {index && <span className="mr-2 text-ink">{index}</span>}
            {title}
          </span>
        </div>
        {controls}
      </div>
      <div className="relative">{children}</div>
      {(caption || noteText) && (
        <figcaption className="flex flex-col gap-2 border-t border-line px-5 py-4 text-sm text-ink-3 md:flex-row md:items-center md:justify-between md:px-6">
          <span className="text-ink-2">{caption}</span>
          {noteText && <span className="t-mono shrink-0 text-[11px] uppercase tracking-[0.12em]">{noteText}</span>}
        </figcaption>
      )}
    </figure>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-full border border-line p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            value === o.value ? "bg-ink text-night-950" : "text-ink-2 hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
