// /app/exam/session/page.tsx
import React from "react";
import { Metadata } from "next";
import ExamSession from "./page.client";

type Props = {
  searchParams: { subject?: string; name?: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { name } = await searchParams;

  return {
    title: name ? `${name} Exam` : "Start Exam",
    description: name ? `An exam on ${name}` : "Start your exam",
  };
}

export default async function Page({ searchParams }: Props) {
  const { subject } = await searchParams;

  if (!subject) return <p>Please select a subject first.</p>;

  return <ExamSession subject={subject} />;
}
