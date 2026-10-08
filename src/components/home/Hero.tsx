import { site } from "@/content/site";
import { ButtonLink, delay } from "@/components/ui/primitives";
import { href, type Locale } from "@/i18n/config";
import { getContent, getUi } from "@/i18n/server";
import { WatchVideoButton } from "./VideoModal";
import { BackgroundVideo } from "./BackgroundVideo";

export function Hero({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = getUi(locale);
  const facts = c.home.facts;
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      {/* Same film as loamics.com, used as an ambient layer */}
      <BackgroundVideo src={site.video} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-night-950/80 via-night-950/30 to-transparent" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-night-950/60 via-transparent to-night-950" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-30" />

      <div className="container-x flex flex-1 flex-col justify-end pb-16 pt-40 md:pb-24">
        <p className="t-eyebrow flex items-center gap-3" data-reveal="load">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-magenta opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-magenta" />
          </span>
          {c.home.hero.eyebrow}
        </p>
        <h1 id="hero-title" className="t-display mt-6 max-w-5xl text-balance" data-reveal="load" style={delay(80)}>
          {c.home.hero.lead} <span className="text-signal">{c.home.hero.accent}</span>
        </h1>
        <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal="load" style={delay(200)}>
          <WatchVideoButton label={t.video.watch} />
          <ButtonLink href={href(locale, "health")} variant="primary">
            {c.home.hero.p4dp}
          </ButtonLink>
        </div>
      </div>

      {/* Fact ticker */}
      <div className="relative border-y border-line bg-night-950/60 backdrop-blur-md">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <ul className="marquee-track flex shrink-0 items-center" aria-label={c.home.factsAria}>
            {[...facts, ...facts].map((f, i) => (
              <li
                key={i}
                aria-hidden={i >= facts.length}
                className="t-eyebrow flex items-center gap-10 whitespace-nowrap px-5 py-5 text-ink-2"
              >
                {f}
                <span className="h-1 w-1 rounded-full bg-violet" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
