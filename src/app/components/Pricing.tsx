"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./pricing.module.css";
import Image from "next/image";

const studentFreeFeatures = [
  "Preview admission likelihood percentage (3 trials)",
  "10 free UTME practice questions per subject",
  "Basic cutoff information",
];

const studentTokenFeatures = [
  "Detailed admission analysis & trends",
  "Top 3 personalized school recommendations",
  "Professional PDF reports for applications",
  "Complete UTME practice question banks",
  "Historical admission trends & insights",
];

const parentFreeFeatures = [
  "Preview your child's admission likelihood (3 trials)",
  "10 free UTME practice questions per subject",
  "Basic cutoff information",
];

const parentTokenFeatures = [
  "Detailed admission analysis for your child",
  "Top 3 personalized school recommendations",
  "Professional PDF reports for applications",
  "Track your child's UTME practice progress",
  "Historical admission trends & insights",
];

export default function Pricing() {
  const [selected, setSelected] = useState<"student" | "parent">("student");

  const freeFeatures =
    selected === "student" ? studentFreeFeatures : parentFreeFeatures;
  const tokenFeatures =
    selected === "student" ? studentTokenFeatures : parentTokenFeatures;
  const freePlanSubtext =
    selected === "student"
      ? "Perfect to get started"
      : "Monitor your child's journey";
  const tokenPlanSubtext =
    selected === "student"
      ? "Unlock detailed insights"
      : "Full visibility for parents";

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

          {/* Toggle Buttons */}
          <div className={styles.switchWrapper}>
            <button
              id="studentToggle"
              onClick={() => setSelected("student")}
              className={`${styles.switchButton} ${
                selected === "student"
                  ? styles.activeButton
                  : styles.inactiveButton
              }`}
            >
              For Students
            </button>
            <button
              id="parentToggle"
              onClick={() => setSelected("parent")}
              className={`${styles.switchButton} ${
                selected === "parent"
                  ? styles.activeButton
                  : styles.inactiveButton
              }`}
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
                {freePlanSubtext}
              </p>

              <ul className={styles.featureList}>
                {freeFeatures.map((item, i) => (
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
                {tokenPlanSubtext}
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
                {tokenFeatures.map((item, i) => (
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
                  href={"/dashboard/pay"}
                >
                  Buy Tokens Now
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
