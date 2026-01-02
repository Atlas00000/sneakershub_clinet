'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  /**
   * CSS className for additional styling
   */
  className?: string;
  
  /**
   * Variant of skeleton
   */
  variant?: 'rect' | 'circle' | 'text';
  
  /**
   * Width (can be CSS value like '100%', '200px', etc.)
   */
  width?: string | number;
  
  /**
   * Height (can be CSS value like '100%', '200px', etc.)
   */
  height?: string | number;
  
  /**
   * Number of lines for text variant
   */
  lines?: number;
  
  /**
   * Whether to animate the skeleton
   */
  animate?: boolean;
}

/**
 * Skeleton Component
 * 
 * Displays a loading placeholder with shimmer animation.
 * Used to indicate content is loading and improve perceived performance.
 * 
 * @example
 * <Skeleton variant="rect" width="100%" height="200px" />
 * <Skeleton variant="circle" width={50} height={50} />
 * <Skeleton variant="text" lines={3} />
 */
export default function Skeleton({
  className,
  variant = 'rect',
  width,
  height,
  lines = 1,
  animate = true,
}: SkeletonProps) {
  const baseClasses = 'bg-slate-800/50 rounded';
  const animationClasses = animate ? 'animate-pulse' : '';

  const style: React.CSSProperties = {};
  if (width !== undefined) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  if (variant === 'circle') {
    return (
      <div
        className={cn(
          baseClasses,
          animationClasses,
          'rounded-full',
          className
        )}
        style={style}
      />
    );
  }

  if (variant === 'text') {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              animationClasses,
              'h-4',
              index === lines - 1 ? 'w-3/4' : 'w-full'
            )}
          />
        ))}
      </div>
    );
  }

  // Default: rect
  return (
    <div
      className={cn(baseClasses, animationClasses, className)}
      style={style}
    />
  );
}
