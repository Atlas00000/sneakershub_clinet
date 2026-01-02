'use client';

import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazyImageProps {
  /**
   * Image source URL
   */
  src: string;
  
  /**
   * Alternative text for the image
   */
  alt?: string;
  
  /**
   * CSS className for the image
   */
  className?: string;
  
  /**
   * Placeholder to show while loading
   */
  placeholder?: string;
  
  /**
   * Root margin for Intersection Observer
   * @default '50px'
   */
  rootMargin?: string;
  
  /**
   * Callback when image loads
   */
  onLoad?: () => void;
  
  /**
   * Callback when image fails to load
   */
  onError?: () => void;
  
  /**
   * Whether to enable lazy loading
   * @default true
   */
  lazy?: boolean;
  
  /**
   * Additional props to pass to the img element
   */
  [key: string]: unknown;
}

/**
 * LazyImage Component
 * 
 * Lazy loads images using Intersection Observer.
 * Only starts loading the image when it enters the viewport.
 * 
 * Features:
 * - Intersection Observer for viewport detection
 * - Loading placeholder support
 * - Error handling
 * - Configurable root margin
 */
export default function LazyImage({
  src,
  alt = '',
  className = '',
  placeholder,
  rootMargin = '50px',
  onLoad,
  onError,
  lazy = true,
  ...props
}: LazyImageProps) {
  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin,
    enabled: lazy,
  });
  
  const [imageSrc, setImageSrc] = useState<string>(placeholder || '');
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Start loading when element is visible (if lazy loading is enabled)
  useEffect(() => {
    if (!lazy || isIntersecting) {
      setImageSrc(src);
    }
  }, [src, isIntersecting, lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <img
      ref={ref as React.RefObject<HTMLImageElement>}
      src={imageSrc}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      loading={lazy ? 'lazy' : 'eager'}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
      {...props}
    />
  );
}

