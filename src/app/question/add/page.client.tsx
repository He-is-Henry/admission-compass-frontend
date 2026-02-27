"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import QuestionDisplay from "./QuestionDisplay";
import { createQuestions } from "@/app/lib/question";

const makeBlank = (tempId: number): NewQuestion => ({
  text: "",
  options: [],
  correctIndex: 0,
  explanation: undefined,
  image: undefined,
  year: undefined,
  subject: { name: "", _id: "" },
  _tempId: tempId,
});

function AddQuestionPage({ subjects }: { subjects: Subject[] }) {
  const [questions, setQuestions] = useState<NewQuestion[]>([makeBlank(1)]);
  const [nextId, setNextId] = useState(2);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, makeBlank(nextId)]);
    setNextId((prev) => prev + 1);
  };

  const updateQuestion = (tempId: number, updated: NewQuestion) => {
    setQuestions((prev) =>
      prev.map((q) => (q._tempId === tempId ? updated : q)),
    );
  };

  const removeQuestion = (tempId: number) => {
    setQuestions((prev) => prev.filter((q) => q._tempId !== tempId));
  };

  const submitQuestions = async () => {
    try {
      const res = await createQuestions(questions);
      toast.success(res.length + " Questions created");
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        err?.response?.data?.error ||
          err.message ||
          "Failed to upload questions",
      );
    }
  };

  if (!subjects) return <p>Add at least one subject before adding questions</p>;

  return (
    <div>
      {questions.map((q, i) => (
        <QuestionDisplay
          key={q._tempId}
          question={q}
          subjects={subjects}
          onChange={(updated) => updateQuestion(q._tempId, updated)}
          onRemove={() => removeQuestion(q._tempId)}
          displayIndex={i}
        />
      ))}

      <button onClick={addQuestion}>Add Question</button>
      <br />
      <br />
      <button onClick={submitQuestions}>Submit</button>
    </div>
  );
}

export default AddQuestionPage;
