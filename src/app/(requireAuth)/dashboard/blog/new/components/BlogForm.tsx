"use client";

import { useState } from "react";
import styles from "./BlogForm.module.css";

const CATEGORIES = [
  "Admissions",
  "Career Guidance",
  "Test Prep",
  "University Life",
];

export interface BlogFormData {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  readTime: string;
  featuredImage: string;
}

interface Props {
  data: BlogFormData;
  onChange: (data: BlogFormData) => void;
}

export default function BlogForm({ data, onChange }: Props) {
  const [mode, setMode] = useState<"form" | "json">("form");
  const [jsonValue, setJsonValue] = useState("");
  const [jsonError, setJsonError] = useState("");

  const update = (field: keyof BlogFormData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleTabSwitch = (next: "form" | "json") => {
    if (next === "json") {
      setJsonValue(JSON.stringify(data, null, 2));
      setJsonError("");
    }
    setMode(next);
  };

  const handleJsonChange = (raw: string) => {
    setJsonValue(raw);
    try {
      const parsed = JSON.parse(raw);
      const updated: BlogFormData = {
        title: parsed.title ?? data.title,
        excerpt: parsed.excerpt ?? data.excerpt,
        slug: parsed.slug ?? data.slug,
        category: parsed.category ?? data.category,
        readTime: String(parsed.readTime ?? data.readTime),
        featuredImage: String(parsed.featuredImage ?? data.featuredImage),
      };
      onChange(updated);
      setJsonError("");
    } catch {
      setJsonError("Invalid JSON");
    }
  };

  return (
    <div className={styles.form}>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${mode === "form" ? styles.tabActive : ""}`}
          onClick={() => handleTabSwitch("form")}
        >
          Form
        </button>
        <button
          type="button"
          className={`${styles.tab} ${mode === "json" ? styles.tabActive : ""}`}
          onClick={() => handleTabSwitch("json")}
        >
          JSON
        </button>
      </div>

      {mode === "json" ? (
        <div className={styles.field}>
          <textarea
            className={`${styles.textarea} ${styles.jsonTextarea}`}
            value={jsonValue}
            onChange={(e) => handleJsonChange(e.target.value)}
            spellCheck={false}
          />
          {jsonError && <span className={styles.error}>{jsonError}</span>}
        </div>
      ) : (
        <>
          {/* Title */}
          <div className={styles.field}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              className={styles.input}
              placeholder="2026 JAMB Cut-Off Marks: What You Need to Know"
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>

          {/* Excerpt */}
          <div className={styles.field}>
            <label className={styles.label}>Excerpt</label>
            <textarea
              className={styles.textarea}
              placeholder="A short summary of the post..."
              value={data.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
            />
          </div>

          {/* Slug + Category */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Slug</label>
              <input
                type="text"
                className={styles.input}
                placeholder="2026-jamb-cut-off-marks"
                value={data.slug}
                onChange={(e) => update("slug", e.target.value)}
              />
              <span className={styles.hint}>
                Used in the URL: /blog/your-slug
              </span>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Category</label>
              <select
                className={styles.select}
                value={data.category}
                onChange={(e) => update("category", e.target.value)}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Read Time */}
          <div className={styles.field}>
            <label className={styles.label}>Read Time (minutes)</label>
            <input
              type="number"
              className={styles.input}
              placeholder="5"
              min={1}
              value={data.readTime}
              onChange={(e) => update("readTime", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Featured Image URL</label>
            <input
              type="text"
              className={styles.input}
              placeholder="https://example.com/image.jpg"
              value={data.featuredImage ?? ""}
              onChange={(e) => update("featuredImage", e.target.value)}
            />
            {data.featuredImage && (
              <img
                src={data.featuredImage}
                alt="Preview"
                className={styles.imagePreview}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
