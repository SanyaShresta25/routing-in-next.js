'use client';
import Link from 'next/link';


export default function Header() {
  return (
   <header className="bg-gray-950 text-white px-6 py-4 shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <h1 className="text-xl font-bold tracking-wide">Huddle</h1>
    <nav className="flex space-x-6 text-sm font-medium">
      <Link href="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
      <Link href="/about" className="hover:text-blue-400 transition-colors duration-200">About</Link>
      <Link href="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact</Link>
    </nav>
  </div>
</header>

  );
}
