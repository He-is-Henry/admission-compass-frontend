import React from "react";
import LoginPage from "./page.client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admission compass  - Login",
  description: "Login to your account",
};

function page() {
  return <LoginPage />;
}

export default page;
