import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/* ---------- procedural canvas textures ---------- */

function makeCapTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const g = c.getContext("2d")!;
  // base radial: deep caramel center -> warm edge
  const grad = g.createRadialGradient(512, 420, 60, 512, 512, 720);
  grad.addColorStop(0, "#7c4526");
  grad.addColorStop(0.35, "#8f5630");
  grad.addColorStop(0.62, "#a06a3c");
  grad.addColorStop(0.85, "#b9854f");
  grad.addColorStop(1, "#caa06a");
  g.fillStyle = grad;
  g.fillRect(0, 0, 1024, 1024);
  // fine fibrous streaks radiating from center
  g.globalAlpha = 0.08;
  for (let i = 0; i < 900; i++) {
    const a = Math.random() * Math.PI * 2;
    const r0 = 40 + Math.random() * 120;
    const len = 150 + Math.random() * 420;
    g.strokeStyle = Math.random() > 0.5 ? "#5e3018" : "#e8c48e";
    g.lineWidth = 0.6 + Math.random() * 1.6;
    g.beginPath();
    g.moveTo(512 + Math.cos(a) * r0, 512 + Math.sin(a) * r0);
    g.lineTo(512 + Math.cos(a) * (r0 + len), 512 + Math.sin(a) * (r0 + len));
    g.stroke();
  }
  // speckles / scales
  g.globalAlpha = 0.16;
  for (let i = 0; i < 2600; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 0.6) * 500;
    const x = 512 + Math.cos(a) * r;
    const y = 512 + Math.sin(a) * r;
    const s = 0.6 + Math.random() * 2.6;
    g.fillStyle = Math.random() > 0.45 ? "#4e2812" : "#f0d5a2";
    g.beginPath();
    g.arc(x, y, s, 0, Math.PI * 2);
    g.fill();
  }
  // subtle center darkening
  g.globalAlpha = 0.35;
  const c2 = g.createRadialGradient(512, 440, 10, 512, 440, 260);
  c2.addColorStop(0, "#3d1f0d");
  c2.addColorStop(1, "transparent");
  g.fillStyle = c2;
  g.fillRect(0, 0, 1024, 1024);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function makeGillTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const g = c.getContext("2d")!;
  g.fillStyle = "#e9dcc2";
  g.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 1400; i++) {
    const a = (i / 1400) * Math.PI * 2;
    const shade = 200 + Math.floor(Math.random() * 40);
    g.strokeStyle = `rgb(${shade - 30},${shade - 55},${shade - 95})`;
    g.lineWidth = 1 + Math.random() * 1.4;
    g.globalAlpha = 0.55;
    g.beginPath();
    g.moveTo(512 + Math.cos(a) * 60, 512 + Math.sin(a) * 60);
    g.lineTo(512 + Math.cos(a) * 512, 512 + Math.sin(a) * 512);
    g.stroke();
  }
  // warm tint near rim
  const grad = g.createRadialGradient(512, 512, 300, 512, 512, 512);
  grad.addColorStop(0, "transparent");
  grad.addColorStop(1, "rgba(168,124,70,0.5)");
  g.globalAlpha = 1;
  g.fillStyle = grad;
  g.fillRect(0, 0, 1024, 1024);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function makeStemTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 1024;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0, "#f2e9d6");
  grad.addColorStop(0.55, "#e9dabd");
  grad.addColorStop(1, "#d3bd96");
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 1024);
  g.globalAlpha = 0.12;
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * 512;
    g.strokeStyle = Math.random() > 0.5 ? "#a98f63" : "#fffdf4";
    g.lineWidth = 0.7 + Math.random() * 2;
    g.beginPath();
    g.moveTo(x, 0);
    g.bezierCurveTo(x + (Math.random() - 0.5) * 30, 340, x + (Math.random() - 0.5) * 30, 680, x + (Math.random() - 0.5) * 20, 1024);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function makeRoughness(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#5a5a5a";
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 5000; i++) {
    const v = 60 + Math.floor(Math.random() * 90);
    g.fillStyle = `rgb(${v},${v},${v})`;
    g.fillRect(Math.random() * 256, Math.random() * 256, 1.6, 1.6);
  }
  return new THREE.CanvasTexture(c);
}

