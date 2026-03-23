import React from "react";
import AddQuestionPage from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add questions",
  description: "Add questions to the PQ API",
};


export default async function page() {
  return <AddQuestionPage  />;
}
