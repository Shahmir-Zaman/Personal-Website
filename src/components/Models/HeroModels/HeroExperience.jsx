import { OrbitControls, Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useRef, useState } from "react";
import CanvasLoader from "../../CanvasLoader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Avatar } from "./Avatar";

const HeroExperience = ({ isWidget, isChatOpen, onAvatarClick }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  // Below Tailwind's xl breakpoint the hero stacks and the scene gets its own full-width canvas.
  const isStacked = useMediaQuery({ maxWidth: 1279 });
  const avatarGroup = useRef();
  const containerRef = useRef();
  const [inView, setInView] = useState(true);

  // The avatar's scale and offset from the room's origin follow the room's scale,
  // so he stays standing on the same spot of the floor at any size.
  const roomScale = isMobile ? 1.05 : 1;
  // When stacked the scene has the canvas to itself, so the room is centred in it.
  const roomPosition = isStacked ? [0, -2, 0] : [-1, -2.5, 0];
  const avatarOffset = [-0.9, 0.4, 2.5];
  const avatarPosition = roomPosition.map((v, i) => v + avatarOffset[i] * roomScale);
  const avatarScale = 1.5 * roomScale;

  useGSAP(() => {
    if (avatarGroup.current) {
      gsap.to(avatarGroup.current.scale, {
        x: isWidget ? 0 : avatarScale,
        y: isWidget ? 0 : avatarScale,
        z: isWidget ? 0 : avatarScale,
        duration: 0.5,
        ease: "back.inOut(1.7)"
      });
    }

    // Gate 3D rendering when scrolled out of view
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => setInView(self.isActive),
    });
  }, [isWidget, avatarScale]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 13], fov: 50 }}
        frameloop={inView ? "always" : "demand"}
      >
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
            scale={roomScale}
            position={roomPosition}
            rotation={[0, -Math.PI / 4, 0]}
          >
            <Room />
          </group>

          {/* The Avatar in the same scene, GSAP controlled ref */}
          <group ref={avatarGroup} position={avatarPosition} scale={avatarScale} rotation={[0, Math.PI / 12, 0]}>
            <Float speed={1.5} rotationIntensity={0.02} floatIntensity={0.15}>
              <Avatar isHero={true} isWidget={isWidget} isChatOpen={isChatOpen} onClick={onAvatarClick} />
            </Float>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroExperience;
