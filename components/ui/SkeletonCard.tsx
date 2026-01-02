'use client';

import Skeleton from './Skeleton';

interface SkeletonCardProps {
  /**
   * Additional className for the card container
   */
  className?: string;
  
  /**
   * Whether to show a header skeleton
   */
  showHeader?: boolean;
  
  /**
   * Whether to show an image skeleton
   */
  showImage?: boolean;
  
  /**
   * Whether to show text lines
   */
  showText?: boolean;
  
  /**
   * Number of text lines
   */
  textLines?: number;
  
  /**
   * Image height
   */
  imageHeight?: string | number;
}

/**
 * SkeletonCard Component
 * 
 * Displays a card-style skeleton loader.
 * Useful for loading states of card components.
 * 
 * @example
 * <SkeletonCard showHeader showImage imageHeight="200px" textLines={3} />
 */
export default function SkeletonCard({
  className = '',
  showHeader = false,
  showImage = false,
  imageHeight = '150px',
  showText = true,
  textLines = 3,
}: SkeletonCardProps) {
  return (
    <div className={`bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 ${className}`}>
      {showHeader && (
        <div className="mb-4">
          <Skeleton variant="rect" width="60%" height={24} />
        </div>
      )}
      
      {showImage && (
        <div className="mb-4">
          <Skeleton variant="rect" width="100%" height={imageHeight} />
        </div>
      )}
      
      {showText && (
        <Skeleton variant="text" lines={textLines} />
      )}
    </div>
  );
}

