"use client";

import Link from "next/link";

export default function CourseCard({ course }: { course: any }) {
  return (
    <Link
      href={`/course/${course.id}`}
      className="block bg-white shadow rounded p-4 hover:bg-gray-100 transition"
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-40 object-cover rounded mb-2"
      />

      {/* Level badge */}
      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mb-2">
        {course.level}
      </span>

      <h2 className="text-lg font-semibold mb-1">
        {course.id}. {course.title}
      </h2>
      <p className="text-gray-600 text-sm">{course.short_description}</p>
    </Link>
  );
}
