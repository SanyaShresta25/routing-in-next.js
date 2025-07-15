import { Metadata } from "next";
import { courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard"; 
import type { Course } from "@/types/course";

export const metadata: Metadata = {
  title: "All Courses | LearnHub",
  description: "Browse over 100+ developer-friendly courses on LearnHub.",
};

export default function CoursePage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Courses ({courses.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}
