'use client';

import { useConfiguratorStore } from '@/stores/configuratorStore';
import { ComponentType, ComponentDisplayNames } from '@/types/models';

/**
 * Icons/Emojis for each component type
 */
const ComponentIcons: Record<ComponentType, string> = {
  [ComponentType.SOLE]: '👟',
  [ComponentType.UPPER]: '🎨',
  [ComponentType.MIDSOLE]: '⚪',
  [ComponentType.OUTSOLE]: '🔲',
  [ComponentType.LACES]: '🎀',
  [ComponentType.LOGO]: '🏷️',
  [ComponentType.HEEL_TAB]: '📌',
  [ComponentType.TONGUE]: '👅',
  [ComponentType.EYELETS]: '👁️',
  [ComponentType.LINING]: '🧵',
  [ComponentType.UNKNOWN]: '❓',
};

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
 */
export default function ComponentSelector({ showOnlyAvailable = true }: ComponentSelectorProps) {
  const { selectedComponent, componentMap, setComponent } = useConfiguratorStore();

  // Get available components (those that exist in the model)
  const availableComponents = COMPONENT_ORDER.filter((type) => {
    if (!showOnlyAvailable) return true;
    return componentMap.has(type) && componentMap.get(type)!.length > 0;
  });

  // If no components are available, show a message
  if (availableComponents.length === 0) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
        No components available. Load a model first.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Component</h3>
      <div className="flex flex-wrap gap-2">
        {availableComponents.map((componentType) => {
          const isSelected = selectedComponent === componentType;
          const icon = ComponentIcons[componentType];
          const name = ComponentDisplayNames[componentType];
          const count = componentMap.get(componentType)?.length || 0;

          return (
            <button
              key={componentType}
              onClick={() => setComponent(isSelected ? null : componentType)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${isSelected
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                }
              `}
            >
              <span className="text-xl">{icon}</span>
              <span>{name}</span>
              {count > 1 && (
                <span className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${isSelected ? 'bg-blue-500' : 'bg-gray-300'}
                `}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {selectedComponent && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>{ComponentDisplayNames[selectedComponent]}</strong> selected for customization
          </p>
        </div>
      )}
    </div>
  );
}

