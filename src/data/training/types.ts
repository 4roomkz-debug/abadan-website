import type { TestimonialId } from "@/data/testimonials";

// Страница направления (/treningi/<slug>): какие курсы из SCHEDULE_DATA к ней
// относятся и как они делятся на области. Фильтр — по русским названиям курсов,
// поэтому ключевые слова русские на всех языках сайта. Тексты страницы —
// messages/*/training-<slug>.json.
export type TrainingArea = {
  id: string;
  keywords: string[];
  // Подстраница направления (только у нефтегаза, по-русски).
  href?: string;
};

export type TrainingCategory = {
  slug: string;
  keywords: string[];
  areas: TrainingArea[];
  testimonials: TestimonialId[];
};
