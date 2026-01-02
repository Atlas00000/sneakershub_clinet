'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import { useConfiguratorStore } from '@/stores/configuratorStore';
import CameraControls from './CameraControls';
import LoadingSpinner from './LoadingSpinner';

interface SceneProps {
  children?: React.ReactNode;
}

export default function Scene({ children }: SceneProps) {
  const { selectedBackgroundUrl } = useConfiguratorStore();
  
  // Use selected background or fallback to default
  const hdrUrl = selectedBackgroundUrl || 'https://pub-42d9986d97a0490598cb89136641b713.r2.dev/brown_photostudio_01_1k.hdr';

  return (
    <div className="relative w-full h-screen bg-charcoal-900">
      <Suspense fallback={<LoadingSpinner message="Loading 3D scene..." size="lg" />}>
        <Canvas
          camera={{ position: [0, 1, 8], fov: 50 }}
          gl={{ antialias: true }}
        >
          {/* HDR Environment Map */}
          <Environment
            key={hdrUrl} // Force re-render when background changes
            files={hdrUrl}
            background={true}
          />
          
          {/* Fallback lighting (will be enhanced by HDR) */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          
          <CameraControls />
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}

