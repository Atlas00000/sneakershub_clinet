import { QueryClient } from '@tanstack/react-query';

/**
 * QueryClient Configuration
 * 
 * Creates and configures the React Query client with optimal settings
 * for API caching, stale time, and error handling.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes
      staleTime: 1000 * 60 * 5,
      
      // Cache data for 10 minutes
      gcTime: 1000 * 60 * 10,
      
      // Retry failed requests once
      retry: 1,
      
      // Refetch on window focus in development, but not in production
      refetchOnWindowFocus: process.env.NODE_ENV === 'development',
      
      // Don't refetch on mount if data exists
      refetchOnMount: false,
      
      // Don't refetch on reconnect by default
      refetchOnReconnect: false,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});

