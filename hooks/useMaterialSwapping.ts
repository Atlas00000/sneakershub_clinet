'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import { ComponentType, ComponentMap } from '@/types/models';
import { Material } from '@/types/materials';
import { createMaterialFromDefinition } from '@/lib/materialManager';

interface UseMaterialSwappingOptions {
  /**
   * Component map from the loaded model
   */
  componentMap: ComponentMap;
  
  /**
   * Callback when material swap starts
   */
  onSwapStart?: (componentType: ComponentType, material: Material) => void;
  
  /**
   * Callback when material swap completes
   */
  onSwapComplete?: (componentType: ComponentType, material: Material) => void;
  
  /**
   * Callback when material swap fails
   */
  onSwapError?: (componentType: ComponentType, error: Error) => void;
}

/**
 * Hook to handle material swapping on 3D model components
 * Automatically applies materials from the store to the model
 */
export function useMaterialSwapping({
  componentMap,
  onSwapStart,
  onSwapComplete,
  onSwapError,
}: UseMaterialSwappingOptions) {
  const { materialMap } = useConfiguratorStore();
  const appliedMaterialsRef = useRef<Map<ComponentType, Material>>(new Map());
  const materialInstancesRef = useRef<Map<string, THREE.MeshStandardMaterial>>(new Map());

  useEffect(() => {
    // Apply materials to components
    const applyMaterials = async () => {
      for (const [componentType, material] of materialMap.entries()) {
        // Skip if already applied
        if (appliedMaterialsRef.current.get(componentType)?.id === material.id) {
          continue;
        }

        // Get components of this type
        const components = componentMap.get(componentType);
        if (!components || components.length === 0) {
          continue;
        }

        try {
          onSwapStart?.(componentType, material);

          // Create or get material instance
          let threeMaterial: THREE.MeshStandardMaterial;
          const materialKey = `${material.id}-${componentType}`;

          if (materialInstancesRef.current.has(materialKey)) {
            threeMaterial = materialInstancesRef.current.get(materialKey)!;
          } else {
            threeMaterial = await createMaterialFromDefinition(material);
            materialInstancesRef.current.set(materialKey, threeMaterial);
          }

          // Apply material to all meshes of this component type
          const startTime = performance.now();
          for (const componentInfo of components) {
            if (componentInfo.mesh instanceof THREE.Mesh) {
              // Clone material for each mesh to allow independent modifications
              componentInfo.mesh.material = threeMaterial.clone();
            }
          }

          const swapTime = performance.now() - startTime;
          console.log(`Material swap for ${componentType} took ${swapTime.toFixed(2)}ms`);

          // Track applied material
          appliedMaterialsRef.current.set(componentType, material);

          onSwapComplete?.(componentType, material);
        } catch (error) {
          const err = error instanceof Error ? error : new Error('Failed to apply material');
          console.error(`Failed to apply material to ${componentType}:`, err);
          onSwapError?.(componentType, err);
        }
      }

      // Remove materials from components that are no longer in the map
      for (const componentType of appliedMaterialsRef.current.keys()) {
        if (!materialMap.has(componentType)) {
          const components = componentMap.get(componentType);
          if (components) {
            for (const componentInfo of components) {
              if (componentInfo.mesh instanceof THREE.Mesh) {
                // Reset to default material or remove
                componentInfo.mesh.material = new THREE.MeshStandardMaterial({
                  color: 0xcccccc,
                });
              }
            }
          }
          appliedMaterialsRef.current.delete(componentType);
        }
      }
    };

    applyMaterials();
  }, [materialMap, componentMap, onSwapStart, onSwapComplete, onSwapError]);

  // Cleanup function
  useEffect(() => {
    return () => {
      // Dispose materials when component unmounts
      materialInstancesRef.current.forEach((material) => {
        material.dispose();
      });
      materialInstancesRef.current.clear();
    };
  }, []);
}

