import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../state/store";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { SCENE } from "../config/Scene";

const degreesToRads = (degrees: number) => (degrees * Math.PI) / 180;

type GLTFResult = GLTF & {
  nodes: { Pin: THREE.Mesh };
  materials: { Pin: THREE.Material };
};

type UFOData = {
  data: { longitude: number; latitude: number }[];
};

const Pins = (props: UFOData) => {
  const { nodes, materials } = useGLTF("./pin.glb") as GLTFResult;
  const group = useRef<THREE.InstancedMesh>(null!);
  const animating = useRef(true);
  const [tempObject] = useState(() => new THREE.Object3D());
  const numPins = props.data.length;
  const { startHeight, earthLevel, MOVEMENT_SPEED, pinLength, EARTH_SCALE } =
    useStore();

  const long = new THREE.Quaternion();
  const lat = new THREE.Quaternion();

  const startPositions = new Array(numPins).fill(undefined).map((elem, i) => {
    const pinPosition = new THREE.Vector3(0, 0, pinLength);
    long.setFromAxisAngle(SCENE.Y_AXIS, degreesToRads(props.data[i].longitude));
    lat.setFromAxisAngle(SCENE.X_AXIS, degreesToRads(-props.data[i].latitude));
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
    <instancedMesh
      ref={group}
      args={[nodes.Pin.geometry, materials.Pin, numPins]}></instancedMesh>
  );
};

export default Pins;
