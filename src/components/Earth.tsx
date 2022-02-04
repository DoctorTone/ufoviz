import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: { Sphere004: THREE.Mesh; Sphere004_1: THREE.Mesh };
};

const Earth = () => {
  const { nodes } = useGLTF("./low_poly_earth.glb") as GLTFResult;
  return (
    <group>
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
