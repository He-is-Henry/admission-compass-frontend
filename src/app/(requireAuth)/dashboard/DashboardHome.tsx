"use client";
import { useAuth } from "@/app/hooks/useAuth";
import styles from "./dashboard.module.css";
import getAllPredictions from "@/app/lib/getAllPredictions";
import { useEffect, useState } from "react";

export default function DashboardHome() {
  const { user } = useAuth();
  const tokenBalance = user?.tokens;
  const [predictions, setPredictions] = useState<PredictionHistory[]>([]);
  const latestPrediction = predictions[0];
  const readinessScore = latestPrediction ? latestPrediction.probability : 0;

  useEffect(() => {
    const fetchPredictions = async () => {
      const res = await getAllPredictions();
      setPredictions(res);
    };

    fetchPredictions();
  }, []);

  const getStatus = (probablility: number) => {
    return probablility >= 70 ? "high" : probablility >= 50 ? "medium" : "low";
  };

  return (
    <div className={styles.container}>
      {/* Welcome Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          Welcome back, {user?.username.split(" ")[0]}! 👋
        </h1>
        <p className={styles.subtitle}>
          Here's an overview of your admission journey
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
            ></div>
          </div>
          {readinessScore < 70 && (
            <div className={styles.notice}>
              <strong>Improve your chances:</strong> Explore alternative courses
              or universities where you have higher probability.
            </div>
          )}
          <div>
            {/* Quick Actions */}
            <div>
              <h2 className={styles.quickActionsTitle}>Quick Actions</h2>
              <div className={styles.quickActionsGrid}>
                <div className={styles.quickActionCard}>
                  <div className={styles.iconContainer}>
                    {/* <Sparkles /> icon here */}
                  </div>
                  <h3 className={styles.quickActionHeading}>
                    Run New Prediction
                  </h3>
                  <p className={styles.quickActionText}>
                    Check your admission chances for a new course or university.
                  </p>

                  <button className={styles.quickActionButton}>
                    Start Now
                  </button>
                </div>

                <div className={styles.quickActionCard}>
                  <div className={styles.iconContainer}>
                    {/* <Wallet /> icon here */}
                  </div>
                  <h3 className={styles.quickActionHeading}>Buy Tokens</h3>
                  <p className={styles.quickActionText}>
                    Purchase tokens to unlock detailed reports and past
                    questions.
                  </p>

                  <button className={styles.quickActionButton}>
                    View Wallet
                  </button>
                </div>

                <div className={styles.quickActionCard}>
                  <div className={styles.iconContainer}>
                    {/* <BookOpen /> icon here */}
                  </div>
                  <h3 className={styles.quickActionHeading}>Past Questions</h3>
                  <p className={styles.quickActionText}>
                    Access past questions and prepare for your exams.
                  </p>

                  <button className={styles.quickActionButton}>
                    Browse Now
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
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
                        <div className={styles.statusIcon}>
                          {/* <CheckCircle2 /> icon here */}
                        </div>
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
      </div>
    </div>
  );
}
