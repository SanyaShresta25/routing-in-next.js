import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { Course } from "@/types/course";

// Dynamic import of client component
const ClientCoursePage = dynamic(() => import("./ClientCoursePage"), {
  ssr: false,
});

async function getCoursesData(): Promise<Course[]> {
  const baseUrl = "http://localhost:3000";
  const res = await fetch(`${baseUrl}/assets/courses.json`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch course data");
  return res.json();
}

// ✅ generateMetadata stays here
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const courses = await getCoursesData();
  const course = courses.find((c) => c.id === params.id);

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

export default function CoursePageWrapper() {
  return <ClientCoursePage />;
}
