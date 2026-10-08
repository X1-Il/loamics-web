import { PageHero } from "@/components/sections/PageHero";
import { Article } from "@/components/sections/Article";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink, SectionHeader, delay } from "@/components/ui/primitives";
import { Prose } from "@/components/ui/Prose";
import { IconShield, IconUsers, IconLayers, IconHealth } from "@/components/brand/icons";
import { P4dpFlow } from "@/components/viz/P4dpFlow";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { getContent, getUi } from "@/i18n/server";

export function HealthView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const h = c.healthcare;
  const consortiumTitle = h.consortium[0].type === "h2" ? h.consortium[0].text : "";

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={h.crumbs.map((label) => ({ label }))}
        title={
          <>
            {c.p4dp.titleLead} <span className="text-ink-3">{c.p4dp.titleAccent}</span>
          </>
        }
        intro={c.p4dp.intro}
      >
        <ButtonLink href={site.p4dpExternal} variant="ghost">
          {c.p4dp.visit}
        </ButtonLink>
      </PageHero>

      <section className="pb-20" aria-label={h.figuresAria}>
        <div className="container-x">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line lg:grid-cols-4">
            {c.p4dp.stats.map((s, i) => (
              <div key={s.label} className="bg-night-950 p-6 md:p-8" data-reveal style={delay(i * 60)}>
                <dt className="text-4xl font-medium tracking-[-0.05em] md:text-5xl">{s.value}</dt>
                <dd className="mt-3 text-sm text-ink-3">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="hairline-t py-20 md:py-28" aria-labelledby="consortium-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader eyebrow={h.consortiumEyebrow} index="01" title={<span id="consortium-title">{consortiumTitle}</span>} />
            <Prose blocks={h.consortium.slice(1)} className="mt-8" />
          </div>
          <div className="lg:col-span-6">
            <P4dpFlow members={h.members} vendors={h.software.vendors} labels={h.flow} />
          </div>
        </div>
      </section>

      <section className="hairline-t py-20 md:py-28" aria-label={h.pillarsAria}>
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[...h.pillars, { title: h.softwareTitle, text: h.software.text }, h.security].map((p, i) => {
            const Icon = [IconLayers, IconHealth, IconUsers, IconShield][i];
            return (
              <article key={p.title} className="card p-7 md:p-9" data-reveal style={delay(i * 60)}>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-line-2">
                  <Icon size={20} />
                </span>
                <h2 className="t-h3 mt-10">{p.title}</h2>
                <p className="mt-4 leading-relaxed text-ink-2">{p.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="hairline-t py-20 md:py-28" aria-labelledby="gov-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={h.governanceEyebrow} index="02" title={<span id="gov-title">{h.governanceTitle}</span>} />
          </div>
          <dl className="lg:col-span-7">
            {h.governance.map((g) => (
              <div key={g.title} className="border-t border-line py-7 last:border-b" data-reveal>
                <dt className="text-xl tracking-tight">{g.title}</dt>
                <dd className="mt-3 leading-relaxed text-ink-2">{g.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Article blocks={h.analytics} label={getUi(locale).common.onThisPage} />
      <CtaBand locale={locale} />
    </>
  );
}
