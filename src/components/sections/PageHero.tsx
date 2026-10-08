import Link from "next/link";
import type { ReactNode } from "react";
import { delay } from "@/components/ui/primitives";
import { SITE_URL, href, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/server";

type Crumb = { label: string; href?: string };

export function PageHero({
  locale,
  crumbs,
  title,
  intro,
  aside,
  children,
}: {
  locale: Locale;
  crumbs: Crumb[];
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  const t = getUi(locale);
  const home = href(locale, "home");
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: t.pages.home.label, href: home }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden className="absolute -top-60 right-[-10%] -z-10 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgb(108_99_255/0.2),transparent_65%)]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="container-x">
        <nav aria-label={t.common.breadcrumb} data-reveal="load">
          <ol className="t-eyebrow flex flex-wrap items-center gap-2">
            <li>
              <Link href={home} className="hover:text-ink">
                Loamics
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden className="h-px w-4 bg-line-2" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink-2">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className={aside ? "lg:col-span-8" : "lg:col-span-10"}>
            <h1 className="t-h1 text-balance" data-reveal="load" style={delay(80)}>
              {title}
            </h1>
            {intro && (
              <p className="t-lead mt-8 max-w-3xl text-pretty" data-reveal="load" style={delay(160)}>
                {intro}
              </p>
            )}
            {children && (
              <div className="mt-10" data-reveal="load" style={delay(240)}>
                {children}
              </div>
            )}
          </div>
          {aside && (
            <div className="lg:col-span-4 lg:self-end" data-reveal="load" style={delay(240)}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
