import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../state/store";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

const degreesToRads = (degrees) => (degrees * Math.PI) / 180;

const Pins = ({ data }) => {
  const { nodes, materials } = useGLTF("./pin.glb");
  const group = useRef();
  const animating = useRef(true);
  const [tempObject] = useState(() => new THREE.Object3D());
  const numPins = 10;
  const { startHeight, earthLevel, MOVEMENT_SPEED, pinLength, EARTH_SCALE } =
    useStore();

  const startPositions = [];
  const pinScales = [];
  for (let i = 0; i < numPins; ++i) {
    startPositions.push(new THREE.Vector3());
    pinScales.push(new THREE.Vector3());
  }

  let long = new THREE.Quaternion();
  let lat = new THREE.Quaternion();
  let pinPosition = new THREE.Vector3(0, 0, pinLength);

  useEffect(() => {
    for (let i = 0; i < numPins; ++i) {
      long.setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        degreesToRads(data[i].longitude)
      );
      lat.setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        degreesToRads(-data[i].latitude)
      );
      long.multiply(lat);
      startPositions[i].copy(pinPosition);
      startPositions[i].applyQuaternion(long);
      startPositions[i].multiplyScalar(14);
      pinScales[i].copy(startPositions[i]);
      pinScales[i].multiplyScalar(0.01);
      tempObject.position.copy(startPositions[i]);
      tempObject.updateMatrix();
      group.current.setMatrixAt(i, tempObject.matrix);
      group.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    if (animating.current) {
      for (let i = 0; i < numPins; ++i) {
        startPositions[i].sub(pinScales[i]);
        tempObject.position.copy(startPositions[i]);
        tempObject.updateMatrix();
        group.current.setMatrixAt(i, tempObject.matrix);
      }
      if (startPositions[numPins - 1].length() < 50) {
        animating.current = false;
      }
      group.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={group} args={[null, null, numPins]}>
      <sphereBufferGeometry args={[0.5]} />
      <meshBasicMaterial color={"red"} />
    </instancedMesh>
  );
};

export default Pins;
