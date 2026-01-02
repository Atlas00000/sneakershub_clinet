'use client';

import BackgroundSwatch from './BackgroundSwatch';
import { motion } from 'framer-motion';

interface Background {
  id: string;
  name: string;
  url: string;
  thumbnail: string | null;
  description: string;
}

interface BackgroundGridProps {
  backgrounds: Background[];
  selectedBackgroundUrl?: string | null;
  onBackgroundSelect: (background: Background) => void;
  onHoverChange: (background: Background | null, isHovering: boolean, position: { x: number; y: number }) => void;
}

/**
 * Compact circular background grid - efficient space usage with small circular swatches
 */
export default function BackgroundGrid({
  backgrounds,
  selectedBackgroundUrl,
  onBackgroundSelect,
  onHoverChange,
}: BackgroundGridProps) {
  return (
    <div className="grid grid-cols-6 gap-3 justify-items-center">
      {backgrounds.map((background, index) => {
        const isSelected = selectedBackgroundUrl === background.url;
        
        return (
          <motion.div
            key={background.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.01,
              duration: 0.3,
              ease: [0.0, 0, 0.2, 1]
            }}
          >
            <BackgroundSwatch
              background={background}
              isSelected={isSelected}
              onClick={() => onBackgroundSelect(background)}
              onHoverChange={(isHovering, position) => 
                onHoverChange(isHovering ? background : null, isHovering, position)
              }
            />
          </motion.div>
        );
      })}
    </div>
  );
}

