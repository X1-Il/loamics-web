"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { fmt, href, routeKeyFromPath, routes, type RouteKey } from "@/i18n/config";
import { IconArrowRight, IconSearch } from "@/components/brand/icons";

export const OPEN_PALETTE_EVENT = "loamics:open-palette";

/** Subsequence match scored by contiguity; small, dependency-free fuzzy search. */
function score(query: string, text: string) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (!q) return 1;
  if (t.includes(q)) return 100 - t.indexOf(q);
  let ti = 0;
  let s = 0;
  let streak = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return 0;
    streak = found === ti ? streak + 1 : 0;
    s += 1 + streak;
    ti = found + 1;
  }
  return s;
}

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, t } = useI18n();
  const allPages = useMemo(() => {
    const other = locale === "en" ? "fr" : "en";
    const here = routeKeyFromPath(pathname)?.key ?? "home";
    return [
      ...(Object.keys(routes) as RouteKey[]).map((k) => ({ label: t.pages[k].label, description: t.pages[k].description, href: href(locale, k) })),
      { label: t.switchTo, description: t.langName === "English" ? "Français" : "English", href: href(other, here) },
    ];
  }, [locale, t, pathname]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(
    () =>
      allPages
        .map((p) => ({ p, s: Math.max(score(query, p.label) * 2, score(query, p.description ?? "")) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((r) => r.p),
    [query, allPages],
  );

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setQuery("");
    setActive(0);
    d.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, open);
    };
  }, [open, close]);

  const go = (target: string) => {
    close();
    // Crossing languages changes the root layout: do a full navigation.
    if ((target === "/fr" || target.startsWith("/fr/")) !== (locale === "fr")) window.location.assign(target);
    else router.push(target);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={t.nav.search}
      onClick={(e) => e.target === dialogRef.current && close()}
      className="m-auto mt-[12vh] w-[min(640px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-line-2 bg-night-900/95 p-0 text-ink shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl backdrop:bg-night-950/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-line px-5">
        <IconSearch size={18} className="text-ink-3" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          placeholder={t.palette.placeholder}
          aria-label={t.nav.search}
          aria-controls="palette-results"
          aria-activedescendant={results[active] ? `palette-${active}` : undefined}
          role="combobox"
          aria-expanded="true"
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-ink-3"
        />
        <kbd className="t-mono rounded-md border border-line-2 px-1.5 py-0.5 text-[11px] text-ink-3">ESC</kbd>
      </div>
      <ul id="palette-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
        {results.length === 0 && <li className="px-4 py-6 text-sm text-ink-3">{fmt(t.palette.empty, { q: query })}</li>}
        {results.map((r, i) => (
          <li
            key={r.href}
            id={`palette-${i}`}
            role="option"
            aria-selected={i === active}
            onMouseEnter={() => setActive(i)}
            onClick={() => go(r.href)}
            className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3 transition-colors ${
              i === active ? "bg-white/[0.06]" : ""
            }`}
          >
            <span className="min-w-0">
              <span className="block text-sm font-medium">{r.label}</span>
              {r.description && <span className="block truncate text-xs text-ink-3">{r.description}</span>}
            </span>
            <IconArrowRight size={16} className={i === active ? "text-ink" : "text-transparent"} />
          </li>
        ))}
      </ul>
    </dialog>
  );
}
