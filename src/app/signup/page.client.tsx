"use client";

import Link from "next/link";
import styles from "./signup.module.css";
import { useState } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      alert(password);
      alert(password.length);
      setError("Password must have at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirm must match");
      return;
    }

    const response = await fetch("https://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) {
      setError("Failed to sign up");
      throw new Error("Failed to sign up");
    }

    const result: User = await response.json();
    console.log(result);
    setSuccess("Account creation successful!");
  };
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>ADMISSION COMPASS</h1>
          <p>Your Shortcut To Admission Success...</p>
        </div>
      </div>

      <main>
        <form onSubmit={handleSignUp}>
          <fieldset>
            <div className={styles.formSection}>
              <div className={styles.formContainer}>
                <div className={styles.formCard}>
                  <div className={styles.formHeader}>
                    <div className={styles.logo}></div>
                    <h2 className={styles.formTitle}>Admission Compass</h2>
                    <p className={styles.formParagraph}>
                      Access smart predictions
                    </p>
                  </div>

                  <div className={styles.formBody}>
                    <label htmlFor="firstName" className={styles.offscreen}>
                      First Name:
                    </label>
                    <div className={styles.inputWrap}>
                      <input
                        className={styles.formInput}
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="Enter your First name"
                      />
                    </div>
                  </div>

                  <div className={styles.formBody}>
                    <label htmlFor="lastName" className={styles.offscreen}>
                      Last Name:
                    </label>
                    <div className={styles.inputWrap}>
                      <input
                        className={styles.formInput}
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Enter your Last name"
                      />
                    </div>
                  </div>

                  <div className={styles.formBody}>
                    <label htmlFor="email" className={styles.offscreen}>
                      Email:
                    </label>
                    <div className={styles.inputWrap}>
                      <input
                        className={styles.formInput}
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your Email"
                      />
                    </div>
                  </div>

                  <div className={styles.formBody}>
                    <label htmlFor="password" className={styles.offscreen}>
                      Password:
                    </label>
                    <div className={styles.inputWrap}>
                      <input
                        className={styles.formInput}
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Create a password"
                      />
                    </div>
                  </div>

                  <div className={styles.formBody}>
                    <label
                      htmlFor="confirmPassword"
                      className={styles.offscreen}
                    >
                      Confirm Password:
                    </label>
                    <div className={styles.inputWrap}>
                      <input
                        className={styles.formInput}
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {success && <p style={{ color: "green" }}>{success}</p>}
                  <button type="submit" className={styles.submitButton}>
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>

        <p className={styles.loginLink}>
          Already have an account?{" "}
          <Link className="link" href="/login">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}
