"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/axios";
import RequireRole from "../../RequireRole";
import styles from "./DashboardBlogPage.module.css";

interface Blog {
  _id: string;
  title: string;
  category: string;
  readTime: number;
  verified: boolean;
  createdAt: string;
}

interface BlogsResponse {
  posts: Blog[];
  hasMore: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function BlogList() {
  const router = useRouter();

  const [posts, setPosts] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPosts = async (pageNum: number, replace = false) => {
    try {
      if (replace) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const { data }: { data: BlogsResponse } = await api.get(
        `/blog/all?page=${pageNum}`,
      );
      setPosts((prev) => (replace ? data.posts : [...prev, ...data.posts]));
      setHasMore(data.hasMore);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, true);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  const goToEdit = (id: string) => router.push(`/dashboard/blog/${id}/edit`);

  const StatusBadge = ({ verified }: { verified: boolean }) => (
    <span className={verified ? styles.badgeVerified : styles.badgeUnverified}>
      {verified ? "Verified" : "Pending"}
    </span>
  );

  const skeletons = Array.from({ length: 5 });

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Blog Posts</h1>
        <button
          className={styles.newBtn}
          onClick={() => router.push("/dashboard/blog/new")}
        >
          + New Post
        </button>
      </div>

      <div className={styles.tableWrapper}>
        {/* Desktop table */}
        <div className={styles.desktopOnly}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Read Time</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>
                    {skeletons.map((_, i) => (
                      <div key={i} className={styles.skeletonRow} />
                    ))}
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    No blog posts yet.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post._id} onClick={() => goToEdit(post._id)}>
                    <td className={styles.postTitle}>{post.title}</td>
                    <td>
                      <span className={styles.categoryTag}>
                        {post.category}
                      </span>
                    </td>
                    <td>{post.readTime} min</td>
                    <td>
                      <StatusBadge verified={post.verified} />
                    </td>
                    <td className={styles.date}>
                      {formatDate(post.createdAt)}
                    </td>
                    <td>
                      {!post.verified && (
                        <button
                          className={styles.reviewBtn}
                          onClick={(e) => {
                            e.stopPropagation(); // prevent row click going to edit
                            router.push(`/dashboard/blog/${post._id}/verify`);
                          }}
                        >
                          Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className={styles.mobileOnly}>
          {loading ? (
            skeletons.map((_, i) => (
              <div key={i} className={styles.skeletonCard} />
            ))
          ) : posts.length === 0 ? (
            <p className={styles.emptyState}>No blog posts yet.</p>
          ) : (
            <div className={styles.cardList}>
              {posts.map((post) => (
                <div
                  key={post._id}
                  className={styles.card}
                  onClick={() => goToEdit(post._id)}
                >
                  <p className={styles.cardTitle}>{post.title}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.categoryTag}>{post.category}</span>
                    <StatusBadge verified={post.verified} />
                    <span className={styles.cardDate}>
                      {post.readTime} min · {formatDate(post.createdAt)}
                    </span>
                  </div>
                  {!post.verified && (
                    <button
                      className={styles.reviewBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/blog/${post._id}/verify`);
                      }}
                    >
                      Review
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {hasMore && !loading && (
          <div className={styles.loadMoreWrap}>
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className={styles.loadMoreBtn}
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardBlogPage() {
  return (
    <RequireRole roles={["editor"]}>
      <BlogList />
    </RequireRole>
  );
}
