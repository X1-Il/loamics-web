"use client";

import { useState } from "react";

export function Swatch({ name, hex, role, light, copyLabel, copiedLabel }: { name: string; hex: string; role: string; light?: boolean; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(hex).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        });
      }}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-line text-left"
      aria-label={`${copyLabel} ${name} ${hex}`}
    >
      <span className="flex h-32 items-end p-4" style={{ background: hex }}>
        <span className={`t-mono text-xs ${light ? "text-night-950" : "text-ink"} opacity-0 transition-opacity group-hover:opacity-100`}>
          {copied ? copiedLabel : copyLabel}
        </span>
      </span>
      <span className="block bg-night-900 p-4">
        <span className="block text-sm font-medium">{name}</span>
        <span className="t-mono mt-1 block text-xs text-ink-3">{hex.toUpperCase()}</span>
        <span className="mt-2 block text-xs text-ink-3">{role}</span>
      </span>
    </button>
  );
}
