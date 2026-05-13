"use client";

import { ReportResponse } from "@/app/lib/getReport";
import styles from "./PredictionSummary.module.css";

interface Props {
  report: ReportResponse;
}

export default function PredictionSummary({ report }: Props) {
  const probability = report.probability ?? 0;

  const getStatus = (p: number) => {
    if (p >= 70) return { label: "High Chance", className: styles.high };
    if (p >= 50) return { label: "Medium Chance", className: styles.medium };
    return { label: "Low Chance", className: styles.low };
  };

  const status = getStatus(probability);

  const radius = 108;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (probability / 100) * circumference;

  return (
    <div className={styles.page}>
      <div className={styles.section}>Section 1 of 6</div>
      <h2 className={styles.title}>Prediction Summary</h2>

      <div className={styles.card}>
        {/* Circular gauge */}
        <div className={styles.circleWrapper}>
          <svg className={styles.circle} viewBox="0 0 256 256">
            <defs>
              <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <circle cx="128" cy="128" r={radius} className={styles.bgCircle} />
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="url(#pg)"
              className={styles.progressCircle}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className={styles.centerText}>
            <div className={styles.percent}>{probability}%</div>
            <div className={styles.label}>Probability</div>
          </div>
        </div>

        <div className={`${styles.badge} ${status.className}`}>
          {status.label}
        </div>

        <div className={styles.insight}>
          <div className={styles.insightIcon}>📈</div>
          <div>
            <div className={styles.insightTitle}>Key Insight</div>
            <p className={styles.insightText}>
              Your performance indicates a{" "}
              <strong>{status.label.toLowerCase()}</strong> of admission into{" "}
              <strong>{report.course}</strong> at{" "}
              <strong>{report.university}</strong>. Review the breakdown below
              to understand what&apos;s driving this result.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.pageNumber}>Page 1 of 7</div>
    </div>
  );
}
