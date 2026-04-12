"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { RateLimitContext } from "./RateLimitContext";

type Props = {
  children: ReactNode;
};

export const RateLimitProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [resource, setResource] = useState<string>("");
  const [resetTime, setResetTime] = useState<number | null>(null);

  const trigger = useCallback((resource: string, resetTime: number) => {
    console.log("trigger called with:", resource, resetTime);
    setResource(resource);
    setResetTime(resetTime);
    setIsOpen(true);
  }, []);

  const close = () => {
    setIsOpen(false);
    setResource("");
    setResetTime(null);
  };
  useEffect(() => {
    window.__triggerRateLimit = trigger;
    return () => {
      delete window.__triggerRateLimit;
    };
  }, [trigger]);

  return (
    <RateLimitContext.Provider
      value={{
        isOpen,
        resource,
        resetTime,
        trigger,
        close,
      }}
    >
      {children}
    </RateLimitContext.Provider>
  );
};
