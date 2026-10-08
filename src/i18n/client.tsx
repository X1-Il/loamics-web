"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import { en } from "./ui/en";
import { fr } from "./ui/fr";
import type { UiDict } from "./ui/en";

const DICTS: Record<Locale, UiDict> = { en, fr };

const I18nContext = createContext<{ locale: Locale; t: UiDict }>({ locale: "en", t: en });

/** Only the small interface dictionary ships to the browser; page copy stays on the server. */
export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, t: DICTS[locale] }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
