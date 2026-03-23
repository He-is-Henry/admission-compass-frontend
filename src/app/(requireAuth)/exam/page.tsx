import React from "react";
import ExamPage from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Exam",
};

export default async function page() {
  return <ExamPage />;
}
