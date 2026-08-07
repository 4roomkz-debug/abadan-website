import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutTeaser from "@/components/AboutTeaser";
import Problems from "@/components/Problems";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Clients from "@/components/Clients";
import TrainingDirections from "@/components/TrainingDirections";
import Formats from "@/components/Formats";
import InternationalPrograms from "@/components/InternationalPrograms";
import UpcomingTrainings from "@/components/UpcomingTrainings";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Trainers from "@/components/Trainers";
import Contact from "@/components/Contact";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AboutTeaser />
      <Problems />
      <Features />
      <Stats />
      <Clients />
      <TrainingDirections />
      <Formats />
      <InternationalPrograms />
      <UpcomingTrainings />
      <Gallery />
      <WhyChooseUs />
      <Trainers />
      <Contact />
      {/* Лид-магнит идёт ПОСЛЕ формы заявки: заявка на обучение — главная
          конверсия сайта, и бесплатный гайд рядом с ней оттягивал бы часть
          готовых оставить контакт. Внизу он подбирает тех, кто до заявки
          не дошёл. */}
      <Newsletter />
      <Footer />
    </>
  );
}
