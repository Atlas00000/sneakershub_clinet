'use client';

import Skeleton from './Skeleton';

interface SkeletonGridProps {
  /**
   * Number of items to display
   */
  count?: number;
  
  /**
   * Number of columns
   */
  columns?: number;
  
  /**
   * Variant of skeleton items
   */
  variant?: 'rect' | 'circle';
  
  /**
   * Size of each skeleton item (for circle: diameter, for rect: width/height)
   */
  size?: number;
  
  /**
   * Gap between items
   */
  gap?: string;
  
  /**
   * Additional className for the grid container
   */
  className?: string;
}

/**
 * SkeletonGrid Component
 * 
 * Displays a grid of skeleton loaders.
 * Useful for loading states of grid layouts (material swatches, thumbnails, etc.)
 * 
 * @example
 * <SkeletonGrid count={12} columns={6} variant="circle" size={48} />
 */
export default function SkeletonGrid({
  count = 12,
  columns = 6,
  variant = 'circle',
  size = 48,
  gap = '0.75rem',
  className = '',
}: SkeletonGridProps) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          width={size}
          height={size}
        />
      ))}
    </div>
  );
}

