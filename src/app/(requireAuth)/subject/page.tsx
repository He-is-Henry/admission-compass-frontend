import React from "react";
import SubjectsList from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subjects",
};

export default async function page() {
  return <SubjectsList />;
}
