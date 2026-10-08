import "server-only";
import type { Metadata } from "next";
import { alternates, type Locale, type RouteKey } from "./config";
import { getContent } from "./server";

type MetaKey = keyof ReturnType<typeof getContent>["meta"]["pages"];

/** Title, description, canonical and hreflang alternates for a localized page. */
export function pageMetadata(locale: Locale, key: RouteKey, override?: { description?: string }): Metadata {
  const c = getContent(locale);
  const page = key === "home" ? null : c.meta.pages[key as MetaKey];
  const description = override?.description || page?.description || c.meta.description;
  return {
    ...(page ? { title: page.title } : {}),
    description,
    alternates: alternates(locale, key),
    // openGraph is replaced (not merged) per segment, so repeat the site-level fields.
    openGraph: {
      type: "website",
      siteName: "Loamics",
      locale: c.meta.ogLocale,
      url: alternates(locale, key)?.canonical as string,
      title: page?.title ?? c.meta.siteTitle,
      description,
      images: [{ url: `/assets/og/${locale}.png`, width: 1200, height: 630, alt: c.meta.siteTitle }],
    },
    twitter: { card: "summary_large_image", images: [`/assets/og/${locale}.png`] },
  };
}
