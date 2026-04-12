"use client";

import { ReportResponse } from "@/app/lib/getReport";
import { generateActionPlan, ActionItem } from "@/app/lib/generateActionPlan";
import ReportHeader from "./ReportHeader";
import styles from "./ActionPlan.module.css";

interface Props {
  report: ReportResponse;
}

export default function ActionPlan({ report }: Props) {
  const actions: ActionItem[] = generateActionPlan(report);

  return (
    <div className={styles.page}>
      <div className={styles.logoRow}>
        <ReportHeader />
      </div>

      <div className={styles.section}>Section 5 of 6</div>
      <h2 className={styles.title}>Your Action Plan</h2>
      <p className={styles.subtitle}>
        Follow these recommended steps to maximise your admission chances.
      </p>

      <div className={styles.grid}>
        {actions.map((action, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardTop}>
              <h3 className={styles.cardTitle}>{action.title}</h3>
              <span className={`${styles.badge} ${styles[action.priority]}`}>
                {action.priority}
              </span>
            </div>
            <p className={styles.description}>{action.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.pageNumber}>Page 5 of 7</div>
    </div>
  );
}
