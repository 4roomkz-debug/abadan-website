import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Нефтегазовые тренинги в Актау — Abadan & Co.",
  description:
    "Нефтегазовые тренинги и программы повышения квалификации для специалистов Мангистауской области. Обучение для КПО, Озенмунайгаз, шельфовых проектов Каспия. Выезд на объект по всему Казахстану.",
  keywords: [
    "обучение нефтегаз Актау",
    "курсы Мангистау",
    "тренинги КПО",
    "обучение нефтяников Актау",
    "повышение квалификации Мангистау",
    "семинары нефтегаз Актау",
    "корпоративное обучение Мангистау",
    "Озенмунайгаз обучение",
    "шельф Каспий обучение",
    "нефтегазовые курсы Актау",
  ],
  openGraph: {
    title: "Нефтегазовые тренинги в Актау — Abadan & Co.",
    description:
      "65+ технических курсов для специалистов нефтегазовой отрасли Мангистауской области. Выезд на объект, корпоративные программы для КПО, Озенмунайгаз и шельфовых операций.",
    url: "https://www.abadan.kz/treningi/neftegaz/aktau",
    type: "website",
  },
  alternates: {
    canonical: "https://www.abadan.kz/treningi/neftegaz/aktau",
  },
};

const OG_KEYWORDS = [
  "нефт", "газ", "скважин", "бурен", "добыч", "переработк",
  "трубопровод", "месторожден", "геолог", "промыслов", "пласт",
  "КРС", "ГРП", "НГДУ", "коррози", "насос", "компрессор",
  "резервуар", "нефтебаз", "ГСМ", "эксплуатац", "интенсификац",
  "сероводород", "КИП", "автоматизац", "метрологи", "крекинг",
  "ректификац", "нефтехим", "битум", "мазут", "цементирован",
  "недр", "углеводород", "нефтеотдач", "газлифт", "фонтан",
  "перфорац", "каротаж", "сепарац", "гидравлик", "магистральн",
  "дизельн", "бензин",
];

function isNeftegazTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const neftegazCourses = SCHEDULE_DATA.filter((item) =>
    isNeftegazTraining(item.name)
  );
  return neftegazCourses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Технический курс для нефтегазовой отрасли: ${course.name}. ${course.hours} часов. Доступен с выездом на объекты в Мангистауской области и Актау.`,
    provider: {
      "@type": "Organization",
      name: "Abadan & Co.",
      url: "https://www.abadan.kz",
    },
    offers: [
      {
        "@type": "Offer",
        price: course.priceOffline,
        priceCurrency: "KZT",
        name: "Очный / выезд на объект",
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
        name: "Актау, Мангистауская область, Казахстан",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Актау",
          addressRegion: "Мангистауская область",
          addressCountry: "KZ",
        },
      },
    },
  }));
}

const AKTAU_FAQ = [
  {
    question: "Проводите ли вы тренинги непосредственно в Актау?",
    answer:
      "Да, мы организуем обучение в Актау: в учебных помещениях города, на базе заказчика или на производственном объекте. Возможны очный, онлайн и смешанный форматы.",
  },
  {
    question: "Работаете ли вы с КПО и Озенмунайгазом?",
    answer:
      "Мы обучаем специалистов крупнейших нефтегазовых компаний Мангистауского региона: КПО (Карачаганак Петролеум Оперейтинг), Озенмунайгаз, Мангистаумунайгаз и их подрядчиков. Программы адаптируются под корпоративные стандарты заказчика.",
  },
  {
    question: "Есть ли у вас курсы по шельфовым и морским операциям?",
    answer:
      "Да, в нашем каталоге есть программы, актуальные для шельфовых проектов: безопасность на морских платформах, коррозионная защита в агрессивных средах, эксплуатация насосно-компрессорного оборудования в условиях высокой солёности. Уточните запрос — подберём оптимальную программу.",
  },
  {
    question: "Как организован выезд тренера в Актау?",
    answer:
      "Тренер прилетает в Актау заблаговременно. Транспортные и командировочные расходы рассчитываются индивидуально и включаются в корпоративное предложение. Возможна организация нескольких курсов подряд в рамках одной командировки для оптимизации затрат.",
  },
  {
    question: "Какие курсы наиболее востребованы среди мангистауских нефтяников?",
    answer:
      "В Мангистауском регионе высокий спрос на курсы по эксплуатации нефтяных скважин и насосного оборудования, методам интенсификации добычи, промышленной безопасности, коррозионной защите, а также по КРС (капитальный ремонт скважин).",
  },
  {
    question: "Предусмотрено ли корпоративное ценообразование?",
    answer:
      "Да. При корпоративном заказе от 3 курсов или группы от 5 специалистов действуют пакетные условия. Для компаний Мангистауского региона разрабатываем годовые программы обучения — это удобно для планирования бюджета и графика повышения квалификации.",
  },
];

export default function AktauLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AKTAU_FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://www.abadan.kz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Тренинги",
        item: "https://www.abadan.kz/treningi",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Нефтегаз",
        item: "https://www.abadan.kz/treningi/neftegaz",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Актау",
        item: "https://www.abadan.kz/treningi/neftegaz/aktau",
      },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
