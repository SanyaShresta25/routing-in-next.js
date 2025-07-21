"use client";

import Header from '@/components/Header';
import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen font-poppins bg-red-400 relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/bg-intro-desktop.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <main className="relative z-10 px-6 pt-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
          {/* Text Block */}
          <section className="text-white text-center lg:text-left">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">
              Learn to code by watching others
            </h1>
            <p className="text-lg opacity-90 font-medium">
              See how experienced developers solve problems in real time. Understanding how developers think is invaluable.
            </p>
          </section>

          {/* Form */}
          <section className="w-full max-w-md mx-auto">
            <div className="bg-purple-700 text-white text-center py-4 px-6 rounded-lg mb-6 shadow-lg text-sm md:text-base">
              <strong>Try it free 7 days</strong> then $20/mo. thereafter
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-lg space-y-4">
              {(["firstName", "lastName", "email", "password"] as const).map((field) => (
                <div key={field} className="relative">
                  <input
                    type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={
                      field === "firstName"
                        ? "First Name"
                        : field === "lastName"
                        ? "Last Name"
                        : field === "email"
                        ? "Email Address"
                        : "Password"
                    }
                    className={`w-full px-4 py-3 border-2 rounded-md font-medium placeholder-gray-900/70 focus:outline-none ${
                      errors[field]
                        ? "border-red-400 pr-12"
                        : "border-purple-300 focus:border-purple-600"
                    }`}
                  />
                  {errors[field] && (
                    <>
                      <Image
                        src="/images/icon-error.svg"
                        alt="Error icon"
                        width={20}
                        height={20}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      />
                      <p className="text-red-500 text-sm italic mt-1 text-right">
                        {errors[field]}
                      </p>
                    </>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:shadow-xl uppercase tracking-wide transition transform hover:-translate-y-1"
              >
                Claim your free trial
              </button>

              <p className="text-xs text-center text-gray-500 mt-2">
                By clicking the button, you agree to our{" "}
                <a href="#" className="text-red-500 font-semibold hover:underline">
                  Terms and Services
                </a>
              </p>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}