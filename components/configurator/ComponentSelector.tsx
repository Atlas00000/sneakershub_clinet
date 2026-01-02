'use client';

import { useState } from 'react';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import { ComponentType } from '@/types/models';
import { Panel } from '@/components/ui';
import ComponentGrid from './ComponentGrid';
import ComponentTooltip from './ComponentTooltip';

/**
 * Order of components to display (excluding UNKNOWN)
 */
const COMPONENT_ORDER: ComponentType[] = [
  ComponentType.UPPER,
  ComponentType.SOLE,
  ComponentType.MIDSOLE,
  ComponentType.OUTSOLE,
  ComponentType.LACES,
  ComponentType.TONGUE,
  ComponentType.HEEL_TAB,
  ComponentType.EYELETS,
  ComponentType.LOGO,
  ComponentType.LINING,
];

interface ComponentSelectorProps {
  /**
   * Whether to show only components that exist in the model
   * @default true
   */
  showOnlyAvailable?: boolean;
}

/**
 * Component selector UI - allows users to select which part of the shoe to customize
 * Uses circular swatches in a compact grid layout for minimalistic design
 */
export default function ComponentSelector({ showOnlyAvailable = true }: ComponentSelectorProps) {
  const { selectedComponent, componentMap, setComponent } = useConfiguratorStore();
  const [hoveredComponent, setHoveredComponent] = useState<ComponentType | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Get available components (those that exist in the model)
  const availableComponents = COMPONENT_ORDER.filter((type) => {
    if (!showOnlyAvailable) return true;
    return componentMap.has(type);
  });

  // Create component counts map (always 1 if component exists, since ComponentMap stores single ComponentInfo per type)
  const componentCounts = new Map<ComponentType, number>();
  availableComponents.forEach((type) => {
    componentCounts.set(type, componentMap.has(type) ? 1 : 0);
  });

  // If no components are available, show a message
  if (availableComponents.length === 0) {
    return (
      <Panel
        title="Select Component"
        description="Precision customization starts here. Isolate and focus on specific parts of your sneaker—from the upper to the sole, laces to logo. Each component can be uniquely styled with different materials and finishes."
      >
        <div className="text-center py-8 text-slate-400 animate-fade-in">
          <div className="text-4xl mb-4">👟</div>
          <p className="text-body-m font-medium">No components available</p>
          <p className="text-body-s mt-1">Load a model first to begin customizing</p>
        </div>
      </Panel>
    );
  }

  const handleComponentSelect = (componentType: ComponentType) => {
    setComponent(selectedComponent === componentType ? null : componentType);
  };

  const handleHoverChange = (componentType: ComponentType | null, isHovering: boolean, position: { x: number; y: number }) => {
    if (isHovering && componentType) {
      setHoveredComponent(componentType);
      setTooltipPosition(position);
    } else {
      setHoveredComponent(null);
    }
  };

  return (
    <>
      <Panel
        title="Select Component"
        description="Precision customization starts here. Isolate and focus on specific parts of your sneaker—from the upper to the sole, laces to logo. Each component can be uniquely styled with different materials and finishes."
        divider={true}
      >
        <ComponentGrid
          components={availableComponents}
          selectedComponent={selectedComponent}
          componentCounts={componentCounts}
          onComponentSelect={handleComponentSelect}
          onHoverChange={handleHoverChange}
        />
      </Panel>

      {/* Component Tooltip - shows on hover */}
      {hoveredComponent && (
        <ComponentTooltip
          componentType={hoveredComponent}
          isVisible={!!hoveredComponent}
          position={tooltipPosition}
          count={componentCounts.get(hoveredComponent)}
        />
      )}
    </>
  );
}

