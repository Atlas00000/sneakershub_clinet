'use client';

import { Material, MaterialCategory } from '@/types/materials';

interface MaterialSwatchProps {
  material: Material;
  isSelected?: boolean;
  onClick?: () => void;
  showPrice?: boolean;
}

/**
 * Category icons/colors
 */
const CategoryStyles: Record<MaterialCategory, { bg: string; border: string }> = {
  [MaterialCategory.LEATHER]: { bg: 'bg-amber-50', border: 'border-amber-300' },
  [MaterialCategory.FABRIC]: { bg: 'bg-blue-50', border: 'border-blue-300' },
  [MaterialCategory.SYNTHETIC]: { bg: 'bg-gray-50', border: 'border-gray-300' },
  [MaterialCategory.RUBBER]: { bg: 'bg-slate-50', border: 'border-slate-300' },
  [MaterialCategory.METAL]: { bg: 'bg-yellow-50', border: 'border-yellow-300' },
  [MaterialCategory.PREMIUM]: { bg: 'bg-purple-50', border: 'border-purple-400' },
};

/**
 * Individual material swatch card
 */
export default function MaterialSwatch({
  material,
  isSelected = false,
  onClick,
  showPrice = true,
}: MaterialSwatchProps) {
  const categoryStyle = CategoryStyles[material.category];
  const color = material.properties.color || '#cccccc';
  const colorValue = typeof color === 'string' ? color : `#${color.getHexString()}`;

  return (
    <button
      onClick={onClick}
      className={`
        relative p-4 rounded-lg border-2 transition-all duration-200
        ${isSelected
          ? 'border-blue-500 shadow-lg scale-105'
          : `${categoryStyle.border} hover:border-blue-400 hover:shadow-md`
        }
        ${categoryStyle.bg}
        ${material.premium ? 'ring-2 ring-purple-300' : ''}
      `}
    >
      {/* Premium badge */}
      {material.premium && (
        <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
          Premium
        </div>
      )}

      {/* Color preview */}
      <div
        className="w-full h-20 rounded-md mb-3 border border-gray-300 shadow-inner"
        style={{ backgroundColor: colorValue }}
      />

      {/* Material info */}
      <div className="text-left">
        <h4 className="font-semibold text-gray-900 mb-1">{material.name}</h4>
        {material.description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{material.description}</p>
        )}
        
        {/* Price modifier */}
        {showPrice && material.priceModifier !== undefined && material.priceModifier !== 0 && (
          <div className={`
            text-sm font-medium
            ${material.priceModifier > 0 ? 'text-red-600' : 'text-green-600'}
          `}>
            {material.priceModifier > 0 ? '+' : ''}${material.priceModifier}$
          </div>
        )}
        {showPrice && material.priceModifier === 0 && (
          <div className="text-sm text-gray-500">Base price</div>
        )}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}

