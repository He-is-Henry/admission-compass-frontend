"use client";

import styles from "./howItWorks.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={`${styles.textCenter} ${styles.mbLarge} ${styles.fadeIn} fade-in`}
        >
          <h2 className={styles.heading}>How It Works</h2>
          <p className={styles.subtext}>
            Simple steps to unlock your admission insights
          </p>
        </div>

        <div className={styles.grid}>
          {/* Step 1 */}
          <div className={`${styles.step} ${styles.fadeIn} fade-in`}>
            <div className={`${styles.circle} ${styles.orangeGradient}`}>
              <span className={styles.number}>1</span>
            </div>
            <h3 className={styles.title}>Enter Your Scores</h3>
            <p className={styles.description}>
              Input your UTME score, O&apos;level results, and desired course
              information.
            </p>
          </div>

          {/* Step 2 */}
          <div className={`${styles.step} ${styles.fadeIn} fade-in`}>
            <div className={`${styles.circle} ${styles.blueGradient}`}>
              <span className={styles.number}>2</span>
            </div>
            <h3 className={styles.title}>See Preview</h3>
            <p className={styles.description}>
              Get an instant preview of your admission likelihood and basic
              recommendations.
            </p>
          </div>

          {/* Step 3 */}
          <div className={`${styles.step} ${styles.fadeIn} fade-in`}>
            <div className={`${styles.circle} ${styles.greenGradient}`}>
              <span className={styles.number}>3</span>
            </div>
            <h3 className={styles.title}>Unlock Full Report</h3>
            <p className={styles.description}>
              Use tokens to access detailed analysis, trends, and comprehensive
              recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// TODO: Add scroll-based fade-in animation logic (e.g., IntersectionObserver)
