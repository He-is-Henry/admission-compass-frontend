"use client";
import { useAuth } from "@/app/hooks/useAuth";
import RequireRole from "../../RequireRole";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
import styles from "./AffiliatesPage.module.css";
import { AxiosError } from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

type ReferralEntry = {
  _id: string;
  referred: { firstName: string; lastName: string; username: string };
  rewarded: boolean;
  rewardType: "token" | "commission" | null;
  rewardAmount: number | null;
  createdAt: string;
};

type DashboardData = {
  balance: number;
  percentage: number;
  stats: { totalReferrals: number; totalPaid: number; totalEarned: number };
  referrals: { data: ReferralEntry[]; page: number; hasMore: boolean };
};

function AffiliateDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetch = async (p = 1) => {
    try {
      const res = await api.get(`/affiliate/dashboard?page=${p}`);
      if (p === 1) {
        setData(res.data);
      } else {
        setData((prev) =>
          prev
            ? {
                ...res.data,
                referrals: {
                  ...res.data.referrals,
                  data: [...prev.referrals.data, ...res.data.referrals.data],
                },
              }
            : res.data,
        );
      }
      setPage(p);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(1);
  }, []);

  if (loading) return <div className={styles.loading}>Loading dashboard…</div>;
  if (!data) return null;

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Balance</span>
          <span className={styles.statValue}>
            ₦{data.balance.toLocaleString()}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Commission rate</span>
          <span className={styles.statValue}>{data.percentage}%</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total referrals</span>
          <span className={styles.statValue}>{data.stats.totalReferrals}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Paid referrals</span>
          <span className={styles.statValue}>{data.stats.totalPaid}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total earned</span>
          <span className={styles.statValue}>
            ₦{data.stats.totalEarned.toLocaleString()}
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Your referrals</h3>
        {data.referrals.data.length === 0 ? (
          <p className={styles.empty}>No referrals yet.</p>
        ) : (
          <div className={styles.referralList}>
            {data.referrals.data.map((r) => (
              <div key={r._id} className={styles.referralRow}>
                <div>
                  <p className={styles.referralName}>
                    {r.referred.firstName} {r.referred.lastName}
                  </p>
                  <p className={styles.referralUsername}>
                    @{r.referred.username}
                  </p>
                </div>
                <div className={styles.referralRight}>
                  {r.rewarded ? (
                    <span className={styles.badgePaid}>
                      +₦{r.rewardAmount?.toLocaleString()}
                    </span>
                  ) : (
                    <span className={styles.badgePending}>Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {data.referrals.hasMore && (
          <button className={styles.loadMore} onClick={() => fetch(page + 1)}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}

function ApplyForm({ onSuccess }: { onSuccess: () => void }) {
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/affiliate/apply", { whatsapp });
      toast.success("Application submitted!");
      setWhatsapp("");
      onSuccess();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.applyForm}>
      <p className={styles.applyDesc}>
        Partner with us and earn commission on every referral&apos;s first
        payment.
      </p>
      <div className={styles.inputGroup}>
        <label htmlFor="whatsapp" className={styles.label}>
          WhatsApp number
        </label>
        <input
          id="whatsapp"
          type="text"
          value={whatsapp}
          placeholder="+234 800 000 0000"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setWhatsapp(e.target.value)
          }
          className={styles.input}
          required
        />
      </div>
      <button className={styles.submitBtn} disabled={loading}>
        {loading ? <span className={styles.spinnerDark} /> : "Apply"}
      </button>
    </form>
  );
}

function ApplicationHistory({ refresh }: { refresh: number }) {
  const [history, setHistory] = useState<AffiliateRequest[]>([]);

  useEffect(() => {
    api
      .get("/affiliate/my-requests")
      .then((res) => setHistory(res.data))
      .catch(() => {});
  }, [refresh]);

  if (!history.length) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Your applications</h3>
      <div className={styles.historyList}>
        {history.map((req) => (
          <div key={req._id} className={styles.historyRow}>
            <span className={styles.historyDate}>
              {new Date(req.createdAt).toLocaleDateString()}
            </span>
            <span className={`${styles.badge} ${styles[req.status]}`}>
              {req.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewAffiliateRequests() {
  const [requests, setRequests] = useState<AffiliateRequest[]>([]);
  const [percentages, setPercentages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const getRequests = async () => {
    try {
      const res = await api.get("/affiliate/requests?status=pending");
      setRequests(res.data.data);
    } catch {
      toast.error("Failed to load requests");
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleReview = async (id: string, status: "approved" | "rejected") => {
    const percentage = Number(percentages[id]);
    if (
      status === "approved" &&
      (!percentage || percentage <= 0 || percentage > 100)
    ) {
      toast.error("Enter a valid percentage (1–100)");
      return;
    }
    setLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await api.patch(`/affiliate/review/${id}`, {
        status,
        ...(status === "approved" && { percentage }),
      });
      toast.success(status === "approved" ? "Approved!" : "Rejected");
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Action failed");
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (!requests.length)
    return <p className={styles.empty}>No pending requests.</p>;

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Pending affiliate requests</h3>
      <div className={styles.reviewList}>
        {requests.map((req) => (
          <div key={req._id} className={styles.reviewCard}>
            <div className={styles.reviewInfo}>
              <p className={styles.reviewName}>
                {req.user.firstName} {req.user.lastName}
              </p>
              <p className={styles.reviewMeta}>{req.user.email}</p>
              <p className={styles.reviewMeta}>WhatsApp: {req.whatsapp}</p>
            </div>
            <div className={styles.reviewActions}>
              <input
                type="number"
                min={1}
                max={100}
                placeholder="% rate"
                value={percentages[req._id] || ""}
                onChange={(e) =>
                  setPercentages((prev) => ({
                    ...prev,
                    [req._id]: e.target.value,
                  }))
                }
                className={styles.percentInput}
              />
              <button
                className={styles.approveBtn}
                disabled={loading[req._id]}
                onClick={() => handleReview(req._id, "approved")}
              >
                {loading[req._id] ? (
                  <span className={styles.spinnerDark} />
                ) : (
                  "Approve"
                )}
              </button>
              <button
                className={styles.rejectBtn}
                disabled={loading[req._id]}
                onClick={() => handleReview(req._id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AffiliatesPage() {
  const { user } = useAuth();
  const [historyRefresh, setHistoryRefresh] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Affiliates</h1>
        <p className={styles.subtitle}>
          {user?.isAffiliate
            ? "You're an active affiliate. Track your earnings below."
            : "Apply to become an affiliate and earn on every referral."}
        </p>
      </div>

      {user?.isAffiliate ? (
        <AffiliateDashboard />
      ) : (
        <>
          <ApplyForm onSuccess={() => setHistoryRefresh((n) => n + 1)} />
          <ApplicationHistory refresh={historyRefresh} />
        </>
      )}

      <RequireRole parent={true}>
        <div className={styles.adminSection}>
          <h2 className={styles.adminTitle}>Admin — Affiliate requests</h2>
          <ReviewAffiliateRequests />
        </div>
      </RequireRole>
    </div>
  );
}
