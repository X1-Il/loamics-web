import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Prose } from "@/components/ui/Prose";
import { SectionHeader, delay } from "@/components/ui/primitives";
import { ClusterDemo } from "@/components/viz/ClusterDemo";
import { IconArrowRight } from "@/components/brand/icons";
import type { Locale } from "@/i18n/config";
import { getContent, getUi } from "@/i18n/server";

export function AugmentedView({ locale }: { locale: Locale }) {
  const a = getContent(locale).augmented;
  const t = getUi(locale);
  const e = a.eyebrows;
  const h2 = (blocks: typeof a.what) => (blocks[0].type === "h2" ? blocks[0].text : "");

  return (
    <>
      <PageHero locale={locale} crumbs={[{ label: a.crumb }]} title={a.title} intro={a.intro} />

      <section className="hairline-t py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow={e.definition} index="01" title={h2(a.what)} />
          </div>
          <Prose blocks={a.what.filter((b) => b.type !== "h2")} className="lg:col-span-8 lg:max-w-[720px]" />
        </div>
      </section>

      <section className="hairline-t py-20 md:py-28" aria-labelledby="ml-title">
        <div className="container-x">
          <SectionHeader eyebrow={e.ml} index="02" title={<span id="ml-title">{e.mlTitle}</span>} lead={a.mlIntro} />
          <div className="mt-12">
            <ClusterDemo />
          </div>
          <ol className="mt-6 grid gap-6 md:grid-cols-2">
            {a.techniques.map((tq, i) => (
              <li key={tq.title} className="card p-7" data-reveal style={delay(i * 60)}>
                <span className="t-mono text-sm text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mt-8">{tq.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{tq.text}</p>
              </li>
            ))}
          </ol>
          <p className="t-body mt-10 max-w-3xl">{a.mlOutro}</p>
        </div>
      </section>

      <section className="hairline-t py-20 md:py-28" aria-labelledby="benefits-title">
        <div className="container-x">
          <SectionHeader eyebrow={e.benefits} index="03" title={<span id="benefits-title">{e.benefitsTitle}</span>} />
          <figure className="mt-12 max-w-4xl" data-reveal>
            <blockquote className="t-h2 text-balance">
              {locale === "fr" ? "« " : "“"}
              {a.benefitsIntro.quote}
              {locale === "fr" ? " »" : "”"}
            </blockquote>
            <figcaption className="t-eyebrow mt-6">{a.benefitsIntro.cite}</figcaption>
          </figure>
          <p className="t-lead mt-10 max-w-3xl">{a.benefitsIntro.text}</p>
          <dl className="mt-14">
            {a.benefits.map((b, i) => (
              <div key={b.title} className="grid gap-3 border-t border-line py-8 last:border-b md:grid-cols-12 md:gap-8" data-reveal>
                <dt className="flex items-baseline gap-4 md:col-span-4">
                  <span className="t-mono text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xl tracking-tight">{b.title}</span>
                </dt>
                <dd className="leading-relaxed text-ink-2 md:col-span-8">{b.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="hairline-t py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow={e.partnership} index="04" title={h2(a.microsoft)} />
          </div>
          <Prose blocks={a.microsoft.filter((b) => b.type !== "h2")} className="lg:col-span-8 lg:max-w-[720px]" />
        </div>
      </section>

      <section className="hairline-t py-20 md:py-28" aria-labelledby="uc-title">
        <div className="container-x">
          <SectionHeader eyebrow={e.useCases} index="05" title={<span id="uc-title">{a.useCases.title}</span>} lead={a.useCases.text} />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {a.useCases.items.map((u) => (
              <li key={u.title} className="card flex flex-col p-7" data-reveal>
                <h3 className="t-h3">{u.title}</h3>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-2">{u.text}</p>
                {"href" in u && u.href && (
                  <Link href={u.href} className="mt-6 inline-flex items-center gap-1.5 text-sm">
                    {t.common.seeMore}
                    <span className="sr-only">
                      {" "}
                      {t.common.about} {u.title}
                    </span>
                    <IconArrowRight size={16} />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
