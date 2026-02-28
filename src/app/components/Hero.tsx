"use client";
import React, { useEffect, useState } from "react";
import styles from "./herosection.module.css";
import { useRouter } from "next/navigation";
import axios from "../api/axios";

const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

type Props = {
  subjects: Subject[];
};

const HeroSection = ({ subjects }: Props) => {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("/leaderboard");
        setLeaderboard(res.data.lead);
      } catch {
        // fail silently
      }
    };
    fetchLeaderboard();
  }, []);
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={`${styles.textArea} ${styles.fadeIn} fade-in`}>
            <h1 className={styles.title}>
              Find Your Admission Path with{" "}
              <span className={styles.highlight}>Confidence</span>
            </h1>
            <p className={styles.description}>
              Get predictive admission chances, discover alternative school
              suggestions, and download comprehensive reports to guide your
              university journey.
            </p>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => console.log("Prediction Flow")}
                className={styles.primaryBtn}
                aria-label="Check your admission chances"
              >
                Check Your Chances
              </button>
              <button
                className={styles.secondaryBtn}
                aria-label="Try free features"
                onClick={() => router.push("/exam")}
              >
                Practice Past Questions
              </button>
            </div>
            {subjects.length > 0 && (
              <div>
                Available subjects{" "}
                {subjects.map((s) => (
                  <p key={s.code}>{s.name}</p>
                ))}
              </div>
            )}
          </div>

          <div className={`${styles.fadeIn} fade-in`}>
            <div className={styles.glassCard}>
              <div className={styles.cardContent}>
                <div className={styles.progressHeader}>
                  <h3 className={styles.progressTitle}>Admission Likelihood</h3>
                  <span className={styles.progressTag}>78%</span>
                </div>
                <div
                  className={styles.progressBar}
                  role="progressbar"
                  aria-valuenow={78}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Admission likelihood 78 percent"
                >
                  <div
                    className={styles.progressFill}
                    style={{ width: "78%" }}
                  ></div>
                </div>
                <div className={styles.statsGrid}>
                  <div className={styles.blueBox}>
                    <p className={styles.statLabel}>Cutoff Match</p>
                    <p className={styles.statValueBlue}>On Track</p>
                  </div>
                  <div className={styles.purpleBox}>
                    <p className={styles.statLabel}>Alternatives</p>
                    <p className={styles.statValuePurple}>5 Found</p>
                  </div>
                </div>
                <div className={styles.altBox}>
                  <p className={styles.altLabel}>Top Alternatives</p>
                  <div className={styles.altList}>
                    <p>• University of Lagos (UNILAG)</p>
                    <p>• University of Nigeria (UNN)</p>
                    <p>• University of Ibadan (UI)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {leaderboard.length > 0 && (
          <div
            className={`${styles.fadeIn} fade-in`}
            style={{ marginTop: "48px" }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "24px",
                fontSize: "1.4rem",
                fontWeight: 700,
              }}
            >
              🏆 Top Referrers
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              {leaderboard.map((entry, i) => (
                <div
                  key={entry.referrer._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 20px",
                    borderRadius: "12px",
                    background: i === 0 ? "#fffbe6" : "#fff",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                    border: i === 0 ? "1px solid #ffe066" : "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span style={{ fontSize: "1.4rem" }}>{medals[i]}</span>
                    <div>
                      <p style={{ fontWeight: 600, margin: 0 }}>
                        @{entry.referrer.username}
                      </p>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#888",
                          margin: 0,
                        }}
                      >
                        {entry.referrer.firstName}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: 700, margin: 0 }}>{entry.count}</p>
                    <p style={{ fontSize: "0.8rem", color: "#888", margin: 0 }}>
                      referrals
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
