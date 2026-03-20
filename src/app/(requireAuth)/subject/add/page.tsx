import React from "react";
import CreateNewSubject from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add a new suject",
};
function page() {
  return <CreateNewSubject />;
}

export default page;
