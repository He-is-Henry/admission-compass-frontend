import React from "react";
import AddQuestionPage from "./page.client";
import { Metadata } from "next";
import { getAllSubjects } from "@/app/lib/subject";

export const metadata: Metadata = {
  title: "Add questions",
  description: "Add questions to the PQ API",
};

async function loadAllQuestions() {
  const data = await getAllSubjects();
  return data;
}

export default async function page() {
  const subjects = await loadAllQuestions();
  return <AddQuestionPage subjects={subjects} />;
}
