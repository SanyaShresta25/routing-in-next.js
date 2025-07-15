'use client';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-purple-700">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6"></div>

      <h2 className="text-2xl font-semibold animate-pulse">
        Just a moment, we&apos;re loading your content...
      </h2>
    </div>
  );
}
