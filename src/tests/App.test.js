jest.mock("scheduler", () => require("scheduler/unstable_mock"));

import ReactThreeTestRenderer from "@react-three/test-renderer";
import React, { Suspense } from "react";
import { GLTFStructureLoader } from "@react-three/gltfjsx";
import fs from "fs/promises";

test("render earth correctly", async () => {
  const loader = new GLTFStructureLoader();
  const earth = await fs.readFile("./public/low_poly_earth.gltf");
  const { scene } = await new Promise((res) => loader.parse(earth, "", res));

  expect(scene.children.length).toEqual(1);
  expect(scene.children[0].type).toEqual("Group");
});

test("render pins correctly", async () => {
  const loader = new GLTFStructureLoader();
  const pin = await fs.readFile("./public/pin.gltf");
  const { scene } = await new Promise((res) => loader.parse(pin, "", res));

  expect(scene.children.length).toEqual(1);
  expect(scene.children[0].type).toEqual("Mesh");
});
