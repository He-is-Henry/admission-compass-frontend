import React from "react";
import Questions from "./page.client";
import { Metadata } from "next";
import { getAllQuestions } from "../../lib/question";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "See All Questions",
};

export default async function page() {
  const questions: Question[] = await getAllQuestions();
  return <Questions questions={questions} />;
}
