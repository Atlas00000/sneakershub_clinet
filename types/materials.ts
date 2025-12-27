import * as THREE from 'three';
import { ComponentType } from './models';

/**
 * Material categories
 */
export enum MaterialCategory {
  LEATHER = 'leather',
  FABRIC = 'fabric',
  SYNTHETIC = 'synthetic',
  RUBBER = 'rubber',
  METAL = 'metal',
  PREMIUM = 'premium',
}

/**
 * Material properties for PBR (Physically Based Rendering)
 */
export interface MaterialProperties {
  // Base color (albedo)
  color?: string | THREE.Color;
  
  // PBR properties
  roughness?: number; // 0 = mirror, 1 = rough
  metalness?: number; // 0 = dielectric, 1 = metal
  
  // Texture maps
  map?: string; // Albedo/diffuse texture URL
  normalMap?: string; // Normal map URL
  roughnessMap?: string; // Roughness map URL
  metalnessMap?: string; // Metalness map URL
  aoMap?: string; // Ambient occlusion map URL
  
  // Additional properties
  emissive?: string | THREE.Color;
  emissiveIntensity?: number;
  opacity?: number;
  transparent?: boolean;
}

/**
 * Material definition
 */
export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  description?: string;
  thumbnailUrl?: string;
  properties: MaterialProperties;
  priceModifier?: number; // Additional cost for this material
  premium?: boolean; // Whether this is a premium material
  compatibleComponents?: ComponentType[]; // Components this material can be applied to
}

/**
 * Material library - collection of available materials
 */
export interface MaterialLibrary {
  materials: Material[];
  categories: MaterialCategory[];
}

/**
 * Material application - which material is applied to which component
 */
export interface MaterialApplication {
  componentType: ComponentType;
  materialId: string;
}

/**
 * Map of component types to their applied materials
 */
export type MaterialMap = Map<ComponentType, Material>;

