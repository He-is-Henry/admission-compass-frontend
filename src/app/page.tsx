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
import { getAllSubjects } from "./lib/subject";
import { getLeaderboard } from "./lib/leaderboard";

export const metadata: Metadata = {
  title: "Admission compass",
  description: "Find Your Admission Path with Confidence",
};

export default async function Home() {
  const subjects = await getAllSubjects();
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
