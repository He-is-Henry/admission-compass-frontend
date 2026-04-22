"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type Withdrawal = {
  _id: string;
  amount: number;
  status: "pending" | "success" | "failed";
  createdAt: string;
};

type Props = {
  balance: number;
  hasBank: boolean;
  styles: { readonly [key: string]: string };
  onWithdraw: () => void; // to refresh balance after withdrawal
};

export default function WithdrawSection({
  balance,
  hasBank,
  styles,
  onWithdraw,
}: Props) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Withdrawal[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/withdrawal");
      setHistory(res.data);
    } catch {
      // fail silently — history is non-critical
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleWithdraw = async () => {
    if (!hasBank) return toast.error("Add bank account first");

    const parsed = Number(amount);
    if (!parsed || parsed <= 0) return toast.error("Enter a valid amount");
    if (parsed < 500) return toast.error("Minimum withdrawal is ₦500");
    if (parsed > balance) return toast.error("Insufficient balance");

    setLoading(true);
    try {
      await api.post("/withdrawal", { amount: parsed });
      toast.success("Withdrawal is being processed");
      setAmount("");
      onWithdraw();
      fetchHistory();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Withdraw</h3>

      <div className={styles.withdrawCard}>
        <p className={styles.balanceText}>
          Balance: <strong>₦{balance.toLocaleString()}</strong>
        </p>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            className={styles.withdrawInput}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <button
            className={styles.withdrawBtn}
            onClick={handleWithdraw}
            disabled={loading || !hasBank}
          >
            {loading ? <span className={styles.spinnerDark} /> : "Withdraw"}
          </button>
        </div>

        <p className={styles.warningText}>
          ₦25 fee applies · Minimum ₦500
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Withdrawal history</h3>

        {historyLoading ? (
          <p className={styles.loading}>Loading...</p>
        ) : history.length === 0 ? (
          <p className={styles.empty}>No withdrawals yet.</p>
        ) : (
          <div className={styles.referralList}>
            {history.map((w) => (
              <div key={w._id} className={styles.referralRow}>
                <div>
                  <p className={styles.referralName}>
                    ₦{w.amount.toLocaleString()}
                  </p>
                  <p className={styles.referralUsername}>
                    {new Date(w.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`${styles.badge} ${
                    w.status === "success"
                      ? styles.approved
                      : w.status === "failed"
                        ? styles.rejected
                        : styles.pending
                  }`}
                >
                  {w.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}