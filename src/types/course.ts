// types/course.ts

export interface Instructor {
  name: string;
  bio: string;
  avatar: string; 
}
export interface Course {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  thumbnail: string;
  level: string;
  duration: string;
  category: string;
  rating: number;
  students_enrolled: number;
  price: number;
  is_free: boolean;
  tags: string[];
  published_date: string;
  instructor: {
    name: string;
    bio: string;
    avatar: string;
  };
}
