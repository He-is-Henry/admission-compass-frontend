"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import subjectStore from "@/app/lib/subjectStore";

export default function ExamPage() {
  const [subjectId, setSubjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const loadSubjects = async () => {
      const subjects = await subjectStore.get();
      setSubjects(subjects);
    };
    loadSubjects();
  }, []);
  const handleStart = async () => {
    setLoading(true);
    if (!subjectId) return toast.error("Please select a subject");
    const subject = subjects.find((s) => s._id === subjectId);
    // Simply navigate to session page with subjectId
    router.push(
      `/exam/start?subject=${subjectId}&name=${encodeURIComponent(subject?.name || "")}`,
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Start Exam</h2>
        <p style={styles.sub}>30 questions · 45 minutes</p>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          style={styles.select}
        >
          <option value="">Choose a subject</option>
          {subjects &&
            subjects.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
        </select>
        <button
          onClick={handleStart}
          disabled={loading}
          style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Starting..." : "Start Exam"}
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    minWidth: "320px",
  },
  title: { fontSize: "1.4rem", fontWeight: 700, margin: 0 },
  sub: { fontSize: "0.9rem", color: "#888", margin: 0 },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  button: {
    padding: "12px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
};
