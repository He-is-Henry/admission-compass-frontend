"use client";

<<<<<<< HEAD
import useFadeInOnScroll from "./hoooks/UseFadeinOnScroll";
import useSmoothScroll from "./hoooks/UseSmoothScroll";
import { useEffect } from "react";
=======
import useFadeInOnScroll from "./hooks/UseFadeinOnScroll";
import useSmoothScroll from "./hooks/UseSmoothScroll";
>>>>>>> 6daf1e933e8f8dfb0f491582b47fb29d9f375ce0

export default function Hooks() {
  useSmoothScroll(); // enables smooth anchor scrolling
  useFadeInOnScroll(); // activates fade-in animations
  return null;
}

