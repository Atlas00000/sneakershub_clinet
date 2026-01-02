'use client';

import ModelSwatch from './ModelSwatch';
import { motion } from 'framer-motion';

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

interface ModelGridProps {
  models: Model[];
  selectedModelId?: string | null;
  onModelSelect: (model: Model) => void;
  onHoverChange: (model: Model | null, isHovering: boolean, position: { x: number; y: number }) => void;
}

/**
 * Compact circular model grid - efficient space usage with small circular swatches
 */
export default function ModelGrid({
  models,
  selectedModelId,
  onModelSelect,
  onHoverChange,
}: ModelGridProps) {
  return (
    <div className="grid grid-cols-6 gap-3 justify-items-center">
      {models.map((model, index) => {
        const isSelected = selectedModelId === model.id;
        
        return (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.01,
              duration: 0.3,
              ease: [0.0, 0, 0.2, 1]
            }}
          >
            <ModelSwatch
              model={model}
              isSelected={isSelected}
              onClick={() => onModelSelect(model)}
              onHoverChange={(isHovering, position) => 
                onHoverChange(isHovering ? model : null, isHovering, position)
              }
            />
          </motion.div>
        );
      })}
    </div>
  );
}

