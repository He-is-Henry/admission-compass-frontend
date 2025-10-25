"use client";

import useFadeInOnScroll from "./hoooks/UseFadeinOnScroll";
import useSmoothScroll from "./hoooks/UseSmoothScroll";

export default function Hooks() {
  useSmoothScroll(); // enables smooth anchor scrolling
  useFadeInOnScroll(); // activates fade-in animations
  return null;
}
