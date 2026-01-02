'use client';

import { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ComponentType, ComponentMap, ComponentInfo } from '@/types/models';
import { useConfiguratorStore } from '@/stores/configuratorStore';

interface LabelPosition {
  x: number;
  y: number;
  visible: boolean;
  componentType: ComponentType;
  componentName: string;
}

/**
 * Hook to calculate screen position for component labels
 * Converts 3D world coordinates to 2D screen coordinates
 * 
 * @param componentMap - Component map containing all components
 * @returns Label position and visibility information
 */
export function useComponentLabel(componentMap: ComponentMap): LabelPosition | null {
  const { camera, size, raycaster, pointer } = useThree();
  const { hoveredComponent, setLabelPosition: setStoreLabelPosition } = useConfiguratorStore();
  const [labelPosition, setLabelPosition] = useState<LabelPosition | null>(null);

  useEffect(() => {
    if (!hoveredComponent || hoveredComponent === ComponentType.UNKNOWN || !componentMap) {
      setLabelPosition(null);
      setStoreLabelPosition(null);
      return;
    }

    const component = componentMap.get(hoveredComponent);
    if (!component || !component.mesh || !(component.mesh instanceof THREE.Mesh)) {
      setLabelPosition(null);
      setStoreLabelPosition(null);
      return;
    }

    const mesh = component.mesh;
    
    // Calculate bounding box center for the component
    const box = new THREE.Box3().setFromObject(mesh);
    const center = box.getCenter(new THREE.Vector3());
    
    // Convert 3D world position to 2D screen position
    const vector = center.clone();
    vector.project(camera);

    // Convert normalized device coordinates to screen coordinates
    const x = (vector.x * 0.5 + 0.5) * size.width;
    const y = (vector.y * -0.5 + 0.5) * size.height;

    // Check if the point is in front of the camera (visible)
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    const toObject = center.clone().sub(camera.position).normalize();
    const isVisible = cameraDirection.dot(toObject) > 0;

    // Get component name
    const componentName = component.name || component.originalName || hoveredComponent;

    const position = {
      x,
      y,
      visible: isVisible && vector.z < 1, // z < 1 means in front of camera
      componentType: hoveredComponent,
      componentName,
    };
    
    setLabelPosition(position);
    // Also update store for overlay component outside Canvas
    setStoreLabelPosition({
      x,
      y,
      visible: position.visible,
      componentName,
    });
  }, [hoveredComponent, componentMap, camera, size, setStoreLabelPosition]);

  return labelPosition;
}

