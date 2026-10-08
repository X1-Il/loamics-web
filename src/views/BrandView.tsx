import type { ComponentType } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { Swatch } from "@/components/brand/Swatch";
import { SectionHeader, delay } from "@/components/ui/primitives";
import { MARK } from "@/components/brand/paths";
import * as Icons from "@/components/brand/icons";
import type { Locale } from "@/i18n/config";
import { getContent, getUi } from "@/i18n/server";

const COLORS = [
  { name: "Night", hex: "#04041A" },
  { name: "Ink", hex: "#ECEBFF", light: true },
  { name: "Indigo", hex: "#6C63FF" },
  { name: "Violet", hex: "#9A5CFF" },
  { name: "Magenta", hex: "#E04FF0" },
];

const iconNames = Object.keys(Icons)
  .filter((k) => k.startsWith("Icon"))
  .sort();

export function BrandView({ locale }: { locale: Locale }) {
  const b = getContent(locale).brand;
  const colors = COLORS.map((c, i) => ({ ...c, role: b.color.roles[i] }));
  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ label: getUi(locale).pages.brand.label }]}
        title={
          <>
            {b.titleLead} <span className="text-ink-3">{b.titleAccent}</span>
          </>
        }
        intro={b.intro}
      />

      {/* Primary logo */}
      <section className="hairline-t py-20 md:py-28" aria-labelledby="logo-title">
        <div className="container-x">
          <SectionHeader eyebrow={b.logo.eyebrow} index="01" title={<span id="logo-title">{b.logo.title}</span>} />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="card grid min-h-72 place-items-center p-10 lg:col-span-2" data-reveal>
              <Logo height={56} className="max-w-full" />
            </div>
            <div className="card grid min-h-72 place-items-center p-10" data-reveal style={delay(60)}>
              <LogoMark size={112} />
            </div>
            <div className="grid min-h-56 place-items-center rounded-[var(--radius)] bg-ink p-10 text-night-950 lg:col-span-2" data-reveal>
              <Logo height={44} className="max-w-full" />
            </div>
            <div className="grid min-h-56 place-items-center rounded-[var(--radius)] bg-[image:var(--signal)] p-10 text-white" data-reveal style={delay(60)}>
              <Logo height={30} mono className="max-w-full" />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/assets/brand/loamics-logo.svg" download className="btn btn-ghost btn-sm">
              <Icons.IconDownload size={16} /> {b.logo.dl[0]}
            </a>
            <a href="/assets/brand/loamics-logo-night.svg" download className="btn btn-ghost btn-sm">
              <Icons.IconDownload size={16} /> {b.logo.dl[1]}
            </a>
            <a href="/assets/brand/loamics-mark.svg" download className="btn btn-ghost btn-sm">
              <Icons.IconDownload size={16} /> {b.logo.dl[2]}
            </a>
          </div>
        </div>
      </section>

      {/* Construction */}
      <section className="hairline-t py-20 md:py-28" aria-labelledby="construction-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={b.construction.eyebrow} index="02" title={<span id="construction-title">{b.construction.title}</span>} />
            <ul className="t-body mt-8 space-y-3">
              {b.construction.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <figure className="card relative aspect-square overflow-hidden lg:col-span-7" data-reveal>
            <svg viewBox="-6 -6 44 44" className="h-full w-full" role="img" aria-label={b.construction.aria}>
              <defs>
                <pattern id="g1" width="1" height="1" patternUnits="userSpaceOnUse">
                  <path d="M1 0H0V1" fill="none" stroke="rgb(236 235 255 / .05)" strokeWidth=".04" />
                </pattern>
              </defs>
              <rect x="-6" y="-6" width="44" height="44" fill="url(#g1)" />
              <rect x="0" y="0" width="32" height="32" fill="none" stroke="rgb(236 235 255 / .18)" strokeWidth=".06" strokeDasharray=".4 .4" />
              <circle cx="16" cy="16" r="12" fill="none" stroke="rgb(154 92 255 / .5)" strokeWidth=".06" />
              <path d="M16 16 L27.82 13.92 M16 16 L18.08 4.18" stroke="rgb(224 79 240 / .7)" strokeWidth=".06" />
              <path d="M16 16 L28 4" stroke="rgb(236 235 255 / .25)" strokeWidth=".06" strokeDasharray=".3 .3" />
              <g className="text-ink" color="#ECEBFF">
                <path d={MARK.ring} stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".9" />
                <circle cx={MARK.node.cx} cy={MARK.node.cy} r={MARK.node.r} fill="#E04FF0" opacity=".9" />
              </g>
              <circle cx="16" cy="16" r=".35" fill="#ECEBFF" />
              <text x="16.6" y="17.6" fontSize="1" fill="#8B8AB6" fontFamily="monospace">r 12</text>
              <text x="22" y="12.2" fontSize="1" fill="#E04FF0" fontFamily="monospace">70°</text>
              <text x="0" y="-1.2" fontSize="1" fill="#8B8AB6" fontFamily="monospace">32 × 32</text>
            </svg>
          </figure>
        </div>
      </section>

      {/* Color */}
      <section className="hairline-t py-20 md:py-28" aria-labelledby="color-title">
        <div className="container-x">
          <SectionHeader
            eyebrow={b.color.eyebrow}
            index="03"
            title={<span id="color-title">{b.color.title}</span>}
            lead={b.color.lead}
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
            {colors.map((c) => (
              <Swatch key={c.name} {...c} copyLabel={b.color.copy} copiedLabel={b.color.copied} />
            ))}
          </div>
          <div className="mt-4 h-16 rounded-2xl bg-[image:var(--signal)]" aria-label={b.color.gradient} role="img" />
        </div>
      </section>

      {/* Type */}
      <section className="hairline-t py-20 md:py-28" aria-labelledby="type-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow={b.type.eyebrow} index="04" title={<span id="type-title">{b.type.title}</span>} />
            <p className="t-body mt-6">{b.type.lead}</p>
          </div>
          <div className="space-y-8 lg:col-span-8">
            <p className="t-display">Aa</p>
            <p className="t-h2">{getContent(locale).tagline}</p>
            <p className="t-lead">{b.type.sample}</p>
            <p className="t-eyebrow">01 · DataCollect · 2024-03-01T08:00Z · schema-on-read</p>
          </div>
        </div>
      </section>

      {/* Icons */}
      <section className="hairline-t py-20 md:py-28" aria-labelledby="icons-title">
        <div className="container-x">
          <SectionHeader
            eyebrow={b.icons.eyebrow}
            index="05"
            title={<span id="icons-title">{b.icons.title}</span>}
            lead={b.icons.lead}
          />
          <ul className="mt-12 grid grid-cols-3 overflow-hidden rounded-2xl border border-line sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {iconNames.map((name) => {
              const I = (Icons as unknown as Record<string, ComponentType<{ size?: number }>>)[name];
              return (
                <li key={name} className="-mb-px -mr-px flex flex-col items-center gap-3 border-b border-r border-line px-2 py-6">
                  <I size={24} />
                  <span className="t-mono text-[10px] text-ink-3">{name.replace("Icon", "")}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
