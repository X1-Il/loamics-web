"use client";

import { useRef, useState, type ComponentType } from "react";
import type { Block } from "@/content/blocks";
import { Prose } from "@/components/ui/Prose";
import { TextLink } from "@/components/ui/primitives";
import { IconCatalog, IconCollect, IconPrepare } from "@/components/brand/icons";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/config";

type Tab = { key: string; name: string; headline: string; body: Block[]; href: string };
const ICONS: Record<string, ComponentType<{ size?: number }>> = {
  collect: IconCollect,
  catalog: IconCatalog,
  prepare: IconPrepare,
};

/** WAI-ARIA tabs with roving tabindex and arrow-key navigation. */
export function ModuleTabs({ tabs }: { tabs: Tab[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = tabs.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div role="tablist" aria-label={t.moduleTabs.aria} aria-orientation="vertical" className="flex gap-2 overflow-x-auto lg:col-span-4 lg:flex-col">
        {tabs.map((tab, i) => {
          const Icon = ICONS[tab.key];
          const on = i === active;
          return (
            <button
              key={tab.key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`tab-${tab.key}`}
              aria-selected={on}
              aria-controls={`panel-${tab.key}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`card flex min-w-[200px] items-center gap-4 p-5 text-left ${on ? "border-line-2 bg-white/[0.05]" : "opacity-70 hover:opacity-100"}`}
            >
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${on ? "border-violet text-ink" : "border-line-2 text-ink-2"}`}>
                <Icon size={20} />
              </span>
              <span>
                <span className="t-mono block text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 block text-lg tracking-tight">{tab.name}</span>
              </span>
            </button>
          );
        })}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.key}
          role="tabpanel"
          id={`panel-${tab.key}`}
          aria-labelledby={`tab-${tab.key}`}
          hidden={i !== active}
          tabIndex={0}
          className="lg:col-span-8"
        >
          <h3 className="t-h3 max-w-2xl text-balance">{tab.headline}</h3>
          <Prose blocks={tab.body} className="mt-6 max-w-2xl" />
          <div className="mt-8">
            <TextLink href={tab.href}>{fmt(t.common.learnMoreAbout, { name: tab.name })}</TextLink>
          </div>
        </div>
      ))}
    </div>
  );
}
