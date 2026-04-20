"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  readTime: number;
  createdAt: string;
  featuredImage?: string;
}

export interface BlogsResponse {
  posts: Blog[];
  hasMore: boolean;
}

export async function getPosts(page: number): Promise<BlogsResponse> {
  const res = await fetch(`${API_URL}/blog?page=${page}`, {
    next: { tags: ["blog"] },
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");

  return res.json();
}
