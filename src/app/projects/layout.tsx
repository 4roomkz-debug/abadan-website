import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Проекты — ibirAi и технологии обучения",
  description: "ibirAi — платформа обучения в мессенджерах. Короткие уроки в WhatsApp и Telegram с проверкой усвоения. Флагманский кейс — Polpharma Santo: 117 руководителей, 80%+ дошли до финала.",
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
    description: "Платформа обучения в мессенджерах. AI-диалог, геймификация, проверка усвоения по каждому сотруднику.",
    url: "https://www.abadan.kz/projects",
    type: "website",
  },
  alternates: {
    canonical: "https://www.abadan.kz/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
