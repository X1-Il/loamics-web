import type { MetadataRoute } from "next";
import { SITE_URL, routes, type RouteKey } from "@/i18n/config";

/** One entry per page and language, each declaring its translation (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(routes) as RouteKey[]).flatMap((key) => {
    const languages = { en: `${SITE_URL}${routes[key].en}`, fr: `${SITE_URL}${routes[key].fr}` };
    const priority = key === "home" ? 1 : ["software", "dataCollect", "datalake", "algoengine"].includes(key) ? 0.8 : 0.6;
    return (["en", "fr"] as const).map((l) => ({
      url: languages[l].replace(/\/$/, ""),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
