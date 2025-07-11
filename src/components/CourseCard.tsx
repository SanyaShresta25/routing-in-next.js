import Link from "next/link";
import { Course } from "@/types/course";
import Image from "next/image";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/course/${course.id}`} className="block bg-white shadow rounded p-4 hover:bg-gray-50">
      <Image
        src={course.thumbnail}
        alt={course.title}
        width={400}
        height={200}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{course.title}</h2>
      <p className="text-gray-600">{course.short_description}</p>
    </Link>
  );
}
