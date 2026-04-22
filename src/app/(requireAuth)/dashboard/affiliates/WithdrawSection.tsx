"use client";

import { useState } from "react";
import api from "@/app/api/axios";
import toast from "react-hot-toast";

type Props = {
  balance: number;
  hasBank: boolean;
  styles: {
    readonly [key: string]: string;
  };
};

export default function WithdrawSection({ balance, hasBank, styles }: Props) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!hasBank) return toast.error("Add bank account first");
    if (amount < 0) return toast.error("Minimum withdrawal is ₦0");
    if (amount > balance) return toast.error("Insufficient balance");

    setLoading(true);

    try {
      await api.post("/withdrawal", { amount });

      toast.success("Withdrawal initiated");

      setAmount(0);
    } catch {
      toast.error("Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.withdrawCard}>
      <p className={styles.balanceText}>Balance: ₦{balance.toLocaleString()}</p>

      <input
        className={styles.withdrawInput}
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
      />

      <p className={styles.warningText}>₦25 fee applies per withdrawal</p>

      <button
        className={styles.withdrawBtn}
        onClick={handleWithdraw}
        disabled={loading}
      >
        {loading ? "Processing..." : "Withdraw"}
      </button>
    </div>
  );
}
