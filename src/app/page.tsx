import Hero from "@/components/Hero";
import AboutTeaser from "@/components/AboutTeaser";
import Problems from "@/components/Problems";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Clients from "@/components/Clients";
import TrainingDirections from "@/components/TrainingDirections";
import Formats from "@/components/Formats";
import UpcomingTrainings from "@/components/UpcomingTrainings";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Trainers from "@/components/Trainers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <Problems />
      <Features />
      <Stats />
      <Clients />
      <TrainingDirections />
      <Formats />
      <UpcomingTrainings />
      <Gallery />
      <WhyChooseUs />
      <Trainers />
      <Contact />
      <Footer />
    </>
  );
}
