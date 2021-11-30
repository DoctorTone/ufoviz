import create from "zustand";

export const useStore = create((set) => ({
  earthLevel: 3,
  seaLevel: 5,
}));
