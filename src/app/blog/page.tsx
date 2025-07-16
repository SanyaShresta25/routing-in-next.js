import { Metadata } from "next";
import type { Post } from "@/types/post";
export const metadata: Metadata = {
  title: "Blog | LearnHub",
  description: "Read insightful blog posts from LearnHub.",
};



async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      <div className="grid gap-4">
        {posts.map((post: Post) => (
          <div
            key={post.id}
            className="p-4 bg-white shadow rounded hover:bg-gray-100 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
