'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import { ComponentType, ComponentMap } from '@/types/models';
import { Material } from '@/types/materials';
import { createMaterialFromDefinition } from '@/lib/materialManager';
import { mapMeshToComponent } from '@/lib/componentMapper';

interface UseMaterialSwappingOptions {
  /**
   * Component map from the loaded model
   */
  componentMap: ComponentMap;
  
  /**
   * The scene/group object containing all meshes
   * Used to find all meshes of a component type
   */
  scene?: THREE.Object3D | null;
  
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
  scene,
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

          // Find ALL meshes of this component type in the scene
          const startTime = performance.now();
          const matchingMeshes: THREE.Mesh[] = [];

          if (scene) {
            // Traverse the scene to find all meshes matching this component type
            scene.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                const meshComponentType = mapMeshToComponent(child.name);
                if (meshComponentType === componentType) {
                  matchingMeshes.push(child);
                }
              }
            });
          } else {
            // Fallback: use componentMap if scene is not available
            const component = componentMap.get(componentType);
            if (component && component.mesh instanceof THREE.Mesh) {
              matchingMeshes.push(component.mesh);
            }
          }

          // Apply material to ALL matching meshes
          if (matchingMeshes.length > 0) {
            matchingMeshes.forEach((mesh) => {
              // Clone material for each mesh to allow independent modifications
              mesh.material = threeMaterial.clone();
            });
            console.log(`Material swap for ${componentType}: applied to ${matchingMeshes.length} mesh(es)`);
          } else {
            console.warn(`No meshes found for component type: ${componentType}`);
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
          // Find all meshes of this component type and reset them
          const matchingMeshes: THREE.Mesh[] = [];

          if (scene) {
            scene.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                const meshComponentType = mapMeshToComponent(child.name);
                if (meshComponentType === componentType) {
                  matchingMeshes.push(child);
                }
              }
            });
          } else {
            // Fallback: use componentMap
            const componentToRemove = componentMap.get(componentType);
            if (componentToRemove && componentToRemove.mesh instanceof THREE.Mesh) {
              matchingMeshes.push(componentToRemove.mesh);
            }
          }

          // Reset all matching meshes to default material
          matchingMeshes.forEach((mesh) => {
            mesh.material = new THREE.MeshStandardMaterial({
              color: 0xcccccc,
            });
          });

          appliedMaterialsRef.current.delete(componentType);
        }
      }
    };

    applyMaterials();
  }, [materialMap, componentMap, scene, onSwapStart, onSwapComplete, onSwapError]);

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

