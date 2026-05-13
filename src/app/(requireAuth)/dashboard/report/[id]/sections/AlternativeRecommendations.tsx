"use client";

import { ReportResponse } from "@/app/lib/getReport";
import { generateAlternatives } from "@/app/lib/generateAlternatives";
import styles from "./AlternativeRecommendations.module.css";

export type AlternativeType = "course" | "university";
export type AlternativeStatus = "high" | "moderate";

export interface Alternative {
  type: AlternativeType;
  name: string;
  institution: string;
  reason: string;
  status: AlternativeStatus;
}

interface Props {
  report: ReportResponse;
}

export default function AlternativeRecommendations({ report }: Props) {
  const alternatives: Alternative[] = generateAlternatives(report);

  return (
    <div className={styles.page}>


      <div className={styles.section}>Section 4 of 6</div>
      <h2 className={styles.title}>Alternative Recommendations</h2>
      <p className={styles.subtitle}>
        Based on your profile, here are alternative paths to strengthen your
        admission chances.
      </p>

      <div className={styles.banner}>
        <div className={styles.bannerTitle}>Strategic Recommendations</div>
        <p className={styles.bannerText}>
          These alternatives are selected based on your academic profile and
          current admission trends. Applying to 2–3 options significantly
          improves your overall success probability.
        </p>
      </div>

      <div className={styles.grid}>
        {alternatives.length === 0 ? (
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            No alternatives could be generated for this profile.
          </p>
        ) : (
          alternatives.map((alt, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <div>
                  <div className={styles.typeLabel}>
                    Alternative{" "}
                    {alt.type === "course" ? "Course" : "University"}
                  </div>
                  <h3 className={styles.name}>{alt.name}</h3>
                  {alt.institution && (
                    <p className={styles.institution}>{alt.institution}</p>
                  )}
                </div>
                <span
                  className={`${styles.badge} ${alt.status === "high" ? styles.high : styles.moderate}`}
                >
                  {alt.status === "high" ? "High Chance" : "Moderate"}
                </span>
              </div>
              <p className={styles.reason}>{alt.reason}</p>
            </div>
          ))
        )}
      </div>

      <div className={styles.pageNumber}>Page 4 of 7</div>
    </div>
  );
}
