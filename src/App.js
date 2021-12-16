import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Earth from "./components/Earth";
import Pin from "./components/Pin";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[5, 5, 5]} />
        <Suspense fallback={null}>
          {/* <Earth /> */}
          <Pin />
          <mesh position={[0, 0, 5]}>
            <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
    </>
  );
}

export default App;
