import React from "react";
import QuestionForm from "../QuestionForm";

type Props = {
  question: NewQuestion;
  subjects: Subject[];
  onChange: (updated: NewQuestion) => void;
  onRemove: () => void;
  displayIndex: number;
};

const QuestionDisplay: React.FC<Props> = ({
  question,
  subjects,
  onChange,
  onRemove,
  displayIndex,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        marginBottom: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span>{displayIndex + 1}.</span>
        <span
          onClick={onRemove}
          style={{ cursor: "pointer", color: "crimson" }}
        >
          X
        </span>
      </div>

      <QuestionForm
        question={question}
        subjects={subjects}
        onChange={onChange}
      />
    </div>
  );
};

export default QuestionDisplay;
