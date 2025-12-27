'use client';

import { useEffect } from 'react';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import modelsData from '@/data/models.json';

interface Model {
  id: string;
  name: string;
  url: string;
  type: string;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  description: string;
  thumbnail: string | null;
}

/**
 * Model selector UI - allows users to select which 3D model to configure
 */
export default function ModelSelector() {
  const { selectedModelId, setModel } = useConfiguratorStore();
  const models = modelsData.models as Model[];

  // Auto-select first model if none is selected
  useEffect(() => {
    if (!selectedModelId && models.length > 0) {
      const firstModel = models[0];
      setModel(
        firstModel.id,
        firstModel.url,
        firstModel.scale,
        firstModel.position,
        firstModel.rotation
      );
    }
  }, [selectedModelId, models, setModel]);

  const handleModelSelect = (model: Model) => {
    setModel(
      model.id,
      model.url,
      model.scale,
      model.position,
      model.rotation
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Model</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {models.map((model) => {
          const isSelected = selectedModelId === model.id;

          return (
            <button
              key={model.id}
              onClick={() => handleModelSelect(model)}
              className={`
                w-full text-left p-3 rounded-lg font-medium transition-all duration-200
                ${isSelected
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{model.name}</div>
                  {model.description && (
                    <div className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                      {model.description}
                    </div>
                  )}
                  <div className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                    Type: {model.type}
                  </div>
                </div>
                {isSelected && (
                  <span className="text-xl">✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {selectedModelId && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            Model selected
          </p>
        </div>
      )}
    </div>
  );
}
