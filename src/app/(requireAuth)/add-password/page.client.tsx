"use client";
import { FormEvent, useState } from "react";
import styles from "../dashboard/profile/profile.module.css";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useAuth } from "@/app/hooks/useAuth";

export default function AddPaswordPage() {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPw, setConfirmPw] = useState<string>("");
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwError, setPwError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const handlePasswordSave = async (e: FormEvent) => {
    e.preventDefault();
    setPwError("");

    if (password !== confirmPw) return setPwError("Passwords do not match.");
    if (password.length < 8)
      return setPwError("Password must be at least 8 characters.");

    setLoading(true);
    try {
      await api.post("/password", {
        password,
      });
      toast.success("Password updated");
      setPassword("");
      setConfirmPw("");
      setUser((prev) => {
        if (!prev) return prev;
        return { ...prev, providers: ["email", "email"] };
      });
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setPwError(error?.response?.data?.error ?? "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Add Password</h2>
        <p className={styles.cardDesc}>
          You'll be able to login via Google or Password
        </p>
      </div>
      <form className={styles.cardBody}>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className={styles.inputWrap}>
          <label className={styles.fieldLabel}>Confirm New Password</label>
          <input
            className={`${styles.input} ${pwError && password !== confirmPw ? styles.inputError : ""}`}
            type={showConfirmPw ? "text" : "password"}
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            placeholder="••••••••"
            autoComplete="off"
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowConfirmPw((v) => !v)}
          >
            {showConfirmPw ? "Hide" : "Show"}
          </button>
        </div>
        {pwError && <p className={styles.errorText}>{pwError}</p>}
        <button
          className={styles.btnPrimary}
          onClick={handlePasswordSave}
          disabled={loading}
          style={{ alignSelf: "flex-start" }}
        >
          {loading ? "Updating…" : "Add Password"}
        </button>
      </form>
    </div>
  );
}
