import * as THREE from 'three';

/**
 * Component types for sneaker parts
 * These represent the different parts of a shoe that can be customized
 */
export enum ComponentType {
  SOLE = 'sole',
  UPPER = 'upper',
  MIDSOLE = 'midsole',
  OUTSOLE = 'outsole',
  LACES = 'laces',
  LOGO = 'logo',
  HEEL_TAB = 'heel_tab',
  TONGUE = 'tongue',
  EYELETS = 'eyelets',
  LINING = 'lining',
  UNKNOWN = 'unknown',
}

/**
 * Mapping of component types to display names
 */
export const ComponentDisplayNames: Record<ComponentType, string> = {
  [ComponentType.SOLE]: 'Sole',
  [ComponentType.UPPER]: 'Upper',
  [ComponentType.MIDSOLE]: 'Midsole',
  [ComponentType.OUTSOLE]: 'Outsole',
  [ComponentType.LACES]: 'Laces',
  [ComponentType.LOGO]: 'Logo',
  [ComponentType.HEEL_TAB]: 'Heel Tab',
  [ComponentType.TONGUE]: 'Tongue',
  [ComponentType.EYELETS]: 'Eyelets',
  [ComponentType.LINING]: 'Lining',
  [ComponentType.UNKNOWN]: 'Unknown',
};

/**
 * Component information extracted from a 3D model
 */
export interface ComponentInfo {
  type: ComponentType;
  mesh: THREE.Mesh;
  name: string;
  originalName: string;
}

/**
 * Map of component types to their mesh objects
 */
export type ComponentMap = Map<ComponentType, ComponentInfo>;

/**
 * Shoe model configuration
 */
export interface ShoeModel {
  id: string;
  name: string;
  type: 'blank' | 'branded';
  brand?: string;
  modelUrl: string;
  thumbnailUrl?: string;
  components: ComponentMap;
  constraints?: BrandConstraints;
}

/**
 * Brand-specific constraints (for branded models)
 */
export interface BrandConstraints {
  logoPlacement?: 'fixed' | 'removable';
  availableColors?: string[];
  materialRestrictions?: ComponentType[];
}

