import React from "react";
import Pay from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make payment for tokens",
};

export default function page() {
  return <Pay />;
}
