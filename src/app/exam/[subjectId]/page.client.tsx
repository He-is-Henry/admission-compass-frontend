"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "@/app/api/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import ExamQuestion from "@/app/components/ExamQuestion";

type Draft = {
  _id: string;
  questions: Question[];
  answers: (number | null)[];
  startTime: string;
  duration: number;
};

export default function ExamSession() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await axios.get("/exam/draft");
        const d: Draft = res.data;
        setDraft(d);
        setAnswers(d.answers);
        const elapsed = (Date.now() - new Date(d.startTime).getTime()) / 1000;
        const remaining = Math.max(0, d.duration - elapsed);
        setTimeLeft(Math.floor(remaining));
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        toast.error(error?.response?.data?.error || "Failed to load exam");
        router.push("/exam");
      } finally {
        setLoading(false);
      }
    };
    fetchDraft();
  }, []);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const interval = setInterval(
      () => setTimeLeft((t) => (t !== null ? t - 1 : null)),
      1000,
    );
    return () => clearInterval(interval);
  }, [timeLeft]);

  const saveDraft = useCallback(async (updatedAnswers: (number | null)[]) => {
    try {
      await axios.patch("/exam/draft", { answers: updatedAnswers });
    } catch {}
  }, []);

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[questionIndex] =
        updated[questionIndex] === optionIndex ? null : optionIndex;
      saveDraft(updated);
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await axios.post("/exam/submit");
      router.push(
        `/exam/result?score=${res.data.score}&total=${res.data.total}&percentage=${res.data.percentage}`,
      );
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to submit exam");
      setSubmitting(false);
    }
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
        onClick={handleSubmit}
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
