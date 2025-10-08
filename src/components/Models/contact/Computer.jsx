import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";

export function Computer(props) {
  try {
    const { nodes, materials } = useGLTF(
      "/models/computer-optimized-transformed.glb"
    );

    return (
      <group {...props} dispose={null}>
        <group position={[-4.005, 67.549, 58.539]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube000_ComputerDesk_0001_1.geometry}
            material={materials["ComputerDesk.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube000_ComputerDesk_0001_2.geometry}
            material={materials["FloppyDisk.001"]}
          />
        </group>
      </group>
    );
  } catch (error) {
    console.error("Computer model failed to load:", error);
    // Return a simple fallback shape
    return (
      <group {...props}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 1, 1]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      </group>
    );
  }
}

useGLTF.preload("/models/computer-optimized-transformed.glb");

export default Computer;