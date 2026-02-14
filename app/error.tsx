"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}
