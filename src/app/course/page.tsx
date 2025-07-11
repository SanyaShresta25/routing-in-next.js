import { Metadata } from "next";
import CourseCard from "@/components/CourseCard";

export const metadata: Metadata = {
  title: "All Courses | LearnHub",
  description: "Browse over 100+ developer-friendly courses on LearnHub.",
};

async function getCourses() {
  const res = await fetch("http://localhost:3000/assets/courses.json", {
    cache: "no-store", // or "force-cache" if data rarely changes
  });
  if (!res.ok) throw new Error("Failed to load courses.");
  return res.json();
}

export default async function CoursePage() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">All Courses ({courses.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}
