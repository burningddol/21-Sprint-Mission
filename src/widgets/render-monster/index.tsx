import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Monster from "./ui/monster";
import LightObject from "./ui/light-object";
import { Suspense } from "react";
import { memo } from "react";
import { Loader } from "./ui/loader";

const COUNT = 44;
function RenderModel() {
  return (
    <Canvas
      dpr={1}
      gl={{ powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 50], fov: 55, near: 0.1, far: 200 }}
      style={{
        background:
          "linear-gradient(to top, #ffffff 0%, var(--violet-100) 80%)",
      }}
    >
      <Suspense fallback={<Loader />}>
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

export default memo(RenderModel);
