'use client';

import Skeleton from '@/components/ui/Skeleton';
import SkeletonGrid from '@/components/ui/SkeletonGrid';

/**
 * Loading Fallback Component for MaterialLibrary
 * 
 * Displays a skeleton loader that matches the MaterialLibrary layout
 * to provide smooth loading experience
 */
export default function MaterialLibraryLoader() {
  return (
    <div className="space-y-4">
      {/* Search bar skeleton */}
      <div className="px-6 pt-6">
        <Skeleton variant="rect" width="100%" height={40} className="rounded-lg" />
      </div>

      {/* Category filters skeleton */}
      <div className="px-6">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              variant="rect"
              width={80}
              height={32}
              className="rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Materials grid skeleton */}
      <div className="px-6 pb-4">
        <SkeletonGrid
          count={12}
          columns={6}
          variant="circle"
          size={48}
          gap="0.75rem"
        />
      </div>
    </div>
  );
}

