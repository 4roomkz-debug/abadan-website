import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании — People Growth Technology",
  description: "Abadan & Co. — компания по развитию людей с 2015 года. Гибридная модель обучения: офлайн + онлайн + ibirAi. 359 компаний, 50K+ выпускников, 200+ экспертов.",
  keywords: [
    "Abadan",
    "People Growth Technology",
    "корпоративное обучение",
    "развитие персонала",
    "бизнес-тренинги Казахстан",
    "Гани Абадан",
  ],
  openGraph: {
    title: "О компании Abadan & Co. — People Growth Technology",
    description: "Развиваем людей. Растим показатели. Через технологии. С 2015 года.",
    url: "https://abadan.kz/about",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
