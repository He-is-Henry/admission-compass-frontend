"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import ExamQuestion from "@/app/components/ExamQuestion";
import api from "@/app/api/axios";
import ConfirmModal from "@/app/components/modals/ConfirmModal";

type ExamResult = {
  score: number;
  total: number;
  percentage: number;
  expired?: boolean;
};
type Draft = {
  _id: string;
  questions: Question[];
  answers: (number | null)[];
  startTime: string;
  duration: number;
};

export default function ExamSession({ subject }: { subject: string }) {
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await api.get(
          `/exam/start?subject=${encodeURIComponent(subject)}`,
        );

        const data = res.data;

        const d = data.draft ?? data;

        if (data.message === "ongoing exam exists") {
          toast.success("Previous exam existing... Resuming");
        }

        setDraft(d);

        setAnswers(d.answers);

        const elapsed = (Date.now() - new Date(d.startTime).getTime()) / 1000;
        const remaining = Math.max(0, d.duration - elapsed);
        setTimeLeft(Math.floor(remaining));
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        toast.error(error.response?.data.error ?? "Failed to load exam draft.");
        router.push("/exam");
      } finally {
        setLoading(false);
      }
    };

    fetchDraft();
  }, [subject, router]);

  const handleSubmit = useCallback(
    async (currentAnswers: (number | null)[]) => {
      if (submitting) return;
      setSubmitting(true);
      try {
        // Flush latest answers before submitting
        await api.patch("/exam/draft", { answers: currentAnswers });
        const res = await api.post("/exam/submit");
        const { expired } = res.data as ExamResult;
        if (expired) {
          toast.error("Time's up! Your exam was auto-submitted.");
        }

        sessionStorage.setItem("examResult", JSON.stringify(res.data));
        router.push("/exam/result");
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        // Draft already scored via updateDraft expiry
        if (error?.response?.status === 404) return router.push("/exam");
        toast.error(error?.response?.data?.error || "Failed to submit exam");
        setSubmitting(false);
      }
    },
    [submitting, router],
  );

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      handleSubmit(answers);
      return;
    }
    const interval = setInterval(
      () => setTimeLeft((t) => (t !== null ? t - 1 : null)),
      1000,
    );
    return () => clearInterval(interval);
  }, [timeLeft, answers, handleSubmit]);

  const saveDraft = useCallback(
    async (updatedAnswers: (number | null)[]) => {
      try {
        const res = await api.patch("/exam/draft", { answers: updatedAnswers });
        if (res.data?.expired) {
          sessionStorage.setItem("examResult", JSON.stringify(res.data));
          router.push("/exam/result");
        }
      } catch {}
    },
    [router],
  );

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[questionIndex] =
        updated[questionIndex] === optionIndex ? null : optionIndex;
      saveDraft(updated);
      return updated;
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "40vh" }}>Loading exam...</p>
    );
  if (!draft) return null;

  const answered = answers.filter((a) => a !== null).length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.progress}>
          {answered}/{draft.questions.length} answered
        </span>
        <span
          style={{
            ...styles.timer,
            color: timeLeft !== null && timeLeft < 60 ? "crimson" : "#000",
          }}
        >
          {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
        </span>
      </div>
      {showConfirm && (
        <ConfirmModal
          title="Submit Exam?"
          description={`You've answered ${answered} of ${draft.questions.length} questions. This cannot be undone.`}
          confirmLabel="Submit"
          loading={submitting}
          onConfirm={() => handleSubmit(answers)}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <ExamQuestion
        question={draft.questions[current]}
        questionIndex={current}
        selectedAnswer={answers[current]}
        onAnswer={handleAnswer}
      />

      <div style={styles.nav}>
        <button
          style={styles.navBtn}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          Prev
        </button>
        <span style={styles.pageIndicator}>
          {current + 1} / {draft.questions.length}
        </span>
        <button
          style={styles.navBtn}
          onClick={() =>
            setCurrent((c) => Math.min(draft.questions.length - 1, c + 1))
          }
          disabled={current === draft.questions.length - 1}
        >
          Next
        </button>
      </div>

      <div style={styles.grid}>
        {draft.questions.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              ...styles.gridItem,
              background:
                i === current
                  ? "#000"
                  : answers[i] !== null
                    ? "#4caf50"
                    : "#f0f0f0",
              color: i === current || answers[i] !== null ? "#fff" : "#000",
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowConfirm(true)}
        disabled={submitting}
        style={{ ...styles.submitBtn, opacity: submitting ? 0.6 : 1 }}
      >
        {submitting ? "Submitting..." : "Submit Exam"}
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "680px",
    margin: "0 auto",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  timer: {
    fontSize: "1.4rem",
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
  },
  progress: { fontSize: "0.95rem", color: "#666" },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBtn: {
    padding: "8px 20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  pageIndicator: { fontSize: "0.95rem", color: "#666" },
  grid: { display: "flex", flexWrap: "wrap", gap: "8px" },
  gridItem: {
    width: "36px",
    height: "36px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  submitBtn: {
    padding: "14px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
};
