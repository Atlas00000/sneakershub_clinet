'use client';

import Scene from '@/components/viewer/Scene';
import ConfiguratorViewport from '@/components/viewer/ConfiguratorViewport';
import ComponentSelector from '@/components/configurator/ComponentSelector';
import MaterialLibraryLazy from '@/components/configurator/MaterialLibraryLazy';
import BackgroundSelector from '@/components/configurator/BackgroundSelector';
import ModelSelector from '@/components/configurator/ModelSelector';
import ComponentLabelOverlay from '@/components/viewer/ComponentLabelOverlay';
import ConfiguratorLayout from '@/components/layout/ConfiguratorLayout';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import { useModelPersistence } from '@/hooks/useModelPersistence';
import ViewportErrorBoundary from '@/components/error/ViewportErrorBoundary';

export default function Home() {
  // Persist selected model to localStorage
  useModelPersistence();
  
  const { 
    selectedModelUrl, 
    selectedModelScale, 
    selectedModelPosition, 
    selectedModelRotation 
  } = useConfiguratorStore();
  
  // Use full URL directly (useModelLoader handles both URLs and paths)
  const modelPath = selectedModelUrl;

  return (
    <ConfiguratorLayout
      title="SneakersHub"
      showBackButton={false}
      sidebarContent={
        <>
          <ModelSelector />
          <BackgroundSelector />
          <ComponentSelector />
          <MaterialLibraryLazy />
        </>
      }
    >
      {/* Empty State */}
      {!modelPath && (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal-900 z-10">
          <div className="text-center text-slate-400 animate-fade-in">
            <div className="text-6xl mb-4">👟</div>
            <p className="text-heading-m font-semibold mb-2 text-slate-300">No model selected</p>
            <p className="text-body-m">Please select a model from the sidebar to begin customizing</p>
          </div>
        </div>
      )}

      {/* 3D Viewer */}
      <ViewportErrorBoundary>
        <Scene>
          {modelPath && (
            <ConfiguratorViewport 
              modelPath={modelPath} 
              scale={selectedModelScale || 0.0033} 
              position={selectedModelPosition || [0, 0, 0]} 
              rotation={selectedModelRotation || [0, 0, 0]}
            />
          )}
        </Scene>
      </ViewportErrorBoundary>

      {/* Component label overlay - shows component names on hover */}
      <ComponentLabelOverlay enabled={!!modelPath} />
    </ConfiguratorLayout>
  );
}

