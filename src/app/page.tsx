import { Metadata } from "next";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks.";
import StatsSection from "./components/StatsSection";
import Pricing from "./components/Pricing";
import Hooks from "./page.client";
import { getAllSubjects } from "./lib/subject";
import RequireLeaderboard from "./components/RequireLeaderboard";

export const metadata: Metadata = {
  title: "Admission compass",
  description: "Find Your Admission Path with Confidence",
};

export default async function Home() {
  const subjects = await getAllSubjects();

  return (
    <>
      <Hooks />
      <main>
        <RequireLeaderboard subjects={subjects}>
          <FeaturesSection />
          <HowItWorks />
          <StatsSection />
          <Pricing />
        </RequireLeaderboard>
      </main>
    </>
  );
}
