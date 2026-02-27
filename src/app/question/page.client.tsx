"use client";

import { useState } from "react";
import ListQuestion from "./ListQuestion";

type Props = {
  questions: Question[];
  subjects: Subject[];
};

const Questions = ({ questions: initialQuestions, subjects }: Props) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const handleDeleted = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q._id !== id));
  };

  const handleUpdated = (updated: Question) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === updated._id ? updated : q)),
    );
  };

  if (!questions.length) return <p>Nothing to show</p>;

  return (
    <div>
      {questions.map((q) => (
        <ListQuestion
          key={q._id}
          question={q}
          subjects={subjects}
          onDeleted={handleDeleted}
          onUpdated={handleUpdated}
        />
      ))}
    </div>
  );
};

export default Questions;
