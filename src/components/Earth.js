import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

const Earth = (props) => {
  const { nodes, materials } = useGLTF("./low_poly_earth.gltf");
  return (
    <group dispose={null} {...props}>
      <mesh geometry={nodes.Sphere004.geometry}>
        <meshStandardMaterial color="blue" side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={nodes.Sphere004_1.geometry}>
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
};

export default Earth;
