'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { AnimatedSphere } from '@/components/AnimatedSphere';

const Scene3D = () => {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Suspense>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* Your animated sphere */}
          <AnimatedSphere position={[0, 0, 0]} texture="/3d/p6.png" scale={1.5} />

          {/* Extras */}
          <Environment preset="night" />
          <OrbitControls
            enableZoom
            enablePan
            enableRotate
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
            minDistance={5}
            maxDistance={5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D
