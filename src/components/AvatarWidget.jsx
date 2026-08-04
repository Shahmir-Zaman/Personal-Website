import { Suspense, useCallback, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Avatar } from "./Models/HeroModels/Avatar";
import CanvasLoader from "./CanvasLoader";
import { AVATAR_HINTS, DRAG_HINT, HINT_VISIBLE_MS, observeHints } from "../lib/avatarHints";

const AvatarCanvas = ({ cameraZ = 4, floatSpeed = 1.5, avatarPosition = [0.05, -1.2, 0.3], isWidget, isChatOpen, onAvatarClick }) => {
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
            <ambientLight intensity={0.3} color="#ffffff" />
            <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={1} />
            <directionalLight position={[5, 8, 5]} intensity={0.5} color="#ffffff" castShadow />
            <directionalLight position={[-3, 3, 2]} intensity={0.5} color="#a0c4ff" />
            <Environment preset="city" />
            <Suspense fallback={<CanvasLoader />}>
                <Float speed={floatSpeed} rotationIntensity={0.02} floatIntensity={0.15}>
                    <group ref={groupRef} position={avatarPosition} scale={0}>
                        <Avatar isWidget={isWidget} isChatOpen={isChatOpen} onClick={onAvatarClick} />
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

    const [mounted, setMounted] = useState(false);

    // Contextual hint currently in the bubble; null means the default greeting.
    const [hint, setHint] = useState(null);
    const hintTimer = useRef(null);
    const seenHints = useRef(new Set());

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // One hint at a time, each clearing itself after HINT_VISIBLE_MS. An
    // in-flight hint is never interrupted — a visitor scrolling fast would
    // otherwise see text flicker between sections.
    const showHint = useCallback((text) => {
        if (hintTimer.current) return;
        setHint(text);
        hintTimer.current = window.setTimeout(() => {
            setHint(null);
            hintTimer.current = null;
        }, HINT_VISIBLE_MS);
    }, []);

    // Only observe once the widget is actually on screen, so hints cannot fire
    // for sections the visitor passed before the avatar appeared.
    useEffect(() => {
        if (!mounted || !isWidget) return;
        return observeHints(showHint, seenHints.current);
    }, [mounted, isWidget, showHint]);

    // The drag hint is about the widget itself rather than any section.
    useEffect(() => {
        if (!isWidget || seenHints.current.has(DRAG_HINT.id)) return;
        const t = window.setTimeout(() => {
            if (seenHints.current.has(DRAG_HINT.id)) return;
            seenHints.current.add(DRAG_HINT.id);
            showHint(DRAG_HINT.text);
        }, DRAG_HINT.delayMs);
        return () => window.clearTimeout(t);
    }, [isWidget, showHint]);

    useEffect(() => () => window.clearTimeout(hintTimer.current), []);

    // Animate widget in and out cleanly based on state. Targets the ref rather
    // than a global selector, and waits for `mounted`: the widget is portalled
    // and renders null on the first pass, so a selector lookup here matched
    // nothing and GSAP warned "target not found".
    useGSAP(() => {
        if (!dragRef.current) return;
        gsap.to(dragRef.current, {
            autoAlpha: isWidget && !isChatOpen ? 1 : 0,
            pointerEvents: isWidget && !isChatOpen ? "auto" : "none",
            duration: 0.5,
            ease: "power2.inOut"
        });
    }, [isWidget, isChatOpen, mounted]);

    const handlePointerDown = (e) => {
        isDragging.current = true;
        hasDragged.current = false;
        startPos.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture(e.pointerId);
        gsap.killTweensOf(pos.current);
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

        onAvatarClick?.();
    };

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
                // key remounts the node so the pop-in animation replays on each
                // new hint; role/aria-live announce the change to screen readers,
                // which otherwise get a silent text swap.
                <div
                    key={hint ?? 'default'}
                    className={`speech-bubble ${hint ? 'speech-bubble-hint' : ''}`}
                    role="status"
                    aria-live="polite"
                >
                    {hint ?? 'Press me to chat!'}
                </div>
            )}
            {/* The canvas bleeds 30px past the widget box on every side. WebGL
                clips at the canvas edge no matter what CSS overflow says, and at
                120x200 the avatar's feet landed 1.5px from the bottom — the
                Float cycle pushed them straight through it. cameraZ is pulled
                back to match the larger canvas so the avatar's on-screen size
                is unchanged; the widget's own 120x200 box still anchors layout. */}
            <div className="avatar-canvas-bleed">
                <AvatarCanvas cameraZ={5.4} floatSpeed={2} isWidget={isWidget} isChatOpen={isChatOpen} onAvatarClick={handleWidgetClick} />
            </div>
        </div>,
        document.body
    );
};

export default AvatarWidget;