/* ---------- mushroom geometry builders ---------- */

function capGeometry(scale = 1): THREE.LatheGeometry {
  // natural dome profile: from apex out to rim, curling under
  const pts: THREE.Vector2[] = [];
  const prof: [number, number][] = [
    [0.001, 1.52], [0.28, 1.5], [0.55, 1.44], [0.82, 1.32], [1.06, 1.16],
    [1.26, 0.97], [1.42, 0.76], [1.53, 0.55], [1.58, 0.38], [1.56, 0.28],
    [1.48, 0.24], [1.34, 0.26], [1.1, 0.33], [0.8, 0.4], [0.5, 0.44],
  ];
  prof.forEach(([x, y]) => pts.push(new THREE.Vector2(x * scale, y * scale)));
  const geo = new THREE.LatheGeometry(pts, 96);
  geo.computeVertexNormals();
  return geo;
}

function stemGeometry(scale = 1, lean = 0): THREE.LatheGeometry {
  const pts: THREE.Vector2[] = [];
  const prof: [number, number][] = [
    [0.001, -1.55], [0.34, -1.54], [0.44, -1.42], [0.47, -1.2], [0.44, -0.9],
    [0.4, -0.6], [0.37, -0.3], [0.36, 0.0], [0.38, 0.2], [0.46, 0.34],
  ];
  prof.forEach(([x, y]) => pts.push(new THREE.Vector2(x * scale, y * scale + lean)));
  const geo = new THREE.LatheGeometry(pts, 64);
  geo.computeVertexNormals();
  return geo;
}

/* ---------- single mushroom ---------- */

function Mushroom({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  capMap,
  gillMap,
  stemMap,
  rough,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  capMap: THREE.Texture;
  gillMap: THREE.Texture;
  stemMap: THREE.Texture;
  rough: THREE.Texture;
}) {
  const capGeo = useMemo(() => capGeometry(scale), [scale]);
  const stemGeo = useMemo(() => stemGeometry(scale), [scale]);

  return (
    <group position={position} rotation={rotation as unknown as THREE.Euler}>
      {/* stem */}
      <mesh geometry={stemGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          map={stemMap}
          roughness={0.55}
          roughnessMap={rough}
          clearcoat={0.25}
          clearcoatRoughness={0.6}
          sheen={0.4}
          sheenColor="#fff5e0"
        />
      </mesh>
      {/* ring (annulus) */}
      <mesh position={[0, 0.02 * scale, 0]} rotation={[0.12, 0, 0.06]} castShadow>
        <torusGeometry args={[0.4 * scale, 0.075 * scale, 24, 64]} />
        <meshStandardMaterial color="#e6d6b8" roughness={0.8} />
      </mesh>
      {/* cap */}
      <mesh geometry={capGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          map={capMap}
          roughness={0.42}
          roughnessMap={rough}
          clearcoat={0.7}
          clearcoatRoughness={0.35}
          sheen={0.3}
          sheenColor="#d98e4a"
        />
      </mesh>
      {/* gills disc under cap */}
      <mesh position={[0, 0.3 * scale, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.42 * scale, 72]} />
        <meshStandardMaterial map={gillMap} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ---------- floating spores ---------- */

function Spores({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 3.4;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = -1.6 + Math.random() * 3.6;
      positions[i * 3 + 2] = Math.sin(a) * r;
      speeds[i] = 0.08 + Math.random() * 0.3;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + speeds[i] * delta;
      if (y > 2.2) y = -1.8;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(t * 0.7 + i) * 0.0009);
    }
    pos.needsUpdate = true;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#e8cfa0"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------- orbiting halo ring ---------- */

function Halo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.12;
      ref.current.rotation.x = Math.PI / 2.25 + Math.sin(Date.now() * 0.0004) * 0.05;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.25, 0, 0]} position={[0, -0.4, 0]}>
      <torusGeometry args={[2.35, 0.012, 16, 200]} />
      <meshBasicMaterial color="#c8a165" transparent opacity={0.55} />
    </mesh>
  );
}

