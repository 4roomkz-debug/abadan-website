export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  category: "event" | "announcement" | "article";
  tags: string[];
  gallery?: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "business-breakfast-ai-hr-results",
    title: "Как прошёл бизнес-завтрак «AI в HR»",
    excerpt: "25 HR-руководителей, 3 спикера, 2.5 часа практики. Обсудили революцию найма с ИИ, AI-агентов для HR и показали живое демо ibirAi.",
    date: "2026-01-30",
    coverImage: "/news/breakfast-ai-hr/IMG_4773.JPG",
    category: "event",
    tags: ["AI", "HR", "ibirAi", "рекрутинг", "микрообучение"],
    gallery: [
      "/news/breakfast-ai-hr/DSC00642.JPEG",
      "/news/breakfast-ai-hr/DSC00674.JPEG",
      "/news/breakfast-ai-hr/DSC00690.JPEG",
      "/news/breakfast-ai-hr/DSC00720.JPEG",
    ],
  },
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getLatestNews(count: number = 3): NewsArticle[] {
  return [...newsArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function formatNewsDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getCategoryLabel(category: NewsArticle["category"]): string {
  const labels = {
    event: "Мероприятие",
    announcement: "Анонс",
    article: "Статья",
  };
  return labels[category];
}
