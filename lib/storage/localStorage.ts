/**
 * LocalStorage Utility Functions
 * 
 * Provides type-safe localStorage operations with error handling
 */

const STORAGE_KEYS = {
  SELECTED_MODEL_ID: 'sneakershub:selectedModelId',
  SELECTED_MODEL_URL: 'sneakershub:selectedModelUrl',
  SELECTED_MODEL_SCALE: 'sneakershub:selectedModelScale',
  SELECTED_MODEL_POSITION: 'sneakershub:selectedModelPosition',
  SELECTED_MODEL_ROTATION: 'sneakershub:selectedModelRotation',
} as const;

/**
 * Check if localStorage is available (client-side only)
 */
function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get item from localStorage with error handling
 */
function getItem<T>(key: string, defaultValue: T | null = null): T | null {
  if (!isStorageAvailable()) return defaultValue;

  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Failed to get item from localStorage (${key}):`, error);
    return defaultValue;
  }
}

/**
 * Set item in localStorage with error handling
 */
function setItem<T>(key: string, value: T): boolean {
  if (!isStorageAvailable()) return false;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Failed to set item in localStorage (${key}):`, error);
    return false;
  }
}

/**
 * Remove item from localStorage
 */
function removeItem(key: string): boolean {
  if (!isStorageAvailable()) return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove item from localStorage (${key}):`, error);
    return false;
  }
}

/**
 * Clear all app-related items from localStorage
 */
function clear(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    removeItem(key);
  });
}

/**
 * Model Storage Interface
 */
export interface StoredModelData {
  modelId: string | null;
  modelUrl: string | null;
  scale: number | [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
}

/**
 * Get stored model data from localStorage
 */
export function getStoredModelData(): StoredModelData | null {
  const modelId = getItem<string | null>(STORAGE_KEYS.SELECTED_MODEL_ID, null);
  const modelUrl = getItem<string | null>(STORAGE_KEYS.SELECTED_MODEL_URL, null);
  
  // If no model data is stored, return null
  if (!modelId && !modelUrl) {
    return null;
  }

  return {
    modelId,
    modelUrl,
    scale: getItem<number | [number, number, number]>(STORAGE_KEYS.SELECTED_MODEL_SCALE, 1) ?? 1,
    position: getItem<[number, number, number]>(STORAGE_KEYS.SELECTED_MODEL_POSITION, [0, 0, 0]) ?? [0, 0, 0],
    rotation: getItem<[number, number, number]>(STORAGE_KEYS.SELECTED_MODEL_ROTATION, [0, 0, 0]) ?? [0, 0, 0],
  };
}

/**
 * Store model data to localStorage
 */
export function storeModelData(data: StoredModelData): boolean {
  const results = [
    setItem(STORAGE_KEYS.SELECTED_MODEL_ID, data.modelId),
    setItem(STORAGE_KEYS.SELECTED_MODEL_URL, data.modelUrl),
    setItem(STORAGE_KEYS.SELECTED_MODEL_SCALE, data.scale),
    setItem(STORAGE_KEYS.SELECTED_MODEL_POSITION, data.position),
    setItem(STORAGE_KEYS.SELECTED_MODEL_ROTATION, data.rotation),
  ];

  return results.every((result) => result);
}

/**
 * Clear stored model data from localStorage
 */
export function clearStoredModelData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    removeItem(key);
  });
}

/**
 * Export storage keys for reference
 */
export { STORAGE_KEYS };

