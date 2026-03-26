import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ibirAi для нефтегаза — AI-обучение нефтегазовых специалистов | Abadan & Co.",
  description:
    "ibirAi решает задачи обучения в нефтегазовой отрасли: HSE, промышленная безопасность, сертификация H2S, адаптация вахтовиков. Офлайн-режим, сменный график, доходимость 87%.",
  keywords: [
    "AI обучение нефтегаз",
    "цифровая трансформация HSE",
    "микрообучение нефтегаз",
    "промышленная безопасность AI",
    "обучение нефтяников AI",
    "HSE обучение онлайн",
    "сертификация H2S обучение",
    "вахтовый персонал обучение",
    "ibirAi нефтегаз",
    "корпоративное обучение нефтегазовая отрасль",
  ],
  openGraph: {
    title: "ibirAi для нефтегаза — AI-обучение нефтегазовых специалистов",
    description:
      "HSE, промышленная безопасность, сертификация — AI-микрообучение для нефтегазовой отрасли. Офлайн-режим, сменный график.",
    url: "https://www.abadan.kz/ibirai/neftegaz",
    type: "website",
    images: [
      {
        url: "https://www.abadan.kz/og-ibirai.png",
        width: 1200,
        height: 630,
        alt: "ibirAi для нефтегазовой отрасли",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ibirAi для нефтегаза — AI-обучение нефтегазовых специалистов",
    description:
      "HSE, промышленная безопасность, сертификация — AI-микрообучение для нефтегазовой отрасли.",
  },
  alternates: { canonical: "https://www.abadan.kz/ibirai/neftegaz" },
};

export default function IbiraiNeftegazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ibirAi для нефтегаза",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Oil & Gas Training",
    operatingSystem: "Web, Telegram, WhatsApp",
    description:
      "AI-платформа микрообучения для нефтегазовой отрасли: HSE, промышленная безопасность, технические компетенции, сертификация. Офлайн-режим и адаптация под сменный график.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KZT",
      description: "Бесплатная демо-версия",
    },
    provider: {
      "@type": "Organization",
      name: "Abadan & Co.",
      url: "https://www.abadan.kz",
    },
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Нефтегаз",
        item: "https://www.abadan.kz/ibirai/neftegaz",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Подходит ли ibirAi для обучения вахтового персонала?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да. ibirAi разработан с учётом специфики вахтового режима: уроки доступны в любое время суток, поддерживается офлайн-режим для территорий со слабым сигналом, а расписание адаптируется под сменный график.",
        },
      },
      {
        "@type": "Question",
        name: "Как ibirAi помогает с HSE-обучением?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Платформа поддерживает регулярные инструктажи по безопасности, тесты знаний регламентов и процедур, симуляции аварийных ситуаций. Все данные о прохождении фиксируются для аудиторских проверок.",
        },
      },
      {
        "@type": "Question",
        name: "Можно ли использовать ibirAi для подготовки к сертификации H2S?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да. ibirAi включает модули подготовки к сертификации H2S: теоретическую базу, интерактивные проверочные тесты и симуляции экстренных процедур. Трекинг прогресса помогает HR видеть готовность каждого сотрудника.",
        },
      },
      {
        "@type": "Question",
        name: "Как быстро можно запустить ibirAi в нефтегазовой компании?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Запуск занимает 2–3 недели. Мы конвертируем существующие материалы (PDF, презентации, видео) в формат микроуроков и настраиваем платформу под вашу структуру. Первый пилот — онбординг или HSE-инструктаж — запускается в течение 5 рабочих дней.",
        },
      },
      {
        "@type": "Question",
        name: "Работает ли ibirAi без интернета на удалённых объектах?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да. Веб-версия ibirAi поддерживает PWA-кеширование: контент загружается заранее и доступен без интернета. Telegram также хранит последние сообщения офлайн. Данные синхронизируются при восстановлении соединения.",
        },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
