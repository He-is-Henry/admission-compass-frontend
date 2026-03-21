import { Metadata } from "next";
import HeroSection from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks.";
import StatsSection from "./components/StatsSection";
import Pricing from "./components/Pricing";
import Referral from "./components/Referral";
import Hooks from "./page.client";
import { getAllSubjects } from "./lib/subject";
import { getLeaderboard } from "./lib/leaderboard";
import RequireLeaderboard from "./components/RequireLeaderboard";


/* export const metadata: Metadata = {
  title: "Admission compass",
  description: "Find Your Admission Path with Confidence",
}; */

export default async function Home() {
  const subjects = await getAllSubjects();

  return (
    <>
      <Hooks />
      <main>
<<<<<<< HEAD
        {" "}
        <HeroSection subjects={subjects} />
        <FeaturesSection />
        <HowItWorks />
        <StatsSection />
        <Pricing />
        <Referral />
=======
        <RequireLeaderboard subjects={subjects}>
          <FeaturesSection />
          <HowItWorks />
          <StatsSection />
          <Pricing />
        </RequireLeaderboard>
        <Footer />
>>>>>>> 6daf1e933e8f8dfb0f491582b47fb29d9f375ce0
      </main>
    </>
  );
}
