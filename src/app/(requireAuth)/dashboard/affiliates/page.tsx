import React from "react";
import AffiliatesPage from "./AffiliatesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your affiliates page",
  description:
    "Partner with us and earn a commission on your referrals first payments",
};

export default function page() {
  return <AffiliatesPage />;
}
