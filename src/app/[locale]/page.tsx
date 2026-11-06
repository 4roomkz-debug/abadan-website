import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import StoryScroll from "@/components/story/StoryScroll";
import UpcomingList from "@/components/story/UpcomingList";
import ClientsStrip from "@/components/story/ClientsStrip";
import Quotes from "@/components/story/Quotes";
import Contact from "@/components/Contact";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

// Главная — «История обучения» на прокрутке (решение Гани 06.11.2026):
// пять эпох с метками-ссылками, под ними ближайшие курсы, клиенты, цитаты
// из писем и форма. Прежние 16 секций заменены; их компоненты пока лежат в
// src/components на случай повторного использования на других страницах.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("home.after");

  return (
    <>
      <Header />
      <StoryScroll />
      <div id="after-story">
        <UpcomingList />
        <ClientsStrip />
        <Quotes />
        <Contact variant="paper" title={t("contactTitle")} subtitle={t("contactSubtitle")} />
        {/* Лид-магнит идёт ПОСЛЕ формы заявки: заявка — главная конверсия сайта,
            гайд подбирает тех, кто до неё не дошёл. */}
        <Newsletter variant="paper" />
      </div>
      <Footer />
    </>
  );
}
