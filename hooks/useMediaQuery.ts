'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for media query matching
 * @param query - Media query string (e.g., '(max-width: 768px)')
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener (modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}

/**
 * Hook to detect mobile devices
 * @returns Boolean indicating if the viewport is mobile (< 768px)
 */
export function useMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

/**
 * Hook to detect tablet devices
 * @returns Boolean indicating if the viewport is tablet (768px - 1024px)
 */
export function useTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

/**
 * Hook to detect desktop devices
 * @returns Boolean indicating if the viewport is desktop (>= 1024px)
 */
export function useDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

