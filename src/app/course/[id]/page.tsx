// page.tsx inside /app/course/[id]/
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetail from "@/components/CourseDetail";
import { Course } from "@/types/course";

async function getCoursesData(): Promise<Course[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/assets/courses.json`, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch course data");

  return res.json();
}

export async function generateMetadata(
  context: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await context.params; 
  const courses = await getCoursesData();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return {
      title: "Course Not Found | LearnHub",
      description: "The requested course does not exist.",
    };
  }

  return {
    title: `${course.title} | LearnHub`,
    description: course.short_description,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 

  const courses = await getCoursesData();
  const course = courses.find((c) => c.id === id);

  if (!course) return notFound();

  return <CourseDetail course={course} />;
}

