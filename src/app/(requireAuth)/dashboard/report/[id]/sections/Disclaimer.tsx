"use client";
import styles from "./Disclaimer.module.css";
import Image from "next/image";

interface Props {
  reportId?: string;
  generatedAt?: string;
}

export default function Disclaimer({ reportId, generatedAt }: Props) {
  const date = generatedAt
    ? new Date(generatedAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className={styles.page}>

      <div className={styles.section}>Section 6 of 6</div>
      <h2 className={styles.title}>Important Information</h2>

      <div className={styles.container}>
        {/* Disclaimer card */}
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.iconWrap}>
              <AlertIcon className={styles.icon} />
            </div>
            <div>
              <h3 className={styles.cardTitle}>Disclaimer</h3>
              <div className={styles.text}>
                <p>
                  This report is generated using statistical analysis and
                  machine learning models based on historical admission data.{" "}
                  <strong>
                    Predictions are not guarantees of admission outcomes.
                  </strong>
                </p>
                <p>Actual admission decisions depend on:</p>
                <ul>
                  <li>Final verification of credentials</li>
                  <li>Available slots and total application volume</li>
                  <li>Changes in institutional admission policies</li>
                  <li>Departmental requirements and preferences</li>
                  <li>Government directives and quota systems</li>
                </ul>
                <p>
                  Admission Compass is an independent educational technology
                  platform and is not affiliated with, endorsed by, or
                  officially connected to any university, JAMB, or government
                  educational body.
                </p>
                <p>
                  Use this report as a guide only. Always verify information
                  with official sources and follow all application procedures as
                  directed by the institution.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand card */}
        <div className={styles.brandCard}>
          <div className={styles.brandHeader}>
            <div className={styles.brandLogoWrap}>
              <Image
                src="/admissioncompass.jpg"
                alt="Admission Compass"
                width={56}
                height={56}
              />
            </div>
            <span className={styles.brandName}>Admission Compass</span>
          </div>
          <p className={styles.brandText}>
            Empowering students with data-driven insights to navigate the
            admission process with confidence. We&apos;re committed to
            transparency, accuracy, and student success.
          </p>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <MailIcon className={styles.contactIcon} />
              <span>info@admissioncompass.ng</span>
            </div>
            <div className={styles.contactItem}>
              <GlobeIcon className={styles.contactIcon} />
              <span>www.admissioncompass.ng</span>
            </div>
            <div className={styles.contactItem}>
              <SupportIcon className={styles.contactIcon} />
              <span>Support available 24/7</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            © {new Date().getFullYear()} Admission Compass. All rights reserved.
          </p>
          <p>
            Generated on {date}
            {reportId && <> · Report ID: {reportId}</>}
          </p>
        </div>
      </div>

      <div className={styles.pageNumber}>Page 6 of 7</div>
    </div>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}

function SupportIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}
