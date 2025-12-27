import * as THREE from 'three';
import { getR2AssetUrl } from './cloudflare/r2Client';

/**
 * Cache for loaded textures to avoid reloading
 */
const textureCache = new Map<string, THREE.Texture>();

/**
 * Loads a texture from Cloudflare R2
 * @param texturePath - Path to the texture in R2 (e.g., 'textures/leather_albedo.jpg')
 * @param options - Texture loading options
 * @returns Promise that resolves to a Three.js Texture
 */
export async function loadTexture(
  texturePath: string,
  options?: {
    flipY?: boolean;
    wrapS?: THREE.Wrapping;
    wrapT?: THREE.Wrapping;
    minFilter?: THREE.TextureFilter;
    magFilter?: THREE.TextureFilter;
  }
): Promise<THREE.Texture> {
  // Check cache first
  const cacheKey = texturePath;
  if (textureCache.has(cacheKey)) {
    const cached = textureCache.get(cacheKey)!;
    return cached.clone();
  }

  // Get the full URL - check if it's already a full URL or a relative path
  let textureUrl: string;
  if (texturePath.startsWith('http://') || texturePath.startsWith('https://')) {
    // Already a full URL, use it directly
    textureUrl = texturePath;
  } else if (texturePath.startsWith('/')) {
    // Absolute path from public folder (e.g., /textures/rubber/color.jpg)
    // In Next.js, files in public folder are served from root
    textureUrl = texturePath;
  } else {
    // Relative path, get the full URL from R2
    textureUrl = getR2AssetUrl(texturePath);
  if (!textureUrl) {
    throw new Error(`Failed to get texture URL for: ${texturePath}`);
    }
  }

  // Load texture using Three.js TextureLoader
  const loader = new THREE.TextureLoader();
  
  return new Promise((resolve, reject) => {
    loader.load(
      textureUrl,
      (texture) => {
        // Apply options
        if (options?.flipY !== undefined) {
          texture.flipY = options.flipY;
        }
        if (options?.wrapS !== undefined) {
          texture.wrapS = options.wrapS;
        }
        if (options?.wrapT !== undefined) {
          texture.wrapT = options.wrapT;
        }
        if (options?.minFilter !== undefined) {
          texture.minFilter = options.minFilter;
        }
        if (options?.magFilter !== undefined) {
          texture.magFilter = options.magFilter;
        }

        // Set default settings if not provided
        texture.wrapS = texture.wrapS || THREE.RepeatWrapping;
        texture.wrapT = texture.wrapT || THREE.RepeatWrapping;
        texture.minFilter = texture.minFilter || THREE.LinearMipmapLinearFilter;
        texture.magFilter = texture.magFilter || THREE.LinearFilter;

        // Cache the texture
        textureCache.set(cacheKey, texture);

        resolve(texture);
      },
      undefined,
      (error) => {
        reject(new Error(`Failed to load texture: ${texturePath} - ${error.message}`));
      }
    );
  });
}

/**
 * Loads multiple textures in parallel
 * @param texturePaths - Array of texture paths
 * @param options - Texture loading options
 * @returns Promise that resolves to a map of texture paths to textures
 */
export async function loadTextures(
  texturePaths: string[],
  options?: Parameters<typeof loadTexture>[1]
): Promise<Map<string, THREE.Texture>> {
  const promises = texturePaths.map((path) =>
    loadTexture(path, options).then((texture) => [path, texture] as [string, THREE.Texture])
  );

  const results = await Promise.all(promises);
  return new Map(results);
}

/**
 * Clears the texture cache
 * Useful for memory management
 */
export function clearTextureCache(): void {
  textureCache.forEach((texture) => {
    texture.dispose();
  });
  textureCache.clear();
}

/**
 * Disposes a specific texture from cache
 * @param texturePath - Path of the texture to dispose
 */
export function disposeTexture(texturePath: string): void {
  const texture = textureCache.get(texturePath);
  if (texture) {
    texture.dispose();
    textureCache.delete(texturePath);
  }
}

