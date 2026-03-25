"use client";

import { useEffect, useState, useCallback } from "react";
import { useRateLimit } from "@/app/hooks/UseRateLimit";
import styles from "./RateLimitModal.module.css";

const SPEEDSTER_MESSAGES = [
  "Whoa there, speedster — you nearly broke the sound barrier.",
  "Easy, Flash. The servers need a breather too.",
  "You just out-requested our entire engineering team.",
  "Slow down — even the internet has feelings.",
  "That was impressive. Concerningly impressive.",
];

const getRandomMessage = () =>
  SPEEDSTER_MESSAGES[Math.floor(Math.random() * SPEEDSTER_MESSAGES.length)];

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const RateLimitModal = () => {
  const { isOpen, resource, resetTime, close } = useRateLimit();
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    if (!resetTime) return 0;
    return Math.max(0, Math.floor((resetTime - Date.now()) / 1000));
  });
  const [isDone, setIsDone] = useState(false);
  const [message] = useState(getRandomMessage);

  useEffect(() => {
    if (!isOpen || !resetTime) return;

    const diff = Math.max(0, Math.floor((resetTime - Date.now()) / 1000));
    setSecondsLeft(diff);
    setIsDone(diff <= 0);
  }, [isOpen, resetTime]);

  useEffect(() => {
    if (!isOpen || !resetTime) return;

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((resetTime - Date.now()) / 1000));

      setSecondsLeft(diff);

      if (diff <= 0) {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, resetTime]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) close();
    },
    [close],
  );

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.iconWrap}>
          <div className={styles.icon}>⚡</div>
        </div>

        <div className={styles.textBlock}>
          <p className={styles.heading}>{message}</p>
          <p className={styles.subheading}>
            You&apos;ve hit the limit for <strong>{resource}</strong>. Take a
            short break and try again shortly.
          </p>
        </div>

        <div className={`${styles.countdownBox} ${isDone ? styles.done : ""}`}>
          <p
            className={`${styles.countdownLabel} ${isDone ? styles.done : ""}`}
          >
            {isDone ? "Ready" : "Try again in"}
          </p>
          <p
            className={`${styles.countdownTimer} ${isDone ? styles.done : ""}`}
          >
            {isDone ? `You can now ${resource}` : formatTime(secondsLeft)}
          </p>
        </div>

        {isDone && (
          <button className={styles.btn} onClick={close}>
            Got it
          </button>
        )}
      </div>
    </div>
  );
};
