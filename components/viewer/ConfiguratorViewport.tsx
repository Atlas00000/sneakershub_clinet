'use client';

import { useState } from 'react';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import { useMaterialSwapping } from '@/hooks/useMaterialSwapping';
import { useComponentHover } from '@/hooks/useComponentHover';
import ModelLoader from './ModelLoader';
import ComponentHighlighter from './ComponentHighlighter';
import ComponentLabelTracker from './ComponentLabelTracker';
import { ComponentMap } from '@/types/models';
import * as THREE from 'three';

interface ConfiguratorViewportProps {
  /**
   * Path to the model in Cloudflare R2
   */
  modelPath: string | null;
  
  /**
   * Scale factor for the model
   */
  scale?: number | [number, number, number];
  
  /**
   * Position of the model
   */
  position?: [number, number, number];
  
  /**
   * Rotation of the model
   */
  rotation?: [number, number, number];
  
  /**
   * Enable auto-rotation
   */
  autoRotate?: boolean;
}

/**
 * Wrapper component that integrates model loading with material swapping
 * This component connects the 3D model to the material system
 */
export default function ConfiguratorViewport({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
}: ConfiguratorViewportProps) {
  const { componentMap, setComponentMap } = useConfiguratorStore();
  const [loadedScene, setLoadedScene] = useState<THREE.Group | null>(null);

  // Handle model load - save componentMap to store and scene reference
  const handleModelLoad = (loadedComponentMap: ComponentMap, scene: THREE.Group | null) => {
    setComponentMap(loadedComponentMap);
    setLoadedScene(scene);
    console.log('\n🎯 MODEL LOADED - Component Map Summary:');
    console.log(`   Total component types available: ${loadedComponentMap.size}`);
    console.log('   Available component types:');
    Array.from(loadedComponentMap.entries()).forEach(([type, components]) => {
      // ComponentMap stores ComponentInfo[] arrays (despite type definition)
      const componentsArray = components as any;
      if (Array.isArray(componentsArray)) {
        const names = componentsArray.map((c: any) => c.name || c.originalName || 'unnamed').join(', ');
        console.log(`     - ${type}: ${componentsArray.length} component(s) [${names}]`);
      } else {
        console.log(`     - ${type}: 1 component`);
      }
    });
    const selectableCount = Array.from(loadedComponentMap.keys()).filter(k => k !== 'unknown').length;
    console.log(`\n   ✅ Total selectable components: ${selectableCount}`);
    console.log('');
  };

  // Apply materials to the model components
  useMaterialSwapping({
    componentMap,
    scene: loadedScene,
    onSwapStart: (componentType, material) => {
      console.log(`Applying material ${material.name} to ${componentType}`);
    },
    onSwapComplete: (componentType, material) => {
      console.log(`Material ${material.name} applied to ${componentType}`);
    },
    onSwapError: (componentType, error) => {
      console.error(`Failed to apply material to ${componentType}:`, error);
    },
  });

  // Enable component hover detection and click-to-select
  useComponentHover({
    componentMap,
    enabled: componentMap.size > 0,
    onHover: (componentType) => {
      // Hover state is managed by the hook via store
    },
    onClick: (componentType) => {
      // Click-to-select is handled by the hook via store
      if (componentType) {
        console.log(`Component selected: ${componentType}`);
      }
    },
  });

  return (
    <>
    <ModelLoader
      modelPath={modelPath}
      scale={scale}
      position={position}
      rotation={rotation}
      autoRotate={autoRotate}
      onLoad={handleModelLoad}
    />
      {/* Component highlighting for hover and selected states */}
      <ComponentHighlighter
        componentMap={componentMap}
        enabled={componentMap.size > 0}
      />
      {/* Component label position tracker (updates store for overlay) */}
      <ComponentLabelTracker
        componentMap={componentMap}
        enabled={componentMap.size > 0}
      />
    </>
  );
}

