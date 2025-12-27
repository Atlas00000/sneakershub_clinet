import * as THREE from 'three';
import { Material, MaterialProperties } from '@/types/materials';
import { loadTexture, loadTextures } from './textureLoader';

/**
 * Cache for created materials to avoid recreating identical materials
 */
const materialCache = new Map<string, THREE.MeshStandardMaterial>();

/**
 * Generates a cache key from material properties
 */
function generateMaterialKey(properties: MaterialProperties): string {
  const parts: string[] = [];

  if (properties.color) {
    const color = typeof properties.color === 'string' 
      ? properties.color 
      : `#${properties.color.getHexString()}`;
    parts.push(`c:${color}`);
  }
  if (properties.roughness !== undefined) parts.push(`r:${properties.roughness}`);
  if (properties.metalness !== undefined) parts.push(`m:${properties.metalness}`);
  if (properties.map) parts.push(`map:${properties.map}`);
  if (properties.normalMap) parts.push(`n:${properties.normalMap}`);
  if (properties.roughnessMap) parts.push(`rm:${properties.roughnessMap}`);
  if (properties.metalnessMap) parts.push(`mm:${properties.metalnessMap}`);
  if (properties.aoMap) parts.push(`ao:${properties.aoMap}`);
  if (properties.opacity !== undefined) parts.push(`o:${properties.opacity}`);

  return parts.join('|');
}

/**
 * Creates a Three.js material from material properties
 * @param properties - Material properties
 * @returns Three.js MeshStandardMaterial
 */
export async function createMaterial(properties: MaterialProperties): Promise<THREE.MeshStandardMaterial> {
  // Check cache
  const cacheKey = generateMaterialKey(properties);
  if (materialCache.has(cacheKey)) {
    const cached = materialCache.get(cacheKey)!;
    // Clone to avoid mutating cached material
    return cached.clone();
  }

  // Create new material
  const material = new THREE.MeshStandardMaterial();

  // Set base properties
  if (properties.color) {
    material.color = typeof properties.color === 'string'
      ? new THREE.Color(properties.color)
      : properties.color;
  }

  if (properties.roughness !== undefined) {
    material.roughness = properties.roughness;
  }

  if (properties.metalness !== undefined) {
    material.metalness = properties.metalness;
  }

  if (properties.opacity !== undefined) {
    material.opacity = properties.opacity;
    material.transparent = properties.transparent ?? properties.opacity < 1;
  }

  if (properties.emissive) {
    material.emissive = typeof properties.emissive === 'string'
      ? new THREE.Color(properties.emissive)
      : properties.emissive;
    material.emissiveIntensity = properties.emissiveIntensity ?? 0;
  }

  // Load textures
  const texturePaths: string[] = [];
  if (properties.map) texturePaths.push(properties.map);
  if (properties.normalMap) texturePaths.push(properties.normalMap);
  if (properties.roughnessMap) texturePaths.push(properties.roughnessMap);
  if (properties.metalnessMap) texturePaths.push(properties.metalnessMap);
  if (properties.aoMap) texturePaths.push(properties.aoMap);

  if (texturePaths.length > 0) {
    try {
      const textures = await loadTextures(texturePaths);

      if (properties.map && textures.has(properties.map)) {
        material.map = textures.get(properties.map)!;
      }
      if (properties.normalMap && textures.has(properties.normalMap)) {
        material.normalMap = textures.get(properties.normalMap)!;
      }
      if (properties.roughnessMap && textures.has(properties.roughnessMap)) {
        material.roughnessMap = textures.get(properties.roughnessMap)!;
      }
      if (properties.metalnessMap && textures.has(properties.metalnessMap)) {
        material.metalnessMap = textures.get(properties.metalnessMap)!;
      }
      if (properties.aoMap && textures.has(properties.aoMap)) {
        material.aoMap = textures.get(properties.aoMap)!;
      }
    } catch (error) {
      console.warn('Failed to load some textures:', error);
    }
  }

  // Cache the material
  materialCache.set(cacheKey, material);

  return material;
}

/**
 * Creates a material from a Material definition
 * @param material - Material definition
 * @returns Three.js MeshStandardMaterial
 */
export async function createMaterialFromDefinition(material: Material): Promise<THREE.MeshStandardMaterial> {
  return createMaterial(material.properties);
}

/**
 * Gets or creates a material (with caching)
 * @param properties - Material properties
 * @returns Three.js MeshStandardMaterial
 */
export async function getMaterial(properties: MaterialProperties): Promise<THREE.MeshStandardMaterial> {
  return createMaterial(properties);
}

/**
 * Clears the material cache
 * Useful for memory management
 */
export function clearMaterialCache(): void {
  materialCache.forEach((material) => {
    material.dispose();
  });
  materialCache.clear();
}

/**
 * Disposes a specific material from cache
 * @param properties - Properties of the material to dispose
 */
export function disposeMaterial(properties: MaterialProperties): void {
  const cacheKey = generateMaterialKey(properties);
  const material = materialCache.get(cacheKey);
  if (material) {
    material.dispose();
    materialCache.delete(cacheKey);
  }
}

