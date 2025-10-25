"use client";
import { useState } from "react";
import styles from "./modal.module.css";

export default function LoginModal() {
  const [close, setClose] = useState(false);
  if (close) return null;
  return (
    <div
      id="loginModal"
      className={`${styles.overlay} hidden`}
      role="dialog"
      aria-labelledby="loginTitle"
      aria-modal="true"
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close login modal"
          onClick={() => setClose(true)}
          // todo: connect to closeModal('loginModal')
        >
          ✕
        </button>

        <div className={styles.header}>
          <h2 id="loginTitle">Welcome back</h2>
          <p>Sign in to continue your journey</p>
        </div>

        <form className={styles.form}>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />

          <div className={styles.options}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className={styles.primaryBtn}>
            Login
          </button>

          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          <div className={styles.socialGrid}>
            <button type="button" aria-label="Login with Google">
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92..."
                />
              </svg>
            </button>
            <button type="button" aria-label="Login with Apple">
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47..."
                />
              </svg>
            </button>
            <button type="button" aria-label="Login with Facebook">
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M24 12.073c0-6.627-5.373-12-12-12..."
                />
              </svg>
            </button>
          </div>

          <p className={styles.footerText}>
            New here?{" "}
            <button
              type="button"
              className={styles.link}
              // todo: connect to showSignup()
            >
              Create an account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

// todo: Add fade-in/out toggle logic, handle login request, and OAuth click events
