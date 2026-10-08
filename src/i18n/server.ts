import "server-only";
import type { Locale } from "./config";
import { en as uiEn } from "./ui/en";
import { fr as uiFr } from "./ui/fr";
import { en as contentEn } from "@/content/en";
import { fr as contentFr } from "@/content/fr";

export const getUi = (locale: Locale) => (locale === "fr" ? uiFr : uiEn);
export const getContent = (locale: Locale) => (locale === "fr" ? contentFr : contentEn);
