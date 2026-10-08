import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { IconLinkedIn, IconMail, IconPhone, IconPin, IconX } from "@/components/brand/icons";
import { site } from "@/content/site";
import { href, type Locale, type RouteKey } from "@/i18n/config";
import { getContent, getUi } from "@/i18n/server";

export function Footer({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const c = getContent(locale);
  const columns: { title: string; links: { key: RouteKey; label: string }[] }[] = [
    {
      title: t.footer.software,
      links: [
        { key: "software", label: t.footer.overview },
        { key: "dataCollect", label: "DataCollect" },
        { key: "datalake", label: "DataLake" },
        { key: "algoengine", label: "AlgoEngine" },
      ],
    },
    {
      title: t.footer.company,
      links: (["health", "augmented", "film", "brand", "contact"] as RouteKey[]).map((key) => ({ key, label: t.pages[key].label })),
    },
  ];
  const social = "grid h-10 w-10 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-line-2 hover:text-ink";

  return (
    <footer className="relative mt-auto border-t border-line">
      <div className="container-x grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo height={18} />
          <p className="mt-6 max-w-sm text-lg leading-snug tracking-tight text-ink">{c.tagline}.</p>
          <div className="mt-8 flex gap-2">
            <a href={site.social.linkedin} target="_blank" rel="noreferrer" aria-label={t.footer.linkedin} className={social}>
              <IconLinkedIn size={18} />
            </a>
            <a href={site.social.x} target="_blank" rel="noreferrer" aria-label={t.footer.x} className={social}>
              <IconX size={18} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="md:col-span-2">
            <p className="t-eyebrow">{col.title}</p>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.key}>
                  <Link href={href(locale, l.key)} className="link-underline text-sm text-ink-2 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <address className="not-italic md:col-span-3">
          <p className="t-eyebrow">{t.footer.headquarters}</p>
          <ul className="mt-5 space-y-3 text-sm text-ink-2">
            <li className="flex gap-3">
              <IconPin size={18} className="mt-0.5 shrink-0 text-ink-3" />
              <span>
                {site.contact.street}
                <br />
                {site.contact.city}
              </span>
            </li>
            <li>
              <a href={site.contact.phoneHref} className="flex gap-3 hover:text-ink">
                <IconPhone size={18} className="shrink-0 text-ink-3" />
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="flex gap-3 hover:text-ink">
                <IconMail size={18} className="shrink-0 text-ink-3" />
                {site.contact.email}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6">
            <Link href={href(locale, "legal")} className="hover:text-ink-2">
              {t.pages.legal.label}
            </Link>
            <Link href={href(locale, "privacy")} className="hover:text-ink-2">
              {t.pages.privacy.label}
            </Link>
            <a href={href(locale === "en" ? "fr" : "en", "home")} hrefLang={locale === "en" ? "fr" : "en"} className="hover:text-ink-2">
              {t.switchTo}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
