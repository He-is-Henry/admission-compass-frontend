import React, { useState } from "react";
import styles from "./ListQuestion.module.css";
import Image from "next/image";
import QuestionForm from "./QuestionForm";
import { updateQuestion, deleteQuestion } from "@/app/lib/question";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type Props = {
  question: Question;
  subjects: Subject[];
  onDeleted: (id: string) => void;
  onUpdated: (updated: Question) => void;
};

const ListQuestion: React.FC<Props> = ({
  question,
  subjects,
  onDeleted,
  onUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Convert Question -> NewQuestion shape for the form
  const [draft, setDraft] = useState<NewQuestion>({
    text: question.text,
    options: question.options,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    image: question.image,
    year: question.year,
    subject: { _id: question.subject._id, name: question.subject.name },
    _tempId: 0,
  });

  const handleSave = async () => {
    try {
      const updated = await updateQuestion(question._id, draft);
      onUpdated(updated);
      setIsEditing(false);
      toast.success("Question updated");
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err?.response?.data?.error || err.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(question._id);
      onDeleted(question._id);
      toast.success("Question deleted");
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err?.response?.data?.error || err.message || "Delete failed");
    }
  };

  if (isEditing) {
    return (
      <div className={styles.questionCard}>
        <QuestionForm
          question={draft}
          subjects={subjects}
          onChange={setDraft}
        />
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.edit}`}
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className={styles.button}
            onClick={() => setIsEditing(false)}
            style={{ background: "#ccc" }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.questionCard}>
      <div className={styles.text}>{question.text}</div>

      <div className={styles.meta}>
        Subject: {question.subject.name} | Year: {question.year || "N/A"}
      </div>

      <ul className={styles.options}>
        {question.options.map((opt, i) => (
          <li
            key={i}
            className={`${styles.option} ${
              i === question.correctIndex ? styles.correct : ""
            }`}
          >
            {opt}
          </li>
        ))}
      </ul>

      {question.explanation && (
        <div className={styles.explanation}>
          <strong>Explanation:</strong> {question.explanation}
        </div>
      )}

      {question.image && (
        <Image
          src={question.image}
          alt="question image"
          width={400}
          height={300}
        />
      )}

      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.edit}`}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className={`${styles.button} ${styles.delete}`}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListQuestion;
