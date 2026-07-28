import { Suspense, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Avatar } from "./Models/HeroModels/Avatar";
import CanvasLoader from "./CanvasLoader";

const AvatarCanvas = ({ cameraZ = 4, floatSpeed = 1.5, avatarPosition = [0.05, -1.2, 0.3], isWidget, isHeld, isChatOpen, onAvatarClick }) => {
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
            <ambientLight intensity={1} color="#ffffff" />
            <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={1} />
            <directionalLight position={[5, 8, 5]} intensity={1} color="#ffffff" castShadow />
            <directionalLight position={[-3, 3, 2]} intensity={1} color="#a0c4ff" />
            <Environment preset="city" />
            <Suspense fallback={<CanvasLoader />}>
                <Float speed={floatSpeed} rotationIntensity={0.02} floatIntensity={0.15}>
                    <group ref={groupRef} position={avatarPosition} scale={0}>
                        <Avatar isWidget={isWidget} isHeld={isHeld} isChatOpen={isChatOpen} onClick={onAvatarClick} />
                    </group>
                </Float>
            </Suspense>
        </Canvas>
    );
};

const AvatarWidget = ({ isWidget, onAvatarClick, isChatOpen }) => {
    const dragRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });
    const hasDragged = useRef(false);

    const [isHeld, setIsHeld] = useState(false);

    // Animate widget in and out cleanly based on state
    useGSAP(() => {
        gsap.to(".avatar-fixed-widget", {
            autoAlpha: isWidget && !isChatOpen ? 1 : 0,
            pointerEvents: isWidget && !isChatOpen ? "auto" : "none",
            duration: 0.5,
            ease: "power2.inOut"
        });
    }, [isWidget, isChatOpen]);

    const handlePointerDown = (e) => {
        isDragging.current = true;
        hasDragged.current = false;
        startPos.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture(e.pointerId);
        gsap.killTweensOf(pos.current);
        setIsHeld(true);
    };

    const handlePointerMove = (e) => {
        if (!isDragging.current) return;
        
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        
        // If moved more than 5px, it's considered a drag
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            hasDragged.current = true;
        }

        pos.current.x += dx;
        pos.current.y += dy;
        startPos.current = { x: e.clientX, y: e.clientY };

        if (dragRef.current) {
            dragRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        }
    };

    const handlePointerUp = (e) => {
        isDragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
        setIsHeld(false);

        if (dragRef.current) {
            const rect = dragRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            
            // Use clientWidth/Height to exclude scrollbars so it doesn't snap partially off-screen
            const screenWidth = document.documentElement.clientWidth;
            const screenHeight = document.documentElement.clientHeight;
            const screenCenterX = screenWidth / 2;
            
            // The original CSS position is right: 24px, bottom: 24px
            // This means when translate is (0, 0), it's at the right edge.
            // To snap to the left edge, we need to translate by -(screenWidth - rect.width - 48)
            let targetX = 0;
            if (centerX < screenCenterX) {
                targetX = -(screenWidth - rect.width - 48);
            }
            
            // Keep Y bounded so it doesn't go off screen vertically
            let targetY = pos.current.y;
            const maxUpY = -(screenHeight - rect.height - 48);
            if (targetY < maxUpY) targetY = maxUpY;
            if (targetY > 0) targetY = 0;

            gsap.to(pos.current, {
                x: targetX,
                y: targetY,
                duration: 0.6,
                ease: "back.out(1.2)",
                onUpdate: () => {
                    if (dragRef.current) {
                        dragRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
                    }
                }
            });
        }
    };

    const handleWidgetClick = () => {
        if (hasDragged.current) return; // Ignore click if we were dragging

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
            ref={dragRef}
            className={`avatar-fixed-widget ${isChatOpen ? 'chat-active' : ''}`}
            onClick={handleWidgetClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            title="Chat with my AI mini-me!"
        >
            {isWidget && !isChatOpen && (
                <div className="speech-bubble">
                    Press me to chat!
                </div>
            )}
            <AvatarCanvas cameraZ={4} floatSpeed={2} isWidget={isWidget} isHeld={isHeld} isChatOpen={isChatOpen} onAvatarClick={handleWidgetClick} />
        </div>,
        document.body
    );
};

export default AvatarWidget;
