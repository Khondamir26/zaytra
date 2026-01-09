'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';

interface AnimatedSphereProps {
  position: [number, number, number]
  texture: string
  scale?: number
}

export const AnimatedSphere = ({ position, texture, scale = 1 }: AnimatedSphereProps) => {
  const meshRef = useRef<Mesh>(null!)

  // Load texture
  const textureMap = useLoader(TextureLoader, texture)

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return

    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = Math.sin(t) * 0.2
    meshRef.current.rotation.y += 0.01
    meshRef.current.position.y = position[1] + Math.sin(t * 2) * 0.3
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={textureMap}
        metalness={0.3}
        roughness={0.2}
        emissive="#112244"
        emissiveIntensity={0.1}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}
