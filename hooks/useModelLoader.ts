'use client';

import { useGLTF } from '@react-three/drei';
import { useMemo, useEffect, useState } from 'react';
import { getModelUrl } from '@/lib/cloudflare/r2Client';
import * as THREE from 'three';

interface UseModelLoaderResult {
  scene: THREE.Group | null;
  error: Error | null;
  isLoading: boolean;
}

/**
 * Hook to load a 3D model from Cloudflare R2
 * 
 * @param modelPath - Path to the model in R2 (e.g., 'polar_bear.glb')
 * @returns The loaded GLTF scene, loading state, and error
 */
export function useModelLoader(modelPath: string | null): UseModelLoaderResult {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const modelUrl = useMemo(() => {
    if (!modelPath) return null;
    
    // Check if modelPath is already a full URL
    if (modelPath.startsWith('http://') || modelPath.startsWith('https://')) {
      return modelPath;
    }
    
    // Otherwise, treat it as a relative path and get the full URL
    const url = getModelUrl(modelPath);
    if (!url) {
      setError(new Error('R2 public URL is not configured'));
      return null;
    }
    return url;
  }, [modelPath]);

  // useGLTF must be called unconditionally (React hook rules)
  // Pass a placeholder data URL that won't trigger a fetch when modelUrl is null
  const placeholderUrl = 'data:application/octet-stream;base64,';
  const gltfResult = useGLTF(modelUrl || placeholderUrl, !!modelUrl);
  const { scene } = gltfResult;

  useEffect(() => {
    if (modelUrl) {
      setIsLoading(true);
      setError(null);
    }
  }, [modelUrl]);

  useEffect(() => {
    if (scene && modelUrl) {
      setIsLoading(false);
    }
  }, [scene, modelUrl]);

  return {
    scene: modelUrl && scene ? scene : null,
    error,
    isLoading,
  };
}
