import { Metadata } from "next";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks.";
import StatsSection from "./components/StatsSection";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import HeroSection from "./components/Hero";
import { getAllSubjects } from "./lib/subject";
import DiscountBanner from "./components/DiscountBanner";
import Referral from "./components/Referral";

export const metadata: Metadata = {
  title: "Admission compass",
  description: "Find Your Admission Path with Confidence",
};

export default async function Home() {
  const subjects = await getAllSubjects();

  type ReferralProps = {
    history: {
      data: ReferralHistory[];
      total: number;
      hasMore: boolean;
    };
    onLoadMore: () => void;
    loadingMore?: boolean;
    inline?: boolean;
  };
  return (
    <main>
      <HeroSection subjects={subjects} />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
      <Pricing />
      <DiscountBanner />
      <Referral />
      <Footer />
    </main>
  );
}
