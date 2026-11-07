import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { INDEXED_LOCALES, routing } from "@/i18n/routing";
import { withLocale } from "@/lib/seo";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";
import AiChat from "@/components/AiChat";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Onest вместо Manrope: в Manrope нет казахских Ә Ғ Қ Ң Ұ (проверено по файлу
// шрифта 06.11.2026), они подставлялись бы из чужого шрифта. Казахские буквы
// лежат в подмножестве cyrillic-ext.
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const baseMetadata: Metadata = {
  metadataBase: new URL("https://www.abadan.kz"),
  title: {
    default: "Abadan & Co. — Корпоративное обучение и бизнес-тренинги в Казахстане",
    template: "%s | Abadan & Co."
  },
  description: "Корпоративное обучение и курсы повышения квалификации в Казахстане. Работаем с 2015 года: 50 000+ обученных специалистов, 360+ компаний-клиентов во всех городах Казахстана, 80% практики на ваших кейсах. Бизнес-тренинги, технические семинары, онлайн и очно в Алматы.",
  keywords: [
    "корпоративное обучение Казахстан",
    "бизнес тренинги Алматы",
    "курсы повышения квалификации",
    "тренинги для сотрудников",
    "обучение персонала",
    "бизнес-образование",
    "корпоративные тренинги",
    "семинары для руководителей",
    "HR обучение",
    "нефтегазовая отрасль обучение",
    "технические семинары",
    "Abadan",
    "бизнес курсы онлайн",
    "обучение искусственному интеллекту Казахстан",
    "тренинги по ИИ для бизнеса Алматы",
    "внедрение ИИ в корпоративные процессы",
    "курсы ИИ Астана",
    "обучение ChatGPT для сотрудников",
    "корпоративное обучение ИИ",
    "промпт-инжиниринг обучение"
  ],
  authors: [{ name: "Abadan & Co." }],
  creator: "Abadan & Co.",
  publisher: "Abadan & Co.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Abadan & Co. — Корпоративное обучение и бизнес-тренинги",
    description: "Обучение, которое меняет показатели. 80% практики на ваших кейсах. С 2015 года: 50 000+ обученных, 360+ компаний-клиентов.",
    type: "website",
    locale: "ru_RU",
    url: "https://www.abadan.kz",
    siteName: "Abadan & Co.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abadan & Co. — Корпоративное обучение в Казахстане",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abadan & Co. — Корпоративное обучение в Казахстане",
    description: "80% практики на ваших кейсах. С 2015 года: 50 000+ обученных, 360+ компаний-клиентов.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Добавьте сюда коды верификации после регистрации в поисковиках
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return baseMetadata;

  const metadata = withLocale(baseMetadata, locale, "/");
  if (locale !== "ru") {
    const t = await getTranslations({ locale, namespace: "home.meta" });
    metadata.title = { default: t("title"), template: "%s | Abadan & Co." };
    metadata.description = t("description");
    metadata.keywords = undefined;
    metadata.openGraph = { ...metadata.openGraph, title: t("title"), description: t("description") };
    metadata.twitter = { ...metadata.twitter, title: t("title"), description: t("description") };
  }
  // kk и en до вычитки носителем не индексируются.
  if (!INDEXED_LOCALES.includes(locale)) {
    metadata.robots = { index: false, follow: true };
  }
  return metadata;
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className={`${onest.variable} antialiased`}>
        <NextIntlClientProvider>
          <ScrollAnimationProvider />
          {children}
          <AiChat />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
