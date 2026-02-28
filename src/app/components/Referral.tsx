"use client";

import { useEffect, useState } from "react";
import getCurrentUser from "../lib/getCurrentUser";
import styles from "./referral.module.css";
import toast from "react-hot-toast";
import axios from "../api/axios";

type ReferralHistory = {
  _id: string;
  referred: {
    _id: string;
    firstName: string;
    username: string;
  };
  paid: boolean;
  createdAt: string;
};

export default function Referral() {
  const [user, setUser] = useState<null | User>(null);
  const [history, setHistory] = useState<ReferralHistory[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/leaderboard");
        setHistory(res.data.history);
      } catch {
        // fail silently
      }
    };
    fetchHistory();
  }, []);
  const getUser = async () => {
    const userData: User = await getCurrentUser();
    setUser(userData);
    return userData;
  };

  useEffect(() => {
    getUser();
  }, []);

  const copy = async () => {
    const freshUser = await getUser();
    if (!freshUser) return toast.error("Not logged in!");
    const link = `${window.location.origin}?ref=${freshUser.username}`;
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied");
  };

  const paidCount = history.filter((h) => h.paid).length;
  const progress = Math.min(((paidCount % 3) / 3) * 100, 100);
  const freeTokensEarned = Math.floor(paidCount / 3);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={`${styles.textCenter} ${styles.mb12} ${styles.fadeIn} fade-in`}
        >
          <h2 className={styles.heading}>Invite a Friend & Earn Rewards</h2>
          <p className={styles.subheading}>
            Share your username and get rewards when your friends sign up
          </p>
        </div>

        <div className={styles.innerContainer}>
          <div className={`${styles.glassCard} ${styles.fadeIn} fade-in`}>
            <div className={styles.grid}>
              <div>
                <div className={styles.referralHeader}>
                  <div className={styles.iconBox}>
                    <svg
                      className={styles.icon}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-label="Referral icon"
                    >
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H16c-.8 0-1.54.37-2 1l-3 4v2h2l2.54-3.4L16.5 16H18v6h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={styles.referralTitle}>Your Referral Code</h3>
                    <p className={styles.referralDesc}>
                      Share this with friends to earn rewards
                    </p>
                  </div>
                </div>

                <div className={styles.usernameBox}>
                  <div className={styles.usernameFlex}>
                    <div>
                      <p className={styles.usernameLabel}>
                        Your unique username
                      </p>
                      <p className={styles.username} id="userReferralCode">
                        {user?.username ?? "—"}
                      </p>
                    </div>
                    <button
                      onClick={copy}
                      className={styles.copyButton}
                      aria-label="Copy referral link"
                    >
                      <svg
                        className={styles.copyIcon}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-label="Copy icon"
                      >
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                      </svg>
                      Copy Link
                    </button>
                  </div>
                </div>

                <div className={styles.progressContainer}>
                  <div className={styles.progressHeader}>
                    <span>Progress to Free Token</span>
                    <span>{paidCount % 3}/3 referrals</span>
                  </div>
                  <div
                    className={styles.progressBar}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Referral progress ${Math.round(progress)} percent`}
                  >
                    <div
                      className={styles.progressFill}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  {freeTokensEarned > 0 && (
                    <p className={styles.progressCongrats}>
                      🎉 You&apos;ve earned {freeTokensEarned} free token
                      {freeTokensEarned > 1 ? "s" : ""}!
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className={styles.historyHeading}>Referral History</h4>
                <div className={styles.historyList}>
                  {history.length === 0 && (
                    <p style={{ color: "#888", fontSize: "0.9rem" }}>
                      No referrals yet. Share your link to get started!
                    </p>
                  )}

                  {history
                    .filter((h) => h.paid)
                    .map((h) => (
                      <div key={h._id} className={styles.historySuccess}>
                        <div className={styles.historyItem}>
                          <div className={styles.historyUser}>
                            <div className={styles.successIconWrap}>
                              <svg
                                className={styles.successIcon}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-label="Success icon"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                            <div>
                              <p className={styles.historyName}>
                                {h.referred.firstName}
                              </p>
                              <p className={styles.historyDesc}>
                                Joined & purchased tokens
                              </p>
                            </div>
                          </div>
                          <div className={styles.historyRight}>
                            <p className={styles.historyReward}>
                              +₦100 discount
                            </p>
                            <p className={styles.historyTime}>
                              {new Date(h.createdAt).toLocaleDateString(
                                "en-GB",
                              )}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                  {history
                    .filter((h) => !h.paid)
                    .map((h) => (
                      <div key={h._id} className={styles.historyPending}>
                        <div className={styles.historyItem}>
                          <div className={styles.historyUser}>
                            <div className={styles.pendingIconWrap}>
                              <svg
                                className={styles.pendingIcon}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-label="Pending icon"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                              </svg>
                            </div>
                            <div>
                              <p className={styles.historyName}>
                                {h.referred.firstName}
                              </p>
                              <p className={styles.historyDesc}>
                                Signed up (pending purchase)
                              </p>
                            </div>
                          </div>
                          <div className={styles.historyRight}>
                            <p className={styles.historyPendingText}>Pending</p>
                            <p className={styles.historyTime}>
                              {new Date(h.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className={styles.earningsBox}>
                  <div className={styles.textCenter}>
                    <p className={styles.earningsLabel}>Total Paid Referrals</p>
                    <p className={styles.earningsValue}>{paidCount}</p>
                    {freeTokensEarned > 0 && (
                      <p className={styles.earningsExtra}>
                        + {freeTokensEarned} Free Token
                        {freeTokensEarned > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.howItWorks} ${styles.fadeIn} fade-in`}>
            {[1, 2, 3].map((num) => (
              <div key={num} className={styles.step}>
                <div className={styles.stepIcon}>
                  <span className={styles.stepNumber}>{num}</span>
                </div>
                <h3 className={styles.stepTitle}>
                  {num === 1
                    ? "Share Your Username"
                    : num === 2
                      ? "They Sign Up & Buy"
                      : "Earn Rewards"}
                </h3>
                <p className={styles.stepDesc}>
                  {num === 1
                    ? "Send your unique username to friends who need admission guidance"
                    : num === 2
                      ? "When they purchase tokens using your referral, you both benefit"
                      : "Get 10% discount on next purchase + free tokens every 3 referrals"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
