"use client";

import React from "react";
import styles from "./previewModal.module.css";

const PreviewModal: React.FC = () => {
  return (
    <div
      id="previewModal"
      className={`${styles.modalOverlay} ${styles.hidden}`}
      role="dialog"
      aria-labelledby="previewTitle"
      aria-modal="true"
    >
      <div className={styles.glassCard}>
        <div className={styles.headerSection}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.icon}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-label="Success icon"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h2 id="previewTitle" className={styles.title}>
            Admission Likelihood
          </h2>
          <div className={styles.likelihoodTag}>Likely - 78%</div>
        </div>

        <div className={styles.content}>
          <div className={styles.progressBox}>
            <div className={styles.progressLabel}>
              <span>Admission Chance</span>
              <span className={styles.progressValue}>78%</span>
            </div>
            <div
              className={styles.progressBar}
              role="progressbar"
              aria-valuenow={78}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Admission chance 78 percent"
            >
              <div
                className={styles.progressFill}
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>

          <div className={styles.noticeBox}>
            <div className={styles.noticeContent}>
              <svg
                className={styles.noticeIcon}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-label="Information icon"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              <div>
                <h3 className={styles.noticeTitle}>This is a preview</h3>
                <p className={styles.noticeText}>
                  Unlock the full report with detailed analysis, alternative
                  schools, and actionable insights for just 1 token.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.unlockBtn}
              aria-label="Unlock full report for 1 token"
            >
              Unlock Full Report (1 Token)
            </button>
            <button
              className={styles.alternativeBtn}
              aria-label="See 1 alternative school for free"
            >
              See 1 Alternative Free
            </button>
          </div>
        </div>

        <button
          // todo: add closeModal('previewModal') logic
          className={styles.closeBtn}
          aria-label="Close preview modal"
        >
          <svg
            className={styles.closeIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PreviewModal;
