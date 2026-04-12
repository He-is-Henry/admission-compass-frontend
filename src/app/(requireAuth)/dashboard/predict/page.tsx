import { Metadata } from "next";
import PredictionForm from "./page.client";
export const metadata: Metadata = {
  title: "Admission compass  - Predict",
  description: "Check your chances",
};

export default async function PredictionPage() {
  return <PredictionForm />;
}
