import { Metadata } from "next";
import RequireAdmin from "../../RequireRole";
import MessagesPage from "./page.client";

export const metadata: Metadata = {
  title: "Check and reply messages",
};

export default function page() {
  return (
    <RequireAdmin>
      <MessagesPage />
    </RequireAdmin>
  );
}
