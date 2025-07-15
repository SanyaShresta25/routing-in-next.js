import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CourseDetail from "@/components/CourseDetail";
import { getCourseById } from "@/lib/getCourseById";
import { getCourseMetadata } from "@/lib/getCourseMetadata";
import { courses } from "@/data/courses";


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  
  const id = await Promise.resolve(params.id);
  return getCourseMetadata(id);
}


export async function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}


export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return <CourseDetail course={course} />;
}
