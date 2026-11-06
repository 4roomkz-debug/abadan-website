import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { withLocale } from "@/lib/seo";
import { SCHEDULE_DATA } from "@/data/schedule";

const baseMetadata: Metadata = {
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
    url: "https://www.abadan.kz/ru/schedule",
  },
  alternates: {
    canonical: "https://www.abadan.kz/ru/schedule",
  },
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]/schedule">): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? withLocale(baseMetadata, locale, "/schedule") : baseMetadata;
}

function buildCourseListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Открытые тренинги Abadan & Co.",
    description: "Расписание бизнес-тренингов и технических семинаров на 2026 год",
    url: "https://www.abadan.kz/ru/schedule",
    numberOfItems: SCHEDULE_DATA.length,
    itemListElement: SCHEDULE_DATA.slice(0, 30).map((course, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: course.name,
        description: `${course.name}. ${course.hours} часов, очный и онлайн формат.`,
        provider: {
          "@type": "Organization",
          name: "Abadan & Co.",
          url: "https://www.abadan.kz",
        },
        offers: {
          "@type": "Offer",
          price: course.priceOffline,
          priceCurrency: "KZT",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };
}

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseListJsonLd = buildCourseListJsonLd();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://www.abadan.kz/ru" },
      { "@type": "ListItem", position: 2, name: "Расписание", item: "https://www.abadan.kz/ru/schedule" },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
