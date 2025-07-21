

import Header from '@/components/Header';
import type { Metadata } from 'next';
import Image from 'next/image';
import './page.css';

export const metadata: Metadata = {
  title: "About Us | LearnHub",
  description: "Learn more about LearnHub’s mission and the team behind it.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-16 px-6">
        <section className="max-w-6xl mx-auto text-center mb-20">
          <h1 className="text-2xl md:text-4xl font-light text-gray-400 mb-4 font-poppins">
            Reliable, efficient delivery
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-600 mb-6 font-poppins">
            Powered by Technology
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-[15px] leading-relaxed font-poppins">
            Our AI-powered tools use millions of project data points to ensure your project is successful.
          </p>
        </section>

        <section className="relative h-[600px] max-w-[1110px] mx-auto">
          {/* Team Builder (Center Top) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[330px] h-[250px] bg-white rounded-lg p-6 shadow feature-card team-builder-card">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-400 team-builder-border rounded-t" />
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-2 font-poppins">Team Builder</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Scans our talent network to create the optimal team for your project.
                </p>
              </div>
              <div className="flex justify-end">
                <Image src="/images/icon-team-builder.svg" alt="Team Builder" width={64} height={64} />
              </div>
            </div>
          </div>

          {/* Supervisor (Left Middle) */}
          <div className="absolute left-0 top-[130px] w-[330px] h-[250px] bg-white rounded-lg p-6 shadow feature-card supervisor-card">
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 supervisor-border rounded-t" />
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-2 font-poppins">Supervisor</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Monitors activity to identify project roadblocks.
                </p>
              </div>
              <div className="flex justify-end">
                <Image src="/images/icon-supervisor.svg" alt="Supervisor" width={64} height={64} />
              </div>
            </div>
          </div>

          {/* Calculator (Right Middle) */}
          <div className="absolute right-0 top-[130px] w-[330px] h-[250px] bg-white rounded-lg p-6 shadow feature-card calculator-card">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 calculator-border rounded-t" />
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-2 font-poppins">Calculator</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Uses data from past projects to provide better delivery estimates.
                </p>
              </div>
              <div className="flex justify-end">
                <Image src="/images/icon-calculator.svg" alt="Calculator" width={64} height={64} />
              </div>
            </div>
          </div>

          {/* Karma (Bottom Center) */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[330px] h-[250px] bg-white rounded-lg p-6 shadow feature-card karma-card">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-400 karma-border rounded-t" />
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-2 font-poppins">Karma</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Regularly evaluates our talent to ensure quality.
                </p>
              </div>
              <div className="flex justify-end">
                <Image src="/images/icon-karma.svg" alt="Karma" width={64} height={64} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
