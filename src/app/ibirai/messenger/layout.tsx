import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обучение в Telegram с напоминаниями в WhatsApp — ibirAi | Abadan & Co.",
  description:
    "ibirAi доставляет корпоративное обучение в Telegram, а напоминание о занятии дублирует в WhatsApp. Никаких новых приложений — урок открывается в мессенджере, которым сотрудник уже пользуется, и усвоение проверяется по каждому.",
  keywords: [
    "обучение через Telegram",
    "обучение в мессенджере",
    "микрообучение мессенджеры",
    "Telegram бот обучение",
    "корпоративное обучение мессенджер",
    "Telegram LMS",
    "обучение в мессенджерах Казахстан",
    "бот обучение сотрудников",
    "ibirAi Telegram",
    "микрообучение без приложений",
  ],
  openGraph: {
    title: "Обучение в Telegram с напоминаниями в WhatsApp — ibirAi",
    description:
      "Корпоративное обучение в привычных мессенджерах. Короткие уроки, проверка усвоения, поимённая HR-аналитика.",
    url: "https://www.abadan.kz/ibirai/messenger",
    type: "website",
    images: [
      {
        url: "https://www.abadan.kz/og-ibirai.png",
        width: 1200,
        height: 630,
        alt: "ibirAi — обучение в Telegram с напоминаниями в WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Обучение в Telegram с напоминаниями в WhatsApp — ibirAi",
    description:
      "Корпоративное обучение в привычных мессенджерах с проверкой усвоения.",
  },
  alternates: { canonical: "https://www.abadan.kz/ibirai/messenger" },
};

export default function MessengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ibirAi",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Messenger-Based Learning",
    operatingSystem: "Telegram, Web",
    description:
      "Платформа корпоративного микрообучения в мессенджере. Урок на 10 минут открывается в Telegram без установки приложения, напоминание дублируется в WhatsApp.",
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
        name: "Мессенджеры",
        item: "https://www.abadan.kz/ibirai/messenger",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Почему обучение в мессенджерах эффективнее LMS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Сотрудник не заходит в отдельное приложение — урок приходит туда, где он уже находится. Это снимает главный барьер корпоративного обучения: LMS требует, чтобы человек сам вспомнил, зашёл и открыл.",
        },
      },
      {
        "@type": "Question",
        name: "Нужно ли сотрудникам устанавливать дополнительные приложения?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Нет. Урок открывается в Telegram — в мини-приложении внутри мессенджера, который уже установлен у большинства сотрудников. Достаточно запустить бот. Напоминание о занятии приходит ещё и в WhatsApp и ведёт обратно в Telegram.",
        },
      },
      {
        "@type": "Question",
        name: "Как обеспечивается безопасность корпоративного контента в мессенджерах?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Весь контент передаётся через зашифрованные API мессенджеров. Корпоративные материалы хранятся на защищённых серверах ibirAi. Для Энтерпрайз-сегмента доступно развёртывание в частном облаке.",
        },
      },
      {
        "@type": "Question",
        name: "Можно ли отслеживать обучение сотрудников через мессенджеры?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да. HR-аналитика в реальном времени: кто открыл урок, кто завершил, результаты тестов, время прохождения. Данные доступны в веб-дашборде с фильтрацией по отделам, должностям и периодам.",
        },
      },
      {
        "@type": "Question",
        name: "У нас на площадке мессенджеры ограничены. Что тогда?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Урок открывается по ссылке в Telegram, напоминание дублируется в WhatsApp — оба работают с личного телефона, вне корпоративного контура и без установки приложения. Если внутренняя политика закрывает и это, скажите на созвоне — разберём варианты под ваш контур.",
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
