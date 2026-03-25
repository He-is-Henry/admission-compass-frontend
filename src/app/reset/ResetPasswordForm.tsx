"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../api/axios";
import { useRateLimit } from "../hooks/UseRateLimit";

type Props = {
  result:
    | { type: "OK"; firstName: string }
    | { type: "RATE_LIMITED"; resetTime: number }
    | { type: "INVALID" };

  token: string;
};

export default function ResetPasswordForm({ result, token }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { trigger } = useRateLimit();

  useEffect(() => {
    if (result.type === "RATE_LIMITED") {
      trigger("password reset", result.resetTime);
    } else if (result.type === "INVALID") {
      const timeout = setTimeout(() => router.push("/?modal=login"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [result, router, trigger]);

  const firstName = result.type === "OK" ? result.firstName : null;

  // Invalid/expired token — show message then redirect
  useEffect(() => {
    if (!firstName) {
      const timeout = setTimeout(() => router.push("/?modal=login"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [firstName, router]);

  const handleSubmit = async () => {
    setError("");

    if (!password || !confirm) return setError("Please fill in both fields.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);
    try {
      await api.post("/reset", { token, password });
      setSuccess(true);
      setTimeout(() => router.push("/?modal=login"), 2500);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };
  // Invalid token state
  if (!firstName) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.iconCircle}>✕</div>
          <h2 style={styles.heading}>Link Expired</h2>
          <p style={styles.sub}>
            This reset link is invalid or has expired. Redirecting you back...
          </p>
          <div style={styles.redirectBar} />
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div
            style={{
              ...styles.iconCircle,
              background: "#e6f4ea",
              color: "#2d7a3a",
            }}
          >
            ✓
          </div>
          <h2 style={styles.heading}>Password Updated</h2>
          <p style={styles.sub}>
            Your password has been reset successfully, {firstName}. Redirecting
            you to login...
          </p>
          <div style={styles.redirectBar} />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <p style={styles.brand}>Admission Compass</p>
        <h2 style={styles.heading}>Hi, {firstName}.</h2>
        <p style={styles.sub}>Choose a new password for your account.</p>

        <div style={styles.field}>
          <label style={styles.label}>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat your password"
            style={styles.input}
          />
        </div>

        {error && (
          <div style={styles.errorBox}>
            <span>⚠ {error}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    background: "#f4f1ec",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    fontFamily: "'DM Sans', sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "4px",
    padding: "48px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
  },
  brand: {
    margin: "0 0 24px",
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: "#c9a96e",
    fontWeight: 500,
  },
  heading: {
    margin: "0 0 8px",
    fontSize: "26px",
    fontWeight: 600,
    color: "#1a1a2e",
    fontFamily: "'Cormorant Garamond', serif",
  },
  sub: {
    margin: "0 0 32px",
    fontSize: "13px",
    color: "#888",
    fontWeight: 300,
    lineHeight: 1.7,
  },
  field: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "11px",
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    color: "#888",
    marginBottom: "8px",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #e8e4dc",
    borderRadius: "3px",
    fontSize: "14px",
    color: "#1a1a2e",
    background: "#faf9f7",
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "'DM Sans', sans-serif",
  },
  errorBox: {
    background: "#fff5f5",
    border: "1px solid #ffd0d0",
    borderRadius: "3px",
    padding: "12px 16px",
    fontSize: "13px",
    color: "#c0392b",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#1a1a2e",
    color: "#e8d5b0",
    border: "none",
    borderRadius: "3px",
    fontSize: "12px",
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
  },
  iconCircle: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#fff0f0",
    color: "#c0392b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    marginBottom: "24px",
  },
  redirectBar: {
    height: "3px",
    background: "linear-gradient(90deg, #c9a96e, #e8d5b0)",
    borderRadius: "2px",
    marginTop: "24px",
    animation: "grow 2.5s linear forwards",
  },
};
