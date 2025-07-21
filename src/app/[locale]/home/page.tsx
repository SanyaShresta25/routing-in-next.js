import Header from '@/components/Header';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Metadata } from "next";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Home | LearnHub",
  description: "Welcome to the LearnHub home page.",
};

export default function Home() {
 
  return (
    <>
      <Header />
      <main className="min-h-screen bg-purple-700 relative overflow-hidden font-poppins">
        <Image
          src="/images/bg-desktop.svg"
          alt="Background pattern"
          fill
          className="object-cover z-0"
          priority
        />

        <div className="relative z-10 px-6 py-8 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="mt-8 mb-8">
            <Image
              src="/images/logo.svg"
              alt="Huddle Logo"
              width={160}
              height={40}
              priority
            />
          </div>

          {/* Hero Section */}
          <section className="flex flex-col-reverse lg:flex-row items-center justify-between mt-8 lg:mt-24 gap-12">
            <div className="flex-1 max-w-2xl">
              <Image
                src="/images/illustration-mockups.svg"
                alt="Community mockups"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="flex-1 text-center lg:text-left max-w-xl">
              <h1 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Build The Community Your Fans Will Love
              </h1>
              <p className="text-white text-lg opacity-90 mb-8 leading-relaxed font-medium">
                Huddle re-imagines the way we build communities. You have a voice, but so does your audience.
                Create connections with your users as you engage in genuine discussion.
              </p>
              <button className="bg-white text-purple-700 hover:text-purple-800 font-semibold px-10 py-3 rounded-full shadow-md hover:shadow-lg transition duration-200">
                Register
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-16 flex justify-center lg:justify-end space-x-4">
            {[Facebook, Twitter, Instagram].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 border border-white rounded-full flex items-center justify-center text-white hover:border-purple-400 hover:text-purple-400 transition-colors duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </footer>
        </div>
      </main>
    </>
  );
}
