// src/app/course/[id]/page.tsx

import { Metadata } from "next";
import dynamic from "next/dynamic";
import type { Course } from "@/types/course";

// ✅ This dynamically loads the client-side component
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

export default function Page() {
  return <ClientCoursePage />;
}
