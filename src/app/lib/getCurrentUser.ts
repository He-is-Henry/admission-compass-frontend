import { AxiosError } from "axios";
import axios from "../api/axios";

export default async function getCurrentUser() {
  try {
    const response = await axios.get("/current");
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    console.log(err);
  }
}
