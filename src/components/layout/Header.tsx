"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { IconClose, IconMenu, IconSearch, IconArrowRight } from "@/components/brand/icons";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";
import { useClientValue, useScrolledPast } from "@/lib/hooks";
import { useI18n } from "@/i18n/client";
import { href, routeKeyFromPath, type RouteKey } from "@/i18n/config";

const NAV: RouteKey[] = ["software", "health", "augmented", "film"];

export function Header() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const scrolled = useScrolledPast(12);
  const isMac = useClientValue(() => /Mac|iPhone|iPad/.test(navigator.platform), true);
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation (state adjusted during render, no effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  // Lock page scroll while the menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");
  const other = locale === "en" ? "fr" : "en";
  // Same page in the other language; falls back to the other home page.
  const current = routeKeyFromPath(pathname);
  const switchHref = href(other, current?.key ?? "home");
  const label = (k: RouteKey) => (k === "software" ? t.nav.software : k === "health" ? t.nav.health : k === "augmented" ? t.nav.augmented : t.nav.film);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled || open
          ? "border-b border-line bg-night-950/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href={href(locale, "home")} aria-label={t.homeAria} className="-m-2 p-2 text-ink">
          <Logo height={17} />
        </Link>

        <nav aria-label={t.nav.primary} className="hidden items-center gap-1 lg:flex">
          {NAV.map((k) => {
            const path = href(locale, k);
            return (
              <Link
                key={k}
                href={path}
                aria-current={isActive(path) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${isActive(path) ? "text-ink" : "text-ink-2 hover:text-ink"}`}
              >
                {label(k)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            className="hidden h-9 items-center gap-2 rounded-full border border-line px-3 text-xs text-ink-3 transition-colors hover:border-line-2 hover:text-ink-2 md:flex"
            aria-label={`${t.nav.search} ${isMac ? "⌘" : "Ctrl"} K`}
          >
            <IconSearch size={14} />
            <span className="t-mono">{isMac ? "⌘" : "Ctrl"} K</span>
          </button>
          <a
            href={switchHref}
            hrefLang={other}
            lang={other}
            aria-label={`${t.switchShort}, ${t.switchTo}`}
            title={t.switchTo}
            className="t-mono grid h-9 min-w-9 place-items-center rounded-full border border-line px-2.5 text-xs text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
          >
            {t.switchShort}
          </a>
          <Link href={href(locale, "contact")} className="btn btn-primary btn-sm hidden sm:inline-flex">
            {t.nav.freeDemo}
          </Link>
          <button
            type="button"
            className="-mr-2 grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-line bg-night-950 lg:hidden">
        <nav aria-label={t.nav.mobile} className="container-x flex flex-col py-6">
          {[...NAV.map((k) => ({ k, text: label(k) })), { k: "contact" as RouteKey, text: t.nav.contact }].map(({ k, text }, i) => (
            <Link key={k} href={href(locale, k)} className="flex items-center justify-between border-b border-line py-5 text-2xl tracking-tight">
              <span>
                <span className="t-mono mr-4 text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                {text}
              </span>
              <IconArrowRight size={20} className="text-ink-3" />
            </Link>
          ))}
          <Link href={href(locale, "contact")} className="btn btn-primary mt-8 justify-center">
            {t.nav.bookDemo}
          </Link>
        </nav>
      </div>
    </header>
  );
}
