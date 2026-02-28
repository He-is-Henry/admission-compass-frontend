"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ResultClient() {
  const params = useSearchParams();
  const router = useRouter();

  const score = Number(params.get("score"));
  const total = Number(params.get("total"));
  const percentage = Number(params.get("percentage"));

  const getGrade = (p: number) => {
    if (p >= 70) return { label: "Excellent", color: "#4caf50" };
    if (p >= 50) return { label: "Pass", color: "#ff9800" };
    return { label: "Fail", color: "crimson" };
  };

  const grade = getGrade(percentage);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Exam Result</h2>
        <div style={{ ...styles.badge, background: grade.color }}>{grade.label}</div>
        <p style={styles.score}>{score} / {total}</p>
        <p style={{ ...styles.percentage, color: grade.color }}>{percentage}%</p>
        <div style={styles.actions}>
          <button style={styles.btn} onClick={() => router.push("/exam")}>New Exam</button>
          <button style={{ ...styles.btn, background: "#f5f5f5", color: "#000" }} onClick={() => router.push("/dashboard")}>Dashboard</button>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" },
  card: { background: "#fff", borderRadius: "16px", padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", minWidth: "300px" },
  title: { fontSize: "1.3rem", fontWeight: 700, margin: 0 },
  badge: { padding: "6px 20px", borderRadius: "20px", color: "#fff", fontWeight: 600, fontSize: "0.95rem" },
  score: { fontSize: "2.5rem", fontWeight: 700, margin: 0 },
  percentage: { fontSize: "1.2rem", fontWeight: 600, margin: 0 },
  actions: { display: "flex", gap: "12px", marginTop: "8px" },
  btn: { padding: "10px 24px", background: "#000", color: "#fff", border: "none", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer" },
};
