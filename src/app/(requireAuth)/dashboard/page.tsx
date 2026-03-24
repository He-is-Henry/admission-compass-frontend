import { Metadata } from "next";
import DashboardHome from "./DashboardHome";
import { useAuth } from "@/app/hooks/useAuth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Access your dashboard and check out our features",
};

export default function page() {
  return <DashboardHome />;
}
