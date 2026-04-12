"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/axios";

export interface Discount {
  _id: string;
  code: string;
  percentage: number;
  cap: number;
  used: number;
  expiresAt?: string;
  isFeatured?: boolean;
}

function isExpired(expiresAt?: string) {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() < Date.now();
}

export default function useDiscount() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [featured, setFeatured] = useState<Discount | null>(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const res = await api.get<Discount[]>("/discount");

        setDiscounts(res.data);

        const activeFeatured =
          res.data.find(
            (d) =>
              (d.isFeatured || d.code === "WELCOME") &&
              d.used < d.cap &&
              !isExpired(d.expiresAt),
          ) || null;

        setFeatured(activeFeatured);
      } catch {
        setDiscounts([]);
        setFeatured(null);
      }
    };

    fetchDiscounts();
  }, []);

  return {
    discounts,
    featured,
  };
}
