import api from "../api/axios";

export async function createQuestions(questions: NewQuestion[]) {
  const { data }: { data: Promise<Question[]> } = await api.post(
    "/pq/questions",
    questions,
  );
  return data;
}

export async function getAllQuestions() {
  const { data }: { data: Promise<Question[]> } =
    await api.get("/pq/questions");
  return data;
}
export async function updateQuestion(id: string, draft: NewQuestion) {
  const { data }: { data: Promise<Question> } = await api.patch(
    "/pq/questions/" + id,
    draft,
  );
  return data;
}
export async function deleteQuestion(id: string) {
  const { data }: { data: Promise<Question> } = await api.delete(
    "/pq/questions/" + id,
  );
  return data;
}
