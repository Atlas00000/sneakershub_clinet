'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Material } from '@/types/materials';
import { cn } from '@/lib/utils';

interface MaterialTooltipProps {
  material: Material;
  isVisible: boolean;
  position: { x: number; y: number };
  showPrice?: boolean;
}

/**
 * Material Tooltip - Shows material details on hover/select
 * Rendered via portal to avoid positioning issues
 */
export default function MaterialTooltip({
  material,
  isVisible,
  position,
  showPrice = true,
}: MaterialTooltipProps) {
  const [mounted, setMounted] = useState(false);
  const color = material.properties.color || '#cccccc';
  const colorValue = typeof color === 'string' ? color : `#${color.getHexString()}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: [0.0, 0, 0.2, 1] }}
          className="fixed z-[100] pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -100%) translateY(-12px)',
          }}
        >
          <div className="glass-panel rounded-xl p-4 shadow-2xl border border-slate-700/50 min-w-[200px] max-w-[280px]">
            {/* Color preview */}
            <div
              className="w-full h-24 rounded-lg mb-3 border border-slate-700/50 shadow-inner"
              style={{ backgroundColor: colorValue }}
            />
            
            {/* Material info */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-body-m line-clamp-1 mb-1">
                    {material.name}
                  </h4>
                  {material.description && (
                    <p className="text-body-s text-slate-400 line-clamp-2">
                      {material.description}
                    </p>
                  )}
                </div>
                {material.premium && (
                  <div className="bg-gradient-to-r from-accent-violet-500 to-accent-violet-600 text-white text-label font-bold px-2 py-1 rounded-full flex-shrink-0">
                    Premium
                  </div>
                )}
              </div>
              
              {/* Price */}
              {showPrice && material.priceModifier !== undefined && (
                <div className="pt-2 border-t border-slate-700/50">
                  {material.priceModifier !== 0 ? (
                    <div className={cn(
                      'text-body-s font-semibold',
                      material.priceModifier > 0 ? 'text-error' : 'text-success'
                    )}>
                      {material.priceModifier > 0 ? '+' : ''}${material.priceModifier} upgrade
                    </div>
                  ) : (
                    <div className="text-body-s text-slate-400">
                      Included
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Arrow pointer */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
              <div className="w-3 h-3 bg-slate-800 border-r border-b border-slate-700/50 rotate-45" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(tooltipContent, document.body);
}

