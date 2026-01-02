'use client';

import { useEffect, useRef } from 'react';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import { getStoredModelData, storeModelData, StoredModelData } from '@/lib/storage/localStorage';

/**
 * Hook to persist selected model to localStorage
 * 
 * This hook:
 * - Loads stored model data on mount (if available)
 * - Saves model data to localStorage whenever it changes
 * - Handles SSR safely (client-side only)
 */
export function useModelPersistence() {
  const {
    selectedModelId,
    selectedModelUrl,
    selectedModelScale,
    selectedModelPosition,
    selectedModelRotation,
    setModel,
  } = useConfiguratorStore();

  // Track if we've loaded from storage to avoid overwriting user selections
  const hasLoadedFromStorageRef = useRef(false);
  const isInitialMountRef = useRef(true);

  // Load stored model data on mount (only once)
  useEffect(() => {
    if (hasLoadedFromStorageRef.current) return;
    
    const storedData = getStoredModelData();
    if (storedData && storedData.modelUrl) {
      hasLoadedFromStorageRef.current = true;
      
      // Restore from localStorage (will override defaults)
      const scale = typeof storedData.scale === 'number' ? storedData.scale : storedData.scale[0];
      setModel(
        storedData.modelId || '',
        storedData.modelUrl,
        scale,
        storedData.position,
        storedData.rotation
      );
    }
    
    isInitialMountRef.current = false;
  }, []); // Only run once on mount

  // Save model data to localStorage whenever it changes (but not on initial mount)
  useEffect(() => {
    // Skip saving on initial mount (we just loaded from storage, or using defaults)
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    // Only save if we have a model selected
    if (selectedModelUrl || selectedModelId) {
      const data: StoredModelData = {
        modelId: selectedModelId,
        modelUrl: selectedModelUrl,
        scale: selectedModelScale ?? 1,
        position: selectedModelPosition ?? [0, 0, 0],
        rotation: selectedModelRotation ?? [0, 0, 0],
      };
      
      storeModelData(data);
    }
  }, [
    selectedModelId,
    selectedModelUrl,
    selectedModelScale,
    selectedModelPosition,
    selectedModelRotation,
    setModel,
  ]);
}

