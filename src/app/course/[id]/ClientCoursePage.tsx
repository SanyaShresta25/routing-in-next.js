
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CourseDetail from '@/components/CourseDetail';
import type { Course } from '@/types/course';

export default function ClientCoursePage() {
  const { id } = useParams() as { id: string };
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch('http://localhost:3000/assets/courses.json', {
          cache: 'no-store',
        });

        if (!res.ok) throw new Error('Failed to fetch course data');

        const data: Course[] = await res.json();
        const foundCourse = data.find((c) => c.id === id);

        if (!foundCourse) {
          setError('Course not found');
        } else {
          setCourse(foundCourse);
        }
      } catch (err) {
        setError('Something went wrong while fetching course data.');
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return null;

  return <CourseDetail course={course} />;
}
