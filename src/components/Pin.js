import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useStore } from "../state/store";

const Pin = (props) => {
  const group = useRef();
  const height = useStore((state) => state.earthLevel);

  const { nodes, materials } = useGLTF("./pin.gltf");
  useFrame((state) => {
    group.current.position.y -= 0.01;
  });

  return (
    <group
      ref={group}
      {...props}
      position={[0, height, 0]}
      scale={[0.01, 0.3, 0.01]}
      dispose={null}>
      <mesh geometry={nodes.Cylinder.geometry} material={materials.Silver} />
      <mesh geometry={nodes.Cylinder_1.geometry} material={materials.Red} />
    </group>
  );
};

export default Pin;
