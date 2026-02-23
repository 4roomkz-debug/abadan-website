import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Коучинг первых руководителей — Индивидуальная программа",
  description: "Авторская программа коучинга для CEO, директоров и первых лиц. 7 сессий за 7-10 недель. Выход из операционки, делегирование, команда. Гани Абадан — 12+ лет опыта, 14 000+ обученных.",
  keywords: [
    "коучинг руководителей Казахстан",
    "executive coaching Алматы",
    "коуч для директоров",
    "бизнес-коучинг Астана",
    "развитие лидерства",
    "коучинг CEO",
    "индивидуальный коучинг",
    "коуч для первых лиц",
    "лидерский коучинг Казахстан",
    "выход из операционки",
  ],
  openGraph: {
    title: "Коучинг первых руководителей — Гани Абадан",
    description: "Вы построили компанию. Но кто построит вас? 7 сессий, которые меняют стиль управления, команду и результаты.",
    url: "https://abadan.kz/coaching",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/coaching",
  },
};

export default function CoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
