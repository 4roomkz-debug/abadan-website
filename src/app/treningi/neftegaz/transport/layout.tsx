import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Курсы по трубопроводному транспорту нефти и газа — Abadan & Co.",
  description:
    "Профессиональные курсы по трубопроводному транспорту нефти и газа в Казахстане. Магистральные трубопроводы, резервуарный парк, нефтебазы, диспетчеризация, коррозионная защита. Очный и онлайн формат.",
  keywords: [
    "трубопроводный транспорт обучение",
    "магистральные трубопроводы курсы",
    "транспортировка нефти обучение",
    "нефтепровод обучение Казахстан",
    "газопровод курсы РК",
    "резервуарный парк обучение",
    "нефтебаза обучение",
    "диспетчеризация трубопроводов курс",
    "коррозионная защита трубопроводов",
    "телемеханика трубопроводов обучение",
    "эксплуатация магистральных нефтепроводов",
    "газохранилища обучение",
    "повышение квалификации трубопроводный транспорт",
    "НПС нефтеперекачивающая станция обучение",
  ],
  openGraph: {
    title: "Курсы по трубопроводному транспорту нефти и газа — Abadan & Co.",
    description:
      "Курсы по эксплуатации магистральных трубопроводов, резервуарных парков и нефтебаз. Диспетчеризация, телемеханика, коррозионная защита. 200+ экспертов-практиков.",
    url: "https://abadan.kz/treningi/neftegaz/transport",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/treningi/neftegaz/transport",
  },
};

const TRANSPORT_KEYWORDS = [
  "трубопровод", "магистральн", "транспорт", "резервуар",
  "нефтебаз", "ГСМ", "диспетчериз", "телемеханик", "коррози", "газохранилищ",
  "нефтеперекач", "нефтепровод", "газопровод",
];

function isTransportCourse(name: string): boolean {
  const lower = name.toLowerCase();
  return TRANSPORT_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const courses = SCHEDULE_DATA.filter((item) => isTransportCourse(item.name));
  return courses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Курс по трубопроводному транспорту: ${course.name}. ${course.hours} часов, очный и онлайн формат. Проводится в Алматы, Казахстан.`,
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

const TRANSPORT_FAQ = [
  {
    question: "Какие курсы по трубопроводному транспорту вы предлагаете?",
    answer:
      "Мы предлагаем курсы по эксплуатации магистральных нефтепроводов и газопроводов, диспетчерскому управлению, обслуживанию нефтеперекачивающих станций, резервуарному парку и нефтебазам, коррозионной защите трубопроводов, телемеханике и автоматизации транспортных систем.",
  },
  {
    question: "Сколько стоит обучение по трубопроводному транспорту?",
    answer:
      "Стоимость курсов по трубопроводному транспорту составляет от 120 000 до 220 000 тенге за программу. Онлайн-формат доступен по сниженной стоимости. При корпоративном заказе от 5 человек предоставляются групповые скидки.",
  },
  {
    question: "Выдаётся ли сертификат после курса по трубопроводному транспорту?",
    answer:
      "По окончании каждого курса выдаётся сертификат Abadan & Co. о повышении квалификации, признаваемый предприятиями нефтегазовой отрасли Казахстана. По запросу доступна дополнительная сертификация по международным стандартам.",
  },
  {
    question: "Проводите ли вы обучение по диспетчеризации и телемеханике трубопроводов?",
    answer:
      "Да. Курс охватывает системы диспетчерского управления и сбора данных (SCADA), телемеханику, автоматизацию нефтеперекачивающих станций, управление в нормальном и аварийном режимах, взаимодействие диспетчерских служб.",
  },
  {
    question: "Можно ли организовать корпоративное обучение с выездом на объект?",
    answer:
      "Да. Мы проводим корпоративное обучение специалистов трубопроводного транспорта непосредственно на объектах в Атырау, Актау, Актобе и других регионах Казахстана. Программа адаптируется под специфику оборудования и регламенты вашего предприятия.",
  },
  {
    question: "Кто ведёт курсы по трубопроводному транспорту?",
    answer:
      "Все курсы ведут эксперты-практики с опытом работы на магистральных трубопроводах от 10 лет. В числе преподавателей — главные инженеры, начальники служб диспетчеризации и специалисты по эксплуатации, работавшие в КазТрансОйл, КазТрансГаз и других трубопроводных компаниях.",
  },
];

export default function TransportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: TRANSPORT_FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://abadan.kz" },
      { "@type": "ListItem", position: 2, name: "Тренинги", item: "https://abadan.kz/treningi" },
      { "@type": "ListItem", position: 3, name: "Нефтегаз", item: "https://abadan.kz/treningi/neftegaz" },
      { "@type": "ListItem", position: 4, name: "Транспорт", item: "https://abadan.kz/treningi/neftegaz/transport" },
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
