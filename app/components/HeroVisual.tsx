"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/* ----------------------------------------------------------------
   Morphing organic orb (lime, distort) + outer wireframe ico ring.
   Mouse reactive — both shapes track cursor with subtle parallax.
   ---------------------------------------------------------------- */
function Orb() {
  const blobRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const wire2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const m = state.mouse;
    const t = state.clock.elapsedTime;

    if (blobRef.current) {
      // base slow rotation
      blobRef.current.rotation.x += delta * 0.12;
      blobRef.current.rotation.y += delta * 0.18;
      // mouse parallax — gentle
      blobRef.current.position.x += (m.x * 0.3 - blobRef.current.position.x) * 0.05;
      blobRef.current.position.y += (m.y * 0.3 - blobRef.current.position.y) * 0.05;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x += delta * 0.05;
      wireRef.current.rotation.y -= delta * 0.08;
      wireRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
    }
    if (wire2Ref.current) {
      wire2Ref.current.rotation.x -= delta * 0.07;
      wire2Ref.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <>
      {/* outer wireframe ring 1 — large, slow, teal */}
      <mesh ref={wireRef} scale={2.1}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#0d9488" wireframe transparent opacity={0.35} />
      </mesh>

      {/* outer wireframe ring 2 — slightly smaller, opposite spin, lime */}
      <mesh ref={wire2Ref} scale={1.78}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#84cc16" wireframe transparent opacity={0.5} />
      </mesh>

      {/* center morphing blob — gradient feel via emissive + distort material */}
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.7}>
        <mesh ref={blobRef} scale={1.25}>
          <icosahedronGeometry args={[1, 64]} />
          <MeshDistortMaterial
            color="#bef264"
            metalness={0.55}
            roughness={0.18}
            distort={0.5}
            speed={1.6}
            emissive={"#84cc16"}
            emissiveIntensity={0.18}
          />
        </mesh>
      </Float>
    </>
  );
}

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-[480px] aspect-square">
      {/* glow halo behind canvas */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(132,204,22,0.20) 0%, rgba(13,148,136,0.10) 40%, transparent 70%)",
        }}
      />

      {/* corner labels — anchored, not floating UI cards */}
      <div className="absolute top-0 left-0 z-10 flex items-center gap-2">
        <span className="block w-1.5 h-1.5 rounded-full bg-volt pulse-dot" />
        <span className="h-mono text-stone">interactive</span>
      </div>
      <div className="absolute top-0 right-0 z-10 h-mono text-stone text-right">
        morphing.three.js
      </div>
      <div className="absolute bottom-0 left-0 z-10 h-mono text-stone">
        ↳ move your cursor
      </div>
      <div className="absolute bottom-0 right-0 z-10 h-mono text-stone text-right">
        v0.5 · 2026
      </div>

      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 3, 3]} intensity={1.1} />
        <pointLight position={[-3, -2, -3]} intensity={0.7} color="#0d9488" />
        <pointLight position={[3, -3, 2]} intensity={0.5} color="#84cc16" />
        <Orb />
      </Canvas>
    </div>
  );
}
