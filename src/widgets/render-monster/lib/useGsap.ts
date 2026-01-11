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

const MIN = -50;
const MAX = 50;
const N = 150;

useGsap.changePosition = (position: THREE.Vector3, index: number) => {
  const t = index / (N - 1);
  const u = 0.5 - 0.5 * Math.cos(t * Math.PI);
  const x = MIN + u * (MAX - MIN);

  position.x = x;
  position.y = Math.random() * 85 - 50;
  position.z = Math.random() * 107 - 70;
  const durationTime = Math.random() * 50 + 30;
  gsap.to(position, {
    y: 60,

    duration: durationTime,
    repeat: -1,
    ease: "none",

    onRepeat(this: gsap.core.Tween) {
      position.y = -60;
      this.invalidate().restart();
    },
  });
};

export default useGsap;
