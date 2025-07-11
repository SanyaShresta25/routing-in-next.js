import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CourseDetail from "@/components/CourseDetail";
import { courses } from "@/data/courses";
import type { Course } from "@/types/course";

// Correctly typed metadata function
export async function generateMetadata(
  props: { params: { id: string } }
): Promise<Metadata> {
  const course = courses.find((c: Course) => c.id === props.params.id);

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

// Correctly typed page component
export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const course = courses.find((c: Course) => c.id === params.id);

  if (!course) return notFound();

  return <CourseDetail course={course} />;
}
