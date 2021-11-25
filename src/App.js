import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Earth from "./components/Earth";

function App() {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
