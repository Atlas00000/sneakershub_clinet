'use client';

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ComponentType, ComponentMap, ComponentInfo } from '@/types/models';
import { useConfiguratorStore } from '@/stores/configuratorStore';

interface ComponentHighlighterProps {
  /**
   * Component map containing all components
   */
  componentMap: ComponentMap;
  
  /**
   * Whether highlighting is enabled
   */
  enabled?: boolean;
  
  /**
   * Color for hover highlight (default: light blue)
   */
  hoverColor?: string | number;
  
  /**
   * Color for selected highlight (default: yellow)
   */
  selectedColor?: string | number;
  
  /**
   * Intensity of the highlight (0-1, default: 0.3)
   */
  highlightIntensity?: number;
}

/**
 * Component that applies visual highlighting to hovered and selected components
 * Uses emissive material properties to create highlight effects
 */
export default function ComponentHighlighter({
  componentMap,
  enabled = true,
  hoverColor = 0xe0e0e0, // Very light gray for subtle glow
  selectedColor = 0xf0f0f0, // Slightly lighter gray for selected
  highlightIntensity = 0.08, // Very subtle intensity - just enough to see selection
}: ComponentHighlighterProps) {
  const { hoveredComponent, selectedComponent, materialMap } = useConfiguratorStore();
  
  // Store highlighted materials (clones) so we can restore emissive properties
  const highlightedMaterialsRef = useRef<Map<THREE.Mesh, THREE.Material>>(new Map());
  
  // Store current highlight state
  const currentHighlightedRef = useRef<Set<THREE.Mesh>>(new Set());
  
  // Build mesh arrays for hovered and selected components
  useEffect(() => {
    if (!enabled || !componentMap || componentMap.size === 0) {
      // Clear all highlights
      clearHighlights();
      return;
    }
    
    const meshesToHighlight = new Set<THREE.Mesh>();
    const highlightType = new Map<THREE.Mesh, 'hover' | 'selected'>();
    
    // Collect meshes for selected component
    if (selectedComponent && selectedComponent !== ComponentType.UNKNOWN) {
      const selectedComponents = componentMap.get(selectedComponent);
      if (selectedComponents) {
        const componentsArray = selectedComponents as any;
        if (Array.isArray(componentsArray)) {
          componentsArray.forEach((componentInfo: ComponentInfo) => {
            if (componentInfo.mesh instanceof THREE.Mesh) {
              meshesToHighlight.add(componentInfo.mesh);
              highlightType.set(componentInfo.mesh, 'selected');
            }
          });
        }
      }
    }
    
    // Collect meshes for hovered component (only if not already selected)
    if (hoveredComponent && hoveredComponent !== ComponentType.UNKNOWN && hoveredComponent !== selectedComponent) {
      const hoveredComponents = componentMap.get(hoveredComponent);
      if (hoveredComponents) {
        const componentsArray = hoveredComponents as any;
        if (Array.isArray(componentsArray)) {
          componentsArray.forEach((componentInfo: ComponentInfo) => {
            if (componentInfo.mesh instanceof THREE.Mesh && !meshesToHighlight.has(componentInfo.mesh)) {
              meshesToHighlight.add(componentInfo.mesh);
              highlightType.set(componentInfo.mesh, 'hover');
            }
          });
        }
      }
    }
    
    // Clear previous highlights
    clearHighlights();
    
    // Apply new highlights
    meshesToHighlight.forEach((mesh) => {
      const type = highlightType.get(mesh);
      if (!type) return;
      
      // Get the current material on the mesh (this may be a material that was swapped)
      const currentMaterial = mesh.material;
      
      // Check if we already have a highlighted material for this mesh
      let material: THREE.Material;
      if (highlightedMaterialsRef.current.has(mesh)) {
        // Reuse existing highlighted material, but update it with current material properties
        material = highlightedMaterialsRef.current.get(mesh)!;
        
        // If the current material changed (material swap happened), update our highlighted material
        if (currentMaterial !== material) {
          // Dispose the old highlighted material
          if (material instanceof THREE.Material) {
            material.dispose();
          }
          // Clone the new current material
          if (Array.isArray(currentMaterial)) {
            material = currentMaterial[0].clone();
          } else {
            material = currentMaterial.clone();
          }
          highlightedMaterialsRef.current.set(mesh, material);
        }
      } else {
        // Clone current material to avoid mutating it
        if (Array.isArray(currentMaterial)) {
          material = currentMaterial[0].clone();
        } else {
          material = currentMaterial.clone();
        }
        highlightedMaterialsRef.current.set(mesh, material);
      }
      
      // Apply highlight effect using emissive property
      if (material instanceof THREE.MeshStandardMaterial || 
          material instanceof THREE.MeshPhysicalMaterial ||
          material instanceof THREE.MeshPhongMaterial) {
        
        // Convert color to THREE.Color if it's a string
        const highlightColor = typeof (type === 'hover' ? hoverColor : selectedColor) === 'string'
          ? new THREE.Color(type === 'hover' ? hoverColor : selectedColor)
          : new THREE.Color(type === 'hover' ? hoverColor : selectedColor);
        
        // Set emissive color for highlight
        material.emissive = highlightColor;
        material.emissiveIntensity = highlightIntensity;
        
        // Make the material more visible
        material.needsUpdate = true;
      }
      
      // Apply the highlighted material
      mesh.material = material;
      currentHighlightedRef.current.add(mesh);
    });
    
  }, [enabled, componentMap, hoveredComponent, selectedComponent, materialMap, hoverColor, selectedColor, highlightIntensity]);
  
  // Cleanup function to remove highlight effects
  const clearHighlights = () => {
    const meshesToRemove = new Set<THREE.Mesh>();
    
    currentHighlightedRef.current.forEach((mesh) => {
      // Get the highlighted material we stored
      const highlightedMaterial = highlightedMaterialsRef.current.get(mesh);
      
      // Check if mesh is still using the highlighted material
      // If material was swapped, the mesh.material will be different
      if (mesh.material === highlightedMaterial) {
        // Mesh is still using our highlighted material, remove emissive
        if (highlightedMaterial && 
            (highlightedMaterial instanceof THREE.MeshStandardMaterial || 
             highlightedMaterial instanceof THREE.MeshPhysicalMaterial ||
             highlightedMaterial instanceof THREE.MeshPhongMaterial)) {
          
          // Remove emissive highlight by setting it to black
          highlightedMaterial.emissive.setHex(0x000000);
          highlightedMaterial.emissiveIntensity = 0;
          highlightedMaterial.needsUpdate = true;
        }
      } else {
        // Material was swapped, remove from our tracking
        meshesToRemove.add(mesh);
        if (highlightedMaterial) {
          // Dispose the old highlighted material since it's no longer used
          highlightedMaterial.dispose();
        }
        highlightedMaterialsRef.current.delete(mesh);
      }
    });
    
    // Remove meshes that had their materials swapped
    meshesToRemove.forEach(mesh => {
      currentHighlightedRef.current.delete(mesh);
    });
    
    currentHighlightedRef.current.clear();
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearHighlights();
      // Dispose highlighted materials
      highlightedMaterialsRef.current.forEach((material) => {
        if (material instanceof THREE.Material) {
          material.dispose();
        }
      });
      highlightedMaterialsRef.current.clear();
    };
  }, []);
  
  // This component doesn't render anything, it just applies effects
  return null;
}

