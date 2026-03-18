"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "@/app/lib/leaderboard";
import Referral from "./Referral";
import HeroSection from "./Hero";

type Props = {
  subjects: Subject[];
  children?: React.ReactNode;
};

const emptyHistory = { data: [], total: 0, hasMore: false };

export default function RequireLeaderboard({ children, subjects }: Props) {
  const [historyPage, setHistoryPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState<{
    lead: LeaderboardEntry[];
    history: { data: ReferralHistory[]; total: number; hasMore: boolean };
    currentUser: LeaderboardEntry | null;
  } | null>(null);

  useEffect(() => {
    getLeaderboard(undefined).then(setData).catch(console.error);
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const next = historyPage + 1;
      const newData = await getLeaderboard(next);
      setData((prev) =>
        prev
          ? {
              ...prev,
              history: {
                ...newData.history,
                data: [...prev.history.data, ...newData.history.data],
              },
            }
          : null,
      );
      setHistoryPage(next);
    } finally {
      setLoadingMore(false);
    }
  };

  if (!data)
    return (
      <>
        <HeroSection subjects={subjects} leaderboard={[]} currentUser={null} />
        {children}
        <Referral history={emptyHistory} onLoadMore={loadMore} />
      </>
    );

  return (
    <>
      <HeroSection
        subjects={subjects}
        leaderboard={data.lead}
        currentUser={data.currentUser}
      />
      {children}
      <Referral
        history={data.history}
        onLoadMore={loadMore}
        loadingMore={loadingMore}
      />
    </>
  );
}
