import type { MetadataRoute } from "next";
import { IS_OFFICIAL_SITE, SITE_URL } from "@/i18n/config";

export default function robots(): MetadataRoute.Robots {
  if (!IS_OFFICIAL_SITE) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
