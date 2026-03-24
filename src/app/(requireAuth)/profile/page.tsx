import { Metadata } from "next";
import ProfilePage from "./page.client";

export const metadata: Metadata = {
  title: "Your profile",
};

export default function page() {
  return <ProfilePage />;
}
