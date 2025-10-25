import React from "react";
import SignUp from "./page.client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admission compass  - Signup",
  description: "Create a new account",
};

function page() {
  return <SignUp />;
}

export default page;
