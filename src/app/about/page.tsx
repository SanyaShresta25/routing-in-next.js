'use client';

import Image from 'next/image';
import './page.css';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-[1110px] mx-auto">
        <div className="text-center mb-20 mt-10">
          <h1 className="text-2xl md:text-4xl font-extralight text-grey-400 mb-4 font-poppins">
            Reliable, efficient delivery
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-grey-500 mb-6 font-poppins">
            Powered by Technology
          </h2>
          <p className="text-grey-400 max-w-2xl mx-auto leading-relaxed font-poppins text-[15px]">
            Our Artificial Intelligence powered tools use millions of project data points to ensure that your project is successful
          </p>
        </div>

        <div className="relative h-[600px] mx-auto">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-[330px] h-[250px] bg-white rounded-lg p-6 feature-card team-builder-card">
            <div className="absolute top-0 left-0 w-full h-1 team-builder-border"></div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-grey-500 mb-2 font-poppins">Team Builder</h3>
                <p className="text-grey-400 text-[15px] leading-relaxed font-poppins">
                  Scans our talent network to create the optimal team for your project
                </p>
              </div>
              <div className="flex justify-end">
                <Image src="/images/icon-team-builder.svg" alt="Team Builder" width={64} height={64} />
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-[130px] w-[330px] h-[250px] bg-white rounded-lg p-6 feature-card supervisor-card">
            <div className="absolute top-0 left-0 w-full h-1 supervisor-border"></div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-grey-500 mb-2 font-poppins">Supervisor</h3>
                <p className="text-grey-400 text-[15px] leading-relaxed font-poppins">
                  Monitors activity to identify project roadblocks
                </p>
              </div>
              <div className="flex justify-end">
                <Image src="/images/icon-supervisor.svg" alt="Supervisor" width={64} height={64} />
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-[130px] w-[330px] h-[250px] bg-white rounded-lg p-6 feature-card calculator-card">
            <div className="absolute top-0 left-0 w-full h-1 calculator-border"></div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-grey-500 mb-2 font-poppins">Calculator</h3>
                <p className="text-grey-400 text-[15px] leading-relaxed font-poppins">
                  Uses data from past projects to provide better delivery estimates
                </p>
              </div>
              <div className="flex justify-end">
                <Image src="/images/icon-calculator.svg" alt="Calculator" width={64} height={64} />
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-[330px] h-[250px] bg-white rounded-lg p-6 feature-card karma-card">
            <div className="absolute top-0 left-0 w-full h-1 karma-border"></div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-grey-500 mb-2 font-poppins">Karma</h3>
                <p className="text-grey-400 text-[15px] leading-relaxed font-poppins">
                  Regularly evaluates our talent to ensure quality
                </p>
              </div>
              <div className="flex justify-end">
                <Image src="/images/icon-karma.svg" alt="Karma" width={64} height={64} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
