'use client';

import { useConfiguratorStore } from '@/stores/configuratorStore';
import { ComponentDisplayNames } from '@/types/models';

interface ComponentLabelOverlayProps {
  /**
   * Whether labels are enabled
   */
  enabled?: boolean;
}

/**
 * HTML overlay component that displays component names on hover
 * Renders labels positioned over the 3D scene
 * This component reads label position from the store (updated by ComponentLabelTracker inside Canvas)
 */
export default function ComponentLabelOverlay({
  enabled = true,
}: ComponentLabelOverlayProps) {
  const { labelPosition, hoveredComponent } = useConfiguratorStore();

  if (!enabled || !labelPosition || !labelPosition.visible || !hoveredComponent) {
    return null;
  }

  // Use ComponentDisplayNames for proper component naming (same as ComponentSelector)
  const displayName = ComponentDisplayNames[hoveredComponent] || labelPosition.componentName;

  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left: `${labelPosition.x}px`,
        top: `${labelPosition.y}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div className="bg-black/80 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-lg backdrop-blur-sm border border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <span>{displayName}</span>
        </div>
        {/* Arrow pointing down to the component */}
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid rgba(0, 0, 0, 0.8)',
          }}
        />
      </div>
    </div>
  );
}

