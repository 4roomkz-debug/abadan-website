import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Проекты — ibirAi и технологии обучения",
  description: "ibirAi — платформа микрообучения с AI-аватарами. 3-минутные уроки в Telegram/WhatsApp. 87% доходимость vs 23% у традиционных LMS.",
  keywords: [
    "ibirAi",
    "микрообучение",
    "AI обучение",
    "корпоративное обучение",
    "Telegram обучение",
    "Abadan проекты",
  ],
  openGraph: {
    title: "Проекты Abadan & Co. — ibirAi",
    description: "Платформа микрообучения нового поколения. AI-аватары, геймификация, 87% доходимость.",
    url: "https://abadan.kz/projects",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
