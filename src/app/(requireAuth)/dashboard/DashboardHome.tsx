"use client";
import { useAuth } from "@/app/hooks/useAuth";
import styles from "./dashboard.module.css";
import getAllPredictions from "@/app/lib/getAllPredictions";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { getLeaderboard } from "@/app/lib/leaderboard";
import Referral from "@/app/components/Referral";

export default function DashboardHome() {
  const { user } = useAuth();
  const tokenBalance = user?.tokens;
  const [predictions, setPredictions] = useState<PredictionHistory[]>([]);
  const latestPrediction = predictions[0];
  const readinessScore = latestPrediction ? latestPrediction.probability : 0;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [history, setHistory] = useState<{
    data: ReferralHistory[];
    total: number;
    hasMore: boolean;
  }>({ data: [], total: 0, hasMore: false });
  const [historyPage, setHistoryPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getLeaderboard(1, 1)
      .then((data) => setHistory(data.history))
      .catch(console.error);
  }, []);

  const loadMoreHistory = async () => {
    setLoadingMore(true);
    try {
      const next = historyPage + 1;
      const newData = await getLeaderboard(next, 1);
      setHistory((prev) => ({
        ...newData.history,
        data: [...prev.data, ...newData.history.data],
      }));
      setHistoryPage(next);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const clearParam = (name: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name);
      router.replace(`${pathname}?${params.toString()}`);
    };

    const generatedUsername = searchParams.get("generatedUsername");
    const merged = searchParams.get("merged");

    if (generatedUsername) {
      toast(
        "We set your username to " +
        user?.username +
        ". You can change it in your profile.",
        {
          duration: 6000,
          icon: "👋",
        },
      );
      clearParam("generatedUsername");
    }

    if (merged) {
      toast.success("Your Google account has been linked successfully.");
      clearParam("merged");
    }
  }, [user, searchParams, pathname, router]);

  useEffect(() => {
    const fetchPredictions = async () => {
      const res = await getAllPredictions();
      setPredictions(res);
    };
    fetchPredictions();
  }, []);

  const getStatus = (probability: number) => {
    return probability >= 70 ? "high" : probability >= 50 ? "medium" : "low";
  };

  return (
    <div className={styles.container}>
      {/* Welcome Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          Welcome back, {user?.username.split(" ")[0]}! 👋
        </h1>
        <p className={styles.subtitle}>
          Here&apos;s an overview of your admission journey
        </p>
      </div>

      {/* Summary Cards */}
      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>Total Predictions</span>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.largeText}>{predictions.length}</div>
            <p className={styles.smallText}>
              {predictions.length > 0
                ? "Keep exploring options"
                : "Run your first prediction"}
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>Token Balance</span>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.largeText}>{tokenBalance}</div>
            <p className={styles.smallText}>
              {tokenBalance && tokenBalance > 0
                ? "Tokens available"
                : "Purchase tokens to continue"}
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>Latest Probability</span>
          </div>
          <div className={styles.cardContent}>
            {latestPrediction ? (
              <>
                <div className={styles.largeText}>
                  {latestPrediction.probability}%
                </div>
                <div
                  className={`${styles.badge} ${styles[getStatus(latestPrediction.probability)]}`}
                >
                  {latestPrediction.probability >= 70
                    ? "High Chance"
                    : latestPrediction.probability >= 50
                      ? "Medium Chance"
                      : "Low Chance"}
                </div>
              </>
            ) : (
              <>
                <div className={styles.largeText}>--</div>
                <p className={styles.smallText}>No predictions yet</p>
              </>
            )}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>Suggested Course</span>
          </div>
          <div className={styles.cardContent}>
            {latestPrediction ? (
              <>
                <div className={styles.course}>{latestPrediction.course}</div>
                <p className={styles.smallText}>
                  {latestPrediction.university}
                </p>
              </>
            ) : (
              <>
                <div className={styles.course}>--</div>
                <p className={styles.smallText}>Run a prediction first</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Admission Readiness */}
      <div className={styles.readinessCard}>
        <div className={styles.readinessHeader}>
          <span>Your Admission Readiness Score</span>
          <p>Based on your latest prediction and profile strength</p>
        </div>
        <div className={styles.readinessContent}>
          <div className={styles.flexBetween}>
            <span className={styles.readinessScore}>{readinessScore}%</span>
            <div
              className={`${styles.badge} ${readinessScore >= 70 ? styles.high : readinessScore >= 50 ? styles.medium : styles.low}`}
            >
              {readinessScore >= 70
                ? "Strong"
                : readinessScore >= 50
                  ? "Moderate"
                  : "Needs Improvement"}
            </div>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${readinessScore}%` }}
            />
          </div>
          {readinessScore < 70 && (
            <div className={styles.notice}>
              <strong>Improve your chances:</strong> Explore alternative courses
              or universities where you have higher probability.
            </div>
          )}

          <div>
            <h2 className={styles.quickActionsTitle}>Quick Actions</h2>
            <div className={styles.quickActionsGrid}>
              <div className={styles.quickActionCard}>
                <div className={styles.iconContainer} />
                <h3 className={styles.quickActionHeading}>
                  Run New Prediction
                </h3>
                <p className={styles.quickActionText}>
                  Check your admission chances for a new course or university.
                </p>
                <button className={styles.quickActionButton}>Start Now</button>
              </div>

              <div className={styles.quickActionCard}>
                <div className={styles.iconContainer} />
                <h3 className={styles.quickActionHeading}>Buy Tokens</h3>
                <p className={styles.quickActionText}>
                  Purchase tokens to unlock detailed reports and past questions.
                </p>
                <button className={styles.quickActionButton}>
                  View Wallet
                </button>
              </div>

              <div className={styles.quickActionCard}>
                <div className={styles.iconContainer} />
                <h3 className={styles.quickActionHeading}>Past Questions</h3>
                <p className={styles.quickActionText}>
                  Access past questions and prepare for your exams.
                </p>
                <button className={styles.quickActionButton}>Browse Now</button>
              </div>
            </div>
          </div>

          {/* Recent Predictions */}
          {predictions.length > 0 && (
            <div className={styles.recentActivityCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Recent Predictions</h3>
                <p className={styles.cardDescription}>
                  Your latest admission probability checks
                </p>
              </div>
              <div className={styles.cardContent}>
                {predictions.slice(0, 3).map((prediction) => (
                  <div key={prediction._id} className={styles.predictionRow}>
                    <div className={styles.predictionDetails}>
                      <div className={styles.courseName}>
                        {prediction.course}
                      </div>
                      <div className={styles.universityName}>
                        {prediction.university}
                      </div>
                      <div className={styles.predictionDate}>
                        {prediction.createdAt.split("T")[0]}
                      </div>
                    </div>

                    <div className={styles.predictionStatus}>
                      <div>
                        <div className={styles.probability}>
                          {prediction.probability}%
                        </div>
                        <div
                          className={`${styles.status} ${styles[getStatus(prediction.probability)]}`}
                        >
                          {prediction.probability >= 70
                            ? "High Chance"
                            : prediction.probability >= 50
                              ? "Medium Chance"
                              : "Low Chance"}
                        </div>
                      </div>

                      <button
                        className={styles.reportRowBtn}
                        onClick={() =>
                          router.push(`dashboard/report/${prediction._id}`)
                        }
                        title="Get full report — 1 token"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {predictions.length > 3 && (
                <button className={styles.viewAllButton}>
                  View All Predictions
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.referralWrapper}>
        <Referral
          history={history}
          onLoadMore={loadMoreHistory}
          loadingMore={loadingMore}
          inline={true}
        />
      </div>
    </div>
  );
}
