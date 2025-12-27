import { create } from 'zustand';
import { ComponentType, ComponentMap } from '@/types/models';
import { Material, MaterialMap } from '@/types/materials';

type Mode = 'blank' | 'branded';

interface ConfiguratorState {
  // Mode state
  currentMode: Mode;
  selectedBrand?: string;
  
  // Component state
  selectedComponent: ComponentType | null;
  hoveredComponent: ComponentType | null; // Component currently being hovered
  componentMap: ComponentMap;
  
  // Label state
  labelPosition: { x: number; y: number; visible: boolean; componentName: string } | null;
  
  // Material state
  materialMap: MaterialMap; // Map of component types to their applied materials
  
  // Background state
  selectedBackgroundUrl: string | null; // HDR background URL
  
  // Model state
  selectedModelId: string | null; // Selected model ID
  selectedModelUrl: string | null; // Selected model URL (for direct loading)
  selectedModelScale: number; // Selected model scale
  selectedModelPosition: [number, number, number]; // Selected model position
  selectedModelRotation: [number, number, number]; // Selected model rotation
  
  // Actions
  setMode: (mode: Mode) => void;
  setBrand: (brand: string) => void;
  setComponent: (component: ComponentType | null) => void;
  setHoveredComponent: (component: ComponentType | null) => void;
  setLabelPosition: (position: { x: number; y: number; visible: boolean; componentName: string } | null) => void;
  setComponentMap: (componentMap: ComponentMap) => void;
  setMaterial: (componentType: ComponentType, material: Material) => void;
  clearMaterial: (componentType: ComponentType) => void;
  clearAllMaterials: () => void;
  setBackground: (url: string | null) => void;
  setModel: (modelId: string | null, modelUrl: string | null, scale?: number, position?: [number, number, number], rotation?: [number, number, number]) => void;
}

// Default background (brown photo studio)
const DEFAULT_BACKGROUND_URL = 'https://pub-42d9986d97a0490598cb89136641b713.r2.dev/brown_photostudio_01_1k.hdr';

// Default model (Unbranded White Sneaker)
const DEFAULT_MODEL_ID = 'unbranded_white_sneaker';
const DEFAULT_MODEL_URL = 'https://pub-42d9986d97a0490598cb89136641b713.r2.dev/unbranded_white_sneaker.glb';
const DEFAULT_MODEL_SCALE = 0.0033;
const DEFAULT_MODEL_POSITION: [number, number, number] = [0, 0, 0];
const DEFAULT_MODEL_ROTATION: [number, number, number] = [0, 0, 0];

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  // Initial state
  currentMode: 'blank',
  selectedBrand: undefined,
  selectedComponent: null,
  hoveredComponent: null,
  labelPosition: null,
  componentMap: new Map<ComponentType, any[]>(),
  materialMap: new Map<ComponentType, Material>(),
  selectedBackgroundUrl: DEFAULT_BACKGROUND_URL,
  selectedModelId: DEFAULT_MODEL_ID,
  selectedModelUrl: DEFAULT_MODEL_URL,
  selectedModelScale: DEFAULT_MODEL_SCALE,
  selectedModelPosition: DEFAULT_MODEL_POSITION,
  selectedModelRotation: DEFAULT_MODEL_ROTATION,
  
  // Actions
  setMode: (mode) => set({ currentMode: mode }),
  setBrand: (brand) => set({ selectedBrand: brand }),
  setComponent: (component) => set({ selectedComponent: component }),
  setHoveredComponent: (component) => set({ hoveredComponent: component }),
  setLabelPosition: (position) => set({ labelPosition: position }),
  setComponentMap: (componentMap) =>
    set((state) => {
      // Only update if the map actually changed (different size or different keys)
      if (
        state.componentMap.size !== componentMap.size ||
        Array.from(state.componentMap.keys()).join(',') !== Array.from(componentMap.keys()).join(',')
      ) {
        return { componentMap };
      }
      return state; // No change, don't update
    }),
  setMaterial: (componentType, material) =>
    set((state) => {
      const newMap = new Map(state.materialMap);
      newMap.set(componentType, material);
      return { materialMap: newMap };
    }),
  clearMaterial: (componentType) =>
    set((state) => {
      const newMap = new Map(state.materialMap);
      newMap.delete(componentType);
      return { materialMap: newMap };
    }),
  clearAllMaterials: () => set({ materialMap: new Map<ComponentType, Material>() }),
  setBackground: (url) => set({ selectedBackgroundUrl: url }),
  setModel: (modelId, modelUrl, scale = 0.0033, position = [0, 0, 0], rotation = [0, 0, 0]) => 
    set({ 
      selectedModelId: modelId,
      selectedModelUrl: modelUrl,
      selectedModelScale: scale,
      selectedModelPosition: position,
      selectedModelRotation: rotation,
    }),
}));

