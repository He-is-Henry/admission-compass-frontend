import api from "../api/axios";

export async function createSubject(
  name: string,
  code: string,
): Promise<Subject> {
  const response = await api.post("/pq", { name, code });
  return response.data;
}

export async function getAllSubjects(): Promise<Subject[]> {
  const response = await api.get("/pq");
  return response.data;
}
