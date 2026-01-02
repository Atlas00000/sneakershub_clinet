import { ComponentType } from '@/types/models';

/**
 * Component Icons/Emojis
 * Contextual icons that align with the app theme and represent each component visually
 */
export const ComponentIcons: Record<ComponentType, string> = {
  [ComponentType.UPPER]: '👟', // Main shoe body
  [ComponentType.SOLE]: '⚫', // Sole/base
  [ComponentType.MIDSOLE]: '🔘', // Middle sole layer
  [ComponentType.OUTSOLE]: '⬛', // Outer sole/tread
  [ComponentType.LACES]: '🎀', // Shoe laces
  [ComponentType.TONGUE]: '👅', // Shoe tongue
  [ComponentType.HEEL_TAB]: '📌', // Heel pull tab
  [ComponentType.EYELETS]: '👁️', // Eyelets for laces
  [ComponentType.LOGO]: '🏷️', // Brand logo/badge
  [ComponentType.LINING]: '🧵', // Inner lining
  [ComponentType.UNKNOWN]: '❓', // Unknown component
};

