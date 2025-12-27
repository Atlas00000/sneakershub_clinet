/**
 * Cloudflare R2 Client Utility
 * 
 * Provides utilities for accessing assets stored in Cloudflare R2.
 * For now, this is a simple URL builder. Future enhancements can include
 * authenticated uploads and signed URL generation.
 */

const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL || '';

/**
 * Get the public URL for an asset stored in Cloudflare R2
 * @param assetPath - Path to the asset relative to the bucket root (e.g., 'models/polar_bear.glb')
 * @returns Full public URL to the asset
 */
export function getR2AssetUrl(assetPath: string): string {
  if (!R2_PUBLIC_URL) {
    console.warn('NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL is not set');
    return '';
  }
  
  // Remove leading slash if present
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  
  // Ensure R2_PUBLIC_URL doesn't have trailing slash
  const baseUrl = R2_PUBLIC_URL.endsWith('/') 
    ? R2_PUBLIC_URL.slice(0, -1) 
    : R2_PUBLIC_URL;
  
  return `${baseUrl}/${cleanPath}`;
}

/**
 * Get the URL for a 3D model stored in R2
 * @param modelPath - Path to the model (e.g., 'polar_bear.glb' or 'models/polar_bear.glb')
 * @returns Full public URL to the model
 */
export function getModelUrl(modelPath: string): string {
  return getR2AssetUrl(modelPath);
}

