import * as THREE from "three";

export type MonsterMotionParams = {
  x: number;
  z: number;
  yStart: number;
  yEnd: number;
  speed: number;
  baseRot: THREE.Euler;
  rotSpeed: THREE.Vector3; // 각 축 rad/sec (계속 회전)
};

const TAU = Math.PI * 2;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const evenX = (i: number, n: number, minX: number, maxX: number) =>
  lerp(minX, maxX, n <= 1 ? 0.5 : i / (n - 1));

const zFromX = (x: number, falloff = 60, minZ = -70, maxZ = 36, sharp = 3.5) =>
  minZ + Math.exp(-((Math.abs(x) / falloff) ** 2) * sharp) * (maxZ - minZ);

const initYFromZ = (z: number, outMin = -70, outMax = -18) =>
  outMin + ((z + 70) / 106) * (outMax - outMin);

export function createMonsterMotion(
  index: number,
  count = 44
): MonsterMotionParams {
  const x = evenX(index, count, -110, 110) + rand(-2.5, 2.5);
  const z = zFromX(x);
  const initY = initYFromZ(z);

  const yStart = Math.random() * 85 - 50;
  const yEnd = -initY;

  const speed = rand(0.6, 2.5);

  const baseRot = new THREE.Euler(rand(0, TAU), rand(0, TAU), rand(0, TAU));

  const rotSpeed = new THREE.Vector3(
    rand(-TAU / 20, TAU / 20),
    rand(-TAU / 20, TAU / 20),
    rand(-TAU / 20, TAU / 20)
  );

  return { x, z, yStart, yEnd, speed, baseRot, rotSpeed };
}

export function applyRotation(
  obj: THREE.Object3D,
  rotSpeed: THREE.Vector3,
  delta: number
) {
  obj.rotation.x += rotSpeed.x * delta;
  obj.rotation.y += rotSpeed.y * delta;
  obj.rotation.z += rotSpeed.z * delta;
}
