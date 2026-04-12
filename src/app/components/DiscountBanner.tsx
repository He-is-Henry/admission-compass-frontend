"use client";

import { useEffect, useState } from "react";
import useDiscount, { Discount } from "@/app/hooks/useDiscount";
import styles from "./DiscountBanner.module.css";

function getTimeLeft(expiresAt?: string) {
  if (!expiresAt) return null;

  return new Date(expiresAt).getTime() - Date.now();
}

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
};

export default function DiscountBanner() {
  const { featured } = useDiscount();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!featured?.expiresAt) return;

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(featured.expiresAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [featured]);

  if (!featured) return null;

  const progress = (featured.used / featured.cap) * 100;

  return (
    <section className={styles.banner}>
      <h2 className={styles.title}>
        🎉 {featured.percentage}% OFF — Early Access
      </h2>

      <p className={styles.code}>
        Use code <strong>{featured.code}</strong>
      </p>

      <div className={styles.progressWrap}>
        <div className={styles.progress} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.meta}>
        {featured.used} / {featured.cap} used • {featured.cap - featured.used}{" "}
        left
      </div>

      {timeLeft !== null && (
        <div className={styles.timer}>⏳ Ends in {formatTime(timeLeft)}</div>
      )}
    </section>
  );
}
