'use client';

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Client-side auth check: redirect to /login if not logged in and not on /login
  useEffect(() => {
    if (typeof document !== 'undefined' && pathname !== '/login') {
      const hasToken = document.cookie.split(';').some(c => c.trim().startsWith('token='));
      if (!hasToken) {
        router.replace('/login');
      }
    }
  }, [pathname, router]);

  //  Hide header on login page
  if (pathname === "/login") return null;

  //  Logout handler
  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;';
    localStorage.removeItem('user');
    router.replace('/login');
  };

  return (
    <header className="bg-gray-950 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">Huddle</h1>

        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/home" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors duration-200">About</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact</Link>
          <Link href="/course" className="hover:text-blue-400 transition-colors duration-200">Courses</Link>
          <Link href="/blog" className="hover:text-blue-400 transition-colors duration-200">Blog</Link>
        </nav>

        <button
          onClick={handleLogout}
          className="hidden md:block bg-red-500 font-medium text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

        {/* Hamburger menu icon */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Responsive / Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 text-sm font-medium bg-gray-900 rounded-lg px-4 py-3">
          <Link href="/home" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Contact</Link>
          <Link href="/course" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Courses</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Blog</Link>

          <button
            onClick={() => { setMenuOpen(false); handleLogout(); }}
            className="block w-full text-left text-red-500 mt-2 py-2 hover:text-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}