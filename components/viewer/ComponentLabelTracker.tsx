'use client';

import { ComponentMap } from '@/types/models';
import { useComponentLabel } from '@/hooks/useComponentLabel';

interface ComponentLabelTrackerProps {
  /**
   * Component map containing all components
   */
  componentMap: ComponentMap;
  
  /**
   * Whether label tracking is enabled
   */
  enabled?: boolean;
}

/**
 * Component that tracks component label positions inside Canvas context
 * Uses the hook to calculate positions and updates the store
 * This component must be rendered inside a Canvas
 */
export default function ComponentLabelTracker({
  componentMap,
  enabled = true,
}: ComponentLabelTrackerProps) {
  // This hook calculates label position and updates the store
  useComponentLabel(enabled ? componentMap : new Map());

  // This component doesn't render anything, it just tracks positions
  return null;
}

