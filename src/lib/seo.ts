import type { Metadata } from "next";
import { INDEXED_LOCALES, routing, type Locale } from "@/i18n/routing";

export const SITE_URL = "https://www.abadan.kz";

const OG_LOCALE: Record<Locale, string> = { ru: "ru_RU", kk: "kk_KZ", en: "en_US" };

/** Абсолютный адрес страницы на нужном языке: localeUrl("kk", "/about") → https://www.abadan.kz/kk/about */
export function localeUrl(locale: Locale, path: string): string {
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

/**
 * Достраивает метаданные страницы под язык: canonical на свою версию,
 * hreflang только на открытые для индексации языки (INDEXED_LOCALES),
 * x-default — русская версия.
 */
export function withLocale(base: Metadata, locale: Locale, path: string): Metadata {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    if (INDEXED_LOCALES.includes(l)) languages[l] = localeUrl(l, path);
  }
  languages["x-default"] = localeUrl("ru", path);

  return {
    ...base,
    alternates: { ...base.alternates, canonical: localeUrl(locale, path), languages },
    openGraph: base.openGraph
      ? { ...base.openGraph, url: localeUrl(locale, path), locale: OG_LOCALE[locale] }
      : undefined,
  };
}
