'use client';

/**
 * Loading spinner component for 3D model loading
 */
export default function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm">Loading 3D model...</p>
      </div>
    </div>
  );
}

