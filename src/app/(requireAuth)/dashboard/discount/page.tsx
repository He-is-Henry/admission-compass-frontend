import RequireRole from "../../RequireRole";
import DiscountPage from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discount Management",
  description: "Admin discount codes dashboard",
};

export default function Page() {
  return (
    <RequireRole>
      <DiscountPage />
    </RequireRole>
  );
}
