import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import useGsap from "../lib/useGsap";
import { memo } from "react";

function Monster({ index }: { index: number }) {
  const { scene } = useGLTF("/monster/monster.glb");
  const monsterRef = useRef<THREE.Object3D>(null);
  const { changeRotation, changePosition } = useGsap;

  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const monster = monsterRef.current as THREE.Object3D;
    changeRotation(monster.rotation);
    changePosition(monster.position, index);
  }, []);

  return <primitive object={cloned} scale={10} ref={monsterRef} />;
}

export default memo(Monster); // 부모가 메모되어있긴한데 걍 안전빵
