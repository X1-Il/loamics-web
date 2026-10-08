import Link from "next/link";
import type { ComponentType } from "react";
import { Hero } from "@/components/home/Hero";
import { Pipeline } from "@/components/home/Pipeline";
import { CtaBand } from "@/components/sections/CtaBand";
import { FilmTeaser } from "@/components/home/FilmTeaser";
import { ButtonLink, Eyebrow, SectionHeader, TextLink, delay } from "@/components/ui/primitives";
import { IconAerospace, IconArrowUpRight, IconCity, IconFactory, IconHealth } from "@/components/brand/icons";
import { site } from "@/content/site";
import { href, type Locale } from "@/i18n/config";
import { getContent } from "@/i18n/server";

const SECTOR_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  health: IconHealth,
  city: IconCity,
  factory: IconFactory,
  aero: IconAerospace,
};

export function HomeView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const h = c.home;
  const modules = c.modules.map((m) => ({ ...m, href: href(locale, m.route) }));

  return (
    <>
      <Hero locale={locale} />

      {/* Mission */}
      <section className="section" aria-labelledby="mission-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div data-reveal>
              <Eyebrow index="00">{h.mission.eyebrow}</Eyebrow>
            </div>
            <h2 id="mission-title" className="t-h2 mt-6 text-balance" data-reveal style={delay(80)}>
              {h.mission.titleLead} <span className="text-ink-3">{h.mission.titleAccent}</span>
            </h2>
            <div className="t-lead mt-10 max-w-2xl space-y-6" data-reveal style={delay(160)}>
              <p>{h.mission.p1}</p>
              <p>{h.mission.p2}</p>
            </div>
          </div>
          <dl className="grid grid-cols-2 self-end border-l border-t border-line lg:col-span-5">
            {h.stats.map((s, i) => (
              <div key={s.label} className="border-b border-r border-line p-6 md:p-8" data-reveal style={delay(i * 80)}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-5xl font-medium tracking-[-0.05em] md:text-6xl">{s.value}</span>
                  <span className="mt-4 block text-sm leading-snug text-ink-3">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Suite */}
      <section className="section hairline-t pt-24" aria-labelledby="suite-title" id="suite">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader eyebrow={h.suite.eyebrow} index="01" title={<span id="suite-title">{h.suite.title}</span>} lead={h.suite.lead} />
            <div data-reveal className="shrink-0">
              <TextLink href={href(locale, "software")}>{h.suite.link}</TextLink>
            </div>
          </div>
          <div className="mt-16">
            <Pipeline modules={modules} />
          </div>
        </div>
      </section>

      {/* P4DP */}
      <section className="section pt-0" aria-labelledby="p4dp-title">
        <div className="container-x">
          <div className="card relative overflow-hidden" data-reveal>
            <div aria-hidden className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgb(224_79_240/0.18),transparent_65%)]" />
            <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
            <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Eyebrow index="02">{h.p4dp.eyebrow}</Eyebrow>
                <h2 id="p4dp-title" className="t-h2 mt-6 text-balance">
                  {h.p4dp.title}
                </h2>
                <p className="t-lead mt-6 max-w-2xl">{c.p4dp.intro}</p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <ButtonLink href={href(locale, "health")}>{h.p4dp.cta}</ButtonLink>
                  <ButtonLink href={site.p4dpExternal} variant="ghost">
                    p4dp.fr
                  </ButtonLink>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-2xl border border-line bg-line lg:col-span-5">
                {c.p4dp.stats.map((s) => (
                  <div key={s.label} className="bg-night-900 p-6">
                    <dt className="text-3xl font-medium tracking-[-0.04em]">{s.value}</dt>
                    <dd className="mt-3 text-sm leading-snug text-ink-3">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section hairline-t pt-24" aria-labelledby="sectors-title">
        <div className="container-x">
          <SectionHeader eyebrow={h.sectors.eyebrow} index="03" title={<span id="sectors-title">{h.sectors.title}</span>} />
          <ul className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {h.sectors.items.map((s, i) => {
              const Icon = SECTOR_ICONS[s.key];
              const linked = s.key === "health";
              const inner = (
                <>
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-line-2 text-ink transition-colors duration-500 group-hover:border-violet group-hover:text-white">
                      <Icon size={22} />
                    </span>
                    <span className="t-mono text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-10 text-xl tracking-tight md:mt-20">{s.title}</h3>
                  {linked ? (
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-ink-3 group-hover:text-ink">
                      {h.sectors.p4dpLink} <IconArrowUpRight size={14} />
                    </span>
                  ) : (
                    <span className="mt-3 block text-sm text-ink-3">{h.sectors.generic}</span>
                  )}
                </>
              );
              return (
                <li key={s.key} className="bg-night-950" data-reveal style={delay(i * 80)}>
                  {linked ? (
                    <Link href={href(locale, "health")} className="group block h-full p-7 transition-colors duration-500 hover:bg-night-900">
                      {inner}
                    </Link>
                  ) : (
                    <div className="group h-full p-7 transition-colors duration-500 hover:bg-night-900">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="section pt-0" aria-labelledby="eco-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow={h.ecosystem.eyebrow} index="04" title={<span id="eco-title">{h.ecosystem.title}</span>} />
          </div>
          <ul className="lg:col-span-8">
            {h.ecosystem.items.map((e, i) => (
              <li key={e.name} className="grid gap-2 border-t border-line py-7 last:border-b md:grid-cols-12 md:gap-8" data-reveal style={delay(i * 60)}>
                <p className="t-mono text-xs text-ink-3 md:col-span-3 md:pt-1">{e.since}</p>
                <div className="md:col-span-9">
                  <h3 className="text-xl tracking-tight">{e.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{e.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FilmTeaser locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}
