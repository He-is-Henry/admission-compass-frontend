"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/app/api/axios";
import { getAllSubjects } from "@/app/lib/subject";
import subjectStore from "@/app/lib/subjectStore";
import styles from "./PastQuestions.module.css";

// ── Types ───────────────────────────────────────────────────────────────────

type Subject = {
  _id: string;
  code: string;
  name: string;
  questionCount: number;
};

type Subscription = {
  _id: string;
  user: string;
  subject: string; // ObjectId
  createdAt: string;
};

// ── Icons ───────────────────────────────────────────────────────────────────

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

// ── Helpers ─────────────────────────────────────────────────────────────────

const addThirtyDays = (iso: string) => {
  const date = new Date(iso);
  date.setDate(date.getDate() + 30);
  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ── Component ────────────────────────────────────────────────────────────────

export default function PastQuestions() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── Load subjects (store first) ──────────────────────────────────────────

  useEffect(() => {
    const load = async () => {
      const cached = subjectStore.get();
      if (cached) {
        setSubjects(cached);
        return;
      }
      const data = await getAllSubjects();
      subjectStore.set(data);
      setSubjects(data);
    };
    load();
  }, []);

  // ── Load subscriptions ───────────────────────────────────────────────────

  useEffect(() => {
    api
      .get("/subscribe")
      .then((res) => setSubscriptions(res.data))
      .catch(() => {}); // silently fail — empty list is fine
  }, []);

  // ── Derived ──────────────────────────────────────────────────────────────

  const selectedSubject = subjects.find((s) => s._id === selectedId);

  const activeSubscription = selectedId
    ? subscriptions.find((sub) => sub.subject === selectedId)
    : null;

  const isSubscribed = !!activeSubscription;

  // ── Subscribe handler ────────────────────────────────────────────────────

  const handleSubscribe = async () => {
    if (!selectedId || isSubscribed) return;
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/subscribe", { subject: selectedId });
      setSubscriptions((prev) => [...prev, res.data]);
    } catch (err: any) {
      setError(
        err?.response?.data?.error ?? "Failed to subscribe. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className={styles.page}>
      {/* Header */}
      <div>
        <h1 className={styles.heading}>Past Questions</h1>
        <p className={styles.subheading}>
          Practice with previous exam questions
        </p>
      </div>

      {/* Filter */}
      <div className={styles.filterCard}>
        <div className={styles.filterGrid}>
          <div>
            <label className={styles.filterLabel}>Subject</label>
            <select
              className={styles.select}
              value={selectedId}
              onChange={(e) => {
                setSelectedId(e.target.value);
                setError("");
              }}
            >
              <option value="">Select subject</option>
              {subjects.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Access state */}
      {!selectedId ? (
        <div className={styles.lockCard}>
          <div className={styles.lockInner}>
            <div className={styles.lockIcon}>
              <LockIcon />
            </div>
            <div>
              <h3 className={styles.lockTitle}>Unlock Past Questions</h3>
              <p className={styles.lockDesc}>
                Select a subject above, then unlock access for 30 days with just
                1 token.
              </p>
              <div className={styles.lockActions}>
                <Link href="/pay" className={styles.btnOutline}>
                  Purchase Tokens
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : isSubscribed ? (
        <div className={styles.accessCard}>
          <div className={styles.accessInner}>
            <div className={styles.accessLeft}>
              <div className={styles.accessIcon}>
                <CheckIcon />
              </div>
              <div>
                <p className={styles.accessTitle}>
                  Access Granted — {selectedSubject?.name}
                </p>
                <p className={styles.accessExpiry}>
                  30 days unlimited access · Expires{" "}
                  {addThirtyDays(activeSubscription!.createdAt)}
                </p>
              </div>
            </div>
            <button className={styles.btnPrimary} onClick={() => {}}>
              Practice Now
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.lockCard}>
          <div className={styles.lockInner}>
            <div className={styles.lockIcon}>
              <LockIcon />
            </div>
            <div>
              <h3 className={styles.lockTitle}>Unlock Past Questions</h3>
              <p className={styles.lockDesc}>
                Get unlimited access to <strong>{selectedSubject?.name}</strong>{" "}
                past questions for 30 days with just 1 token.
              </p>
              {error && <p className={styles.errorText}>{error}</p>}
              <div className={styles.lockActions}>
                <button
                  className={styles.btnPrimary}
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  {loading ? "Unlocking…" : "Unlock Now (1 Token)"}
                </button>
                <Link href="/pay" className={styles.btnOutline}>
                  Purchase Tokens
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active subscriptions list */}
      {subscriptions.length > 0 && (
        <div>
          <h2 className={styles.subListTitle}>Your Active Subscriptions</h2>
          <div className={styles.subList}>
            {subscriptions.map((sub) => {
              const subject = subjects.find((s) => s._id === sub.subject);
              return (
                <div key={sub._id} className={styles.subRow}>
                  <div className={styles.subRowLeft}>
                    <div className={styles.subDot} />
                    <div>
                      <div className={styles.subName}>
                        {subject?.name ?? "Unknown Subject"}
                      </div>
                      <div className={styles.subCode}>{subject?.code}</div>
                    </div>
                  </div>
                  <div className={styles.subExpiry}>
                    Expires {addThirtyDays(sub.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
