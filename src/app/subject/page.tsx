import React from "react";
import SubjectsList from "./page.client";
import { getAllSubjects } from "../lib/subject";

export default async function page() {
  async function loadAllSubjects() {
    const data = await getAllSubjects();
    return data;
  }
  const subjects = await loadAllSubjects();

  return <SubjectsList subjects={subjects} />;
}
