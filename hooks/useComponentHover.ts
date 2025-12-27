'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ComponentType, ComponentMap, ComponentInfo } from '@/types/models';
import { useConfiguratorStore } from '@/stores/configuratorStore';

interface UseComponentHoverOptions {
  /**
   * Component map to identify which component type a mesh belongs to
   */
  componentMap: ComponentMap;
  
  /**
   * Whether hover detection is enabled
   */
  enabled?: boolean;
  
  /**
   * Callback when a component is hovered
   */
  onHover?: (componentType: ComponentType | null) => void;
  
  /**
   * Callback when a component is clicked
   */
  onClick?: (componentType: ComponentType | null) => void;
}

/**
 * Hook for detecting component hover and click interactions using raycasting
 * 
 * @param options - Configuration options
 * @returns Object with hover state and methods
 */
export function useComponentHover({
  componentMap,
  enabled = true,
  onHover,
  onClick,
}: UseComponentHoverOptions) {
  const { camera, raycaster, pointer, gl } = useThree();
  const { setHoveredComponent, setComponent } = useConfiguratorStore();
  
  // Store all meshes with their component types for quick lookup
  const meshToComponentMapRef = useRef<Map<THREE.Mesh, ComponentType>>(new Map());
  
  // Build mesh-to-component mapping when componentMap changes
  useEffect(() => {
    if (!componentMap || componentMap.size === 0) {
      meshToComponentMapRef.current.clear();
      return;
    }
    
    const meshMap = new Map<THREE.Mesh, ComponentType>();
    
    // Iterate through componentMap to build reverse lookup
    componentMap.forEach((components, componentType) => {
      // Skip unknown components
      if (componentType === ComponentType.UNKNOWN) return;
      
      // components is an array of ComponentInfo
      const componentsArray = components as any;
      if (Array.isArray(componentsArray)) {
        componentsArray.forEach((componentInfo: ComponentInfo) => {
          if (componentInfo.mesh instanceof THREE.Mesh) {
            meshMap.set(componentInfo.mesh, componentType);
          }
        });
      }
    });
    
    meshToComponentMapRef.current = meshMap;
  }, [componentMap]);
  
  // Previous hovered component to detect changes
  const previousHoveredRef = useRef<ComponentType | null>(null);
  
  // Handle mouse move for hover detection
  useFrame(() => {
    if (!enabled || meshToComponentMapRef.current.size === 0) {
      if (previousHoveredRef.current !== null) {
        setHoveredComponent(null);
        previousHoveredRef.current = null;
        onHover?.(null);
      }
      return;
    }
    
    // Update raycaster with current pointer position
    raycaster.setFromCamera(pointer, camera);
    
    // Get all meshes from the map
    const meshes = Array.from(meshToComponentMapRef.current.keys());
    
    // Perform raycast intersection
    const intersects = raycaster.intersectObjects(meshes, false);
    
    if (intersects.length > 0) {
      const intersectedMesh = intersects[0].object as THREE.Mesh;
      const componentType = meshToComponentMapRef.current.get(intersectedMesh) || null;
      
      // Only update if component changed
      if (componentType !== previousHoveredRef.current) {
        previousHoveredRef.current = componentType;
        setHoveredComponent(componentType);
        onHover?.(componentType);
      }
    } else {
      // No intersection - clear hover
      if (previousHoveredRef.current !== null) {
        previousHoveredRef.current = null;
        setHoveredComponent(null);
        onHover?.(null);
      }
    }
  });
  
  // Handle click events
  useEffect(() => {
    if (!enabled || !onClick) return;
    
    const handleClick = (event: MouseEvent) => {
      // Update raycaster with click position
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      
      const meshes = Array.from(meshToComponentMapRef.current.keys());
      const intersects = raycaster.intersectObjects(meshes, false);
      
      if (intersects.length > 0) {
        const intersectedMesh = intersects[0].object as THREE.Mesh;
        const componentType = meshToComponentMapRef.current.get(intersectedMesh) || null;
        
        if (componentType) {
          setComponent(componentType);
          onClick(componentType);
        }
      }
    };
    
    gl.domElement.addEventListener('click', handleClick);
    
    return () => {
      gl.domElement.removeEventListener('click', handleClick);
    };
  }, [enabled, onClick, gl, camera, raycaster, setComponent]);
  
  return {
    enabled,
  };
}

