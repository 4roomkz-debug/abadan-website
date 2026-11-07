import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { withLocale } from "@/lib/seo";

const baseMetadata: Metadata = {
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
    url: "https://www.abadan.kz/ru/about",
    type: "website",
  },
  alternates: {
    canonical: "https://www.abadan.kz/ru/about",
  },
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? withLocale(baseMetadata, locale, "/about") : baseMetadata;
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
