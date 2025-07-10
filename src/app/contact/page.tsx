'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name cannot be empty';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name cannot be empty';
    if (!formData.email.trim()) newErrors.email = 'Email cannot be empty';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Looks like this is not an email';
    if (!formData.password.trim()) newErrors.password = 'Password cannot be empty';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Contact form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen font-poppins text-base bg-red-400 relative overflow-hidden">
     
      <div className="absolute inset-0 z-0 bg-intro-desktop bg-no-repeat bg-cover bg-center"></div>

      
      <div className="relative z-10">
 
        <main className="pt-24 px-4 lg:px-16 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
          <section className="text-white text-center lg:text-left">
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
              Learn to code by watching others
            </h1>
            <p className="text-base lg:text-lg font-medium opacity-90">
              See how experienced developers solve problems in real-time. Watching scripted tutorials is great,
              but understanding how developers think is invaluable.
            </p>
          </section>

          {/* Form  */}
          <section className="w-full max-w-md mx-auto">
            <div className="bg-purple-700 text-white text-center py-4 px-6 rounded-lg mb-6 shadow-lg text-sm md:text-base">
              <span className="font-semibold">Try it free 7 days</span> then $20/mo. thereafter
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-lg space-y-4">
              {(['firstName', 'lastName', 'email', 'password'] as const).map((field) => (
                <div key={field} className="relative">
                  <input
                    type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={
                      field === 'firstName'
                        ? 'First Name'
                        : field === 'lastName'
                        ? 'Last Name'
                        : field === 'email'
                        ? 'Email Address'
                        : 'Password'
                    }
                    className={`w-full px-4 py-3 border-2 rounded-md font-medium placeholder-gray-900/70 transition-all focus:outline-none ${
                      errors[field]
                        ? 'border-red-400 pr-12'
                        : 'border-purple-350/50 focus:border-purple-700'
                    }`}
                  />
                  {errors[field] && (
                    <>
                      <Image
                        src="/images/icon-error.svg"
                        alt="Error"
                        width={20}
                        height={20}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      />
                      <p className="text-red-400 text-sm italic text-right mt-1">{errors[field]}</p>
                    </>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl uppercase tracking-wide"
              >
                Claim your free trial
              </button>
              <p className="text-center text-xs text-purple-350 leading-relaxed">
                By clicking the button, you are agreeing to our{' '}
                <a href="#" className="text-red-400 font-semibold hover:underline">
                  Terms and Services
                </a>
              </p>
            </form>
          </section>
        </main>
      </div>

      {/* Responsive */}
      <style jsx>{`
        .bg-intro-desktop {
          background-image: url('/images/bg-intro-desktop.png');
        }
        @media (max-width: 768px) {
          .bg-intro-desktop {
            background-image: url('/images/bg-intro-mobile.png');
          }
        }
      `}</style>
    </div>
  );
}
