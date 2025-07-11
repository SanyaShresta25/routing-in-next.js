import Link from "next/link";

export default function RootPage() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">👋 Welcome to LearnHub</h1>
      <p className="text-gray-600 text-lg mb-6">
        Your gateway to high-quality, developer-friendly courses.
      </p>
      <Link
        href="/home"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Get Started →
      </Link>
    </main>
  );
}
