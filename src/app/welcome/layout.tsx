import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Добро пожаловать — Открытое письмо основателя",
  description: "Личное обращение основателя Abadan & Co. Гани Абадана к руководителям и HR-директорам. Почему 359 компаний доверяют нам развитие своих команд.",
  keywords: [
    "Abadan",
    "Гани Абадан",
    "корпоративное обучение",
    "HR обучение Казахстан",
    "бизнес-тренинги",
    "развитие персонала",
  ],
  openGraph: {
    title: "Добро пожаловать — Гани Абадан, Abadan & Co.",
    description: "Личное обращение основателя. Почему 359 компаний доверяют нам развитие своих команд.",
    url: "https://abadan.kz/welcome",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/welcome",
  },
};

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
