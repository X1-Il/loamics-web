import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ModuleTabs } from "@/components/software/ModuleTabs";
import { Architecture } from "@/components/software/Architecture";
import { EtlElt } from "@/components/viz/EtlElt";
import { Prose } from "@/components/ui/Prose";
import { SectionHeader, delay } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import { getContent, getUi } from "@/i18n/server";

export function SoftwareView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const s = c.software.overview;
  const p = c.software.page;
  const platformTitle = s.platform[0].type === "h2" ? s.platform[0].text : "";

  return (
    <>
      <PageHero locale={locale} crumbs={[{ label: getUi(locale).pages.software.label }]} title={s.title} intro={s.intro} />

      <section className="hairline-t py-20 md:py-28" aria-labelledby="arch-title">
        <div className="container-x">
          <SectionHeader eyebrow={p.arch.eyebrow} index="01" title={<span id="arch-title">{p.arch.title}</span>} />
          <div className="mt-12">
            <Architecture locale={locale} />
          </div>
        </div>
      </section>

      <section className="hairline-t py-20 md:py-28" aria-labelledby="platform-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={p.platform.eyebrow} index="02" title={<span id="platform-title">{platformTitle}</span>} />
          </div>
          <div className="lg:col-span-7">
            <Prose blocks={s.platform.filter((b) => b.type !== "h2")} />
            <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {p.pillars.map((pl, i) => (
                <div key={pl.k} className="bg-night-950 p-6" data-reveal style={delay(i * 60)}>
                  <dt className="font-medium tracking-tight">{pl.k}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-3">{pl.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="hairline-t py-20 md:py-28" aria-labelledby="modules-title">
        <div className="container-x">
          <SectionHeader eyebrow={p.modules.eyebrow} index="03" title={<span id="modules-title">{p.modules.title}</span>} />
          <div className="mt-14">
            <ModuleTabs tabs={s.tabs} />
          </div>
        </div>
      </section>

      <section className="hairline-t py-20 md:py-28" aria-labelledby="etl-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={p.process.eyebrow} index="04" title={<span id="etl-title">{s.elt.title}</span>} />
            <div className="t-body mt-8 space-y-4">
              {s.elt.body.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <EtlElt />
          </div>
        </div>
      </section>

      <section className="hairline-t py-20 md:py-28" aria-labelledby="evo-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={s.evolution.eyebrow} index="05" title={<span id="evo-title">{s.evolution.title}</span>} />
          </div>
          <p className="t-lead lg:col-span-7" data-reveal>
            {s.evolution.body}
          </p>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
