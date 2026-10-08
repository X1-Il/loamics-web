import { FilmPlayer } from "@/components/film/FilmPlayer";
import { Eyebrow, delay } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/CtaBand";
import type { Locale } from "@/i18n/config";
import { getContent } from "@/i18n/server";

export function FilmView({ locale }: { locale: Locale }) {
  const f = getContent(locale).film;
  return (
    <>
      <section className="pb-16 pt-36 md:pt-44">
        <div className="container-x">
          <div data-reveal="load">
            <Eyebrow>{f.eyebrow}</Eyebrow>
          </div>
          <h1 className="t-h1 mt-6 max-w-4xl text-balance" data-reveal="load" style={delay(80)}>
            {f.titleLead} <span className="text-ink-3">{f.titleAccent}</span>
          </h1>
          <p className="t-lead mt-6 max-w-2xl" data-reveal="load" style={delay(160)}>
            {f.lead}
          </p>
        </div>
      </section>

      <section aria-label={f.playerAria}>
        <div className="container-x" data-reveal>
          <FilmPlayer />
        </div>
      </section>

      <section className="pt-16" aria-label={f.specsAria}>
        <div className="container-x">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5">
            {f.specs.map((s) => (
              <div key={s.k} className="bg-night-950 p-5">
                <dt className="t-eyebrow">{s.k}</dt>
                <dd className="mt-2 text-sm text-ink">{s.v}</dd>
              </div>
            ))}
          </dl>
          <p className="t-mono mt-4 text-xs text-ink-3">{f.keyboard}</p>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
