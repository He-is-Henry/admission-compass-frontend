import { Metadata } from "next";
import PastQuestions from "./PastQuestions";

export const metadata: Metadata = {
  title: "Unlock and access past questions",
};

export default function page() {
  return <PastQuestions />;
}
