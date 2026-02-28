import React, { Suspense } from "react";
import { Metadata } from "next";
import ResultClient from "./result.client";

export const metadata: Metadata = {
  title: "Exam Result",
};

export default function page() {
  return (
    <Suspense fallback={<p style={{ textAlign: "center", marginTop: "40vh" }}>Loading result...</p>}>
      <ResultClient />
    </Suspense>
  );
}
