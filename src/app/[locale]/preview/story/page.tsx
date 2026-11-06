import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import StoryScroll from "@/components/story/StoryScroll";
import UpcomingTrainings from "@/components/UpcomingTrainings";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function StoryPreviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <StoryScroll />
      <div id="after-story">
        <UpcomingTrainings />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
