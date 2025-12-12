import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";
import AiChat from "@/components/AiChat";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Abadan & Co. — Курсы повышения квалификации и бизнес-обучение",
  description: "Обучение, которое меняет показатели. 80% практики на ваших кейсах, программы под ваши KPI и поддержка до результата. На рынке с 2015 года.",
  keywords: "бизнес обучение, курсы повышения квалификации, корпоративное обучение, тренинги, Казахстан, Алматы",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Abadan & Co. — Курсы повышения квалификации и бизнес-обучение",
    description: "Обучение, которое меняет показатели. 80% практики на ваших кейсах. 200+ экспертов, 359 компаний, 10+ лет на рынке.",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Abadan & Co. — Бизнес-обучение",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abadan & Co. — Курсы повышения квалификации",
    description: "Обучение, которое меняет показатели. 80% практики на ваших кейсах.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} antialiased`}>
        <ScrollAnimationProvider />
        {children}
        <AiChat />
      </body>
    </html>
  );
}
