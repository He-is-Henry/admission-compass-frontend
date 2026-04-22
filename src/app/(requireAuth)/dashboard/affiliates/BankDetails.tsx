"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type Bank = {
  bankCode: string;
  accountNumber: string;
  bankName: string;
  accountName: string;
};

type BankRes = { code: string; name: string };

type Props = {
  bankAccount?: Bank;
  onUpdate: () => void;
  styles: {
    readonly [key: string]: string;
  };
};

export default function BankDetails({ bankAccount, onUpdate, styles }: Props) {
  const [banks, setBanks] = useState<BankRes[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cooldown, setCooldown] = useState<number | null>(null);

  const [form, setForm] = useState({
    accountNumber: "",
    bankCode: "",
    bankName: "",
  });

  // ── load banks ──
  useEffect(() => {
    api.get("/withdrawal/banks").then((res) => setBanks(res.data));
  }, []);

  // ── preload form when editing ──
  useEffect(() => {
    if (bankAccount && isEditing) {
      setForm({
        accountNumber: bankAccount.accountNumber,
        bankCode: bankAccount.bankCode,
        bankName: bankAccount.bankName,
      });
    }
  }, [isEditing, bankAccount]);

  // ── submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.patch("/account", form);

      toast.success(res.data.message);

      setIsEditing(false);
      setCooldown(null);

      onUpdate();
    } catch (err) {
      const error = err as AxiosError<{ retryAfter: number; error: string }>;

      if (error.response?.data?.retryAfter) {
        setCooldown(error.response.data.retryAfter);
      }

      toast.error(
        error.response?.data?.error || "Failed to update bank account",
      );
    } finally {
      setLoading(false);
    }
  };

  const isCoolingDown = cooldown !== null;

  // ── VIEW MODE ──
  if (bankAccount?.accountNumber && !isEditing) {
    return (
      <div className={styles.bankCard}>
        <span className={styles.bankLabel}>Bank</span>
        <span className={styles.bankValue}>{bankAccount.bankName}</span>

        <span className={styles.bankLabel}>Account Number</span>
        <span className={styles.bankValue}>{bankAccount.accountNumber}</span>

        <span className={styles.bankLabel}>Account Name</span>
        <span className={styles.bankValue}>{bankAccount.accountName}</span>

        <button
          className={styles.loadMore}
          onClick={() => {
            setIsEditing(true);
            setCooldown(null);
          }}
        >
          Edit
        </button>
      </div>
    );
  }

  // ── FORM MODE (create + edit) ──
  return (
    <form onSubmit={handleSubmit} className={styles.bankForm}>
      <input
        className={styles.input}
        placeholder="Account number"
        value={form.accountNumber}
        onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
      />

      <select
        className={styles.select}
        value={form.bankCode}
        onChange={(e) => {
          const bank = banks.find((b) => b.code === e.target.value) || {
            code: "",
            name: "",
          };

          setForm({
            ...form,
            bankCode: bank.code,
            bankName: bank.name,
          });
        }}
      >
        <option value="">Select bank</option>
        {banks.map((b) => (
          <option key={b.code} value={b.code}>
            {b.name}
          </option>
        ))}
      </select>

      {isCoolingDown && (
        <p className={styles.empty}>
          You can update your bank details again in {cooldown}s
        </p>
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          className={styles.submitBtn}
          disabled={loading || isCoolingDown}
        >
          {loading
            ? "Saving..."
            : isCoolingDown
              ? `Wait ${cooldown}s`
              : "Save Bank Details"}
        </button>

        {bankAccount?.accountNumber && (
          <button
            type="button"
            className={styles.rejectBtn}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
