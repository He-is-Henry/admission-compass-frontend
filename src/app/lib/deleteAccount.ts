import api from "../api/axios";

export default async function handleDeleteAccount() {
  const res = await api.delete("/");
  console.log(res.data);
}
