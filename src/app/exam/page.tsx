import React from "react";
import { getAllSubjects } from "@/app/lib/subject";
import ExamPage from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Exam",
};

export default async function page() {
  const subjects = await getAllSubjects();
  return <ExamPage subjects={subjects} />;
}
