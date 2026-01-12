import { useGLTF } from "@react-three/drei";
import { memo, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createMonsterMotion, applyRotation } from "../lib/useMonsterMotion";

function Monster({ index }: { index: number }) {
  const { scene } = useGLTF("/monster/monster.glb");
  const objRef = useRef<THREE.Object3D>(null);

  const object = useMemo(() => scene.clone(true), [scene]);
  const motion = useMemo(() => createMonsterMotion(index, 44), [index]);

  const yRef = useRef(motion.yStart);

  useEffect(() => {
    const obj = objRef.current;
    if (!obj) return;

    yRef.current = motion.yStart;
    obj.position.set(motion.x, motion.yStart, motion.z);
    obj.rotation.copy(motion.baseRot);
  }, [motion]);

  useFrame((_, delta) => {
    const obj = objRef.current;
    if (!obj) return;

    const dt = Math.min(delta, 1 / 30); // 33ms 이상은 잘라서 부드럽게

    const initY = -motion.yEnd;
    const y = yRef.current + motion.speed * dt;
    yRef.current = y >= motion.yEnd ? initY : y;
    obj.position.y = yRef.current;

    applyRotation(obj, motion.rotSpeed, dt);
  });

  return <primitive ref={objRef} object={object} scale={10} />;
}

export default memo(Monster);
