import type { Locale } from "@/i18n/routing";
import ru from "./ru";

export type Messages = typeof ru;

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

const translations: Record<Exclude<Locale, "ru">, () => Promise<{ default: DeepPartial<Messages> }>> = {
  kk: () => import("./kk"),
  en: () => import("./en"),
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeOver<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override ?? base) as T;
  }
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = mergeOver((base as Record<string, unknown>)[key], value);
  }
  return result as T;
}

// Ключ, которого ещё нет в kk или en, показываем по-русски, а не падаем:
// перевод идёт частями, а до вычитки носителем kk и en закрыты noindex.
// Сколько ключей не переведено, показывает `npm run check:i18n`.
export async function loadMessages(locale: Locale): Promise<Messages> {
  if (locale === "ru") return ru;
  const own = (await translations[locale]()).default;
  return mergeOver(ru, own);
}
