"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("reference");
    setReference(ref);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Payment Completed</h1>
        <p style={styles.text}>
          Thank you for your payment. We are confirming your transaction.
        </p>

        {reference && (
          <p style={styles.reference}>
            Reference: <strong>{reference}</strong>
          </p>
        )}

        <Link href="/" style={styles.button}>
          Return Home
        </Link>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1E3A8A, #FFFFFF, #1E9965)", // blue → white → green
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    background: "white",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "420px",
    padding: "28px 32px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  title: {
    color: "#1E3A8A",
    fontSize: "28px",
    marginBottom: "12px",
    fontWeight: 700,
  },
  text: {
    fontSize: "16px",
    color: "#093238",
    marginBottom: "16px",
  },
  reference: {
    marginBottom: "24px",
    fontSize: "15px",
    color: "#1E9965",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#1E9965",
    padding: "10px 20px",
    borderRadius: "6px",
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
  },
};