/* ---------- interactive rig ---------- */

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0, spin: 0 });
  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = state.pointer;
    // gentle auto rotation + inertia from drag
    velocity.current *= 0.94;
    target.current.spin += delta * 0.22 + velocity.current;
    const wantX = p.y * 0.14;
    const wantTiltZ = p.x * -0.08;
    target.current.x += (wantX - target.current.x) * 0.045;
    target.current.y += (wantTiltZ - target.current.y) * 0.045;
    g.rotation.y = target.current.spin;
    g.rotation.x = target.current.x;
    g.rotation.z = target.current.y;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.09;
  });

  const onDrag = (e: ThreeEvent<PointerEvent>) => {
    if (dragging.current) {
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      velocity.current = dx * 0.004;
      target.current.spin += velocity.current;
    }
  };

  return (
    <group
      onPointerDown={(e) => {
        dragging.current = true;
        lastX.current = e.clientX;
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerOut={() => (dragging.current = false)}
      onPointerMove={onDrag}
    >
      <group ref={group}>
        {children}
      </group>
    </group>
  );
}

/* ---------- scene ---------- */

function Scene() {
  const capMap = useMemo(() => makeCapTexture(), []);
  const gillMap = useMemo(() => makeGillTexture(), []);
  const stemMap = useMemo(() => makeStemTexture(), []);
  const rough = useMemo(() => makeRoughness(), []);

  return (
    <>
      {/* studio lighting */}
      <ambientLight intensity={0.35} color="#f5ead2" />
      <spotLight
        position={[4, 6, 4]}
        angle={0.5}
        penumbra={0.9}
        intensity={90}
        color="#fff1d8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, -3]} intensity={1.4} color="#9db87a" />
      <pointLight position={[-2.5, -1, 3]} intensity={6} color="#c8a165" />
      <pointLight position={[0, -2.5, 0]} intensity={2.5} color="#5a6b48" />

      <Rig>
        <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.35}>
          {/* hero mushroom */}
          <Mushroom position={[0, 0.55, 0]} scale={1.05} capMap={capMap} gillMap={gillMap} stemMap={stemMap} rough={rough} />
          {/* companions */}
          <Mushroom position={[1.35, -0.62, 0.5]} rotation={[0.1, 0.8, 0.12]} scale={0.52} capMap={capMap} gillMap={gillMap} stemMap={stemMap} rough={rough} />
          <Mushroom position={[-1.3, -0.78, 0.35]} rotation={[-0.08, -0.6, -0.14]} scale={0.42} capMap={capMap} gillMap={gillMap} stemMap={stemMap} rough={rough} />
        </Float>
        <Halo />
        <Spores count={130} />
      </Rig>

      {/* mossy podium */}
      <mesh position={[0, -1.72, 0]} receiveShadow>
        <cylinderGeometry args={[1.9, 2.15, 0.28, 72]} />
        <meshStandardMaterial color="#2e4034" roughness={0.95} />
      </mesh>
      <mesh position={[0, -1.57, 0]} receiveShadow>
        <cylinderGeometry args={[1.9, 1.9, 0.02, 72]} />
        <meshStandardMaterial color="#3c5240" roughness={1} />
      </mesh>
      {/* scattered pebbles */}
      {[
        [0.9, -1.5, 1.05, 0.1],
        [-0.75, -1.52, 1.15, 0.08],
        [1.35, -1.53, -0.4, 0.07],
        [-1.2, -1.53, -0.6, 0.09],
      ].map(([x, y, z, s], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <dodecahedronGeometry args={[s, 0]} />
          <meshStandardMaterial color={i % 2 ? "#8a7a5e" : "#5d6b4a"} roughness={0.9} />
        </mesh>
      ))}

      <ContactShadows position={[0, -1.86, 0]} opacity={0.65} scale={9} blur={2.6} far={4} color="#0c130e" />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} color="#fff4dd" />
          <Lightformer intensity={1.6} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 2, 1]} color="#b9cf9a" />
          <Lightformer intensity={1.2} rotation-y={-Math.PI / 2} position={[5, 1, 0]} scale={[20, 2, 1]} color="#e8c48e" />
        </group>
      </Environment>
    </>
  );
}

export default function MushroomScene() {
  return (
    <div className="absolute inset-0 cursor-grab active:cursor-grabbing" dir="ltr">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.9, 6.4], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
