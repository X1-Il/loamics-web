import { PageHero } from "@/components/sections/PageHero";
import { Article } from "@/components/sections/Article";
import type { Locale } from "@/i18n/config";
import { getContent, getUi } from "@/i18n/server";

export function LegalView({ locale, kind }: { locale: Locale; kind: "legal" | "privacy" }) {
  const t = getUi(locale);
  const c = getContent(locale);
  const title = t.pages[kind].label;
  return (
    <>
      <PageHero locale={locale} crumbs={[{ label: title }]} title={title} />
      <Article blocks={kind === "legal" ? c.legal.legalNotice : c.legal.privacyPolicy} label={t.common.onThisPage} />
    </>
  );
}
