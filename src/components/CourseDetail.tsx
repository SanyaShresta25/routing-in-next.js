import Image from "next/image";
import type { Course } from "@/types/course"; 

export default function CourseDetail({ course }: { course: Course }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <div className="w-full h-64 relative mb-4 rounded overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={`${course.title} course thumbnail`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      <p className="text-gray-700 mb-6">{course.full_description}</p>

      <div className="flex items-center gap-4 mb-6">
        <Image
          src={course.instructor.avatar}
          alt={course.instructor.name}
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{course.instructor.name}</h3>
          <p className="text-sm text-gray-600">{course.instructor.bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-sm text-gray-800">
        <p><strong>Level:</strong> {course.level}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Category:</strong> {course.category}</p>
        <p><strong>Rating:</strong> ⭐ {course.rating}</p>
        <p><strong>Enrolled:</strong> {course.students_enrolled} students</p>
        <p><strong>Price:</strong> {course.is_free ? "Free" : `₹${course.price}`}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {course.tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 text-xs rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
