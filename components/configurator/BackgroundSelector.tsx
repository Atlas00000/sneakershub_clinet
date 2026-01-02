'use client';

import { useState } from 'react';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import backgroundsData from '@/data/backgrounds.json';
import { Panel } from '@/components/ui';
import BackgroundGrid from './BackgroundGrid';
import BackgroundTooltip from './BackgroundTooltip';
import { getBackgroundGradient } from './BackgroundSwatch';

interface Background {
  id: string;
  name: string;
  url: string;
  thumbnail: string | null;
  description: string;
}

/**
 * Background selector UI - allows users to select HDR background environments
 * Uses circular swatches in a compact grid layout for minimalistic design
 */
export default function BackgroundSelector() {
  const { selectedBackgroundUrl, setBackground } = useConfiguratorStore();
  const backgrounds = backgroundsData.backgrounds as Background[];
  const [hoveredBackground, setHoveredBackground] = useState<Background | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleBackgroundSelect = (background: Background) => {
    setBackground(background.url);
  };

  const handleHoverChange = (background: Background | null, isHovering: boolean, position: { x: number; y: number }) => {
    if (isHovering && background) {
      setHoveredBackground(background);
      setTooltipPosition(position);
    } else {
      setHoveredBackground(null);
    }
  };

  return (
    <>
      <Panel
        title="Background"
        description="Set the stage for your creation. Choose from professional HDR environments that showcase your design with realistic lighting and atmosphere, bringing your sneaker to life in stunning detail."
        divider={true}
      >
        <BackgroundGrid
          backgrounds={backgrounds}
          selectedBackgroundUrl={selectedBackgroundUrl}
          onBackgroundSelect={handleBackgroundSelect}
          onHoverChange={handleHoverChange}
        />
      </Panel>

      {/* Background Tooltip - shows on hover */}
      {hoveredBackground && (
        <BackgroundTooltip
          background={hoveredBackground}
          isVisible={!!hoveredBackground}
          position={tooltipPosition}
          gradient={getBackgroundGradient(hoveredBackground)}
        />
      )}
    </>
  );
}

