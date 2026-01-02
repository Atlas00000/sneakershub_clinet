'use client';

import { useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { ComponentInfo, ComponentType, ComponentMap } from '@/types/models';
import {
  extractComponentsFromObject,
  createComponentMap,
} from '@/lib/componentMapper';

interface UseComponentIsolationResult {
  components: ComponentInfo[];
  componentMap: ComponentMap;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to isolate and identify components from a loaded 3D model
 * 
 * @param scene - The loaded Three.js scene/group
 * @returns Component information and map
 */
export function useComponentIsolation(
  scene: THREE.Group | null
): UseComponentIsolationResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Extract components - pure computation
  const { components, componentMap } = useMemo(() => {
    if (!scene) {
      return {
        components: [],
        componentMap: new Map<ComponentType, ComponentInfo>(),
      };
    }

    try {
      // Extract all meshes as components
      const extractedComponents = extractComponentsFromObject(scene);

      // Create a map grouped by component type
      const map = createComponentMap(extractedComponents);

      return {
        components: extractedComponents,
        componentMap: map,
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to isolate components');
      return {
        components: [],
        componentMap: new Map<ComponentType, ComponentInfo>(),
      };
    }
  }, [scene]);

  // Handle loading and error states separately
  useEffect(() => {
    if (scene) {
      setIsLoading(true);
      setError(null);
    } else {
      setIsLoading(false);
    }
  }, [scene]);

  useEffect(() => {
    if (components.length > 0) {
      setIsLoading(false);
    }
  }, [components.length]);

  // Log component information for debugging
  useEffect(() => {
    if (components.length > 0) {
      console.log('=== COMPONENT DETECTION SUMMARY ===');
      console.log(`Total meshes found: ${components.length}`);
      
      // Show all mesh names clearly
      console.log('\n📋 All Mesh Names:');
      components.forEach((c, index) => {
        console.log(`  ${index + 1}. "${c.name}" → Detected as: ${c.type}`);
      });
      
      // Group by component type
      const groupedByType = new Map<ComponentType, ComponentInfo[]>();
      components.forEach(c => {
        const existing = groupedByType.get(c.type) || [];
        existing.push(c);
        groupedByType.set(c.type, existing);
      });
      
      console.log('\n📊 Components by type:');
      Array.from(groupedByType.entries()).forEach(([type, comps]) => {
        console.log(`  ${type}: ${comps.length} mesh(es) - ${comps.map(c => c.name).join(', ')}`);
      });
      
      const selectableTypes = Array.from(groupedByType.keys()).filter(t => t !== ComponentType.UNKNOWN);
      const unknownMeshes = groupedByType.get(ComponentType.UNKNOWN) || [];
      
      console.log(`\n✅ Selectable component types: ${selectableTypes.length}`);
      console.log(`   Types: ${selectableTypes.join(', ')}`);
      
      if (unknownMeshes.length > 0) {
        console.log(`\n❓ Unknown meshes (${unknownMeshes.length}):`);
        unknownMeshes.forEach(m => {
          console.log(`   - "${m.name}"`);
          console.log(`     → Suggestion: Add pattern to componentMapper.ts if this should be a component`);
        });
      }
      
      console.log('===================================');
    }
  }, [components]);

  return {
    components,
    componentMap,
    isLoading,
    error,
  };
}

