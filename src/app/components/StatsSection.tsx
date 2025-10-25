"use client";

import styles from "./statssection.module.css";

export default function StatsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          <div className={`${styles.fadeIn} fade-in`}>
            <div className={`${styles.statNumber} ${styles.orange}`}>
              50,000+
            </div>
            <p className={styles.statText}>Students Helped</p>
          </div>
          <div className={`${styles.fadeIn} fade-in`}>
            <div className={`${styles.statNumber} ${styles.pink}`}>200+</div>
            <p className={styles.statText}>Universities Covered</p>
          </div>
          <div className={`${styles.fadeIn} fade-in`}>
            <div className={`${styles.statNumber} ${styles.purple}`}>95%</div>
            <p className={styles.statText}>Accuracy Rate</p>
          </div>
        </div>

        <div className={`${styles.glassCard} ${styles.fadeIn} fade-in`}>
          <div className={styles.textCenter}>
            <div className={styles.stars} aria-label="5 star rating">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={styles.star}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Star"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <blockquote className={styles.quote}>
              &quot;Admission Compass helped me discover universities I never
              considered. I got into my dream school thanks to their accurate
              predictions!&quot;
            </blockquote>
            <p className={styles.author}>
              - Sarah A., University of Lagos Student
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
