import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Расписание открытых тренингов 2026",
  description: "Расписание курсов и тренингов Abadan & Co. на 2026 год. Бизнес-тренинги, технические семинары, управление персоналом. Онлайн и очно в Алматы. Запишитесь на обучение прямо сейчас.",
  keywords: [
    "расписание тренингов",
    "открытые тренинги Алматы",
    "бизнес курсы 2026",
    "семинары для руководителей",
    "технические семинары нефтегаз",
    "курсы HR",
    "обучение бухгалтеров",
    "тренинги по управлению"
  ],
  openGraph: {
    title: "Расписание тренингов 2026 — Abadan & Co.",
    description: "Более 170 курсов: бизнес-тренинги и технические семинары. Онлайн и очно в Алматы.",
    type: "website",
    url: "https://abadan.kz/schedule",
  },
  alternates: {
    canonical: "https://abadan.kz/schedule",
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
