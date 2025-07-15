import { courses } from "@/data/courses";

export function getCourseById(id: string) {
  return courses.find((c) => c.id === id);
}
