"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function useFadeInOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const elements = document.querySelectorAll(".fade-in, .fadeIn");
    elements.forEach((el) => {
      // optional safety: reset before observing
      el.classList.remove("visible");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);
}
