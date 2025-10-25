"use client";

import React from "react";
import styles from "./featuressection.module.css";

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${styles.fadeIn} fade-in`}>
          <h2 className={styles.title}>Everything You Need to Succeed</h2>
          <p className={styles.subtitle}>
            Comprehensive tools and insights to navigate your university
            admission journey with confidence.
          </p>
        </div>

        {/* Features grid */}
        <div className={styles.grid}>
          {/* Feature 1 */}
          <div className={`${styles.card} ${styles.fadeIn} fade-in`}>
            <div className={`${styles.iconBox} ${styles.orangePink}`}>
              <svg
                className={styles.icon}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-label="Admission prediction icon"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Admission Prediction</h3>
            <p className={styles.cardText}>
              Get accurate likelihood scores based on your UTME results,
              O&apos;level grades, and historical admission data.
            </p>
          </div>

          {/* Feature 2 */}
          <div className={`${styles.card} ${styles.fadeIn} fade-in`}>
            <div className={`${styles.iconBox} ${styles.bluePurple}`}>
              <svg
                className={styles.icon}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-label="Recommendations icon"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Top 5 Recommendations</h3>
            <p className={styles.cardText}>
              Discover the best alternative universities that match your profile
              and academic goals.
            </p>
          </div>

          {/* Feature 3 */}
          <div className={`${styles.card} ${styles.fadeIn} fade-in`}>
            <div className={`${styles.iconBox} ${styles.greenTeal}`}>
              <svg
                className={styles.icon}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-label="Download report icon"
              >
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Downloadable Report</h3>
            <p className={styles.cardText}>
              Get comprehensive PDF reports with detailed analysis, trends, and
              actionable next steps.
            </p>
          </div>

          {/* Feature 4 */}
          <div className={`${styles.card} ${styles.fadeIn} fade-in`}>
            <div className={`${styles.iconBox} ${styles.purplePink}`}>
              <svg
                className={styles.icon}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-label="UTME practice icon"
              >
                <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>UTME Practice</h3>
            <p className={styles.cardText}>
              Access 10 free practice questions per subject to sharpen your
              skills and boost your confidence.
            </p>
          </div>
        </div>
      </div>

      {/* TODO: Add scroll-trigger animation to activate fade-in on view */}
    </section>
  );
};

export default FeaturesSection;
