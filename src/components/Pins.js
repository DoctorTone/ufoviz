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

  const long = new THREE.Quaternion();
  const lat = new THREE.Quaternion();

  const startPositions = new Array(numPins).fill(undefined).map((elem, i) => {
    const pinPosition = new THREE.Vector3(0, 0, pinLength);
    long.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      degreesToRads(data[i].longitude)
    );
    lat.setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      degreesToRads(-data[i].latitude)
    );
    long.multiply(lat);
    pinPosition.applyQuaternion(long);
    pinPosition.multiplyScalar(14);

    return pinPosition;
  });

  const pinScales = new Array(numPins).fill(undefined).map((elem, i) => {
    const pinScale = new THREE.Vector3().copy(startPositions[i]);
    pinScale.multiplyScalar(0.01);

    return pinScale;
  });

  useEffect(() => {
    for (let i = 0; i < numPins; ++i) {
      tempObject.position.copy(startPositions[i]);
      tempObject.updateMatrix();
      group.current.setMatrixAt(i, tempObject.matrix);
      group.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    console.log("Current = ", group.current);

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
