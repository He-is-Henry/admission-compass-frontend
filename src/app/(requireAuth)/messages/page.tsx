import RequireAdmin from "../RequireAdmin";
import MessagesPage from "./page.client";



export default function page() {
  return (
    <RequireAdmin>
      <MessagesPage />
    </RequireAdmin>
  );
}
