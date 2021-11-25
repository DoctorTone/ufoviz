import React from "react";
import { useGLTF } from "@react-three/drei";

const Earth = (props) => {
  const { nodes, materials } = useGLTF("./low_poly_earth.gltf");
  return (
    <group dispose={null}>
      <mesh geometry={nodes.Sphere004.geometry}>
        <meshBasicMaterial color="blue" />
      </mesh>
      <mesh geometry={nodes.Sphere004_1.geometry}>
        <meshBasicMaterial color="green" />
      </mesh>
    </group>
  );
};

export default Earth;
