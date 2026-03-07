import { OrbitControls, Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useRef } from "react";
import CanvasLoader from "../../CanvasLoader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Avatar } from "./Avatar";

const HeroExperience = ({ isWidget }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const avatarGroup = useRef();

  useGSAP(() => {
    if (avatarGroup.current) {
      // Smoothly scale the 3D model down to 0 or up to 1.5 based on widget state
      gsap.to(avatarGroup.current.scale, {
        x: isWidget ? 0 : 1.5,
        y: isWidget ? 0 : 1.5,
        z: isWidget ? 0 : 1.5,
        duration: 0.5,
        ease: "back.inOut(1.7)"
      });
    }
  }, [isWidget]);

  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 50 }}>
      <ambientLight intensity={0.2} color="#1a1a40" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxDistance={75}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={<CanvasLoader />}>
        <HeroLights />
        <Particles count={100} />
        <group
          scale={isMobile ? 0.7 : 1}
          position={[-1, -2.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>

        {/* The Avatar in the same scene, GSAP controlled ref */}
        <group ref={avatarGroup} position={[-1.9, -2.1, 2.5]} scale={1.5} rotation={[0, Math.PI / 12, 0]}>
          <Float speed={1.5} rotationIntensity={0.02} floatIntensity={0.15}>
            <Avatar isWidget={isWidget} />
          </Float>
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;