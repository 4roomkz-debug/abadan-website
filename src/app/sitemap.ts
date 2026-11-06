import { MetadataRoute } from "next";
import { ARTICLES } from "@/data/blog";
import { INDEXED_LOCALES, isRuOnlyPath, type Locale } from "@/i18n/routing";
import { localeUrl } from "@/lib/seo";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

// /welcome и /breakfast в sitemap не входят намеренно: письмо открывают по
// прямой ссылке, презентацию показывают на мероприятии.
const PAGES: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/schedule", changeFrequency: "weekly", priority: 0.9 },
  { path: "/coaching", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/events/business-breakfast-ai-hr", changeFrequency: "weekly", priority: 0.9 },
  { path: "/treningi/neftegaz", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treningi/neftegaz/burenie", changeFrequency: "monthly", priority: 0.75 },
  { path: "/treningi/neftegaz/dobycha", changeFrequency: "monthly", priority: 0.75 },
  { path: "/treningi/neftegaz/pererabotka", changeFrequency: "monthly", priority: 0.75 },
  { path: "/treningi/neftegaz/bezopasnost", changeFrequency: "monthly", priority: 0.75 },
  { path: "/treningi/neftegaz/transport", changeFrequency: "monthly", priority: 0.75 },
  { path: "/treningi/neftegaz/atyrau", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treningi/neftegaz/aktau", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treningi/hr", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treningi/pravo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treningi/finansy", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treningi/liderstvo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treningi/ai", changeFrequency: "monthly", priority: 0.8 },
  { path: "/kejsy", changeFrequency: "monthly", priority: 0.85 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  ...ARTICLES.map((article) => ({
    path: `/blog/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
];

// Каждая страница — на каждом языке, открытом для индексации (INDEXED_LOCALES),
// с hreflang-альтернативами. Разделы только на русском — только /ru.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.flatMap(({ path, changeFrequency, priority }) => {
    const locales: readonly Locale[] = isRuOnlyPath(path) ? ["ru"] : INDEXED_LOCALES;
    const languages = Object.fromEntries(locales.map((l) => [l, localeUrl(l, path)]));

    return locales.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
