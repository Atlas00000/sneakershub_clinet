'use client';

import { OrbitControls } from '@react-three/drei';

interface CameraControlsProps {
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
}

export default function CameraControls({
  enableZoom = true,
  enablePan = true,
  enableRotate = true,
}: CameraControlsProps) {
  return (
    <OrbitControls
      enableZoom={enableZoom}
      enablePan={enablePan}
      enableRotate={enableRotate}
      minDistance={5}
      maxDistance={15}
      target={[0, 0, 0]}
    />
  );
}

