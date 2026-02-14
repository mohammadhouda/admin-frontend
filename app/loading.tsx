"use client";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black"></div>
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  );
}
