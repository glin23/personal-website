"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { projects, type Project } from "@/lib/projects";

// generate a project face as a procedural texture so we don't need image assets
function makeFaceTexture(project: Project) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const ctx = c.getContext("2d")!;

  // base
  ctx.fillStyle = project.faceColor;
  ctx.fillRect(0, 0, 1024, 1024);

  // grid dots
  ctx.fillStyle = "rgba(24, 24, 27, 0.08)";
  for (let x = 32; x < 1024; x += 48) {
    for (let y = 32; y < 1024; y += 48) {
      ctx.beginPath();
      ctx.arc(x, y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // accent corner triangle
  ctx.fillStyle = project.faceAccent;
  ctx.beginPath();
  ctx.moveTo(1024, 0);
  ctx.lineTo(1024, 200);
  ctx.lineTo(824, 0);
  ctx.closePath();
  ctx.fill();

  // top bar - mono label
  ctx.fillStyle = "rgba(82, 82, 91, 0.7)";
  ctx.font = "500 24px 'JetBrains Mono', monospace";
  ctx.fillText("PROJECT // " + project.number, 60, 80);

  // big number
  ctx.fillStyle = project.faceAccent;
  ctx.font = "900 360px 'Bricolage Grotesque', sans-serif";
  ctx.fillText(project.number, 50, 480);

  // project name
  ctx.fillStyle = "#18181b";
  ctx.font = "800 88px 'Bricolage Grotesque', sans-serif";
  ctx.fillText(project.name, 60, 620);

  // tagline
  ctx.fillStyle = "rgba(82, 82, 91, 0.85)";
  ctx.font = "500 28px 'Bricolage Grotesque', sans-serif";
  // wrap tagline
  const words = project.tagline.split(" ");
  let line = "";
  let yy = 690;
  for (const w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > 900) {
      ctx.fillText(line, 60, yy);
      line = w + " ";
      yy += 38;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, 60, yy);

  // metrics row at bottom
  ctx.fillStyle = "rgba(82, 82, 91, 0.6)";
  ctx.font = "500 20px 'JetBrains Mono', monospace";
  let mx = 60;
  for (const m of project.metrics) {
    ctx.fillText(m, mx, 940);
    mx += ctx.measureText(m).width + 60;
  }

  // bottom accent bar
  ctx.fillStyle = project.faceAccent;
  ctx.fillRect(0, 1010, 1024, 14);

  // hover hint
  ctx.fillStyle = "rgba(82, 82, 91, 0.6)";
  ctx.font = "500 20px 'JetBrains Mono', monospace";
  ctx.fillText("CLICK TO EXPLORE →", 60, 980);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function CubeMesh({
  onSelect,
  hoveredIndex,
  setHoveredIndex,
  draggable,
  dragState,
}: {
  onSelect: (p: Project) => void;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  draggable?: boolean;
  dragState: React.MutableRefObject<{
    active: boolean;
    moved: boolean;
    lastX: number;
    lastY: number;
    velY: number;
    velX: number;
  }>;
}) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const lastHoveredRef = useRef<number | null>(null);

  // 4 visible faces (front, right, back, left). top/bottom are blank.
  const faceProjects = useMemo(() => {
    const ordered = [...projects];
    while (ordered.length < 4) ordered.push(projects[0]);
    return ordered.slice(0, 4);
  }, []);

  const textures = useMemo(() => {
    return faceProjects.map((p) => makeFaceTexture(p));
  }, [faceProjects]);

  // Box face order in three.js: +X, -X, +Y, -Y, +Z, -Z
  // we map: front (+Z) = 0, right (+X) = 1, back (-Z) = 2, left (-X) = 3
  const materials = useMemo(() => {
    const blank = new THREE.MeshStandardMaterial({
      color: "#fafafa",
      metalness: 0.6,
      roughness: 0.3,
    });
    const m = (i: number) =>
      new THREE.MeshStandardMaterial({
        map: textures[i],
        metalness: 0.4,
        roughness: 0.55,
        emissive: new THREE.Color(faceProjects[i].faceAccent).multiplyScalar(0.04),
      });
    // order: +X right, -X left, +Y top, -Y bottom, +Z front, -Z back
    return [m(1), m(3), blank, blank, m(0), m(2)];
  }, [textures, faceProjects]);

  // map: which face corresponds to each project index
  // 0=front(+Z), 1=right(+X), 2=back(-Z), 3=left(-X)
  // rotation Y to bring each to front: 0→0, 1→-π/2, 2→π, 3→π/2
  const targetRotationFor = (i: number) => -i * (Math.PI / 2);

  const baseRotY = useRef(0);
  const targetRotY = useRef<number | null>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (draggable && dragState.current.active) {
      // user is dragging — apply momentum directly
      group.current.rotation.y += dragState.current.velY;
      group.current.rotation.x = THREE.MathUtils.clamp(
        group.current.rotation.x + dragState.current.velX,
        -0.6,
        0.6
      );
      // velocities are set externally; decay them toward zero
      dragState.current.velY *= 0.6;
      dragState.current.velX *= 0.6;
    } else if (draggable && Math.abs(dragState.current.velY) > 0.0005) {
      // momentum spin after release
      group.current.rotation.y += dragState.current.velY;
      dragState.current.velY *= 0.94;
    } else if (hoveredIndex !== null && !draggable) {
      // snap to face on hover (only when NOT in draggable mode)
      const target = targetRotationFor(hoveredIndex);
      let cur = group.current.rotation.y;
      while (target - cur > Math.PI) cur += Math.PI * 2;
      while (target - cur < -Math.PI) cur -= Math.PI * 2;
      group.current.rotation.y += (target - cur) * Math.min(delta * 4, 0.2);
      group.current.rotation.x += (0 - group.current.rotation.x) * Math.min(delta * 4, 0.2);
    } else {
      // idle slow rotate
      group.current.rotation.y += delta * (draggable ? 0.08 : 0.18);
      if (!draggable) {
        group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
      }
    }
    baseRotY.current = group.current.rotation.y;
    // mouse-react micro tilt only in non-drag mode
    if (!draggable) {
      const m = state.mouse;
      group.current.rotation.z = m.x * 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.6}>
      <group ref={group}>
        <mesh
          ref={mesh}
          material={materials}
          onPointerMove={(e) => {
            const n = e.face?.normal;
            if (!n) return;
            const worldNormal = n.clone().applyQuaternion(group.current!.quaternion);
            const ax = Math.abs(worldNormal.x);
            const az = Math.abs(worldNormal.z);
            let idx: number;
            if (az >= ax) {
              idx = worldNormal.z > 0 ? 0 : 2;
            } else {
              idx = worldNormal.x > 0 ? 1 : 3;
            }
            lastHoveredRef.current = idx;
            if (idx !== hoveredIndex) setHoveredIndex(idx);
          }}
          onPointerOut={() => {
            setHoveredIndex(null);
          }}
          onClick={(e) => {
            e.stopPropagation();
            const n = e.face?.normal;
            let idx = lastHoveredRef.current;
            if (n) {
              const worldNormal = n.clone().applyQuaternion(group.current!.quaternion);
              const ax = Math.abs(worldNormal.x);
              const az = Math.abs(worldNormal.z);
              if (az >= ax) idx = worldNormal.z > 0 ? 0 : 2;
              else idx = worldNormal.x > 0 ? 1 : 3;
            }
            if (idx !== null && idx !== undefined) {
              onSelect(faceProjects[idx]);
            }
          }}
        >
          <boxGeometry args={[2.4, 2.4, 2.4, 1, 1, 1]} />
        </mesh>

        {/* edge wireframe accent */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.41, 2.41, 2.41)]} />
          <lineBasicMaterial
            color={hoveredIndex !== null ? faceProjects[hoveredIndex].faceAccent : "#d4d4d8"}
            transparent
            opacity={hoveredIndex !== null ? 0.9 : 0.4}
          />
        </lineSegments>
      </group>
    </Float>
  );
}

