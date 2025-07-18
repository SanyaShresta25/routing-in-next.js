// app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/login');
}




// import Link from "next/link";

// export default function RootPage() {
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-black text-center px-6">
//       <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
//         Welcome to <span className="text-gray-300">LearnHub</span>
//       </h1>

//       <p className="text-gray-400 text-lg sm:text-xl max-w-xl mb-8">
//         Your gateway to high-quality, developer-friendly courses. Learn at your own pace with expert guidance.
//       </p>

//       <Link
//         href="/home"
//         className="inline-block bg-gray-100 hover:bg-white text-black font-medium px-8 py-3 rounded-full shadow-lg transition duration-300"
//       >
//         Get Started
//       </Link>
//     </main>
//   );
// }