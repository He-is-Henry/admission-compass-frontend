"use client";
import React, { useState } from "react";
import { createSubject } from "../../lib/subject";
import styles from "./subject.module.css";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
const CreateNewSubject: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createSubject(name, code);
      toast.success("Subject created successfully!");
      setName("");
      setCode("");
      router.push("/subject");
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message =
        err?.response?.data?.error || err?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCreate}>
        <h2 className={styles.title}>Create Subject</h2>

        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subject Name"
          required
        />

        <input
          className={styles.input}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Subject Code"
          required
        />

        <button className={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Create Subject"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewSubject;
