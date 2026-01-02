import { apiGet } from './client';

/**
 * Material API Response Types
 */
export interface MaterialListResponse {
  success: boolean;
  count: number;
  materials: Array<{
    id: string;
    name: string;
    category: string;
    albedo?: string;
    normal?: string;
    roughness?: string;
    metallic?: string;
  }>;
  files?: number;
  sampleFiles?: string[];
}

export interface MaterialGenerateResponse {
  success: boolean;
  materials: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
    properties: Record<string, unknown>;
    priceModifier: number;
    premium: boolean;
  }>;
  count: number;
}

/**
 * Materials API Service
 * 
 * Functions for interacting with the materials API endpoints
 */
export const materialsApi = {
  /**
   * List all materials from R2 storage
   */
  list: (): Promise<MaterialListResponse> => {
    return apiGet<MaterialListResponse>('/api/materials/list');
  },

  /**
   * Generate materials.json format from R2 files
   */
  generate: (): Promise<MaterialGenerateResponse> => {
    return apiGet<MaterialGenerateResponse>('/api/materials/generate');
  },

  /**
   * Debug endpoint to list all files in R2
   */
  debug: (): Promise<{
    success: boolean;
    bucket: string;
    endpoint: string;
    filesFound: number;
    files: string[];
    prefix: string;
  }> => {
    return apiGet('/api/materials/debug');
  },
};

