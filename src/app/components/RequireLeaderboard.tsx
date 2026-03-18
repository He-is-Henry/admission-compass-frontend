"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "@/app/lib/leaderboard";
import Referral from "./Referral";
import HeroSection from "./Hero";

type Props = {
  subjects: Subject[];
  children?: React.ReactNode;
};

export default function RequireLeaderboard({ children, subjects }: Props) {
  const [data, setData] = useState<{
    lead: LeaderboardEntry[];
    history: ReferralHistory[];
  } | null>(null);

  useEffect(() => {
    getLeaderboard().then(setData).catch(console.error);
  }, []);

  if (!data)
    return (
      <>
        <HeroSection subjects={subjects} leaderboard={[]} />
        {children}
        <Referral history={[]} />
      </>
    );

  return (
    <>
      <HeroSection subjects={subjects} leaderboard={data.lead} />
      {children}
      <Referral history={data.history} />
    </>
  );
}
