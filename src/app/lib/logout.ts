import api from "../api/axios";

export default async function handleLogout() {
  const res = await api.post("/logout");
  console.log(res.data);
}
