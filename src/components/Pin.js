import React, { useMemo } from "react";
import { useGLTF, Merged } from "@react-three/drei";

const Instanced = (props) => {
  const { nodes, materials } = useGLTF("./pin.glb");
  const instances = useMemo(
    () => ({
      Shaft: nodes.Cylinder.geometry,
      Head: nodes.Cylinder_1.geometry,
    }),
    [nodes]
  );

  return (
    <Merged meshes={instances}>
      {(instances) => <Pin instances={instances} />}
    </Merged>
  );
};

function Pin({ instances, ...props }) {
  return (
    <group dispose={null}>
      <instances.Head />
      <instances.Shaft />
    </group>
  );
}

export default Instanced;
