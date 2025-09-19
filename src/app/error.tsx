// "use client";

// export default function Error({ error, reset }: { error: Error; reset: () => void }) {
//   return (
//     <div>
//       <h2>Something went wrong!</h2>
//       <p>{error.message}</p>
//       <button onClick={() => reset()}>Try again</button>
//     </div>
//   );
// }


"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          ⚠️ Something went wrong!
        </h2>
        <p className="text-gray-700 mb-6 break-words">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
