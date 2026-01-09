"use client"

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";

function AnimatedStars() {
  const starsRef = useRef<any>(null)

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.02 // smooth rotation
    }
  })

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={10}
      count={7000}
      factor={5}
      saturation={0}
      fade
      speed={2} 
    />
  )
}

export default function StarBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }} style={{ background: "transparent" }}>
        <AnimatedStars />
      </Canvas>
    </div>
  )
}
