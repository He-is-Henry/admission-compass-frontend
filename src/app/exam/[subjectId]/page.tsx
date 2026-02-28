import React from "react";
import { Metadata } from "next";
import ExamSession from "./page.client";

export const metadata: Metadata = {
  title: "Exam",
};

export default async function page() {
  return <ExamSession />;
}
