'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  /**
   * Root margin for the intersection observer
   * @default '50px'
   */
  rootMargin?: string;
  
  /**
   * Threshold for triggering intersection
   * @default 0.1
   */
  threshold?: number;
  
  /**
   * Whether the observer is enabled
   * @default true
   */
  enabled?: boolean;
}

/**
 * Hook to observe when an element enters the viewport using Intersection Observer
 * 
 * @param options - Intersection Observer options
 * @returns Tuple of [ref, isIntersecting] where ref should be attached to the element
 * 
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ rootMargin: '100px' });
 * return <div ref={ref}>{isVisible && <ExpensiveComponent />}</div>;
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [RefObject<HTMLElement>, boolean] {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    enabled = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) {
      return;
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: assume visible if IntersectionObserver is not supported
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, enabled]);

  return [elementRef, isIntersecting];
}

