"use client";

import api from "@/app/api/axios";
import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import styles from "./admins.module.css";
import toast from "react-hot-toast";

type Admin = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
};

type Role = "admin" | "editor";
export default function AdminsPage() {
  const { user } = useAuth();

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<"fetch" | "create" | null>("fetch");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("admin");

  const getAllAdmins = async () => {
    setLoading("fetch");
    try {
      const res = await api.get("/admin");
      setAdmins(res.data);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to fetch admins");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  const demoteUser = async (email: string) => {
    if (!email) return toast.error("Please enter an email");
    try {
      await api.patch("/demote", { email });
      toast.success(`${email} demoted to user`);
      await getAllAdmins();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to demote");
    } finally {
      setLoading(null);
    }
  };

  const makeAdmin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter an email");
    setLoading("create");
    try {
      await api.patch("/promote", { email, role });
      toast.success(`${email} is now an ${role}`);
      setEmail("");
      await getAllAdmins();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to make admin");
    } finally {
      setLoading(null);
    }
  };

  const getInitials = (a: Admin) =>
    `${a.firstName?.charAt(0) ?? ""}${a.lastName?.charAt(0) ?? ""}`.toUpperCase();

  if (!user || user.role !== "admin") return null;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div>
        <h1 className={styles.heading}>Admins</h1>
        <p className={styles.subheading}>Manage administrator accounts</p>
      </div>

      {/* Admin List */}
      {loading === "fetch" ? (
        <div className={styles.emptyState}>Loading admins…</div>
      ) : admins.length === 0 ? (
        <div className={styles.emptyState}>No admins found</div>
      ) : (
        <div className={styles.grid}>
          {admins.map((a) => (
            <div key={a._id} className={styles.adminCard}>
              <div className={styles.avatar}>{getInitials(a)}</div>
              <div className={styles.adminInfo}>
                <p className={styles.adminName}>
                  {a.firstName} {a.lastName}
                </p>
                <p className={styles.adminUsername}>@{a.username}</p>
                <p className={styles.adminUsername}>{a.role}</p>
                <p className={styles.adminEmail}>{a.email}</p>
              </div>
              <button onClick={() => demoteUser(a.email)}>Demote user</button>
            </div>
          ))}
        </div>
      )}

      {/* Promote Form */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Promote User</h2>
          <p className={styles.cardDesc}>
            Grant admin access to an existing user by email
          </p>
        </div>
        <div className={styles.cardBody}>
          <form onSubmit={makeAdmin}>
            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="email">
                  Email Address
                </label>
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  placeholder="user@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="role"></label>
                <select
                  className={styles.input}
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  name="role"
                  id="role"
                >
                  {["admin", "editor"].map((r) => (
                    <option key={r} value={r}>
                      {r.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className={styles.btnPrimary}
                type="submit"
                disabled={loading === "create" || !email}
              >
                {loading === "create" ? "Promoting…" : "Promote"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
