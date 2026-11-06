import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import StoryScroll from "@/components/story/StoryScroll";
import UpcomingList from "@/components/story/UpcomingList";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function StoryPreviewPage({ params }: { params: Promise<{ locale: string }> }) {
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
        <Contact variant="paper" title={t("contactTitle")} subtitle={t("contactSubtitle")} />
      </div>
      <Footer />
    </>
  );
}
