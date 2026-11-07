import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "kk", "en"],
  defaultLocale: "ru",
  // Префикс у всех языков, включая русский: /ru/about, /kk/about, /en/about.
  // Старые адреса без префикса уводит 308-редирект в next.config.ts.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

// Языки, которые открыты поисковикам. Язык добавляем сюда только после
// вычитки перевода: до этого он отдаётся с noindex, не попадает в sitemap и
// hreflang. en открыт 07.11.2026 (решение Гани, английский проверен Codex);
// kk — после вычитки Индиры.
export const INDEXED_LOCALES: readonly Locale[] = ["ru", "en"];

// Разделы, которые в первой волне есть только на русском. Proxy уводит
// /kk/... и /en/... этих разделов на /ru/..., переключатель языка их не предлагает.
const RU_ONLY_SECTIONS = ["/blog", "/breakfast", "/events", "/welcome", "/kejsy", "/projects"];
// Сам /treningi/neftegaz переведён, а семь его подстраниц — нет.
const RU_ONLY_CHILDREN_OF = ["/treningi/neftegaz"];

export function isRuOnlyPath(pathname: string): boolean {
  return (
    RU_ONLY_SECTIONS.some((s) => pathname === s || pathname.startsWith(`${s}/`)) ||
    RU_ONLY_CHILDREN_OF.some((s) => pathname.startsWith(`${s}/`))
  );
}
