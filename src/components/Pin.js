import React, { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

const Pin = (props) => {
  const group = useRef();

  const { nodes, materials } = useGLTF("./pin.gltf");
  return (
    <group
      ref={group}
      {...props}
      position={[0, 1, 0]}
      scale={[0.005, 0.15, 0.005]}
      dispose={null}>
      <mesh geometry={nodes.Cylinder.geometry} material={materials.Silver} />
      <mesh geometry={nodes.Cylinder_1.geometry} material={materials.Red} />
    </group>
  );
};

export default Pin;
