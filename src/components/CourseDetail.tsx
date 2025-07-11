import Image from "next/image";

interface CourseDetailProps {
  course: {
    title: string;
    full_description: string;
    instructor: {
      name: string;
      bio: string;
      avatar: string;
    };
    level: string;
    duration: string;
    category: string;
    rating: number;
    students_enrolled: number;
    price: number;
    is_free: boolean;
    tags: string[];
    thumbnail: string;
    published_date: string;
  };
}

export default function CourseDetail({ course }: { course: CourseDetailProps["course"] }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Course Title */}
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      {/* Course Thumbnail */}
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-64 object-cover rounded mb-4"
      />

      {/* Full Description */}
      <p className="text-gray-700 mb-6">{course.full_description}</p>

      {/* Instructor Section */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={course.instructor.avatar}
          alt={course.instructor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{course.instructor.name}</h3>
          <p className="text-sm text-gray-600">{course.instructor.bio}</p>
        </div>
      </div>

      {/* Course Info */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-sm text-gray-800">
        <p><strong>Level:</strong> {course.level}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Category:</strong> {course.category}</p>
        <p><strong>Rating:</strong> ⭐ {course.rating}</p>
        <p><strong>Enrolled:</strong> {course.students_enrolled} students</p>
        <p><strong>Price:</strong> {course.is_free ? "Free" : `₹${course.price}`}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {course.tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
