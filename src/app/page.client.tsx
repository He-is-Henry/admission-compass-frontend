"use client";

import useFadeInOnScroll from "./hooks/UseFadeinOnScroll";
import useSmoothScroll from "./hooks/UseSmoothScroll";

export default function Hooks() {
  useSmoothScroll(); // enables smooth anchor scrolling
  useFadeInOnScroll(); // activates fade-in animations
  return null;
}
