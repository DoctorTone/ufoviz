import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useStore } from "../state/store";
import * as THREE from "three";

const Pin = (props) => {
  const { nodes, materials } = useGLTF("./pin.glb");
  const group = useRef();
  const animating = useRef(true);
  const { startHeight, earthLevel, MOVEMENT_SPEED, pinPosition } = useStore();

  let long = new THREE.Quaternion();
  long.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0);

  let lat = new THREE.Quaternion();
  lat.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0);

  let latlong = long.multiply(lat);

  pinPosition.applyQuaternion(latlong);

  const latLongDegrees = new THREE.Euler();
  latLongDegrees.setFromQuaternion(latlong);

  useFrame((state) => {
    if (animating.current) {
      group.current.position.y -= MOVEMENT_SPEED;
      if (group.current.position.y <= earthLevel) {
        animating.current = false;
      }
    }
  });

  return (
    <group
      ref={group}
      {...props}
      position={[0, 0, 0]}
      rotation={latLongDegrees}
      dispose={null}>
      <mesh geometry={nodes.Cylinder.geometry} material={materials.Silver} />
      <mesh geometry={nodes.Cylinder_1.geometry} material={materials.Red} />
    </group>
  );
};

export default Pin;
