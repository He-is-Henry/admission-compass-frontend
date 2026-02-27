import { Metadata } from "next";
import Header from "./components/Header";
import HeroSection from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks.";
import StatsSection from "./components/StatsSection";
import Pricing from "./components/Pricing";
import Referral from "./components/Referral";
import Footer from "./components/Footer";
import Hooks from "./page.client";
import getCurrentUser from "./lib/getCurrentUser";
import { getAllSubjects } from "./lib/subject";

export const metadata: Metadata = {
  title: "Admission compass",
  description: "Find Your Admission Path with Confidence",
};

const getSubjects = async () => {
  const subjectsData = await getAllSubjects();
  return subjectsData;
};
export default async function Home() {
  const subjects: Subject[] = await getSubjects();
  return (
    <>
      <Hooks />
      <Header />
      <main>
        {" "}
        <HeroSection subjects={subjects} />
        <FeaturesSection />
        <HowItWorks />
        <StatsSection />
        <Pricing />
        <Referral />
        <Footer />
      </main>
    </>
  );
}
