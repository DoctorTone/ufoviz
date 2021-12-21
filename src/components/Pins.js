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
  for (let i = 0; i < numPins; ++i) {
    startPositions.push(new THREE.Vector3());
  }

  let long = new THREE.Quaternion();

  let lat = new THREE.Quaternion();

  let pinPosition = new THREE.Vector3(0, 0, pinLength);

  let pinScale = new THREE.Vector3().copy(pinPosition);
  pinScale.multiplyScalar(0.1);

  const latLongDegrees = new THREE.Euler();
  latLongDegrees.setFromQuaternion(long);

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
      tempObject.position.copy(startPositions[i]);
      tempObject.updateMatrix();
      group.current.setMatrixAt(i, tempObject.matrix);
      group.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    // if (animating.current) {
    //   group.current.position.sub(pinScale);
    //   if (group.current.position.length() < 50) {
    //     animating.current = false;
    //   }
    // }
    if (animating.current) {
      for (let i = 0; i < numPins; ++i) {
        startPositions[i].sub(pinScale);
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

  console.log("Rendered");

  return (
    <instancedMesh ref={group} args={[null, null, numPins]}>
      <sphereBufferGeometry args={[0.5]} />
      <meshBasicMaterial color={"red"} />
    </instancedMesh>
  );
};

export default Pins;
