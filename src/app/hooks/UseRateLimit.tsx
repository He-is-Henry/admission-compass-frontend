"use client";

import { useContext } from "react";
import { RateLimitContext } from "../context/RateLimitContext";

export const useRateLimit = () => {
  const context = useContext(RateLimitContext);

  if (!context) {
    throw new Error("UseRateLimit must the used within RateLimitProvider");
  }
  return context;
};
