import React from "react";

type Props = {
  question: Question;
  questionIndex: number;
  selectedAnswer: number | null;
  onAnswer: (questionIndex: number, optionIndex: number) => void;
};

const alphabets = ["A", "B", "C", "D", "E", "F"];

const ExamQuestion: React.FC<Props> = ({ question, questionIndex, selectedAnswer, onAnswer }) => {
  return (
    <div style={styles.card}>
      <p style={styles.text}>{question.text}</p>
      <ul style={styles.options}>
        {question.options.map((opt, i) => (
          <li key={i} onClick={() => onAnswer(questionIndex, i)} style={{ ...styles.option, background: selectedAnswer === i ? "#000" : "#f5f5f5", color: selectedAnswer === i ? "#fff" : "#000" }}>
            <span style={styles.letter}>{alphabets[i]}.</span> {opt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamQuestion;

const styles: { [key: string]: React.CSSProperties } = {
  card: { background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  text: { fontSize: "1.05rem", fontWeight: 600, marginBottom: "16px", lineHeight: 1.5 },
  options: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" },
  option: { padding: "12px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.95rem" },
  letter: { fontWeight: 700, marginRight: "6px" },
};
