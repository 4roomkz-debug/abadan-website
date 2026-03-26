import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог — Abadan & Co.: HR, лидерство, ИИ в бизнесе",
  description:
    "Экспертные статьи об HR-трендах в Казахстане, изменениях в Трудовом кодексе РК, ИИ в бизнесе, лидерстве и корпоративном обучении от команды Abadan & Co.",
  keywords: [
    "блог HR Казахстан",
    "трудовой кодекс РК 2026",
    "корпоративное обучение",
    "ИИ в HR",
    "лидерство Казахстан",
    "Abadan блог",
    "бизнес-тренинги статьи",
  ],
  openGraph: {
    title: "Блог Abadan & Co. — HR, лидерство, ИИ в бизнесе",
    description:
      "Делимся экспертизой: HR-тренды в Казахстане, практика применения ИИ, изменения законодательства и кейсы из корпоративного обучения.",
    url: "https://www.abadan.kz/blog",
    type: "website",
  },
  alternates: { canonical: "https://www.abadan.kz/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
