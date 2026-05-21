import { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About | Admission Compass",
  description: "Find Your Admission Path with Confidence",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <span className={styles.eyebrow}>About Us</span>
        <h1 className={styles.heroTitle}>
          We help students find their <em>path</em> with confidence
        </h1>
        <p className={styles.heroDesc}>
          Admission Compass is built for Nigerian students navigating the
          complexity of university admissions — giving clarity where there&apos;s
          been confusion for too long.
        </p>
      </section>

      {/* ── Stats bar ── */}
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statNum}>1k+</span>
          <span className={styles.statLabel}>Students Helped</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>200+</span>
          <span className={styles.statLabel}>Institutions</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>94%</span>
          <span className={styles.statLabel}>Accuracy Rate</span>
        </div>
      </div>

      {/* ── Story ── */}
      <section className={styles.story}>
        <div className={styles.storyLabel}>Our Story</div>
        <div className={styles.storyBody}>
          <p>
            Every year, thousands of students make uninformed choices about
            which universities to apply to — not because they&apos;re unprepared,
            but because the information they need simply isn&apos;t accessible.
          </p>
          <p>
            Admission Compass was built to change that. We aggregate historical
            cut-off marks, departmental data, and admission trends so you can
            walk into JAMB and Post-UTME season knowing exactly where you
            stand.
          </p>
          <p>
            Our prediction engine is trained on years of real admission
            outcomes — not guesses, not generalizations. Real data, real
            results.
          </p>
          <blockquote className={styles.storyHighlight}>
            &quot;No student should lose their spot to a lack of information.
            That&apos;s the problem we&apos;re solving.&quot;
          </blockquote>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesSectionInner}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>02 —</span>
            <h2 className={styles.sectionTitle}>What we stand for</h2>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <svg className={styles.valueIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <h3 className={styles.valueTitle}>Accuracy First</h3>
              <p className={styles.valueText}>
                Every prediction is grounded in verified historical data. We&apos;d
                rather say &quot;we don&apos;t know&quot; than give you a confident wrong answer.
              </p>
            </div>
            <div className={styles.valueCard}>
              <svg className={styles.valueIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <h3 className={styles.valueTitle}>Built for Students</h3>
              <p className={styles.valueText}>
                Not institutions, not consultants — students. Every feature we
                ship is filtered through one question: does this help a student
                make a better decision?
              </p>
            </div>
            <div className={styles.valueCard}>
              <svg className={styles.valueIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <h3 className={styles.valueTitle}>Transparent Process</h3>
              <p className={styles.valueText}>
                We show our work. Our confidence scores tell you how certain a
                prediction is, not just what it is.
              </p>
            </div>
            <div className={styles.valueCard}>
              <svg className={styles.valueIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              <h3 className={styles.valueTitle}>Always Improving</h3>
              <p className={styles.valueText}>
                Each admission cycle adds to our dataset. The model gets smarter
                every year, and so do the students who use it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <p className={styles.ctaText}>
          Ready to find your <em>best-fit</em> institutions?
        </p>
        <Link href="/dashboard" className={styles.ctaBtn}>
          Get Started
        </Link>
      </section>

    </main>
  );
}
