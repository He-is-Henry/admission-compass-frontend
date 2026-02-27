import axios from "../api/axios";

export async function createSubject(
  name: string,
  code: string
): Promise<Subject> {
  const response = await axios.post("/pq", { name, code });
  return response.data;
}

export async function getAllSubjects(): Promise<Subject[]> {
  const response = await axios.get("/pq");
  return response.data;
}
