import type { Metadata } from "next";
import { getCourseById } from "./getCourseById";

export function getCourseMetadata(id: string): Metadata {
  const course = getCourseById(id);

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
