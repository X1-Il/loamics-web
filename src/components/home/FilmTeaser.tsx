import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { IconPlay } from "@/components/brand/icons";
import { Eyebrow, delay } from "@/components/ui/primitives";
import { href, type Locale } from "@/i18n/config";
import { getContent } from "@/i18n/server";

export function FilmTeaser({ locale }: { locale: Locale }) {
  const f = getContent(locale).home.film;
  return (
    <section className="section hairline-t pt-24" aria-labelledby="film-title">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div data-reveal>
            <Eyebrow index="05">{f.eyebrow}</Eyebrow>
          </div>
          <h2 id="film-title" className="t-h2 mt-6 text-balance" data-reveal style={delay(80)}>
            {f.titleLead} <span className="text-ink-3">{f.titleAccent}</span>
          </h2>
          <p className="t-lead mt-6" data-reveal style={delay(160)}>
            {f.lead}
          </p>
        </div>
        <Link
          href={href(locale, "film")}
          className="card group relative block aspect-video overflow-hidden lg:col-span-7"
          data-reveal
          style={delay(120)}
        >
          <div aria-hidden className="bg-grid absolute inset-0" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgb(108_99_255/0.28),transparent_70%)]" />
          <svg aria-hidden viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
            {Array.from({ length: 90 }, (_, i) => {
              const a = ((-10 + (i / 89) * 290) * Math.PI) / 180;
              return <circle key={i} cx={320 + Math.cos(a) * 92} cy={170 + Math.sin(a) * 92} r={1.6} fill="#ECEBFF" opacity={0.85} />;
            })}
            {Array.from({ length: 18 }, (_, i) => {
              const a = i * 2.4;
              const r = Math.sqrt((i + 1) / 18) * 20;
              return <circle key={`n${i}`} cx={320 + 65 + Math.cos(a) * r} cy={170 - 65 + Math.sin(a) * r} r={1.8} fill={i % 2 ? "#E04FF0" : "#6C63FF"} />;
            })}
          </svg>
          <div className="absolute inset-x-0 bottom-5 flex justify-center md:bottom-8">
            <span className="flex items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-5 text-sm font-medium text-night-950 transition-transform duration-500 group-hover:scale-105">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-night-950 text-ink">
                <IconPlay size={14} />
              </span>
              {f.cta}
            </span>
          </div>
          <span className="absolute left-5 top-5 text-ink/60">
            <LogoMark size={20} mono />
          </span>
        </Link>
      </div>
    </section>
  );
}
