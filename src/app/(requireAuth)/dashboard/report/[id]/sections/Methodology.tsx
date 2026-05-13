"use client";

import { ReportResponse } from "@/app/lib/getReport";
import styles from "./Methodology.module.css";

interface Props {
  report: ReportResponse;
}

export default function Methodology({ report }: Props) {
  const breakdown = report.report_data.breakdown;
  const cutoff = report.report_data?.cutoff;
  const limits = report.report_data.limits;

  return (
    <div className={styles.page}>
      <div className={styles.section}>Section 3 of 6</div>
      <h2 className={styles.title}>How We Calculated Your Chances</h2>
      <p className={styles.subtitle}>
        A transparent look at the methodology behind your admission probability.
      </p>

      <div className={styles.card}>
        <p className={styles.intro}>
          Your admission probability is calculated using a combination of your
          academic performance, institutional cutoff requirements, and
          historical admission patterns from the past 5 years.
        </p>

        {/* Block 1 */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Academic Performance</h3>
          <p className={styles.blockText}>
            We evaluated your scores across key components:
          </p>
          <ul className={styles.list}>
            {breakdown?.utme_score != null && (
              <li>
                UTME Score: <strong>{breakdown.utme_score}</strong> / 400
              </li>
            )}
            {breakdown?.post_utme_score != null && (
              <li>
                Post-UTME Score: <strong>{breakdown.post_utme_score}</strong> /
                {limits.post_utme_max}
              </li>
            )}
            {breakdown?.olevel_points != null && (
              <li>
                O&apos;Level Points: <strong>{breakdown.olevel_points} / {limits.olevel_max}</strong>
              </li>
            )}

          </ul>
        </div>

        {/* Block 2 */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Cutoff Comparison</h3>
          <p className={styles.blockText}>
            Your aggregate was compared against the departmental cutoff for{" "}
            <strong>{report.course}</strong> at{" "}
            <strong>{report.university}</strong>.
          </p>
          <div className={styles.statRow}>
            {cutoff?.aggregate != null && (
              <div className={styles.stat}>
                <div className={styles.statLabel}>Required Aggregate</div>
                <div className={styles.statValue}>{cutoff.aggregate}</div>
              </div>
            )}
            {cutoff?.difference != null && (
              <div className={styles.stat}>
                <div className={styles.statLabel}>Your Margin</div>
                <div className={styles.statValue}>
                  {cutoff.difference >= 0 ? "+" : ""}
                  {cutoff.difference} pts
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Block 3 */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Probability Model</h3>
          <p className={styles.blockText}>
            We apply a weighted machine learning model trained on historical
            admission data. Your final probability of{" "}
            <strong>{report.probability}%</strong> reflects both your absolute
            score and how competitive you are relative to past admitted
            students.
          </p>
        </div>
      </div>

      <div className={styles.pageNumber}>Page 3 of 7</div>
    </div>
  );
}
