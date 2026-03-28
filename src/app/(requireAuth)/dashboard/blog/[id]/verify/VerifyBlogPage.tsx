"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
import RequireRole from "@/app/(requireAuth)/RequireRole";
import styles from "./VerifyBlogPage.module.css";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  content: string;
  verified: boolean;
  createdAt: string;
  imageUrl?: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function VerifyBlog() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/blog/post/${id}`);
        setBlog(data);
      } catch (err: any) {
        toast.error(err?.response?.data?.error || "Failed to fetch post");
        router.push("/dashboard/blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      await api.patch(`/blog/${id}/verify`);
      toast.success("Post verified successfully");
      router.push("/dashboard/blog");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to verify post");
    } finally {
      setVerifying(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!blog) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Review Post</h1>
        <button
          className={styles.backBtn}
          onClick={() => router.push("/dashboard/blog")}
        >
          ← Back
        </button>
      </div>

      <div className={styles.article}>
        <div className={styles.articleHero}>
          <span className={styles.categoryTag}>{blog.category}</span>
          <h2 className={styles.articleTitle}>{blog.title}</h2>
          <p className={styles.articleExcerpt}>{blog.excerpt}</p>
          <div className={styles.meta}>
            <span>Admission Compass Team</span>
            <span className={styles.metaDivider} />
            <span>{formatDate(blog.createdAt)}</span>
            <span className={styles.metaDivider} />
            <span>{blog.readTime} min read</span>
          </div>
          {blog.imageUrl && (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className={styles.heroImage}
            />
          )}
        </div>

        <div className={styles.articleContent}>
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.verifyBtn}
          onClick={handleVerify}
          disabled={verifying || blog.verified}
        >
          {blog.verified
            ? "Already Verified"
            : verifying
              ? "Verifying..."
              : "Verify Post"}
        </button>
      </div>
    </div>
  );
}

export default function VerifyBlogPage() {
  return (
    <RequireRole>
      <VerifyBlog />
    </RequireRole>
  );
}
