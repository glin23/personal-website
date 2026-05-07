"use client";

import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { projects, type Project } from "@/lib/projects";

/* ------------------------------------------------
   Texture generator (shared with hero ProjectCube)
   ------------------------------------------------ */
function makeFaceTexture(project: Project, big = false) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const ctx = c.getContext("2d")!;

  // base
  ctx.fillStyle = project.faceColor;
  ctx.fillRect(0, 0, 1024, 1024);

  // gradient wash
  const wash = ctx.createLinearGradient(0, 0, 1024, 1024);
  wash.addColorStop(0, project.faceAccent + "18");
  wash.addColorStop(1, "transparent");
  ctx.fillStyle = wash;
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
  ctx.lineTo(1024, 220);
  ctx.lineTo(804, 0);
  ctx.closePath();
  ctx.fill();

  // top label
  ctx.fillStyle = "rgba(82, 82, 91, 0.85)";
  ctx.font = "500 26px 'JetBrains Mono', monospace";
  ctx.fillText("// " + project.role.toUpperCase(), 60, 90);

  // big number
  ctx.fillStyle = project.faceAccent;
  ctx.font = "900 380px 'Bricolage Grotesque', sans-serif";
  ctx.fillText(project.number, 50, 480);

  // project name
  ctx.fillStyle = "#18181b";
  ctx.font = "800 96px 'Bricolage Grotesque', sans-serif";
  ctx.fillText(project.name, 60, 620);

  // tagline (wrapped)
  ctx.fillStyle = "rgba(82, 82, 91, 0.85)";
  ctx.font = "500 30px 'Bricolage Grotesque', sans-serif";
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

  // metrics row
  ctx.fillStyle = "rgba(82, 82, 91, 0.7)";
  ctx.font = "500 22px 'JetBrains Mono', monospace";
  let mx = 60;
  for (const m of project.metrics) {
    const t = m.toUpperCase();
    ctx.fillText(t, mx, 940);
    mx += ctx.measureText(t).width + 56;
  }

  // bottom accent bar
  ctx.fillStyle = project.faceAccent;
  ctx.fillRect(0, 1010, 1024, 14);

  // hover hint
  ctx.fillStyle = "rgba(82, 82, 91, 0.6)";
  ctx.font = "500 22px 'JetBrains Mono', monospace";
  ctx.fillText("CLICK TO EXPLORE →", 60, 980);

  void big;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/* ------------------------------------------------
   Single cube — one per project
   ------------------------------------------------ */
function CubeBlock({
  project,
  position,
  baseRotationY,
  isHovered,
  isOtherHovered,
  onHover,
  onLeave,
  onSelect,
  index,
}: {
  project: Project;
  position: [number, number, number];
  baseRotationY: number;
  isHovered: boolean;
  isOtherHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
  index: number;
}) {
  const group = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineBasicMaterial>(null);

  // 4 lateral faces all show the project, top/bottom blank
  const tex = useMemo(() => makeFaceTexture(project), [project]);

  const materials = useMemo(() => {
    const blank = new THREE.MeshStandardMaterial({
      color: "#fafafa",
      metalness: 0.6,
      roughness: 0.3,
    });
    const m = () =>
      new THREE.MeshStandardMaterial({
        map: tex,
        metalness: 0.4,
        roughness: 0.55,
        emissive: new THREE.Color(project.faceAccent).multiplyScalar(0.05),
      });
    // +X right, -X left, +Y top, -Y bottom, +Z front, -Z back
    return [m(), m(), blank, blank, m(), m()];
  }, [tex, project]);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (isHovered) {
      // snap to front face + scale up
      const targetY = baseRotationY;
      let cur = group.current.rotation.y;
      while (targetY - cur > Math.PI) cur += Math.PI * 2;
      while (targetY - cur < -Math.PI) cur -= Math.PI * 2;
      group.current.rotation.y += (targetY - cur) * Math.min(delta * 5, 0.25);
      group.current.rotation.x += (0 - group.current.rotation.x) * Math.min(delta * 5, 0.25);

      const targetScale = 1.18;
      group.current.scale.x += (targetScale - group.current.scale.x) * Math.min(delta * 6, 0.3);
      group.current.scale.y = group.current.scale.x;
      group.current.scale.z = group.current.scale.x;
    } else {
      // idle rotate
      const speed = isOtherHovered ? 0.06 : 0.25;
      group.current.rotation.y += delta * speed;
      group.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.12;

      // dim if another is hovered
      const targetScale = isOtherHovered ? 0.85 : 1.0;
      group.current.scale.x += (targetScale - group.current.scale.x) * Math.min(delta * 4, 0.2);
      group.current.scale.y = group.current.scale.x;
      group.current.scale.z = group.current.scale.x;
    }
  });

  return (
    <Float
      speed={1 + index * 0.2}
      rotationIntensity={0}
      floatIntensity={0.8}
      position={position}
    >
      <group ref={group}>
        {/* glow halo */}
        {isHovered && (
          <pointLight
            position={[0, 0, 0]}
            intensity={2.2}
            distance={4}
            color={project.faceAccent}
          />
        )}

        <mesh
          material={materials}
          onPointerOver={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            onHover();
          }}
          onPointerOut={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            onLeave();
          }}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          <boxGeometry args={[1.7, 1.7, 1.7]} />
        </mesh>

        {/* edges */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.71, 1.71, 1.71)]} />
          <lineBasicMaterial
            ref={lineRef}
            color={isHovered ? project.faceAccent : "#d4d4d8"}
            transparent
            opacity={isHovered ? 1 : 0.6}
          />
        </lineSegments>
      </group>
    </Float>
  );
}

