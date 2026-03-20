import React from "react";
import Options from "./add/Options";

type Props = {
  question: NewQuestion;
  subjects: Subject[];
  onChange: (updated: NewQuestion) => void;
};

const QuestionForm: React.FC<Props> = ({ question, subjects, onChange }) => {
  const set = <K extends keyof NewQuestion>(field: K, value: NewQuestion[K]) =>
    onChange({ ...question, [field]: value });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <select
        value={question.subject._id}
        onChange={(e) => {
          const selected = subjects.find((s) => s._id === e.target.value);
          if (selected)
            set("subject", { _id: selected._id, name: selected.name });
        }}
      >
        <option value="">Choose a subject</option>
        {subjects.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={question.text}
        onChange={(e) => set("text", e.target.value)}
        placeholder="Enter question text"
      />

      <Options
        options={question.options}
        setOptions={(updater) => {
          const next =
            typeof updater === "function" ? updater(question.options) : updater;
          set("options", next);
        }}
        correctIndex={question.correctIndex}
        setCorrectIndex={(updater) => {
          const next =
            typeof updater === "function"
              ? updater(question.correctIndex)
              : updater;
          set("correctIndex", next);
        }}
      />

      <input
        type="text"
        value={question.explanation ?? ""}
        onChange={(e) => set("explanation", e.target.value || undefined)}
        placeholder="Explanation (optional)"
      />

      <input
        type="text"
        value={question.image ?? ""}
        onChange={(e) => set("image", e.target.value || undefined)}
        placeholder="Image URL (optional)"
      />

      <input
        type="number"
        value={question.year ?? ""}
        onChange={(e) =>
          set("year", e.target.value ? Number(e.target.value) : undefined)
        }
        placeholder="Year (optional)"
      />
    </div>
  );
};

export default QuestionForm;
