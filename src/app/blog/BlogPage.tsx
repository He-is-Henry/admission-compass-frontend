"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/axios";
import styles from "./BlogPage.module.css";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  readTime: number;
  createdAt: string;
  featuredImage?: string;
}

interface BlogsResponse {
  posts: Blog[];
  hasMore: boolean;
}

const CATEGORIES = [
  "All",
  "Admissions",
  "Career Guidance",
  "Test Prep",
  "University Life",
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPage() {
  const router = useRouter();

  const [posts, setPosts] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchPosts = async (pageNum: number, replace = false) => {
    try {
      if (replace) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const { data }: { data: BlogsResponse } = await api.get(
        `/blog?page=${pageNum}`,
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

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  const featured = posts[0];
  const rest = posts.slice(1);

  const filteredRest =
    activeCategory === "All"
      ? rest
      : rest.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
        );

  return (
    <div className={styles.wrapper}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Blog & Insights</h1>
          <p className={styles.heroSubtitle}>
            Expert advice, admission trends, and strategies to help you succeed
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categoriesBar}>
        <div className={styles.categoriesInner}>
          <div className={styles.categoriesList}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`${styles.categoryBtn} ${
                  activeCategory === category ? styles.categoryBtnActive : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.inner}>
            {loading ? (
              <div className={styles.skeletonFeatured} />
            ) : featured ? (
              <>
                <span className={styles.featuredBadge}>Featured</span>
                <div
                  className={styles.featuredCard}
                  onClick={() => handlePostClick(featured.slug)}
                >
                  <div className={styles.featuredGrid}>
                    <div className={styles.featuredContent}>
                      <span className={styles.categoryTag}>
                        {featured.category}
                      </span>
                      <h2 className={styles.featuredTitle}>{featured.title}</h2>
                      <p className={styles.featuredExcerpt}>
                        {featured.excerpt}
                      </p>
                      <div className={styles.meta}>
                        <span>Admission Compass Team</span>
                        <span>{formatDate(featured.createdAt)}</span>
                        <span>{featured.readTime} min read</span>
                      </div>
                      <button className={styles.readBtn}>Read Article →</button>
                    </div>
                    {featured.featuredImage ? (
                      <img
                        src={featured.featuredImage}
                        alt={featured.title}
                        className={styles.featuredImage}
                      />
                    ) : (
                      <div className={styles.featuredImagePlaceholder} />
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className={styles.postsSection}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <h2 className={styles.postsTitle}>Latest Articles</h2>

            {loading ? (
              <div className={styles.postsGrid}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={styles.skeletonCard} />
                ))}
              </div>
            ) : filteredRest.length === 0 ? (
              <p className={styles.emptyState}>
                No articles in this category yet.
              </p>
            ) : (
              <div className={styles.postsGrid}>
                {filteredRest.map((post) => (
                  <div
                    key={post._id}
                    className={styles.postCard}
                    onClick={() => handlePostClick(post.slug)}
                  >
                    <span className={styles.categoryTag}>{post.category}</span>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                    <div className={styles.postMeta}>
                      <span>Admission Compass Team</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <button className={styles.readMoreBtn}>Read More →</button>
                  </div>
                ))}
              </div>
            )}

            {hasMore && !loading && (
              <div className={styles.loadMoreWrap}>
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className={styles.loadMoreBtn}
                >
                  {loadingMore ? "Loading..." : "Load More Articles"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <h2 className={styles.newsletterTitle}>Stay Updated</h2>
          <p className={styles.newsletterSubtitle}>
            Get the latest admissions insights, cut-off updates, and expert tips
            delivered to your inbox.
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.newsletterInput}
            />
            <button className={styles.newsletterBtn}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
