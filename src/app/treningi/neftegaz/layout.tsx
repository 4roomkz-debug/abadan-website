import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Технические курсы для нефтегазовой отрасли — Abadan & Co.",
  description:
    "65+ технических курсов и семинаров для нефтегазовой отрасли в Казахстане. Бурение, добыча, переработка, трубопроводы, промышленная безопасность. 200+ экспертов-практиков. Офлайн и онлайн.",
  keywords: [
    "технические курсы нефтегаз Казахстан",
    "обучение нефтегазовая отрасль Алматы",
    "курсы бурение скважин",
    "семинары добыча нефти",
    "повышение квалификации нефтяников",
    "промышленная безопасность нефтегаз",
    "курсы переработка нефти и газа",
    "обучение трубопроводный транспорт",
    "технические семинары Казахстан",
    "нефтегазовые тренинги",
  ],
  openGraph: {
    title: "Технические курсы для нефтегазовой отрасли — Abadan & Co.",
    description:
      "65+ курсов для специалистов нефтегазовой отрасли. Бурение, добыча, переработка, безопасность. 200+ экспертов.",
    url: "https://abadan.kz/treningi/neftegaz",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/treningi/neftegaz",
  },
};

const OG_KEYWORDS = [
  "нефт", "газ", "скважин", "бурен", "добыч", "переработк",
  "трубопровод", "месторожден", "геолог", "промыслов", "пласт",
  "КРС", "ГРП", "НГДУ", "коррози", "насос", "компрессор",
  "резервуар", "нефтебаз", "ГСМ", "эксплуатац", "интенсификац",
  "сероводород", "КИП", "автоматизац", "метрологи", "крекинг",
  "ректификац", "нефтехим", "битум", "мазут", "цементирован",
];

function isNeftegazTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const neftegazCourses = SCHEDULE_DATA.filter((item) => isNeftegazTraining(item.name));
  return neftegazCourses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Технический курс: ${course.name}. ${course.hours} часов, очный и онлайн формат.`,
    provider: {
      "@type": "Organization",
      name: "Abadan & Co.",
      url: "https://abadan.kz",
    },
    offers: [
      {
        "@type": "Offer",
        price: course.priceOffline,
        priceCurrency: "KZT",
        name: "Очный формат",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        price: course.priceOnline,
        priceCurrency: "KZT",
        name: "Онлайн формат",
        availability: "https://schema.org/InStock",
      },
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["onsite", "online"],
      duration: `PT${course.hours}H`,
      inLanguage: "ru",
      location: {
        "@type": "Place",
        name: "Алматы, Казахстан",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Алматы",
          addressCountry: "KZ",
        },
      },
    },
  }));
}

const NEFTEGAZ_FAQ = [
  { question: "Какие технические курсы для нефтегазовой отрасли вы предлагаете?", answer: "Более 65 курсов: бурение и капитальный ремонт скважин, добыча нефти и газа, переработка и нефтехимия, трубопроводный транспорт, промышленная безопасность, КИПиА и автоматизация, геология и геофизика." },
  { question: "Сколько стоит обучение для нефтяников?", answer: "Стоимость технических курсов от 120 000 до 220 000 тенге. Очный формат включает практические занятия. Для компаний с группой от 5 человек действуют корпоративные тарифы." },
  { question: "Есть ли у вас курсы по промышленной безопасности?", answer: "Да, у нас есть курсы по промбезопасности в нефтегазовой отрасли, работе с сероводородом, охране труда, HSE-менеджменту. Программы соответствуют требованиям законодательства РК." },
  { question: "Выезжаете ли вы на месторождения для обучения?", answer: "Да, мы проводим корпоративное обучение с выездом на объекты в Атырау, Актау, Мангистау, Кызылорду и другие нефтегазовые регионы Казахстана." },
  { question: "Кто проводит технические семинары?", answer: "Все тренеры — эксперты-практики с опытом работы в нефтегазовой отрасли от 10 лет. Среди наших экспертов — специалисты, работавшие в ТШО, НКОК, КПО, КазМунайГаз." },
  { question: "Какой сертификат выдаётся после технического курса?", answer: "По окончании выдаётся сертификат Abadan & Co. о повышении квалификации. Для отдельных курсов возможна сертификация по международным стандартам." },
];

export default function NeftegazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: NEFTEGAZ_FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: "https://abadan.kz" },
            { "@type": "ListItem", position: 2, name: "Тренинги", item: "https://abadan.kz/treningi" },
            { "@type": "ListItem", position: 3, name: "Нефтегаз", item: "https://abadan.kz/treningi/neftegaz" },
          ],
        }) }}
      />
      {children}
    </>
  );
}
