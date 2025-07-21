'use client';

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('navbar');


  const locale = pathname.split('/')[1] === 'kn' ? 'kn' : 'en';


  useEffect(() => {
    if (typeof document !== 'undefined' && !pathname.includes('/login')) {
      const hasToken = document.cookie.split(';').some(c => c.trim().startsWith('token='));
      if (!hasToken) {
        router.replace(`/${locale}/login`);
      }
    }
  }, [pathname, router, locale]);

  
  if (pathname.includes('/login')) return null;

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;';
    localStorage.removeItem('user');
    router.replace(`/${locale}/login`);
  };


  const currentLocale = locale;
  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
   
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'en' || segments[0] === 'kn') {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = '/' + segments.join('/');
    router.replace(newPath);
  };

  return (
    <header className="bg-gray-950 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">Huddle</h1>

        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href={`/${locale}/home`} className="hover:text-blue-400 transition-colors duration-200">{t('home')}</Link>
          <Link href={`/${locale}/about`} className="hover:text-blue-400 transition-colors duration-200">{t('about')}</Link>
          <Link href={`/${locale}/contact`} className="hover:text-blue-400 transition-colors duration-200">{t('contact')}</Link>
          <Link href={`/${locale}/course`} className="hover:text-blue-400 transition-colors duration-200">{t('courses')}</Link>
          <Link href={`/${locale}/blog`} className="hover:text-blue-400 transition-colors duration-200">{t('blog')}</Link>
        </nav>

        {/* Language Dropdown */}
        <select
          onChange={handleLocaleChange}
          value={currentLocale}
          className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 mx-4"
        >
          <option value="en">English</option>
          <option value="kn">Kannada</option>
        </select>

        <button
          onClick={handleLogout}
          className="hidden md:block bg-red-500 font-medium text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          {t('logout')}
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
          <Link href={`/${locale}/home`} onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">{t('home')}</Link>
          <Link href={`/${locale}/about`} onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">{t('about')}</Link>
          <Link href={`/${locale}/contact`} onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">{t('contact')}</Link>
          <Link href={`/${locale}/course`} onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">{t('courses')}</Link>
          <Link href={`/${locale}/blog`} onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">{t('blog')}</Link>

          <button
            onClick={() => { setMenuOpen(false); handleLogout(); }}
            className="block w-full text-left text-red-500 mt-2 py-2 hover:text-red-400"
          >
            {t('logout')}
          </button>
        </div>
      )}
    </header>
  );
}