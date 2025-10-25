"use client";
import styles from "./login.module.css";
import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("https://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });

    if (!response.ok) {
      setError("Failed to sign up");
      throw new Error("Failed to sign up");
    }

    const result: UserLogin = await response.json();
    console.log(result);
  };
  return (
    <>
      <main>
        <div className={styles.formSection}>
          <div className="form-container">
            <form onSubmit={handleLogin}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <Image
                    alt="Logo"
                    className={styles.logo}
                    src="/admissioncompass.jpg"
                    width={300}
                    height={300}
                  />
                  <h2 className={styles.formTitle}>Login</h2>
                  <p className={styles.formParagraph}>
                    Ready To Know Your chances?
                  </p>
                </div>

                <div className={styles.formBody}>
                  <label htmlFor="id" className={styles.offscreen}>
                    Email/Username:
                  </label>
                  <div className={styles.inputWrap}>
                    <span className={styles.inputIcon}></span>
                    <input
                      className={styles.formInput}
                      type="text"
                      id="id"
                      name="id"
                      required
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      placeholder="Enter your email/username"
                    />
                  </div>
                </div>
                <div className={styles.formBody}>
                  <label htmlFor="password" className={styles.offscreen}>
                    Password:
                  </label>
                  <div className={styles.inputWrap}>
                    <span className={styles.inputIcon}></span>
                    <input
                      className={styles.formInput}
                      type="password"
                      id="password"
                      name="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit" className={styles.submitButton}>
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
      <p className={styles.errorMessage}></p>
      <p className={styles.signupLink}>
        Don&apos;t have an account?{" "}
        <Link
          className={styles.link}
          href="signup
        "
        >
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
