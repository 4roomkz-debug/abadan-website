import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ibirAi — обучение в мессенджерах с проверкой усвоения | Abadan & Co.",
  description:
    "ibirAi — платформа обучения в мессенджерах: короткие уроки в WhatsApp и Telegram с проверкой усвоения и поимённой аналитикой. Флагманский кейс — Polpharma Santo: 117 руководителей, 3 страны, 12 недель.",
  keywords: [
    "AI платформа обучения",
    "микрообучение Казахстан",
    "LMS Казахстан",
    "обучение через WhatsApp",
    "обучение в мессенджерах",
    "ibirAi",
    "корпоративное обучение AI",
    "обучение технике безопасности",
    "AI обучение персонала",
    "альтернатива LMS",
  ],
  openGraph: {
    title: "ibirAi — обучение в мессенджерах с проверкой усвоения",
    description:
      "Короткие уроки в WhatsApp и Telegram с проверкой усвоения и поимённой аналитикой. Флагман — Polpharma Santo: 117 руководителей.",
    url: "https://www.abadan.kz/ibirai",
    type: "website",
    images: [
      {
        url: "https://www.abadan.kz/og-ibirai.png",
        width: 1200,
        height: 630,
        alt: "ibirAi — платформа обучения в мессенджерах",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ibirAi — обучение в мессенджерах с проверкой усвоения",
    description:
      "Короткие уроки в WhatsApp и Telegram с проверкой усвоения и поимённой аналитикой.",
  },
  alternates: { canonical: "https://www.abadan.kz/ibirai" },
};

export default function IbiraiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ibirAi — самостоятельная компания, а не продукт Abadan & Co. Разметка ниже
  // объявляет её собственным издателем и ссылается на ibirai.com как на
  // канонический источник: до августа 2026 здесь стоял provider: Abadan & Co.,
  // и поисковые ассистенты из-за этого описывали ibirAi как услугу Abadan.
  // См. «Base/GEO — канон сущностей.md» в базе знаний.
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ibirAi",
    url: "https://ibirai.com",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web, WhatsApp, Telegram",
    description:
      "Платформа обучения в мессенджерах: короткие уроки с проверкой усвоения и поимённой аналитикой по каждому сотруднику.",
    publisher: {
      "@type": "Organization",
      name: "ibirAi",
      url: "https://ibirai.com",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KZT",
      description: "Бесплатная демо-версия",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Что такое ibirAi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ibirAi — самостоятельная казахстанская платформа обучения, которая доставляет короткие уроки прямо в WhatsApp и Telegram. Сотрудник учится там, где уже есть, а компания видит поимённо, кто прошёл и что усвоил. Abadan & Co. использует ibirAi в своих корпоративных программах.",
        },
      },
      {
        "@type": "Question",
        name: "Чем ibirAi отличается от традиционной LMS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Не нужно устанавливать приложение и заходить в отдельный портал — обучение приходит в мессенджер, которым сотрудник уже пользуется. Уроки короткие и не отрывают от работы, а усвоение проверяется, а не просто фиксируется факт открытия урока.",
        },
      },
      {
        "@type": "Question",
        name: "Какой результат уже подтверждён на практике?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Флагманская программа «Лидер открытого диалога» для Polpharma Santo: 117 руководителей, 3 страны, 12 недель. 95,8% вовлечённость на старте, более 80% дошли до финала, 100% участников применили изученное на работе. Данные — итоговый отчёт декабря 2025 года.",
        },
      },
      {
        "@type": "Question",
        name: "Как быстро можно запустить ibirAi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Запуск занимает 2-3 недели от первого контакта. Мы помогаем с переносом контента и настройкой платформы под вашу компанию.",
        },
      },
      {
        "@type": "Question",
        name: "Какие мессенджеры поддерживает ibirAi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ibirAi работает в WhatsApp и Telegram. Также доступна веб-версия и интеграция с корпоративными HR-системами.",
        },
      },
      {
        "@type": "Question",
        name: "Сколько стоит ibirAi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Стоимость зависит от количества пользователей и набора функций. Мы предлагаем бесплатную демо-версию и гибкие тарифы для компаний от 50 сотрудников.",
        },
      },
    ],
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
        name: "ibirAi",
        item: "https://www.abadan.kz/ibirai",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
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
