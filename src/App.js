import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[5, 5, 5]} />
        <mesh>
          <boxBufferGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;
