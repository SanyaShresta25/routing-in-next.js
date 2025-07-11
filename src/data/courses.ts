import { Course } from "@/types/course";

export const courses: Course[] = [
  {
    "id": "101",
    "title": "Introduction to Web Development",
    "short_description": "Learn the basics of HTML, CSS, and JavaScript.",
    "full_description": "This course provides a comprehensive introduction to modern web development. You'll learn to build responsive websites from scratch using HTML, CSS, and vanilla JavaScript, while gaining a deep understanding of front-end architecture.",
    "instructor": {
      "name": "Sarah Thompson",
      "bio": "Senior Frontend Developer with 10+ years of experience at leading tech companies.",
      "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "level": "Beginner",
    "category": "Web Development",
    "duration": "6 weeks",
    "price": 0,
    "is_free": true,
    "tags": ["HTML", "CSS", "JavaScript", "Frontend"],
    "rating": 4.7,
    "students_enrolled": 2480,
    "thumbnail": "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "published_date": "2025-05-12"
  },
  {
    "id": "102",
    "title": "Advanced React & State Management",
    "short_description": "Deep dive into React hooks, context, and Redux Toolkit.",
    "full_description": "Take your React skills to the next level with this advanced course. Explore real-world state management, performance optimization, architectural patterns, and building enterprise-grade apps.",
    "instructor": {
      "name": "James Patel",
      "bio": "React specialist and open-source contributor. Built large-scale apps for startups and Fortune 500s.",
      "avatar": "https://images.unsplash.com/photo-1530821232314-604f58821dd4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "level": "Advanced",
    "category": "Frontend Frameworks",
    "duration": "8 weeks",
    "price": 129.99,
    "is_free": false,
    "tags": ["React", "Redux", "Hooks", "Performance"],
    "rating": 4.9,
    "students_enrolled": 1200,
    "thumbnail": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "published_date": "2025-06-01"
  },
  {
    "id": "103",
    "title": "Python for Data Science",
    "short_description": "Master Python, NumPy, Pandas, and data visualization.",
    "full_description": "Learn Python from a data science perspective. This hands-on course covers Python fundamentals, working with datasets, and using libraries like NumPy, Pandas, and Matplotlib for data analysis and visualization.",
    "instructor": {
      "name": "Linda Zhao",
      "bio": "Data Scientist at Google, with a Ph.D. in Statistics and deep knowledge of Python tools.",
      "avatar": "https://images.unsplash.com/photo-1589800221366-5cf066781928?q=80&w=667&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "level": "Intermediate",
    "category": "Data Science",
    "duration": "7 weeks",
    "price": 89.0,
    "is_free": false,
    "tags": ["Python", "Data Science", "Pandas", "Visualization"],
    "rating": 4.8,
    "students_enrolled": 3050,
    "thumbnail": "https://images.unsplash.com/photo-1660616246653-e2c57d1077b9?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "published_date": "2025-04-20"
  },
  {
    "id": "104",
    "title": "Course Title 105",
    "short_description": "A brief overview of what Course 105 offers.",
    "full_description": "Course 105 dives deep into specialized topics including project-based learning and real-world case studies. It includes weekly quizzes, assignments, and interactive sessions with industry professionals.",
    "instructor": {
      "name": "Anisha Shet",
      "bio": "Expert in their field with experience spanning academia and industry. Teaches Course 105.",
      "avatar": "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D"
    },
    "level": "Beginner",
    "category": "Specialization",
    "duration": "4 weeks",
    "price": 0,
    "is_free": true,
    "tags": ["Tag105", "Practical", "Case Studies"],
    "rating": 4.3,
    "students_enrolled": 4150,
    "thumbnail": "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcHV0ZXIlMjBzY2llbmNlfGVufDB8fDB8fHww",
    "published_date": "2025-06-16"
  },
  {
    "id": "105",
    "title": "Course Title 106",
    "short_description": "A brief overview of what Course 106 offers.",
    "full_description": "Course 106 dives deep into specialized topics including project-based learning and real-world case studies. It includes weekly quizzes, assignments, and interactive sessions with industry professionals.",
    "instructor": {
      "name": "Stacy Lee",
      "bio": "Expert in their field with experience spanning academia and industry. Teaches Course 106.",
      "avatar": "https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D"
    },
    "level": "Intermediate",
    "category": "General Skills",
    "duration": "5 weeks",
    "price": 109.99,
    "is_free": false,
    "tags": ["Tag106", "Practical", "Case Studies"],
    "rating": 4.4,
    "students_enrolled": 4180,
    "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    "published_date": "2025-06-17"
  }
]
