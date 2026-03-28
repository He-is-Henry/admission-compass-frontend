"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/app/api/axios";
import styles from "./PaySuccess.module.css";

type Status = "loading" | "success" | "failed";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    style={{ width: "1rem", height: "1rem" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18-3H3m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6"
    />
  </svg>
);

export default function PaySuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference) return void router.push("/dashboard/pay");

    api
      .get(`/pay/verify?reference=${reference}`)
      .then((res) => setStatus(res.data.verified ? "success" : "failed"))
      .catch(() => setStatus("failed"));
  }, []);

  if (status === "loading") {
    return (
      <div className={styles.page}>
        <div className={styles.loadingWrap}>
          <div className={styles.spinner} />
          <p>Verifying your payment…</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className={styles.page}>
        <div className={`${styles.card} ${styles.cardFailed}`}>
          <div className={`${styles.iconWrap} ${styles.iconWrapFailed}`}>
            <XIcon />
          </div>
          <h1 className={styles.title}>Payment Failed</h1>
          <p className={styles.subtitle}>
            We couldn't verify your payment. If you were charged, please contact
            support with your reference.
          </p>
          <button
            className={styles.btnOutline}
            onClick={() => router.push("dashboard/pay")}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <CheckIcon />
        </div>
        <h1 className={styles.title}>Payment Successful 🎉</h1>
        <p className={styles.subtitle}>
          Your tokens have been credited to your wallet and are ready to use.
        </p>
        <div className={styles.tokenBadge}>
          <WalletIcon />
          Tokens added to your wallet
        </div>
        <button
          className={styles.btnPrimary}
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </button>
        <button
          className={styles.btnOutline}
          onClick={() => router.push("dashboard/pay")}
        >
          Buy More Tokens
        </button>
      </div>
    </div>
  );
}
