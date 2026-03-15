import type { Metadata } from "next";
import { ARTICLES } from "@/data/blog";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: "Статья не найдена — Блог Abadan & Co.",
    };
  }

  const url = `https://abadan.kz/blog/${article.slug}`;
  const ogImage = article.image.startsWith("/")
    ? `https://abadan.kz${article.image}`
    : article.image;

  return {
    title: `${article.title} — Блог Abadan & Co.`,
    description: article.excerpt,
    keywords: [
      article.category,
      "корпоративное обучение Казахстан",
      "HR Казахстан",
      "бизнес-тренинги",
      "Abadan & Co.",
      article.author,
    ],
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
