"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-950 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-xl font-bold tracking-wide">Huddle</h1>

   
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/home" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors duration-200">About</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact</Link>
          <Link href="/course" className="hover:text-blue-400 transition-colors duration-200">Courses</Link>
          <Link href="/blog" className="hover:text-blue-400 transition-colors duration-200">Blog</Link>
        </nav>

        {/* Hamburger Icon */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

 {/* responsive */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 text-sm font-medium bg-gray-900 rounded-lg px-4 py-3">
          <Link href="/home" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Contact</Link>
          <Link href="/course" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Courses</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Blog</Link> 
        </div>
      )}
    </header>
  );
}
