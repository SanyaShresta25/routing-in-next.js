import { Metadata } from "next";
import CourseDetail from "@/components/CourseDetail";
import { notFound } from "next/navigation";
import type { Course } from "@/types/course"; 

// Fetch course data from public JSON file
async function getCoursesData(): Promise<Course[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(new URL("/assets/courses.json", baseUrl), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses data");
  }

  return res.json();
}

// Generate dynamic metadata per course
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
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
      images: [
        {
          url: course.thumbnail,
          width: 1200,
          height: 630,
          alt: `${course.title} thumbnail`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | LearnHub`,
      description: course.short_description,
      images: [course.thumbnail],
    },
  };
}

// Course detail page
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
