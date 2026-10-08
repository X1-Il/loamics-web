import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink, delay } from "@/components/ui/primitives";
import { site } from "@/content/site";
import { href, type Locale } from "@/i18n/config";
import { getContent, getUi } from "@/i18n/server";

export function CtaBand({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = getUi(locale);
  return (
    <section className="section relative overflow-hidden" aria-labelledby="cta-title">
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(108_99_255/0.22),transparent_65%)]" />
      <div className="container-x flex flex-col items-center text-center">
        <div data-reveal className="text-ink">
          <LogoMark size={56} />
        </div>
        <h2 id="cta-title" className="t-h1 mt-10 max-w-4xl text-balance" data-reveal style={delay(80)}>
          {c.cta.lead} <span className="text-ink-3">{c.cta.accent}</span>
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-3" data-reveal style={delay(160)}>
          <ButtonLink href={href(locale, "contact")}>{t.nav.bookDemo}</ButtonLink>
          <a href={`mailto:${site.contact.email}`} className="btn btn-ghost">
            {site.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
