import { SCHEDULE_DATA, type ScheduleItem } from "@/data/schedule";
import type { TrainingCategory } from "./types";
import hr from "./hr";

export const TRAINING_CATEGORIES = { hr } satisfies Record<string, TrainingCategory>;
export type TrainingSlug = keyof typeof TRAINING_CATEGORIES;

const has = (name: string, kws: string[]) => {
  const lower = name.toLowerCase();
  return kws.some((kw) => lower.includes(kw.toLowerCase()));
};

// Все курсы направления за год (прошедшие отсекает страница по дате браузера).
export function coursesOf(slug: TrainingSlug): ScheduleItem[] {
  return SCHEDULE_DATA.filter((c) => has(c.name, TRAINING_CATEGORIES[slug].keywords));
}

export function inArea(c: ScheduleItem, slug: TrainingSlug, areaId: string): boolean {
  const area = TRAINING_CATEGORIES[slug].areas.find((a) => a.id === areaId);
  return area ? has(c.name, area.keywords) : true;
}

// Диапазоны цен и часов для ответов в FAQ — из расписания, а не из текста.
export function factsOf(slug: TrainingSlug) {
  const list = coursesOf(slug);
  const prices = list.flatMap((c) => [c.priceOnline, c.priceOffline]).filter((n) => n > 0);
  const hours = list.map((c) => c.hours).filter((n) => n > 0);
  return {
    count: list.length,
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 0,
    minHours: hours.length ? Math.min(...hours) : 0,
    maxHours: hours.length ? Math.max(...hours) : 0,
  };
}
