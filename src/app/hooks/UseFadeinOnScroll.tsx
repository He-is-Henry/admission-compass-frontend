"use client";
import { useEffect } from "react";

export default function useFadeInOnScroll() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // optional: stops re-observing once visible
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));
    const elements2 = document.querySelectorAll(".fadeIn");
    elements2.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
