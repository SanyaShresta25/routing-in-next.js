'use client';
import { useState } from 'react';

export default function HomePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 to-red-500 font-poppins">
      {/* Nav is optional since layout.tsx might already include it */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-white font-bold text-xl">Learn to Code</div>
            <div className="flex space-x-8">
              <a href="/about" className="text-white hover:text-white/80 transition-colors font-medium">About</a>
              <a href="/contact" className="text-white hover:text-white/80 transition-colors font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Section */}
          <div className="text-white text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Learn to code by watching others</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              See how experienced developers solve problems in real-time. 
              Watching scripted tutorials is great, but understanding how 
              developers think is invaluable.
            </p>
          </div>

          {/* Form Section */}
          <div className="w-full max-w-md mx-auto lg:max-w-none">
            <div className="bg-purple-700 text-white text-center py-4 px-6 rounded-lg mb-6 shadow-lg">
              <p className="text-sm md:text-base">
                <span className="font-semibold">Try it free 7 days</span> then $20/mo. thereafter
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-lg space-y-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-md placeholder-gray-900/70 focus:outline-none focus:border-purple-700"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-md placeholder-gray-900/70 focus:outline-none focus:border-purple-700"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-md placeholder-gray-900/70 focus:outline-none focus:border-purple-700"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-md placeholder-gray-900/70 focus:outline-none focus:border-purple-700"
              />
              <button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl uppercase tracking-wide"
              >
                Claim your free trial
              </button>
              <p className="text-center text-sm text-purple-400 leading-relaxed">
                By clicking the button, you are agreeing to our{' '}
                <a href="#" className="text-red-400 font-semibold hover:underline">Terms and Services</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
