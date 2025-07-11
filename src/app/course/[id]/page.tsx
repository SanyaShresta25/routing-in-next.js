import { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetail from "@/components/CourseDetail";
import { Course } from "@/types/course";
import { headers } from "next/headers";

// Fetch course data
async function getCoursesData(): Promise<Course[]> {
  const headersList = headers();
  const host = headersList.get("host")!;
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/assets/courses.json`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch course data");

  return res.json();
}

//  Metadata generation
export async function generateMetadata(
  context: { params: { id: string } }
): Promise<Metadata> {
  const id = context.params.id;
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

//  Page component
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
