"use client";

import { useEffect } from "react";

export default function useSmoothScroll() {
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    console.log(anchors);
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = document.querySelector(
        (e.currentTarget as HTMLAnchorElement).getAttribute("href") || ""
      );
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    anchors.forEach((anchor) => anchor.addEventListener("click", handleClick));

    return () => {
      anchors.forEach((anchor) =>
        anchor.removeEventListener("click", handleClick)
      );
    };
  }, []);

  return null; // no UI, just a behavior hook
}
