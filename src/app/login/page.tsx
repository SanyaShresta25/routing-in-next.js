'use client';

import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for token cookie
    if (typeof document !== 'undefined') {
      const hasToken = document.cookie.split(';').some(c => c.trim().startsWith('token='));
      if (hasToken) {
        router.replace('/home');
      }
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log("status:", res.status);      
    console.log("response:", data);          

    if (res.ok && (data.token || data.accessToken)) {
      const token = data.token || data.accessToken;
      document.cookie = `token=${token}; path=/`;
      router.push('/home');
    } else {
      setError('Invalid credentials');
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md bg-gray-900 text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login to Huddle</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-300">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="emilys"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="emilyspass"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded font-semibold"
            >
              Login
            </button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}