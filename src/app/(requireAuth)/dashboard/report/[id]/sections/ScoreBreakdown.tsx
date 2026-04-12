"use client";

import { ReportResponse } from "@/app/lib/getReport";
import styles from "./ScoreBreakdown.module.css";
import ReportHeader from "./ReportHeader";

interface Props {
  report: ReportResponse;
}

interface ScoreCardProps {
  title: string;
  description: string;
  score: number;
  max: number;
}

function ScoreCard({ title, description, score, max }: ScoreCardProps) {
  const pct = Math.min(100, Math.round((score / max) * 100));
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.cardLeft}>
          <div className={styles.cardTitle}>{title}</div>
          <div className={styles.cardDesc}>{description}</div>
        </div>
        <div className={styles.scoreBox}>
          <span className={styles.score}>{score}</span>
          <span className={styles.max}> / {max}</span>
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
      <div className={styles.barLabels}>
        <span className={styles.barLabel}>0</span>
        <span className={styles.barLabel}>{max}</span>
      </div>
    </div>
  );
}

export default function ScoreBreakdown({ report }: Props) {
  const breakdown = report.report_data?.breakdown;
  if (!breakdown) return null;

  const { utme_score, post_utme_score, olevel_points } = breakdown;

  const utmePct = utme_score ? Math.round((utme_score / 400) * 100) : null;
  const postPct =
    post_utme_score != null ? Math.round((post_utme_score / 100) * 100) : null;
  const olevelPct =
    olevel_points != null ? Math.round((olevel_points / 50) * 100) : null;

  return (
    <div className={styles.page}>
      <div className={styles.logoRow}>
        <ReportHeader />
      </div>

      <div className={styles.section}>Section 2 of 6</div>
      <h2 className={styles.title}>Score Breakdown</h2>
      <p className={styles.subtitle}>
        Detailed analysis of your academic performance across key admission
        criteria.
      </p>

      <div className={styles.grid}>
        {utme_score != null && (
          <ScoreCard
            title="UTME Score"
            description="Your Unified Tertiary Matriculation Examination score"
            score={utme_score}
            max={400}
          />
        )}
        {post_utme_score != null && (
          <ScoreCard
            title="Post-UTME Score"
            description="University screening examination score"
            score={post_utme_score}
            max={100}
          />
        )}
        {olevel_points != null && (
          <ScoreCard
            title="O'Level Performance"
            description="Combined O'level subject points"
            score={olevel_points}
            max={50}
          />
        )}
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <div className={styles.summaryValue}>{utmePct ?? "--"}%</div>
          <div className={styles.summaryLabel}>UTME Percentile</div>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.summaryValue}>{postPct ?? "--"}%</div>
          <div className={styles.summaryLabel}>Post-UTME</div>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.summaryValue}>{olevelPct ?? "--"}%</div>
          <div className={styles.summaryLabel}>O&apos;Level</div>
        </div>
      </div>

      <div className={styles.pageNumber}>Page 2 of 7</div>
    </div>
  );
}
