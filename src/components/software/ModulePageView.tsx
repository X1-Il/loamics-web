import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Article } from "@/components/sections/Article";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeader } from "@/components/ui/primitives";
import { IconArrowRight } from "@/components/brand/icons";
import type { ModulePage } from "@/content/en/software";
import { href, type Locale } from "@/i18n/config";
import { getContent, getUi } from "@/i18n/server";

export function ModulePageView({ locale, slug, demo }: { locale: Locale; slug: ModulePage["slug"]; demo: ReactNode }) {
  const c = getContent(locale);
  const t = getUi(locale);
  const page = c.software.modulePages[slug];
  const mp = c.software.modulePage;
  const current = c.modules.find((m) => href("en", m.route).endsWith(slug));
  const others = c.modules.filter((m) => m !== current);

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: t.pages.software.label, href: href(locale, "software") }, { label: page.name }]}
        title={
          <>
            <span className="t-mono mb-4 block text-base tracking-normal text-ink-3">
              {page.index} · {page.role}
            </span>
            {page.name}
          </>
        }
        intro={page.intro}
      />

      <section className="hairline-t py-20 md:py-24" aria-labelledby="demo-title">
        <div className="container-x">
          <SectionHeader eyebrow={mp.seeItWork} title={<span id="demo-title">{mp.demoTitles[slug]}</span>} />
          <div className="mt-12">{demo}</div>
        </div>
      </section>

      <Article blocks={page.body} label={t.common.onThisPage} />

      <section className="hairline-t py-20 md:py-24" aria-labelledby="other-title">
        <div className="container-x">
          <SectionHeader eyebrow={mp.others.eyebrow} title={<span id="other-title">{mp.others.title}</span>} />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {others.map((m) => (
              <li key={m.key}>
                <Link href={href(locale, m.route)} className="card group flex h-full flex-col p-7">
                  <span className="t-mono text-sm text-ink-3">{m.index}</span>
                  <h3 className="t-h3 mt-8">{m.product}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">{m.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm">
                    {t.common.seeMore}
                    <span className="sr-only">
                      {" "}
                      {t.common.about} {m.product}
                    </span>
                    <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
