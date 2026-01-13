import { Canvas } from "@react-three/fiber";
import Monster, { LoginMonster } from "./ui/monster";
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
        touchAction: "none",
      }}
    >
      <Suspense fallback={<Loader />}>
        <LightObject />
        {Array.from({ length: COUNT }, (_, i) => (
          <Monster key={i} index={i} />
        ))}
      </Suspense>
    </Canvas>
  );
}

export default memo(RenderModel);

export function RenderLoginModel() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ powerPreference: "high-performance" }}
      camera={{ position: [0, 1, 11], fov: 55, near: 0.1, far: 200 }}
      style={{
        background: "transparent",
        touchAction: "none",
      }}
    >
      <Suspense fallback={null}>
        <LightObject />

        <LoginMonster />
      </Suspense>
    </Canvas>
  );
}
