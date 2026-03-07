import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Avatar } from "./Models/HeroModels/Avatar";
import CanvasLoader from "./CanvasLoader";

const AvatarCanvas = ({ cameraZ = 4, floatSpeed = 1.5, avatarPosition = [0.05, -1.2, 0.3], isWidget }) => (
    <Canvas
        camera={{ position: [0, 0.5, cameraZ], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
    >
        <ambientLight intensity={1} color="#d9ecff" />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-3, 3, 2]} intensity={0.5} color="#a0c4ff" />
        <Suspense fallback={<CanvasLoader />}>
            <Float speed={floatSpeed} rotationIntensity={0.02} floatIntensity={0.15}>
                <group position={avatarPosition} scale={1.5}>
                    <Avatar isWidget={isWidget} />
                </group>
            </Float>
        </Suspense>
    </Canvas>
);

const AvatarWidget = ({ isWidget }) => {
    // Animate widget in and out cleanly based on state
    useGSAP(() => {
        gsap.to(".avatar-fixed-widget", {
            scale: isWidget ? 1 : 0,
            autoAlpha: isWidget ? 1 : 0,
            pointerEvents: isWidget ? "auto" : "none",
            duration: 0.5,
            ease: "back.inOut(1.7)"
        });
    }, [isWidget]);

    const handleWidgetClick = () => {
        console.log("Avatar widget clicked — AI chat coming soon!");
    };

    return (
        <div
            className="avatar-fixed-widget"
            onClick={handleWidgetClick}
            title="Chat with my AI mini-me!"
        >
            <AvatarCanvas cameraZ={4} floatSpeed={2} isWidget={isWidget} />
        </div>
    );
};

export default AvatarWidget;
