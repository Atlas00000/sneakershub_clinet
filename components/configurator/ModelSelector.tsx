'use client';

import { useEffect, useState } from 'react';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import modelsData from '@/data/models.json';
import { Panel } from '@/components/ui';
import ModelGrid from './ModelGrid';
import ModelTooltip from './ModelTooltip';
import { getModelGradient, getModelIcon } from './ModelSwatch';

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
 * Uses circular swatches in a compact grid layout for minimalistic design
 */
export default function ModelSelector() {
  const { selectedModelId, setModel } = useConfiguratorStore();
  const models = modelsData.models as Model[];
  const [hoveredModel, setHoveredModel] = useState<Model | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

  const handleHoverChange = (model: Model | null, isHovering: boolean, position: { x: number; y: number }) => {
    if (isHovering && model) {
      setHoveredModel(model);
      setTooltipPosition(position);
    } else {
      setHoveredModel(null);
    }
  };

  return (
    <>
      <Panel
        title="Model"
        description="Select your canvas—choose from our collection of premium 3D sneaker models. Each model serves as your foundation for creating unique designs with real-time photorealistic rendering."
        divider={true}
      >
        <ModelGrid
          models={models}
          selectedModelId={selectedModelId}
          onModelSelect={handleModelSelect}
          onHoverChange={handleHoverChange}
        />
      </Panel>

      {/* Model Tooltip - shows on hover */}
      {hoveredModel && (
        <ModelTooltip
          model={hoveredModel}
          isVisible={!!hoveredModel}
          position={tooltipPosition}
          gradient={getModelGradient(hoveredModel)}
          icon={getModelIcon(hoveredModel)}
        />
      )}
    </>
  );
}
