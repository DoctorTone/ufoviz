import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Earth from "./components/Earth";
import Pins from "./components/Pins";
import { OrbitControls } from "@react-three/drei";
import ufo_sightings_short from "./data/ufo_sightings_short.json";

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 100] }}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Earth />
          <Pins data={ufo_sightings_short} />
          <mesh position={[0, 0, 80]}>
            <boxBufferGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
    </>
  );
}

export default App;
