import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useStore } from "../state/store";
import * as THREE from "three";
import { Points } from "three";

const degreesToRads = (degrees) => (degrees * Math.PI) / 180;

const Pins = ({ data }) => {
  const { nodes, materials } = useGLTF("./pin.glb");
  const group = useRef();
  const animating = useRef(true);
  const { startHeight, earthLevel, MOVEMENT_SPEED, pinLength, EARTH_SCALE } =
    useStore();

  // DEBUG
  console.log("UFO = ", data[0]);

  let long = new THREE.Quaternion();
  long.setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    degreesToRads(data[0].longitude)
  );

  let lat = new THREE.Quaternion();
  lat.setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    degreesToRads(-data[0].latitude)
  );

  let pinPosition = new THREE.Vector3(0, 0, pinLength);

  long.multiply(lat);
  pinPosition.applyQuaternion(long);
  pinPosition.multiplyScalar(14);

  let pinScale = new THREE.Vector3().copy(pinPosition);
  pinScale.multiplyScalar(0.01);

  const latLongDegrees = new THREE.Euler();
  latLongDegrees.setFromQuaternion(long);

  useFrame((state) => {
    if (animating.current) {
      group.current.position.sub(pinScale);
      if (group.current.position.length() < 50) {
        animating.current = false;
      }
    }
  });

  console.log("Rendered");

  return (
    <group
      ref={group}
      position={pinPosition}
      rotation={latLongDegrees}
      dispose={null}>
      <mesh geometry={nodes.Cylinder.geometry} material={materials.Silver} />
      <mesh geometry={nodes.Cylinder_1.geometry} material={materials.Red} />
    </group>
  );
};

export default Pins;