/* ------------------------------------------------
   Field — N cubes spread across in one Canvas
   ------------------------------------------------ */
function CubeFieldScene({
  hovered,
  setHovered,
  onSelect,
}: {
  hovered: number | null;
  setHovered: (i: number | null) => void;
  onSelect: (p: Project) => void;
}) {
  // positions for 3 cubes — slight depth variation
  const positions: [number, number, number][] = [
    [-3.0, 0.2, 0],
    [0, -0.3, 0.4],
    [3.0, 0.4, 0],
  ];
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 5, 5]} intensity={0.7} color="#d4ff1a" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#5eead4" />
      <pointLight position={[0, 4, 4]} intensity={0.3} color="#ffffff" />
      {projects.map((p, i) => (
        <CubeBlock
          key={p.id}
          project={p}
          position={positions[i] ?? [0, 0, 0]}
          baseRotationY={0}
          isHovered={hovered === i}
          isOtherHovered={hovered !== null && hovered !== i}
          onHover={() => setHovered(i)}
          onLeave={() => setHovered((cur: number | null) => (cur === i ? null : cur) as any)}
          onSelect={() => onSelect(p)}
          index={i}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------
   Public component
   ------------------------------------------------ */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

export function ProjectsCubeField({
  onSelect,
}: {
  onSelect: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredProject = hovered !== null ? projects[hovered] : null;

  return (
    <section
      id="work"
      className="relative px-6 md:px-12 py-24 md:py-32 max-w-[1500px] mx-auto"
    >
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(212, 255, 26, 0.05), transparent 70%)",
        }}
      />

      <motion.div
        {...fadeUp}
        className="flex items-baseline justify-between mb-8 md:mb-14"
      >
        <div>
          <div className="h-mono text-stone mb-2">// 02 · WORK</div>
          <h2 className="h-display text-bone text-5xl md:text-7xl">Projects.</h2>
        </div>
        <div className="hidden md:flex items-center gap-3 h-mono text-stone">
          <span>{projects.length} shipped</span>
          <span className="text-fog">/</span>
          <span className="text-volt">hover any cube ↻</span>
        </div>
      </motion.div>

      {/* the cube field */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="relative h-[55vh] md:h-[60vh] rounded-3xl border border-fog/50 overflow-hidden bg-void/40"
      >
        {/* corner labels */}
        <div className="absolute top-4 left-4 z-10 h-mono text-stone">
          // CUBE FIELD
        </div>
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="block w-1.5 h-1.5 rounded-full bg-volt pulse-dot" />
          <span className="h-mono text-stone">interactive · hover</span>
        </div>

        <Canvas
          camera={{ position: [0, 0, 7], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <CubeFieldScene
            hovered={hovered}
            setHovered={setHovered}
            onSelect={onSelect}
          />
        </Canvas>

        {/* hovered project floating label */}
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border bg-ink/85 backdrop-blur"
                 style={{ borderColor: hoveredProject.faceAccent }}>
              <span className="h-mono" style={{ color: hoveredProject.faceAccent }}>
                EXPLORE
              </span>
              <span className="text-bone text-sm font-medium">
                {hoveredProject.name}
              </span>
              <span className="h-mono text-stone">·</span>
              <span className="h-mono text-stone">{hoveredProject.tagline}</span>
              <span className="text-stone">↗</span>
            </div>
          </motion.div>
        )}

        {/* idle hint */}
        {!hoveredProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-2 rounded-full border border-fog/60 bg-pitch/80 backdrop-blur"
          >
            <span className="h-mono text-volt">hover a cube to focus · click to enter</span>
          </motion.div>
        )}
      </motion.div>

      {/* compact list under the field — one row each */}
      <div className="mt-10 grid md:grid-cols-3 gap-px bg-fog/40 rounded-xl overflow-hidden">
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.06 }}
            onClick={() => onSelect(p)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered((cur) => (cur === i ? null : cur))}
            className="group relative text-left p-6 md:p-7 bg-ink hover:bg-pitch transition-colors"
          >
            <div className="flex items-baseline justify-between mb-3">
              <span className="h-mono" style={{ color: p.faceAccent }}>
                {p.number}
              </span>
              <span className="h-mono text-stone">{p.period}</span>
            </div>
            <h3 className="h-display text-bone text-2xl md:text-3xl mb-2">
              {p.name}
            </h3>
            <p className="text-ash text-sm mb-4">{p.tagline}</p>
            <div className="flex items-center justify-between">
              <span className="h-mono text-stone group-hover:text-volt transition-colors">
                {p.url
                  ? "live · " + p.url.replace(/^https?:\/\//, "")
                  : "case study"}
              </span>
              <span
                className="h-mono transition-all group-hover:translate-x-1"
                style={{ color: p.faceAccent }}
              >
                EXPLORE →
              </span>
            </div>
            <span
              className="absolute top-0 right-0 w-px h-12"
              style={{ background: p.faceAccent }}
            />
          </motion.button>
        ))}
      </div>
    </section>
  );
}

void dynamic;
