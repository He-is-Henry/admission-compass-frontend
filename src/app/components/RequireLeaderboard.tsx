"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "@/app/lib/leaderboard";
import Referral from "./Referral";
import HeroSection from "./Hero";
import subjectStore from "../lib/subjectStore";

type Props = {
  subjects: Subject[];
  children?: React.ReactNode;
};

const emptyHistory = { data: [], total: 0, hasMore: false };

export default function RequireLeaderboard({ children, subjects }: Props) {
  if (!subjectStore.get()) {
    subjectStore.set(subjects);
  }
  const [historyPage, setHistoryPage] = useState(1);
  const [lbPage, setLbPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const [loadingMoreLb, setLoadingMoreLb] = useState(false);
  const [data, setData] = useState<{
    lead: LeaderboardEntry[];
    leaderboard: { hasMore: boolean; total: number };
    history: { data: ReferralHistory[]; total: number; hasMore: boolean };
    currentUser: LeaderboardEntry | null;
  } | null>(null);

  const loadMoreHistory = async () => {
    setLoadingMore(true);
    try {
      const next = historyPage + 1;
      const newData = await getLeaderboard(next, lbPage);
      console.log(newData);
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

  const loadMoreLeaderboard = async () => {
    setLoadingMoreLb(true);

    try {
      const next = lbPage + 1;
      const newData = await getLeaderboard(historyPage, next);
      console.log(newData);
      setData((prev) =>
        prev
          ? {
              ...prev,
              lead: [...prev.lead, ...newData.lead],
              leaderboard: newData.leaderboard,
            }
          : null,
      );
      setLbPage(next);
    } finally {
      setLoadingMoreLb(false);
    }
  };

  useEffect(() => {
    getLeaderboard(1, 1).then(setData).catch(console.error);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data?.leaderboard || !data.history)
    return (
      <>
        <HeroSection
          subjects={subjects}
          leaderboard={[]}
          currentUser={null}
          loadingMore={false}
          loadingMoreLb={false}
          onLoadMoreLeaderboard={loadMoreLeaderboard}
          hasMoreLeaderboard={false}
        />

        {children}

        <Referral history={emptyHistory} onLoadMore={loadMoreHistory} />
      </>
    );

  return (
    <>
      <HeroSection
        subjects={subjects}
        leaderboard={data.lead}
        currentUser={data.currentUser}
        loadingMore={loadingMore}
        onLoadMoreLeaderboard={loadMoreLeaderboard}
        loadingMoreLb={loadingMoreLb}
        hasMoreLeaderboard={data.leaderboard?.hasMore ?? false}
      />
      {children}
      <Referral
        history={data.history}
        onLoadMore={loadMoreHistory}
        loadingMore={loadingMore}
      />
    </>
  );
}
