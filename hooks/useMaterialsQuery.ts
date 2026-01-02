'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { materialsApi, MaterialListResponse, MaterialGenerateResponse } from '@/lib/api/materials';

/**
 * Query Keys
 * Centralized query keys for materials queries
 */
export const materialsQueryKeys = {
  all: ['materials'] as const,
  lists: () => [...materialsQueryKeys.all, 'list'] as const,
  list: () => [...materialsQueryKeys.lists()] as const,
  generates: () => [...materialsQueryKeys.all, 'generate'] as const,
  generate: () => [...materialsQueryKeys.generates()] as const,
  debug: () => [...materialsQueryKeys.all, 'debug'] as const,
};

/**
 * Hook to fetch materials list from API
 * 
 * @param options - React Query options
 * @returns Query result with materials list
 */
export function useMaterialsList(
  options?: Omit<UseQueryOptions<MaterialListResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: materialsQueryKeys.list(),
    queryFn: () => materialsApi.list(),
    ...options,
  });
}

/**
 * Hook to generate materials.json format from R2
 * 
 * @param options - React Query options
 * @returns Query result with generated materials
 */
export function useMaterialsGenerate(
  options?: Omit<UseQueryOptions<MaterialGenerateResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: materialsQueryKeys.generate(),
    queryFn: () => materialsApi.generate(),
    ...options,
  });
}

/**
 * Hook to debug R2 files (disabled by default, enable when needed)
 * 
 * @param options - React Query options
 * @returns Query result with debug info
 */
export function useMaterialsDebug(
  options?: Omit<UseQueryOptions<unknown>, 'queryKey' | 'queryFn'> & { enabled?: boolean }
) {
  return useQuery({
    queryKey: materialsQueryKeys.debug(),
    queryFn: () => materialsApi.debug(),
    enabled: false, // Disabled by default, enable manually when needed
    ...options,
  });
}

