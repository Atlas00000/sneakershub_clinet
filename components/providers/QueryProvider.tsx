'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { queryClient } from '@/lib/queryClient';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * QueryProvider Component
 * 
 * Wraps the app with React Query's QueryClientProvider
 * to enable API caching, background refetching, and more.
 * 
 * Also includes React Query Devtools in development mode.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

