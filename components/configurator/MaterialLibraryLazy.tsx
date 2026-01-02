'use client';

import { lazy, Suspense } from 'react';
import { Panel } from '@/components/ui';
import MaterialLibraryLoader from './MaterialLibraryLoader';

// Lazy load MaterialLibrary component
const MaterialLibrary = lazy(() => import('./MaterialLibrary'));

/**
 * Lazy-Loaded MaterialLibrary Wrapper
 * 
 * Wraps MaterialLibrary with React.lazy() and Suspense for code splitting.
 * This reduces the initial bundle size and improves page load performance.
 * 
 * The component is only loaded when it's actually rendered (when user
 * scrolls to it or when sidebar is opened on mobile).
 */
export default function MaterialLibraryLazy() {
  return (
    <Suspense
      fallback={
        <Panel
          title="Material Library"
          description="Browse textures and finishes for your sneaker components"
          divider={true}
          padding="none"
        >
          <MaterialLibraryLoader />
        </Panel>
      }
    >
      <MaterialLibrary />
    </Suspense>
  );
}

