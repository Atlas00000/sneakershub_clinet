'use client';

import { useState, useMemo } from 'react';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import { Material, MaterialCategory } from '@/types/materials';
import { ComponentType } from '@/types/models';
import MaterialSwatch from './MaterialSwatch';
import materialsData from '@/data/materials.json';

interface MaterialLibraryProps {
  /**
   * Filter materials by selected component type
   * If provided, only shows materials compatible with this component
   */
  filterByComponent?: ComponentType | null;
}

/**
 * Material Library component - displays available materials in a grid
 */
export default function MaterialLibrary({ filterByComponent }: MaterialLibraryProps) {
  const { selectedComponent, materialMap, setMaterial } = useConfiguratorStore();
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get materials from data
  const allMaterials: Material[] = materialsData.materials as Material[];

  // Filter materials
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

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (material) =>
          material.name.toLowerCase().includes(query) ||
          material.description?.toLowerCase().includes(query) ||
          material.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allMaterials, filterByComponent, selectedComponent, selectedCategory, searchQuery]);

  const handleMaterialSelect = (material: Material) => {
    const component = filterByComponent || selectedComponent;
    if (component) {
      setMaterial(component, material);
    }
  };

  const categories: (MaterialCategory | 'all')[] = ['all', ...materialsData.categories];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Material Library</h3>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search materials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Category filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Materials grid */}
      {filteredMaterials.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No materials found. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMaterials.map((material) => {
            const component = filterByComponent || selectedComponent;
            const isSelected =
              component !== null &&
              materialMap.has(component) &&
              materialMap.get(component)?.id === material.id;

            return (
              <MaterialSwatch
                key={material.id}
                material={material}
                isSelected={isSelected}
                onClick={() => handleMaterialSelect(material)}
                showPrice={true}
              />
            );
          })}
        </div>
      )}

      {/* Results count */}
      <div className="mt-4 text-sm text-gray-500 text-center">
        Showing {filteredMaterials.length} of {allMaterials.length} materials
      </div>
    </div>
  );
}