export function ProjectCube({
  onSelect,
  draggable,
}: {
  onSelect: (p: Project) => void;
  draggable?: boolean;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoveredProject =
    hoveredIndex !== null ? projects[Math.min(hoveredIndex, projects.length - 1)] : null;

  // drag state — shared with CubeMesh via ref
  const dragState = useRef({
    active: false,
    moved: false,
    lastX: 0,
    lastY: 0,
    velY: 0,
    velX: 0,
  });

  return (
    <div
      className="relative w-full h-full"
      onPointerDown={(e) => {
        if (!draggable) return;
        dragState.current.active = true;
        dragState.current.moved = false;
        dragState.current.lastX = e.clientX;
        dragState.current.lastY = e.clientY;
        dragState.current.velY = 0;
        dragState.current.velX = 0;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!draggable || !dragState.current.active) return;
        const dx = e.clientX - dragState.current.lastX;
        const dy = e.clientY - dragState.current.lastY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          dragState.current.moved = true;
        }
        dragState.current.velY = dx * 0.005;
        dragState.current.velX = dy * 0.005;
        dragState.current.lastX = e.clientX;
        dragState.current.lastY = e.clientY;
      }}
      onPointerUp={(e) => {
        if (!draggable) return;
        dragState.current.active = false;
        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}
      }}
      style={{ touchAction: draggable ? "none" : undefined }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#d4ff1a" />
        <pointLight position={[-5, -3, -5]} intensity={0.6} color="#5eead4" />
        <pointLight position={[0, 4, 4]} intensity={0.3} color="#ffffff" />
        <CubeMesh
          onSelect={(p) => {
            // suppress click-open if user dragged
            if (dragState.current.moved) return;
            onSelect(p);
          }}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          draggable={draggable}
          dragState={dragState}
        />
      </Canvas>

      {/* hover label overlay */}
      {hoveredProject && !dragState.current.active && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-fog/60 bg-ink/70 backdrop-blur">
            <span className="h-mono text-volt">EXPLORE</span>
            <span className="text-bone text-sm font-medium">{hoveredProject.name}</span>
            <span className="text-stone text-xs">↗</span>
          </div>
        </div>
      )}
    </div>
  );
}
