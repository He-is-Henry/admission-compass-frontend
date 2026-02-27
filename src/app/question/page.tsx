import React from "react";
import Questions from "./page.client";
import { Metadata } from "next";
import { getAllQuestions } from "../lib/question";
import { getAllSubjects } from "../lib/subject";

export const metadata: Metadata = {
  title: "See All Questions",
};

export default async function page() {
  const questions: Question[] = await getAllQuestions();
  const subjects = await getAllSubjects();
  return <Questions questions={questions} subjects={subjects} />;
}
