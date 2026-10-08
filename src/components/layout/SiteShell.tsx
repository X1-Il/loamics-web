import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CommandPalette } from "./CommandPalette";
import { I18nProvider } from "@/i18n/client";
import { SITE_URL, type Locale } from "@/i18n/config";
import { getContent, getUi } from "@/i18n/server";
import { site } from "@/content/site";
import "@/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function rootMetadata(locale: Locale): Metadata {
  const c = getContent(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: c.meta.siteTitle, template: `%s | ${site.name}` },
    description: c.meta.description,
    applicationName: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: c.meta.ogLocale,
      alternateLocale: locale === "en" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary_large_image", site: "@loamics" },
  };
}

export const viewport: Viewport = { themeColor: "#04041a", colorScheme: "dark" };

/** The <html> document shared by both language trees (each is its own root layout). */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getUi(locale);
  const c = getContent(locale);
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: SITE_URL,
    slogan: c.tagline,
    email: site.contact.email,
    telephone: "+33181893390",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.street,
      postalCode: site.contact.postalCode,
      addressLocality: site.contact.locality,
      addressCountry: "FR",
    },
    sameAs: [site.social.linkedin, site.social.x],
  };

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <I18nProvider locale={locale}>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-4 py-2 text-sm text-night-950 transition-transform focus:translate-y-0"
          >
            {t.skip}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
          <CommandPalette />
        </I18nProvider>
      </body>
    </html>
  );
}
