import { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetail from "@/components/CourseDetail";
import { Course } from "@/types/course";

// Fetch course data
async function getCoursesData(): Promise<Course[]> {
  const baseUrl = "http://localhost:3000";
  const res = await fetch(`${baseUrl}/assets/courses.json`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses data");
  }

  return res.json();
}

// Metadata generation
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
    openGraph: {
      title: `${course.title} | LearnHub`,
      description: course.short_description,
      images: [course.thumbnail],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | LearnHub`,
      description: course.short_description,
      images: [course.thumbnail],
    },
  };
}

// Page Component
export default async function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const courses = await getCoursesData();
  const course = courses.find((c) => c.id === params.id);

  if (!course) return notFound();

  return <CourseDetail course={course} />;
}
