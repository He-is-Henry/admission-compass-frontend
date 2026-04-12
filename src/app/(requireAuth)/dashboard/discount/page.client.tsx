"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import styles from "./page.module.css";
import { AxiosError } from "axios";

type Discount = {
  _id: string;
  code: string;
  percentage: number;
  cap: number;
  used: number;
};

export default function DiscountPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState("");
  const [cap, setCap] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Discount | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchDiscounts = async () => {
    try {
      const res = await api.get("/discount");
      setDiscounts(res.data);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to fetch discounts");
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || !percentage || !cap) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      await api.post("/discount", {
        code,
        percentage: Number(percentage),
        cap: Number(cap),
      });

      toast.success("Discount created");

      setCode("");
      setPercentage("");
      setCap("");

      fetchDiscounts();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to create discount");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      await api.delete(`/discount/${deleteTarget._id}`);

      toast.success("Discount deleted");

      setDeleteTarget(null);
      fetchDiscounts();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to delete discount");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Discount Management</h1>

      {/* Create */}

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Create Discount</h2>

        <form className={styles.form} onSubmit={handleCreate}>
          <input
            className={styles.input}
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <input
            className={styles.input}
            placeholder="Percentage"
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />

          <input
            className={styles.input}
            placeholder="Cap"
            type="number"
            value={cap}
            onChange={(e) => setCap(e.target.value)}
          />

          <button className={styles.button} disabled={loading}>
            {loading ? "Creating..." : "Add"}
          </button>
        </form>
      </div>

      {/* Table */}

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Existing Discounts</h2>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.theadRow}>
                <th className={styles.cell}>Code</th>
                <th className={styles.cell}>Percentage</th>
                <th className={styles.cell}>Cap</th>
                <th className={styles.cell}>Used</th>
                <th className={styles.cell}></th>
              </tr>
            </thead>

            <tbody>
              {discounts.map((d) => (
                <tr key={d._id} className={styles.row}>
                  <td className={styles.cell}>{d.code}</td>
                  <td className={styles.cell}>{d.percentage}%</td>
                  <td className={styles.cell}>{d.cap}</td>
                  <td className={styles.cell}>{d.used}</td>
                  <td className={styles.cell}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => setDeleteTarget(d)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {discounts.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.empty}>
                    No discounts created
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteTarget && (
        <ConfirmModal
          title="Delete Discount"
          description={`Delete code "${deleteTarget.code}"?`}
          confirmLabel="Delete"
          loading={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
