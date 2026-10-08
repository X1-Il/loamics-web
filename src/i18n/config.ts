import type { Metadata } from "next";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const SITE_URL = "https://loamics.com";

/**
 * One table for every localized URL. English keeps the historical paths;
 * French reuses the slugs already indexed on loamics.com/fr, so no SEO is lost.
 */
export const routes = {
  home: { en: "/", fr: "/fr" },
  software: { en: "/software", fr: "/fr/notre-solution" },
  dataCollect: { en: "/software/data-collect", fr: "/fr/notre-solution/datacollect" },
  datalake: { en: "/software/datalake", fr: "/fr/notre-solution/datalake" },
  algoengine: { en: "/software/algoengine", fr: "/fr/notre-solution/algoengine" },
  health: { en: "/industries/healthcare-industry", fr: "/fr/donnees-sante" },
  augmented: { en: "/augmented-analytics-business-intelligence-bi", fr: "/fr/analyse-augmentee-et-business-intelligence-bi" },
  film: { en: "/film", fr: "/fr/film" },
  contact: { en: "/contact", fr: "/fr/contact" },
  brand: { en: "/brand", fr: "/fr/marque" },
  legal: { en: "/legal-notice", fr: "/fr/mentions-legales" },
  privacy: { en: "/privacy-policy", fr: "/fr/politique-de-confidentialite" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export const href = (locale: Locale, key: RouteKey) => routes[key][locale];

/** Finds which page a pathname belongs to, in either language. */
export function routeKeyFromPath(pathname: string): { key: RouteKey; locale: Locale } | null {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  for (const key of Object.keys(routes) as RouteKey[]) {
    for (const locale of locales) if (routes[key][locale] === clean) return { key, locale };
  }
  return null;
}

/** Canonical + hreflang alternates for a page. */
export function alternates(locale: Locale, key: RouteKey): Metadata["alternates"] {
  return {
    canonical: routes[key][locale],
    languages: {
      en: routes[key].en,
      fr: routes[key].fr,
      "x-default": routes[key].en,
    },
  };
}

/** Replaces `{name}` placeholders. */
export function fmt(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? `{${k}}`));
}
