"use client";
import Image from "next/image";
import ErrorImage from "@/../public/images/error_id_card.png";

export default function Error({
  error,
  reset,
}: {
  error?: { message: string };
  reset?: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="text-center">


        {/* Error image */}
        <div className="flex justify-center mb-6">
          <Image
            src={ErrorImage}
            alt="Error illustration"
            width={600}
            height={400}
            className="rounded-lg object-cover"
            priority
          />
        </div>

        {/* Error message */}
        <p className="text-gray-600 mb-6 break-words text-sm sm:text-base">
          {error?.message}
        </p>

        {/* Retry button */}
        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-600/60 text-white font-medium rounded-lg hover:bg-blue-700/80 focus:ring-2 focus:ring-red-400 focus:outline-none transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
