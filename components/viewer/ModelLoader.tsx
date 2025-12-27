'use client';

import { useModelLoader } from '@/hooks/useModelLoader';
import { useComponentIsolation } from '@/hooks/useComponentIsolation';
import { useMemo, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ComponentMap } from '@/types/models';

interface ModelLoaderProps {
  /**
   * Path to the model in Cloudflare R2 (e.g., 'polar_bear.glb')
   * If null, no model will be loaded
   */
  modelPath: string | null;
  
  /**
   * Scale factor for the model (default: 1)
   */
  scale?: number | [number, number, number];
  
  /**
   * Position of the model (default: [0, 0, 0])
   */
  position?: [number, number, number];
  
  /**
   * Rotation of the model in radians (default: [0, 0, 0])
   */
  rotation?: [number, number, number];
  
  /**
   * Enable auto-rotation (default: false)
   */
  autoRotate?: boolean;
  
  /**
   * Callback when model loads successfully
   */
  onLoad?: (componentMap: ComponentMap) => void;
  
  /**
   * Callback when model fails to load
   */
  onError?: (error: Error) => void;
}

/**
 * Component that loads and displays a 3D model from Cloudflare R2
 */
export default function ModelLoader({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  onLoad,
  onError,
}: ModelLoaderProps) {
  const { scene, error, isLoading } = useModelLoader(modelPath);

  // Clone the scene to avoid mutating the original
  const clonedScene = useMemo(() => {
    if (!scene) return null;
    const cloned = scene.clone();
    
    // Calculate bounding box to help with scale debugging
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    console.log('📦 Model Bounding Box Info:');
    console.log(`   Size: ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)}`);
    console.log(`   Center: ${center.x.toFixed(2)}, ${center.y.toFixed(2)}, ${center.z.toFixed(2)}`);
    console.log(`   Largest dimension: ${Math.max(size.x, size.y, size.z).toFixed(2)}`);
    console.log(`   Current scale: ${Array.isArray(scale) ? scale.join(', ') : scale}`);
    console.log(`   Suggested scale (for ~0.4 units): ${(0.4 / Math.max(size.x, size.y, size.z)).toFixed(6)}`);
    
    return cloned;
  }, [scene, scale]);

  // Isolate components from the loaded scene
  const { componentMap, components, error: isolationError } = useComponentIsolation(clonedScene);
  
  // Track if we've already called onLoad to prevent infinite loops
  const hasLoadedRef = useRef(false);
  const previousComponentMapSizeRef = useRef(0);

  // Handle load/error callbacks - only call once when model first loads
  useEffect(() => {
    if (
      clonedScene && 
      !isLoading && 
      componentMap.size > 0 && 
      onLoad &&
      !hasLoadedRef.current &&
      componentMap.size !== previousComponentMapSizeRef.current
    ) {
      hasLoadedRef.current = true;
      previousComponentMapSizeRef.current = componentMap.size;
      onLoad(componentMap);
    }
  }, [clonedScene, isLoading, componentMap.size, onLoad]);
  
  // Reset load flag when scene changes
  useEffect(() => {
    if (!clonedScene) {
      hasLoadedRef.current = false;
      previousComponentMapSizeRef.current = 0;
    }
  }, [clonedScene]);

  useEffect(() => {
    const finalError = error || isolationError;
    if (finalError && onError) {
      onError(finalError);
    }
  }, [error, isolationError, onError]);

  // Auto-rotate the model (optional)
  useFrame((state, delta) => {
    if (clonedScene && autoRotate) {
      clonedScene.rotation.y += delta * 0.2; // Slow rotation
    }
  });

  // Log errors to console for debugging
  useEffect(() => {
    if (error) {
      console.error('ModelLoader error:', error);
    }
  }, [error]);

  if (error) {
    // Return null on error - error UI can be handled by parent component
    return null;
  }

  if (!modelPath || !clonedScene) {
    return null;
  }

  return (
    <primitive
      object={clonedScene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

