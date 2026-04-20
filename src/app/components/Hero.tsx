"use client";
import styles from "./herosection.module.css";
import { useRouter } from "next/navigation";

type Props = {
  subjects: Subject[];
  leaderboard: LeaderboardEntry[];
  currentUser: LeaderboardEntry | null;
  loadingMore: boolean;
  onLoadMoreLeaderboard: () => void;
  loadingMoreLb: boolean;
  hasMoreLeaderboard: boolean;
};

const HeroSection = ({
  leaderboard,
  currentUser,
  onLoadMoreLeaderboard,
  loadingMoreLb,
  hasMoreLeaderboard,
}: Props) => {
  const router = useRouter();
  const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

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
                onClick={() => router.push("/dashboard/predict")}
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
            {/*  {subjects.length > 0 && (
              <div>
                Available subjects{" "}
                {subjects.map((s) => (
                  <p key={s._id}>{s.name}</p>
                ))}
              </div>
            )} */}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              {(leaderboard.length > 0 || currentUser) && (
                <div
                  className={`${styles.fadeIn} fade-in`}
                  style={{ marginTop: "48px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      maxWidth: "480px",
                      margin: "0 auto",
                    }}
                  >
                    {currentUser && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "14px 20px",
                          borderRadius: "12px",
                          background: "#f0f4ff",
                          border: "2px solid #d0d9f7",
                          boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "1.1rem",
                              minWidth: "28px",
                              textAlign: "center",
                              fontWeight: 700,
                              color: "#3520ac",
                            }}
                          >
                            {currentUser.position
                              ? `#${currentUser.position}`
                              : "—"}
                          </span>
                          <div>
                            <p style={{ fontWeight: 600, margin: 0 }}>
                              @{currentUser.referrer.username}{" "}
                              <span
                                style={{
                                  fontSize: "0.72rem",
                                  background: "#3520ac",
                                  color: "#fff",
                                  padding: "1px 6px",
                                  borderRadius: "20px",
                                  fontWeight: 500,
                                }}
                              >
                                you
                              </span>
                            </p>
                            <p
                              style={{
                                fontSize: "0.85rem",
                                color: "#888",
                                margin: 0,
                              }}
                            >
                              {currentUser.referrer.firstName}
                            </p>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontWeight: 700, margin: 0 }}>
                            {currentUser.count}
                          </p>
                          <p
                            style={{
                              fontSize: "0.8rem",
                              color: "#888",
                              margin: 0,
                            }}
                          >
                            referrals
                          </p>
                        </div>
                      </div>
                    )}

                    {leaderboard.map((entry, i) => {
                      const isYou =
                        currentUser &&
                        entry.referrer._id === currentUser.referrer._id;
                      return (
                        <div
                          key={entry.referrer._id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "14px 20px",
                            borderRadius: "12px",
                            background: isYou
                              ? "#f0f4ff"
                              : i === 0
                                ? "#fffbe6"
                                : "#fff",
                            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                            border: isYou
                              ? "2px solid #d0d9f7"
                              : i === 0
                                ? "1px solid #ffe066"
                                : "1px solid #f0f0f0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <span style={{ fontSize: "1.4rem" }}>
                              {medals[i]}
                            </span>
                            <div>
                              <p style={{ fontWeight: 600, margin: 0 }}>
                                @{entry.referrer.username}
                                {isYou && (
                                  <span
                                    style={{
                                      fontSize: "0.72rem",
                                      background: "#3520ac",
                                      color: "#fff",
                                      padding: "1px 6px",
                                      borderRadius: "20px",
                                      fontWeight: 500,
                                      marginLeft: "6px",
                                    }}
                                  >
                                    you
                                  </span>
                                )}
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
                            <p style={{ fontWeight: 700, margin: 0 }}>
                              {entry.count}
                            </p>
                            <p
                              style={{
                                fontSize: "0.8rem",
                                color: "#888",
                                margin: 0,
                              }}
                            >
                              referrals
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {hasMoreLeaderboard && (
                <button
                  onClick={onLoadMoreLeaderboard}
                  disabled={loadingMoreLb}
                >
                  {loadingMoreLb ? "Loading..." : "Load more"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
