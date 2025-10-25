"use client";
import React from "react";
import styles from "./herosection.module.css";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left text column */}
          <div className={`${styles.textArea} ${styles.fadeIn} fade-in`}>
            <h1 className={styles.title}>
              Find Your Admission Path with{" "}
              <span className={styles.highlight}>Confidence</span>
            </h1>
            <p className={styles.description}>
              Get predictive admission chances, discover alternative school
              suggestions, and download comprehensive reports to guide your
              university journey.
            </p>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => console.log("Prediction Flow")}
                className={styles.primaryBtn}
                aria-label="Check your admission chances"
              >
                Check Your Chances
              </button>
              <button
                className={styles.secondaryBtn}
                aria-label="Try free features"
              >
                Practice 10 Free Questions
              </button>
            </div>
          </div>

          {/* Right card column */}
          <div className={`${styles.fadeIn} fade-in`}>
            <div className={styles.glassCard}>
              <div className={styles.cardContent}>
                <div className={styles.progressHeader}>
                  <h3 className={styles.progressTitle}>Admission Likelihood</h3>
                  <span className={styles.progressTag}>78%</span>
                </div>

                <div
                  className={styles.progressBar}
                  role="progressbar"
                  aria-valuenow={78}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Admission likelihood 78 percent"
                >
                  <div
                    className={styles.progressFill}
                    style={{ width: "78%" }}
                  ></div>
                </div>

                <div className={styles.statsGrid}>
                  <div className={styles.blueBox}>
                    <p className={styles.statLabel}>Cutoff Match</p>
                    <p className={styles.statValueBlue}>On Track</p>
                  </div>
                  <div className={styles.purpleBox}>
                    <p className={styles.statLabel}>Alternatives</p>
                    <p className={styles.statValuePurple}>5 Found</p>
                  </div>
                </div>

                <div className={styles.altBox}>
                  <p className={styles.altLabel}>Top Alternatives</p>
                  <div className={styles.altList}>
                    <p>• University of Lagos (UNILAG)</p>
                    <p>• University of Nigeria (UNN)</p>
                    <p>• University of Ibadan (UI)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
