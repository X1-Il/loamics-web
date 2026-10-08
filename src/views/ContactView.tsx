import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow, delay } from "@/components/ui/primitives";
import { IconMail, IconPhone, IconPin } from "@/components/brand/icons";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { getContent, getUi } from "@/i18n/server";

export function ContactView({ locale }: { locale: Locale }) {
  const k = getContent(locale).contact;
  const c = site.contact;
  return (
    <section className="relative overflow-hidden pb-28 pt-36 md:pt-44">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div data-reveal="load">
            <Eyebrow>{k.eyebrow}</Eyebrow>
          </div>
          <h1 className="t-h1 mt-6 text-balance" data-reveal="load" style={delay(80)}>
            {k.titleLead} <span className="text-ink-3">{k.titleAccent}</span>
          </h1>
          <p className="t-lead mt-8" data-reveal="load" style={delay(160)}>
            {k.lead}
          </p>

          <div className="mt-14 border-t border-line pt-8" data-reveal="load" style={delay(240)}>
            <p className="t-eyebrow">{k.direct}</p>
            <address className="mt-6 space-y-5 not-italic">
              <p className="flex gap-4">
                <IconPin size={20} className="mt-0.5 shrink-0 text-ink-3" />
                <span>
                  <span className="block font-medium">{getUi(locale).footer.headquarters}</span>
                  <span className="text-ink-2">
                    {c.street}
                    <br />
                    {c.city}
                  </span>
                </span>
              </p>
              <a href={c.phoneHref} className="flex gap-4 hover:text-white">
                <IconPhone size={20} className="shrink-0 text-ink-3" />
                {c.phone}
              </a>
              <a href={`mailto:${c.email}`} className="flex gap-4 hover:text-white">
                <IconMail size={20} className="shrink-0 text-ink-3" />
                {c.email}
              </a>
            </address>
          </div>
        </div>
        <div className="lg:col-span-7" data-reveal="load" style={delay(160)}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
