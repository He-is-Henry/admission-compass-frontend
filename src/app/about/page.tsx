import { Metadata } from "next";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "Admission Compass | About us",
  description: "Learn about admission compass",
};

export default function AboutPage() {
  return (
    <main style={{ padding: "100px 20px" }}>
      <p className={styles.title}>
        Our Mission: Making University Admissions Fair & Predictable
      </p>
      <p className={styles.description}>
        We&apos;re building Africa&apos;s most trusted admissions guidance
        platform, powered by data and driven by purpose.
      </p>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.grid}></div>
          <h1 className={styles.subText}>
            Every year, nearly 2 million Nigerian students write JAMB, but less
            than 40% gain admission. Many of these rejections aren&apos;t due to
            low scores—they&apos;re the result of poor information and
            guesswork. Students apply to impossible course combinations, chase
            prestige over probability, and waste years repeating exams. Parents
            spend fortunes on forms and coaching with no clear strategy.{" "}
          </h1>
          <span className={styles.highlight}>
            We built Admission Compass to change this. We believe every student
            deserves to make informed, data-driven choices about their future.
          </span>
        </div>

        <p className={styles.title}>Our Core Values</p>
        {/* core grid */}
        <div className={styles.grid}>
          {/* core 1 */}
          <div className={`${styles.card} ${styles.fadeIn} fade-in`}>
            <div className={`${styles.iconBox} ${styles.orangePink}`}>
              <svg
                className={styles.icon}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-label="Data-Driven icon"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Data-Driven</h3>
            <p className={styles.cardText}>
              Every prediction backed by real admissions data
            </p>
          </div>

          {/* core 2 */}
          <div className={`${styles.card} ${styles.fadeIn} fade-in`}>
            <div className={`${styles.iconBox} ${styles.bluePurple}`}>
              <svg
                className={styles.icon}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-label="Improvement icon"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Continuous Improvement</h3>
            <p className={styles.cardText}>Always refining our algorithms</p>
          </div>

          {/* core 3 */}
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
            <h3 className={styles.cardTitle}>Student-First</h3>
            <p className={styles.cardText}>
              Built for students, by people who care
            </p>
          </div>

          {/* core 4 */}
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
            <h3 className={styles.cardTitle}>Social Impact</h3>
            <p className={styles.cardText}>Reducing inequality in admissions</p>
          </div>
        </div>
      </section>
    </main>
  );
}
