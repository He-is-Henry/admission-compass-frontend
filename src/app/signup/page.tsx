import React from "react";
import SignUp from "./page.client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admission compass  - Signup",
  description: "Create a new account",
};

function page() {
  return <div style={{
    width: '100vw',
    backgroundColor: "red"
  }}>
    <SignUp />
  </div>;
}

export default page;
