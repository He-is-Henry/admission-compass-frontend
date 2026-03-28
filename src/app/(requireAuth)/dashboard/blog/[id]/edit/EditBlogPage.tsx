"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
import RequireRole from "@/app/(requireAuth)/RequireRole";
import BlogForm, { BlogFormData } from "../../new/components/BlogForm";
import RichTextEditor from "../../new/components/RichTextEditor";
import styles from "./EditBlogPage.module.css";

const INITIAL_FORM: BlogFormData = {
  title: "",
  excerpt: "",
  slug: "",
  category: "",
  readTime: "",
  featuredImage: "",
};

function EditBlog() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<BlogFormData>(INITIAL_FORM);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/blog/post/${id}`);
        setForm({
          title: data.title,
          excerpt: data.excerpt,
          slug: data.slug,
          category: data.category,
          readTime: String(data.readTime),
          featuredImage: data.featuredImage,
        });
        setContent(data.content);
      } catch (err: any) {
        toast.error(err?.response?.data?.error || "Failed to fetch post");
        router.push("/dashboard/blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

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
      await api.patch(`/blog/${id}`, {
        ...form,
        readTime: Number(form.readTime),
        featuredImage: form.featuredImage,
        content,
      });
      toast.success("Post updated successfully");
      router.push("/dashboard/blog");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to update post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this post? This cannot be undone.",
      )
    )
      return;
    try {
      setDeleting(true);
      await api.delete(`/blog/${id}`);
      toast.success("Post deleted");
      router.push("/dashboard/blog");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Post</h1>
        <button
          className={styles.backBtn}
          onClick={() => router.push("/dashboard/blog")}
        >
          ← Back
        </button>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Post Details</p>
        <BlogForm data={form} onChange={setForm} />
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Content</p>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.deleteBtn}
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete Post"}
        </button>
        <div className={styles.actionsRight}>
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
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EditBlogPage() {
  return (
    <RequireRole roles={["editor"]}>
      <EditBlog />
    </RequireRole>
  );
}
