'use client';

import Scene from '@/components/viewer/Scene';
import ConfiguratorViewport from '@/components/viewer/ConfiguratorViewport';
import ComponentSelector from '@/components/configurator/ComponentSelector';
import MaterialLibrary from '@/components/configurator/MaterialLibrary';
import BackgroundSelector from '@/components/configurator/BackgroundSelector';
import ModelSelector from '@/components/configurator/ModelSelector';
import ComponentLabelOverlay from '@/components/viewer/ComponentLabelOverlay';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import Link from 'next/link';

export default function BlankCanvasPage() {
  const { 
    selectedModelUrl, 
    selectedModelScale, 
    selectedModelPosition, 
    selectedModelRotation 
  } = useConfiguratorStore();
  
  // Use full URL directly (useModelLoader handles both URLs and paths)
  const modelPath = selectedModelUrl;

  return (
    <main className="flex min-h-screen flex-col">
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <div>
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-bold">Blank Canvas Mode</h1>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 relative">
          {!modelPath && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <div className="text-center text-gray-400">
                <p className="text-lg mb-2">No model selected</p>
                <p className="text-sm">Please select a model from the sidebar to begin customizing</p>
              </div>
            </div>
          )}
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
          {/* Component label overlay - shows component names on hover */}
          <ComponentLabelOverlay enabled={!!modelPath} />
        </div>
        <div className="w-80 bg-gray-50 border-l p-4 overflow-y-auto space-y-4">
          <ModelSelector />
          <BackgroundSelector />
          <ComponentSelector />
          <MaterialLibrary />
        </div>
      </div>
    </main>
  );
}

