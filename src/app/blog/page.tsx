import type { Metadata } from "next";
import BlogPage from "./BlogPage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export const metadata: Metadata = {
  title: "Blog & Insights | Admission Compass",
  description:
    "Expert advice, admission trends, and strategies to help you navigate Nigerian university admissions.",
};

async function getPosts(page: number): Promise<BlogsResponse> {
  const res = await fetch(`${API_URL}/blog?page=${page}`, {
    next: { tags: ["blog"] },
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");

  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page || 1);
  const data = await getPosts(page);

  return <BlogPage initialData={data} currentPage={page} />;
}
