import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Monster from "./ui/monster";
import LightObject from "./ui/light-object";
import { Suspense } from "react";

const COUNT = 110;
export default function RenderModel() {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 55, near: 0.1, far: 200 }}
      style={{
        background: "linear-gradient(to top, #ffffff 0%, var(--slate-100) 70%)",
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
        <LightObject />
        {Array.from({ length: COUNT }, (_, i) => (
          <Monster key={i} index={i} />
        ))}
      </Suspense>
    </Canvas>
  );
}
