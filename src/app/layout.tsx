import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";
import AiChat from "@/components/AiChat";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abadan.kz"),
  title: {
    default: "Abadan & Co. — Корпоративное обучение и бизнес-тренинги в Казахстане",
    template: "%s | Abadan & Co."
  },
  description: "Корпоративное обучение и курсы повышения квалификации в Казахстане. 80% практики на ваших кейсах, 200+ экспертов, 359 компаний-клиентов. Бизнес-тренинги, технические семинары, онлайн и очно в Алматы.",
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
    "бизнес курсы онлайн"
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
    description: "Обучение, которое меняет показатели. 80% практики на ваших кейсах. 200+ экспертов, 359 компаний, 10+ лет на рынке.",
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
    description: "80% практики на ваших кейсах. 200+ экспертов, 359 компаний-клиентов.",
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
  alternates: {
    canonical: "https://www.abadan.kz",
  },
  verification: {
    // Добавьте сюда коды верификации после регистрации в поисковиках
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className={`${manrope.variable} antialiased`}>
        <ScrollAnimationProvider />
        {children}
        <AiChat />
      </body>
    </html>
  );
}
