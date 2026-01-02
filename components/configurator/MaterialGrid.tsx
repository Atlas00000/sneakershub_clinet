'use client';

import { Material } from '@/types/materials';
import MaterialSwatch from './MaterialSwatch';
import { motion } from 'framer-motion';

interface MaterialGridProps {
  materials: Material[];
  selectedMaterialId?: string | null;
  onMaterialSelect: (material: Material) => void;
  onHoverChange: (material: Material | null, isHovering: boolean, position: { x: number; y: number }) => void;
}

/**
 * Compact circular material grid - efficient space usage with small circular swatches
 */
export default function MaterialGrid({
  materials,
  selectedMaterialId,
  onMaterialSelect,
  onHoverChange,
}: MaterialGridProps) {
  return (
    <div className="grid grid-cols-6 gap-3 justify-items-center">
      {materials.map((material, index) => {
        const isSelected = selectedMaterialId === material.id;
        
        return (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.01,
              duration: 0.3,
              ease: [0.0, 0, 0.2, 1]
            }}
          >
            <MaterialSwatch
              material={material}
              isSelected={isSelected}
              onClick={() => onMaterialSelect(material)}
              onHoverChange={(isHovering, position) => 
                onHoverChange(isHovering ? material : null, isHovering, position)
              }
            />
          </motion.div>
        );
      })}
    </div>
  );
}
