"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ResultClient.module.css";
import Image from "next/image";

const alphabets = ["A", "B", "C", "D", "E", "F"];

type BreakdownItem = {
  text: string;
  options: string[];
  explanation?: string | null;
  image?: string | null;
  year?: number | null;
  given: number | null;
  correct: number;
};

type ExamResult = {
  score: number;
  total: number;
  percentage: number;
  expired?: boolean;
  breakdown: BreakdownItem[];
};

const getGrade = (p: number) => {
  if (p >= 70) return { label: "Excellent", color: "#16a34a" };
  if (p >= 50) return { label: "Pass", color: "#d97706" };
  return { label: "Fail", color: "#dc2626" };
};

export default function ResultClient() {
  const router = useRouter();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<"summary" | "review">("summary");

  useEffect(() => {
    const raw = sessionStorage.getItem("examResult");
    if (!raw) {
      setChecked(true);
      return;
    }
    try {
      setResult(JSON.parse(raw));
      sessionStorage.removeItem("examResult");
    } catch (err) {
      console.log(err);
    } finally {
      setChecked(true);
    }
  }, []);

  if (!checked) return null;
  if (!result) return null;

  const { score, total, percentage, expired, breakdown } = result;
  const grade = getGrade(percentage);

  const getStatus = (item: BreakdownItem) => {
    if (item.given === null) return "skipped";
    if (item.given === item.correct) return "correct";
    return "wrong";
  };

  return (
    <div className={styles.page}>
      {/* Summary Card */}
      <div className={styles.summaryCard}>
        <h2 className={styles.title}>Exam Result</h2>

        {expired && (
          <span className={styles.expiredBanner}>
            Time expired — auto submitted
          </span>
        )}

        <div className={styles.badge} style={{ background: grade.color }}>
          {grade.label}
        </div>

        <p className={styles.score}>
          {score} / {total}
        </p>
        <p className={styles.percentage} style={{ color: grade.color }}>
          {percentage}%
        </p>

        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => router.push("/exam")}
          >
            New Exam
          </button>
          <button
            className={styles.btnOutline}
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Tabs */}
      {breakdown?.length > 0 && (
        <>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === "summary" ? styles.tabActive : ""}`}
              onClick={() => setTab("summary")}
            >
              Summary
            </button>
            <button
              className={`${styles.tab} ${tab === "review" ? styles.tabActive : ""}`}
              onClick={() => setTab("review")}
            >
              Review Answers
            </button>
          </div>

          {tab === "summary" && (
            <div className={styles.summaryCard}>
              <p style={{ margin: 0, color: "#6b7280", fontSize: "0.9375rem" }}>
                ✅ Correct:{" "}
                <strong>
                  {breakdown.filter((b) => b.given === b.correct).length}
                </strong>
                &nbsp;&nbsp; ❌ Wrong:{" "}
                <strong>
                  {
                    breakdown.filter(
                      (b) => b.given !== b.correct && b.given !== null,
                    ).length
                  }
                </strong>
                &nbsp;&nbsp; ⏭ Skipped:{" "}
                <strong>
                  {breakdown.filter((b) => b.given === null).length}
                </strong>
              </p>
            </div>
          )}

          {tab === "review" && (
            <div className={styles.breakdownList}>
              {breakdown.map((item, i) => {
                const status = getStatus(item);
                return (
                  <div
                    key={i}
                    className={`${styles.questionCard} ${
                      status === "correct"
                        ? styles.questionCardCorrect
                        : status === "wrong"
                          ? styles.questionCardWrong
                          : styles.questionCardSkipped
                    }`}
                  >
                    <div className={styles.questionMeta}>
                      <span className={styles.questionNum}>Q{i + 1}</span>
                      {item.year && (
                        <span className={styles.questionNum}>
                          · {item.year}
                        </span>
                      )}
                      <span
                        className={`${styles.statusPill} ${
                          status === "correct"
                            ? styles.pillCorrect
                            : status === "wrong"
                              ? styles.pillWrong
                              : styles.pillSkipped
                        }`}
                      >
                        {status === "correct"
                          ? "Correct"
                          : status === "wrong"
                            ? "Wrong"
                            : "Skipped"}
                      </span>
                    </div>

                    {item.image && (
                      <Image
                        src={item.image}
                        alt={`Question ${i + 1}`}
                        fill
                        style={{
                          maxWidth: "100%",
                          borderRadius: "0.5rem",
                          marginBottom: "0.75rem",
                        }}
                      />
                    )}

                    <p className={styles.questionText}>{item.text}</p>

                    <div className={styles.optionsList}>
                      {item.options.map((opt, j) => {
                        const isCorrect = j === item.correct;
                        const isGiven = j === item.given;
                        return (
                          <div
                            key={j}
                            className={`${styles.option} ${
                              isCorrect
                                ? styles.optionCorrect
                                : isGiven
                                  ? styles.optionWrong
                                  : ""
                            }`}
                          >
                            <span className={styles.optionLetter}>
                              {alphabets[j]}.
                            </span>
                            {opt}
                          </div>
                        );
                      })}
                    </div>

                    {item.explanation && (
                      <div className={styles.explanation}>
                        💡 {item.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
