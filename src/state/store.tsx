import create from "zustand";
import * as THREE from "three";

export const useStore = create((set) => ({
  earthLevel: 5.25,
  seaLevel: 3,
  startHeight: 7.5,
  MOVEMENT_SPEED: 0.01,
  pinLength: 5,
  EARTH_SCALE: 3.15,
}));
