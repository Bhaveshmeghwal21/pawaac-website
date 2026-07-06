"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function DroneModel() {
  const { scene } = useGLTF("/models/drone.glb");
  const group = useRef<THREE.Group>(null);

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    scene.position.set(-center.x, -center.y, -center.z);
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        const m = mesh.material as THREE.MeshStandardMaterial;
        if (m) {
          const dark = /cam|gimbal|lens|motor|servo|prop/i.test(mesh.name);
          m.metalness = dark ? 0.55 : 0.1;
          m.roughness = dark ? 0.4 : 0.62;
          m.color = new THREE.Color(dark ? "#1a1a1a" : "#e8e8e8");
        }
      }
    });
    return 2.8 / Math.max(size.x, size.y, size.z);
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += 0.004;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.15,
      0.05
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.1,
      0.05
    );
  });

  return (
    <group ref={group} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/drone.glb");

export default function DroneScene() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 45, position: [0, 0, 5] }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-6, 2, -4]} intensity={1.1} color="#ffffff" />
      <spotLight position={[0, 8, 2]} intensity={0.5} angle={0.4} penumbra={0.6} />
      <Suspense fallback={null}>
        <DroneModel />
      </Suspense>
      <EffectComposer>
        <Bloom intensity={0.15} luminanceThreshold={0.95} mipmapBlur />
        <Vignette offset={0.5} darkness={0.5} />
      </EffectComposer>
    </Canvas>
  );
}
