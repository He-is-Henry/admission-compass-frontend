"use client";
import { useState } from "react";
import axios from "../api/axios";

const Pay = () => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`/pay`, { quantity });
      if (response?.data?.url) {
        window.location.href = response.data.url;
      } else {
        setError("Payment link not received.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to initiate payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Buy Tokens</h2>
        <p style={styles.sub}>Each pack gives you 3 exam tokens</p>

        <div style={styles.row}>
          <button
            style={styles.stepper}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={loading}
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            style={styles.input}
            disabled={loading}
          />
          <button
            style={styles.stepper}
            onClick={() => setQuantity((q) => q + 1)}
            disabled={loading}
          >
            +
          </button>
        </div>

        <p style={styles.summary}>
          {quantity} pack{quantity > 1 ? "s" : ""} → {quantity * 3} tokens → ₦
          {(quantity * 1000).toLocaleString()}
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Pay;

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
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    minWidth: "300px",
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: 700,
    margin: 0,
  },
  sub: {
    fontSize: "0.9rem",
    color: "#888",
    margin: 0,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  stepper: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid #ddd",
    background: "#f5f5f5",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "60px",
    textAlign: "center",
    fontSize: "1.1rem",
    fontWeight: 600,
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "6px",
  },
  summary: {
    fontSize: "0.95rem",
    color: "#444",
    margin: 0,
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  error: {
    color: "crimson",
    fontSize: "0.9rem",
    margin: 0,
  },
};
