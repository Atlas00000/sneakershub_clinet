'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { disposeObject, disposeResources } from '@/lib/three/disposeUtils';

/**
 * Hook to automatically clean up Three.js resources on unmount
 * 
 * @param objects - Array of Three.js objects to dispose on unmount
 * 
 * @example
 * const meshRef = useRef<THREE.Mesh>();
 * useThreeCleanup([meshRef.current]);
 */
export function useThreeCleanup(
  objects: Array<THREE.Object3D | THREE.BufferGeometry | THREE.Material | THREE.Texture | null | undefined>
): void {
  const objectsRef = useRef(objects);
  
  // Update ref when objects change
  useEffect(() => {
    objectsRef.current = objects;
  }, [objects]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disposeResources(objectsRef.current);
    };
  }, []); // Empty deps - only run on mount/unmount
}

/**
 * Hook to clean up a single Three.js object on unmount
 * 
 * @param object - Three.js object to dispose on unmount
 * 
 * @example
 * const meshRef = useRef<THREE.Mesh>();
 * useThreeCleanupSingle(meshRef.current);
 */
export function useThreeCleanupSingle(
  object: THREE.Object3D | THREE.BufferGeometry | THREE.Material | THREE.Texture | null | undefined
): void {
  useEffect(() => {
    return () => {
      disposeObject(object);
    };
  }, [object]);
}

