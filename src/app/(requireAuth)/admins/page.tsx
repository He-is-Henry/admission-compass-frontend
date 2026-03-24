import RequireAdmin from "../RequireAdmin";
import AdminsPage from "./page.client";

export default function page() {
  return (
    <RequireAdmin>
      <AdminsPage />
    </RequireAdmin>
  );
}
