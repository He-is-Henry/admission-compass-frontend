"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/axios";
import styles from "./DiscountBanner.module.css";

interface Discount {
  _id: string;
  code: string;
  percentage: number;
  cap: number;
  used: number;
}

export default function DiscountBanner() {
  const [discount, setDiscount] = useState<Discount | null>(null);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const res = await api.get<Discount[]>("/discount");

        const welcome = res.data.find(
          (d) => d.code === "WELCOME" && d.used < d.cap,
        );

        if (welcome) {
          setDiscount(welcome);
        }
      } catch {
        // silently ignore
      }
    };

    fetchDiscount();
  }, []);

  if (!discount) return null;

  const progress = (discount.used / discount.cap) * 100;
  const remaining = discount.cap - discount.used;

  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          🎉 {discount.percentage}% OFF for Early Users
        </h2>

        <p className={styles.description}>
          Use code <strong>{discount.code}</strong> and get{" "}
          <strong>{discount.percentage}% off</strong> your purchase.
        </p>

        <div className={styles.progressWrapper}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className={styles.meta}>
          {discount.used} / {discount.cap} used • {remaining} remaining
        </div>
      </div>
    </section>
  );
}
