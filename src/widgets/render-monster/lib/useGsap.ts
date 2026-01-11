import gsap from "gsap";
import * as THREE from "three";

interface UseGsap {
  changeRotation: (rotation: THREE.Euler) => void;
  changePosition: (position: THREE.Vector3, index: number) => void;
}

const useGsap: UseGsap = { changeRotation: () => {}, changePosition: () => {} };

useGsap.changeRotation = (rotation: THREE.Euler) => {
  rotation.x = Math.random() * Math.PI * 2;
  rotation.y = Math.random() * Math.PI * 2;
  rotation.z = Math.random() * Math.PI * 2;

  gsap.to(rotation, {
    x: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    z: Math.random() * Math.PI * 2,
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
};

function getXbyIndex(
  index: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return outMin + ((index - inMin) / (inMax - inMin)) * (outMax - outMin);
}

function getZbyX(
  x: number,
  falloffRange: number, // 예: 50  → 이 거리에서 거의 죽음
  minZ: number, // 예: -70
  maxZ: number, // 예: 35
  sharpness = 3.5 // 예: 3.5 (클수록 더 빨리 -70로 떨어짐)
) {
  const d = Math.abs(x) / falloffRange; // 0 ~ ∞
  const b = Math.exp(-d * d * sharpness); // 1 → 0
  return minZ + b * (maxZ - minZ);
}

function getInitYbyZ(v: number, outMin: number, outMax: number) {
  // input range is fixed: -70 ~ 36
  const t = (v + 70) / 106; // 100 = 36 - (-70)
  return outMin + t * (outMax - outMin);
}

useGsap.changePosition = (position: THREE.Vector3, index: number) => {
  const x = getXbyIndex(index, 0, 43, -110, 110);

  const z = getZbyX(x, 60, -70, 36, 3.5);

  const initY = getInitYbyZ(z, -70, -18);

  position.x = x;
  position.y = Math.random() * 85 - 50;
  position.z = z;
  const durationTime = Math.random() * 25 + 15;
  gsap.to(position, {
    y: -initY,

    duration: durationTime,
    repeat: -1,
    ease: "none",

    onRepeat(this: gsap.core.Tween) {
      position.y = initY;
      this.invalidate().restart();
    },
  });
};

export default useGsap;
