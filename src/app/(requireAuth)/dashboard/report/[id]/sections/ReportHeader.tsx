"use client";

import Image from "next/image";

export default function ReportHeader() {
  return (
    <div
      style={{
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        src="/admissioncompass.jpg"
        alt="Admission Compass"
        width={80}
        height={80}
        priority
      />
    </div>
  );
}
