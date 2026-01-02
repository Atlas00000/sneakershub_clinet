import { ComponentType, ComponentInfo } from '@/types/models';
import * as THREE from 'three';

/**
 * Mapping patterns for identifying components from mesh names
 * These patterns help map mesh names in the GLB file to component types
 */
const COMPONENT_PATTERNS: Record<ComponentType, string[]> = {
  [ComponentType.SOLE]: ['sole', 'insole', 'bottom', 'base'],
  [ComponentType.UPPER]: ['upper', 'suede', 'leather', 'body', 'main', 'normal', 'shoe'],
  [ComponentType.MIDSOLE]: ['midsole', 'mid', 'middle'],
  [ComponentType.OUTSOLE]: ['outsole', 'outer_sole', 'tread'],
  [ComponentType.LACES]: ['lace', 'laces', 'shoelace', 'string'],
  [ComponentType.LOGO]: ['logo', 'brand', 'badge', 'emblem'],
  [ComponentType.HEEL_TAB]: ['heel', 'heel_tab', 'back_tab'],
  [ComponentType.TONGUE]: ['tongue', 'tongue_pad'],
  [ComponentType.EYELETS]: ['eyelets', 'holes', 'grommets', 'metal'],
  [ComponentType.LINING]: ['lining', 'satin', 'inner', 'inside'],
  [ComponentType.UNKNOWN]: [],
};

/**
 * Maps a mesh name to a component type
 * @param meshName - The name of the mesh from the GLB file
 * @returns The component type, or UNKNOWN if no match found
 */
export function mapMeshToComponent(meshName: string): ComponentType {
  const lowerName = meshName.toLowerCase().trim();

  // Check each component type's patterns (order matters - more specific first)
  // We iterate through component types in enum order, checking patterns within each type
  for (const [componentType, patterns] of Object.entries(COMPONENT_PATTERNS)) {
    // Skip UNKNOWN type
    if (componentType === ComponentType.UNKNOWN) continue;
    
    for (const pattern of patterns) {
      if (lowerName.includes(pattern)) {
        return componentType as ComponentType;
      }
    }
  }

  return ComponentType.UNKNOWN;
}

/**
 * Extracts component information from a mesh
 * @param mesh - The Three.js mesh object
 * @returns ComponentInfo object
 */
export function extractComponentInfo(mesh: THREE.Mesh): ComponentInfo {
  const meshName = mesh.name || 'unnamed';
  const componentType = mapMeshToComponent(meshName);

  return {
    type: componentType,
    mesh,
    name: meshName,
    originalName: meshName,
  };
}

/**
 * Traverses a Three.js object and extracts all meshes as components
 * @param object - The Three.js object (usually a Group or Scene)
 * @returns Array of ComponentInfo objects
 */
export function extractComponentsFromObject(object: THREE.Object3D): ComponentInfo[] {
  const components: ComponentInfo[] = [];

  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const componentInfo = extractComponentInfo(child);
      components.push(componentInfo);
    }
  });

  return components;
}

/**
 * Creates a ComponentMap from an array of ComponentInfo
 * Takes the first ComponentInfo for each component type
 * @param components - Array of component info
 * @returns ComponentMap (Map<ComponentType, ComponentInfo>)
 */
export function createComponentMap(components: ComponentInfo[]): Map<ComponentType, ComponentInfo> {
  const map = new Map<ComponentType, ComponentInfo>();

  for (const component of components) {
    // Only set if this type doesn't already exist (take first occurrence)
    if (!map.has(component.type)) {
      map.set(component.type, component);
    }
  }

  return map;
}

