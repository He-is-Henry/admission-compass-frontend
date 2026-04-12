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
  expiresAt?: string;
};

export default function DiscountPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState("");
  const [cap, setCap] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Discount | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState<Discount | null>(null);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    if (!editing) return;

    try {
      setSaving(true);

      await api.put(`/discount/${editing._id}`, {
        code: editing.code,
        percentage: Number(editing.percentage),
        cap: Number(editing.cap),
        expiresAt: editing.expiresAt || null,
      });

      toast.success("Discount updated");

      setEditing(null);
      fetchDiscounts();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to update discount");
    } finally {
      setSaving(false);
    }
  };

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

          <input
            className={styles.input}
            type="datetime-local"
            value={expiresAt ? expiresAt.slice(0, 16) : ""}
            onChange={(e) => setExpiresAt(e.target.value)}
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
                <th className={styles.cell}>Expires</th>
              </tr>
            </thead>

            <tbody>
              {discounts.map((d) => (
                <tr key={d._id} className={styles.row}>
                  <td data-label="Code" className={styles.cell}>
                    {d.code}
                  </td>
                  <td data-label="Percentage" className={styles.cell}>
                    {d.percentage}%
                  </td>
                  <td data-label="Cap" className={styles.cell}>
                    {d.cap}
                  </td>
                  <td data-label="Used" className={styles.cell}>
                    {d.used}
                  </td>
                  <td
                    data-label="Expires"
                    className={`${
                      d.expiresAt && new Date(d.expiresAt) < new Date()
                        ? styles.expired
                        : ""
                    } ${styles.cell}`}
                  >
                    {d.expiresAt ? (
                      <span>
                        {new Date(d.expiresAt).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    ) : (
                      <span>Never</span>
                    )}
                  </td>

                  <td data-label="Edit" className={styles.cell}>
                    <button
                      className={styles.editBtn}
                      onClick={() => setEditing(d)}
                    >
                      Edit
                    </button>
                  </td>
                  <td data-label="Delete" className={styles.cell}>
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
                  <td colSpan={7} className={styles.empty}>
                    No discounts created
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Edit Discount</h2>
            <p>Editing &quot;{editing.code}&quot;</p>

            <div className={styles.editForm}>
              <input
                value={editing.code}
                className={styles.input}
                onChange={(e) =>
                  setEditing({ ...editing, code: e.target.value.toUpperCase() })
                }
                placeholder="Code"
              />

              <input
                type="number"
                value={editing.percentage}
                className={styles.input}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    percentage: Number(e.target.value),
                  })
                }
              />

              <input
                type="number"
                className={styles.input}
                value={editing.cap}
                onChange={(e) =>
                  setEditing({ ...editing, cap: Number(e.target.value) })
                }
              />

              <input
                type="datetime-local"
                value={editing.expiresAt ? editing.expiresAt.slice(0, 16) : ""}
                className={styles.input}
                onChange={(e) =>
                  setEditing({ ...editing, expiresAt: e.target.value })
                }
              />
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.button}
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>

              <button
                className={styles.button}
                onClick={handleUpdate}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
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
