import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./SlugPage.module.css";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  readTime: number;
  content: string;
  createdAt: string;
  featuredImage?: string;
}

interface Props {
  params: { slug: string };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${API_URL}/blog/${slug}`, {
      next: { revalidate: 60 },
    });
    console.log(res);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) {
    return {
      title: "Post Not Found | Admission Compass",
    };
  }
  return {
    title: `${blog.title} | Admission Compass`,
    description: blog.excerpt,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  return (
    <div className={styles.wrapper}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.categoryTag}>{blog.category}</span>
          <h1 className={styles.title}>{blog.title}</h1>
          <p className={styles.excerpt}>{blog.excerpt}</p>
          <div className={styles.meta}>
            <span>Admission Compass Team</span>
            <span className={styles.metaDivider} />
            <span>{formatDate(blog.createdAt)}</span>
            <span className={styles.metaDivider} />
            <span>{blog.readTime} min read</span>
          </div>
          {blog.featuredImage && (
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className={styles.heroImage}
            />
          )}
        </div>
      </section>

      {/* Article */}
      <article className={styles.articleSection}>
        <div className={styles.articleInner}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
          <hr className={styles.divider} />
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
    </div>
  );
}
