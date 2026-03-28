import type { Metadata } from "next";
import { BlogPage } from "./BlogPage";

export const metadata: Metadata = {
  title: "Blog & Insights | Admission Compass",
  description:
    "Expert advice, admission trends, and strategies to help you navigate Nigerian university admissions.",
};

export default function Page() {
  return <BlogPage />;
}
