import { Metadata } from "next";
import Support from "./page.client";
export const metadata: Metadata = {
  title: "Contact Support",
  description: "Contact admission compass for any issues or complaint",
};

export default async function page() {
  return <Support />;
}
