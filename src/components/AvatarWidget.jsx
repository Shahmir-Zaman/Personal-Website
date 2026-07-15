import { Suspense, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Avatar } from "./Models/HeroModels/Avatar";
import CanvasLoader from "./CanvasLoader";

const AvatarCanvas = ({ cameraZ = 4, floatSpeed = 1.5, avatarPosition = [0.05, -1.2, 0.3], isWidget, onAvatarClick }) => {
    const groupRef = useRef();

    useGSAP(() => {
        if (groupRef.current) {
            gsap.to(groupRef.current.scale, {
                x: isWidget ? 1.5 : 0,
                y: isWidget ? 1.5 : 0,
                z: isWidget ? 1.5 : 0,
                duration: 0.5,
                ease: "back.inOut(1.7)"
            });
        }
    }, [isWidget]);

    return (
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
                    <group ref={groupRef} position={avatarPosition} scale={0}>
                        <Avatar isWidget={isWidget} onClick={onAvatarClick} />
                    </group>
                </Float>
            </Suspense>
        </Canvas>
    );
};

const AvatarWidget = ({ isWidget, onAvatarClick, isChatOpen }) => {
    // Animate widget in and out cleanly based on state
    useGSAP(() => {
        gsap.to(".avatar-fixed-widget", {
            autoAlpha: isWidget && !isChatOpen ? 1 : 0,
            pointerEvents: isWidget && !isChatOpen ? "auto" : "none",
            duration: 0.5,
            ease: "power2.inOut"
        });
    }, [isWidget, isChatOpen]);

    const handleWidgetClick = () => {
        if (onAvatarClick) {
            onAvatarClick();
        } else {
            console.log("Avatar widget clicked — AI chat coming soon!");
        }
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div
            className={`avatar-fixed-widget ${isChatOpen ? 'chat-active' : ''}`}
            onClick={handleWidgetClick}
            title="Chat with my AI mini-me!"
        >
            {isWidget && !isChatOpen && (
                <div className="speech-bubble">
                    Press me to chat!
                </div>
            )}
            <AvatarCanvas cameraZ={4} floatSpeed={2} isWidget={isWidget} onAvatarClick={handleWidgetClick} />
        </div>,
        document.body
    );
};

export default AvatarWidget;
