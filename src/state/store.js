import create from "zustand";
import * as THREE from "three";

export const useStore = create((set) => ({
  earthLevel: 5.25,
  seaLevel: 3,
  startHeight: 7.5,
  MOVEMENT_SPEED: 0.01,
  pinPosition: new THREE.Vector3(0, 0, 5),
}));
