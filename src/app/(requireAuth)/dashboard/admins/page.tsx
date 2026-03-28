import { Metadata } from "next";
import RequireAdmin from "../../RequireRole";
import AdminsPage from "./page.client";

export const metadata: Metadata = {
  title: "Admins page",
  description: "See all admins, and add new ones",
};

export default function page() {
  return (
    <RequireAdmin>
      <AdminsPage />
    </RequireAdmin>
  );
}
