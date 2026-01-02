'use client';

import { useState, useMemo } from 'react';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import { Material, MaterialCategory } from '@/types/materials';
import { ComponentType } from '@/types/models';
import MaterialGrid from './MaterialGrid';
import MaterialTooltip from './MaterialTooltip';
import materialsData from '@/data/materials.json';
import { Panel, Input, Button } from '@/components/ui';
import { useDebounce } from '@/hooks/useDebounce';

interface MaterialLibraryProps {
  /**
   * Filter materials by selected component type
   * If provided, only shows materials compatible with this component
   */
  filterByComponent?: ComponentType | null;
}

/**
 * Material Library - Browse and select textures for your sneaker design
 */
export default function MaterialLibrary({ filterByComponent }: MaterialLibraryProps) {
  const { selectedComponent, materialMap, setMaterial } = useConfiguratorStore();
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredMaterial, setHoveredMaterial] = useState<Material | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Debounce search query to avoid filtering on every keystroke
  // 300ms delay provides good balance between responsiveness and performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Get materials from data
  const allMaterials: Material[] = materialsData.materials as Material[];

  // Filter materials using debounced search query
  const filteredMaterials = useMemo(() => {
    let filtered = allMaterials;

    // Filter by component compatibility
    const componentToFilter = filterByComponent || selectedComponent;
    if (componentToFilter) {
      filtered = filtered.filter((material) => {
        // If material has compatibleComponents, check if it includes the component
        if (material.compatibleComponents && material.compatibleComponents.length > 0) {
          return material.compatibleComponents.includes(componentToFilter);
        }
        // If no restrictions, allow all materials
        return true;
      });
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((material) => material.category === selectedCategory);
    }

    // Filter by search query (using debounced value)
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (material) =>
          material.name.toLowerCase().includes(query) ||
          material.description?.toLowerCase().includes(query) ||
          material.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allMaterials, filterByComponent, selectedComponent, selectedCategory, debouncedSearchQuery]);

  const handleMaterialSelect = (material: Material) => {
    const component = filterByComponent || selectedComponent;
    if (component) {
      setMaterial(component, material);
    }
  };

  const handleHoverChange = (material: Material | null, isHovering: boolean, position: { x: number; y: number }) => {
    if (isHovering && material) {
      setHoveredMaterial(material);
      setTooltipPosition(position);
    } else {
      setHoveredMaterial(null);
    }
  };

  const categories: (MaterialCategory | 'all')[] = ['all' as const, ...(materialsData.categories as MaterialCategory[])];

  // Get selected material ID
  const componentToFilter = filterByComponent || selectedComponent;
  const selectedMaterialId = componentToFilter && materialMap.has(componentToFilter)
    ? materialMap.get(componentToFilter)?.id || null
    : null;

  // Category display names
  const categoryLabels: Record<MaterialCategory | 'all', string> = {
    all: 'All Textures',
    leather: 'Leather',
    fabric: 'Fabric',
    synthetic: 'Synthetic',
    rubber: 'Rubber',
    metal: 'Metal',
    premium: 'Premium',
  };

  return (
    <Panel
      title="Material Library"
      description="Explore our curated collection of premium materials and textures. From luxurious leathers and rich suedes to durable canvas and premium synthetics—each material features PBR rendering for photorealistic results. Apply instantly and see your design come to life in real-time."
      divider={true}
      padding="none"
    >
      <div className="space-y-4">
        {/* Search bar */}
        <div className="px-6 pt-6">
          <Input
            type="text"
            placeholder="Search textures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
        </div>

        {/* Category filters */}
        <div className="px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'primary' : 'secondary'}
                size="sm"
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </div>
        </div>

        {/* Materials grid */}
        <div className="px-6 pb-4">
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-16 text-slate-400 animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <p className="text-body-m font-semibold mb-2 text-slate-300">No textures found</p>
              <p className="text-body-s">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <MaterialGrid
                materials={filteredMaterials}
                selectedMaterialId={selectedMaterialId || undefined}
                onMaterialSelect={handleMaterialSelect}
                onHoverChange={handleHoverChange}
              />
              
              {/* Results count */}
              <div className="mt-4 text-body-s text-slate-400 text-center pt-3 border-t border-slate-700/50">
                {filteredMaterials.length} {filteredMaterials.length === 1 ? 'texture' : 'textures'} available
              </div>
            </>
          )}
        </div>

        {/* Material Tooltip - shows on hover (rendered via portal) */}
        {hoveredMaterial && tooltipPosition.x > 0 && tooltipPosition.y > 0 && (
          <MaterialTooltip
            material={hoveredMaterial}
            isVisible={true}
            position={tooltipPosition}
            showPrice={true}
          />
        )}
      </div>
    </Panel>
  );
}

