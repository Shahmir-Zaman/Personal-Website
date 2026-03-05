import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Avatar } from "./Avatar";
import { Float } from "@react-three/drei";

const HeroExperience = ({ showAvatar = true }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 50 }}>
      {/* deep blue ambient */}
      <ambientLight intensity={0.2} color="#1a1a40" />
      {/* Configure OrbitControls to disable panning and control zoom based on device type */}
      <OrbitControls
        enablePan={false} // Prevents panning of the scene
        enableZoom={false} // Disables zoom on all devices
        maxDistance={75} // Maximum distance for zooming out
        minDistance={5} // Minimum distance for zooming in
        minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
        maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <group
          scale={isMobile ? 0.7 : 1}
          position={[-1, -2.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>

        {/* Render the Avatar in the same scene */}
        {showAvatar && (
          <group position={[-1.9, -2.1, 2.5]} scale={1.5}>
            <Float speed={1.5} rotationIntensity={0.02} floatIntensity={0.15}>
              <Avatar />
            </Float>
          </group>
        )}
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;