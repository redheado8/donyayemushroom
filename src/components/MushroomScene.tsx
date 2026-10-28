import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

function Mushroom() {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastX = useRef(0);
  const spin = useRef(0);
  const velocity = useRef(0);

  const capGeometry = useMemo(() => {
    const profile: [number, number][] = [
      [0.001, 1.48], [0.32, 1.47], [0.62, 1.4], [0.92, 1.27],
      [1.18, 1.08], [1.39, 0.83], [1.52, 0.58], [1.53, 0.4],
      [1.45, 0.3], [1.25, 0.31], [0.95, 0.39], [0.62, 0.44], [0.3, 0.46],
    ];
    const geometry = new THREE.LatheGeometry(
      profile.map(([radius, height]) => new THREE.Vector2(radius, height)),
      48,
    );
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const stemGeometry = useMemo(() => {
    const profile: [number, number][] = [
      [0.001, -1.5], [0.28, -1.49], [0.39, -1.36], [0.4, -1.08],
      [0.36, -0.75], [0.32, -0.4], [0.31, -0.08], [0.35, 0.2], [0.43, 0.34],
    ];
    const geometry = new THREE.LatheGeometry(
      profile.map(([radius, height]) => new THREE.Vector2(radius, height)),
      40,
    );
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const onDrag = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    const dx = event.clientX - lastX.current;
    lastX.current = event.clientX;
    velocity.current = dx * 0.004;
    spin.current += velocity.current;
  };

  useFrame((state, delta) => {
    if (!group.current) return;
    velocity.current *= 0.92;
    spin.current += delta * 0.16 + velocity.current;
    target.current.x += (state.pointer.y * 0.1 - target.current.x) * 0.04;
    target.current.y += (state.pointer.x * -0.07 - target.current.y) * 0.04;
    group.current.rotation.set(target.current.x, spin.current, target.current.y);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.045;
  });

  return (
    <group
      onPointerDown={(event) => {
        dragging.current = true;
        lastX.current = event.clientX;
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerOut={() => (dragging.current = false)}
      onPointerMove={onDrag}
    >
      <group ref={group} position={[0, 0.02, 0]}>
        <mesh geometry={stemGeometry} castShadow>
          <meshStandardMaterial color="#e9ddc5" roughness={0.82} />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[0.12, 0, 0.06]}>
          <torusGeometry args={[0.35, 0.055, 10, 32]} />
          <meshStandardMaterial color="#d9c7a6" roughness={0.9} />
        </mesh>
        <mesh geometry={capGeometry} castShadow>
          <meshPhysicalMaterial
            color="#a66d3e"
            roughness={0.58}
            clearcoat={0.12}
            clearcoatRoughness={0.7}
          />
        </mesh>
        <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.36, 48]} />
          <meshStandardMaterial color="#d9c8a9" roughness={0.95} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.25} color="#fff1d9" />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#fff0d5" />
      <directionalLight position={[-4, 1, -3]} intensity={1.1} color="#b8c99b" />
      <pointLight position={[-2, -1, 3]} intensity={0.8} color="#c8a165" />
      <Mushroom />
    </>
  );
}

export default function MushroomScene() {
  return (
    <div className="absolute inset-0 cursor-grab active:cursor-grabbing" dir="ltr">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0.75, 6.1], fov: 34 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        shadows={false}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
