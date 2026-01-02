'use client';

import ComponentSwatch from './ComponentSwatch';
import { ComponentType } from '@/types/models';
import { motion } from 'framer-motion';

interface ComponentGridProps {
  components: ComponentType[];
  selectedComponent?: ComponentType | null;
  componentCounts: Map<ComponentType, number>;
  onComponentSelect: (componentType: ComponentType) => void;
  onHoverChange: (componentType: ComponentType | null, isHovering: boolean, position: { x: number; y: number }) => void;
}

/**
 * Compact circular component grid - efficient space usage with small circular swatches
 */
export default function ComponentGrid({
  components,
  selectedComponent,
  componentCounts,
  onComponentSelect,
  onHoverChange,
}: ComponentGridProps) {
  return (
    <div className="grid grid-cols-6 gap-3 justify-items-center">
      {components.map((componentType, index) => {
        const isSelected = selectedComponent === componentType;
        const count = componentCounts.get(componentType) || 0;
        
        return (
          <motion.div
            key={componentType}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.01,
              duration: 0.3,
              ease: [0.0, 0, 0.2, 1]
            }}
          >
            <ComponentSwatch
              componentType={componentType}
              isSelected={isSelected}
              count={count > 1 ? count : undefined}
              onClick={() => onComponentSelect(componentType)}
              onHoverChange={(isHovering, position) => 
                onHoverChange(isHovering ? componentType : null, isHovering, position)
              }
            />
          </motion.div>
        );
      })}
    </div>
  );
}

