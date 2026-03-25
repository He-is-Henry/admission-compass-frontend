"use client";

import { createContext } from "react";

type RateLimitContextType = {
  isOpen: boolean;
  resource: string;
  resetTime: number | null;
  trigger: (resource: string, resetTime: number) => void;
  close: () => void;
};

export const RateLimitContext = createContext<RateLimitContextType | null>(
  null,
);
