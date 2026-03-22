import { Metadata } from "next";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks.";
import StatsSection from "./components/StatsSection";
import Pricing from "./components/Pricing";
import Hooks from "./page.client";
import { getAllSubjects } from "./lib/subject";
import RequireLeaderboard from "./components/RequireLeaderboard";
import subjectStore from "./lib/subjectStore";

export const metadata: Metadata = {
  title: "Admission compass",
  description: "Find Your Admission Path with Confidence",
};

export default async function Home() {
  const cached = subjectStore.get();
  const subjects = cached ? cached : await getAllSubjects();

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
