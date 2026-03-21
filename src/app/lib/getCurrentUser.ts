import { AxiosError } from "axios";
import api from "../api/axios";

export default async function getCurrentUser() {
  try {
    const response = await api.get("/current");
    const user = response.data;
    console.log(user);
    return user;
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    console.log(err);
  }
}
