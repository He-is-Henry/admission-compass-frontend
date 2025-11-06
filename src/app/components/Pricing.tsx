"use client";

import Link from "next/link";
import styles from "./pricing.module.css";
import Image from "next/image";

export default function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.container}>
        <div
          className={`${styles.textCenter} ${styles.mb16} ${styles.fadeIn} fade-in`}
        >
          <h2 className={styles.heading}>Simple, Transparent Pricing</h2>
          <p className={styles.subheading}>
            Start free, upgrade when you need more insights
          </p>

          {/* Student/Parent Toggle */}
          <div className={styles.toggleWrapper}>
            <button
              id="studentToggle"
              // TODO: add togglePricing('student') logic
              className={styles.studentToggle}
              aria-label="View pricing for students"
            >
              For Students
            </button>
            <button
              id="parentToggle"
              // TODO: add togglePricing('parent') logic
              className={styles.parentToggle}
              aria-label="View pricing for parents"
            >
              For Parents
            </button>
          </div>
        </div>

        <div className={styles.pricingGrid}>
          {/* Free Plan */}
          <div className={`${styles.glassCard} ${styles.fadeIn} fade-in`}>
            <div className={styles.textCenter}>
              <div className={styles.iconWrapperGreen}>
                <svg
                  className={styles.iconLarge}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Free plan icon"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className={styles.planTitle}>Free Preview</h3>
              <div className={styles.planPrice}>₦0</div>
              <p className={styles.planSubtext} id="freePlanSubtext">
                Perfect to get started
              </p>

              <ul className={styles.featureList}>
                {[
                  "Preview admission likelihood percentage",
                  "10 free UTME practice questions per subject",
                  "Basic cutoff information",
                ].map((item, i) => (
                  <li key={i} className={styles.featureItem}>
                    <svg
                      className={styles.featureIcon}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-label="Included feature"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={styles.freeButton}
                aria-label="Start with free plan"
              >
                Get Started Free
              </button>
            </div>
          </div>

          {/* Token Plan */}
          <div className={`${styles.glassCardBorder} ${styles.fadeIn} fade-in`}>
            <div className={styles.badgeWrapper}>
              <span className={styles.badge}>Most Popular</span>
            </div>

            <div className={styles.textCenter}>
              <div className={styles.iconWrapperLogo}>
                <Image
                  src="/admissioncompass.jpg"
                  alt="Admission Compass Logo"
                  width={40}
                  height={40}
                  className={styles.iconWrapper}
                />
              </div>
              <h3 className={styles.planTitle}>Token Bundle</h3>
              <div className={styles.planPrice}>₦1,000</div>
              <p className={styles.textGray}>3 Tokens</p>
              <p className={styles.planSubtextOrange} id="tokenPlanSubtext">
                Unlock detailed insights
              </p>

              <div className={styles.tokenBox}>
                <h4 className={styles.tokenHeading}>1 Token Gets You:</h4>
                <div className={styles.tokenFeatures}>
                  {[
                    "Full prediction report",
                    "Downloadable PDF report",
                    "Full UTME subject bank",
                  ].map((item, i) => (
                    <div key={i} className={styles.tokenFeatureRow}>
                      <span className={styles.tokenFeature}>{item}</span>
                      <span className={styles.tokenBadge}>1 Token</span>
                    </div>
                  ))}
                </div>
              </div>

              <ul className={styles.featureList}>
                {[
                  "Detailed admission analysis & trends",
                  "Top 5 personalized school recommendations",
                  "Professional PDF reports for applications",
                  "Complete UTME practice question banks",
                  "Historical admission trends & insights",
                ].map((item, i) => (
                  <li key={i} className={styles.featureItem}>
                    <svg
                      className={styles.featureIcon}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-label="Included feature"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={styles.tokenButton}
                aria-label="Buy token bundle"
              >
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  href={"/pay"}
                >
                  Buy Tokens Now
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Launch Promos */}
        <div
          className={`${styles.mt16} ${styles.textCenter} ${styles.fadeIn} fade-in`}
        >
          <div className={styles.promos}>
            <div className={styles.promoRow}>
              <span className={styles.badgeRed}>50% OFF</span>
              <span className={styles.textDark}>
                First 500 users get 50% off! Only{" "}
                <span className={styles.textRed}>247</span> spots left.
              </span>
            </div>
            <div className={styles.promoRow}>
              <span className={styles.badgeBlue}>EXTRA 20% OFF</span>
              <span className={styles.textDark}>
                First 200 users get additional 20% off!
              </span>
            </div>
          </div>

          {/* Referral Note */}
          <div className={styles.referralBox}>
            <div className={styles.referralHeader}>
              <svg
                className={styles.referralIcon}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-label="Referral reward icon"
              >
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H16c-.8 0-1.54.37-2 1l-3 4v2h2l2.54-3.4L16.5 16H18v6h2z" />
              </svg>
              <h4 className={styles.referralHeading}>Earn 10% Discount</h4>
            </div>
            <p className={styles.referralText}>
              When your referral buys tokens, you earn 10% discount on your next
              purchase—tracked by your unique username.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
