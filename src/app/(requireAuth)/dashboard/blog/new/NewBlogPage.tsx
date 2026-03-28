"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
import RequireRole from "../../../RequireRole";
import BlogForm, { BlogFormData } from "./components/BlogForm";
import RichTextEditor from "./components/RichTextEditor";
import styles from "./NewBlogPage.module.css";

const INITIAL_FORM: BlogFormData = {
  title: "",
  excerpt: "",
  slug: "",
  category: "",
  readTime: "",
  featuredImage: "",
};

function NewBlog() {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormData>(INITIAL_FORM);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.excerpt ||
      !form.slug ||
      !form.category ||
      !form.readTime
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!content || content === "<p></p>") {
      toast.error("Please add some content");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/blog", {
        ...form,
        readTime: Number(form.readTime),
        content,
      });
      toast.success("Post created successfully");
      router.push("/dashboard/blog");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>New Post</h1>
        <button
          className={styles.backBtn}
          onClick={() => router.push("/dashboard/blog")}
        >
          ← Back
        </button>
      </div>

      {/* Fields */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Post Details</p>
        <BlogForm data={form} onChange={setForm} />
      </div>

      {/* Content */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Content</p>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.cancelBtn}
          onClick={() => router.push("/dashboard/blog")}
        >
          Cancel
        </button>
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Publishing..." : "Publish Post"}
        </button>
      </div>
    </div>
  );
}

export default function NewBlogPage() {
  return (
    <RequireRole roles={["editor"]}>
      <NewBlog />
    </RequireRole>
  );
}
