import { Suspense, useCallback, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Avatar } from "./Models/HeroModels/Avatar";
import CanvasLoader from "./CanvasLoader";
import { AVATAR_HINTS, DRAG_HINT, HINT_VISIBLE_MS, observeHints } from "../lib/avatarHints";

const AvatarCanvas = ({
    cameraZ = 5.4,
    floatSpeed = 2,
    avatarPosition = [0.05, -1.2, 0.3],
    isWidget,
    isChatOpen,
    angryPulse,
    isChasing,
    chasePhase,
    mouseTarget,
    widgetOrigin,
    onScreenPosUpdate,
    onChaseComplete,
    interactionPulse,
    forcedAnimation,
    onAvatarClick,
    onContextMenu
}) => {
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
            <ambientLight intensity={isChasing ? 0.35 : 0.3} color="#ffffff" />
            <hemisphereLight skyColor="#ffffff" groundColor="#333333" intensity={isChasing ? 0.6 : 1} />
            <directionalLight position={[5, 8, 5]} intensity={isChasing ? 0.35 : 0.5} color="#ffffff" castShadow />
            <directionalLight position={[-3, 3, 2]} intensity={isChasing ? 0.3 : 0.5} color="#a0c4ff" />
            <Environment preset="city" environmentIntensity={isChasing ? 0.5 : 1} />
            <Suspense fallback={<CanvasLoader />}>
                <Float speed={isChasing ? 0 : floatSpeed} rotationIntensity={isChasing ? 0 : 0.02} floatIntensity={isChasing ? 0 : 0.15}>
                    <group ref={groupRef} position={avatarPosition} scale={0}>
                        <Avatar
                            isWidget={isWidget}
                            isChatOpen={isChatOpen}
                            angryPulse={angryPulse}
                            isChasing={isChasing}
                            chasePhase={chasePhase}
                            mouseTarget={mouseTarget}
                            widgetOrigin={widgetOrigin}
                            onScreenPosUpdate={onScreenPosUpdate}
                            onChaseComplete={onChaseComplete}
                            interactionPulse={interactionPulse}
                            forcedAnimation={forcedAnimation}
                            onClick={onAvatarClick}
                            onContextMenu={onContextMenu}
                        />
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

    // Interactive Easter Egg & Reaction States
    const [angryPulse, setAngryPulse] = useState(0);
    const [interactionPulse, setInteractionPulse] = useState(0);
    const [isChasing, setIsChasing] = useState(false);
    const isChasingRef = useRef(false);
    const [chasePhase, setChasePhase] = useState('IDLE'); // 'IDLE' | 'CHASING' | 'RETURNING'
    const chaseTimer = useRef(null);
    const returnTimer = useRef(null);
    const singleClickTimer = useRef(null);
    const lastContextMenuTime = useRef(0);
    const mouseTarget = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
    const canvasBleedRef = useRef(null);
    const moveListenerRef = useRef(null);
    const bubbleRef = useRef(null);
    const dragListenersRef = useRef(null);

    const getBounds = useCallback(() => {
        const screenWidth = typeof window !== 'undefined' ? (window.innerWidth || document.documentElement.clientWidth) : 1920;
        const screenHeight = typeof window !== 'undefined' ? (window.innerHeight || document.documentElement.clientHeight) : 1080;
        const widgetWidth = dragRef.current ? dragRef.current.offsetWidth : 120;
        const widgetHeight = dragRef.current ? dragRef.current.offsetHeight : 200;

        // Base CSS: right: 24px, bottom: 24px
        // pos.x = 0 is docked right (24px padding from right viewport edge).
        // Dragging left means pos.x < 0.
        // Farthest left position leaves 24px padding from left viewport edge:
        const minX = -(screenWidth - widgetWidth - 48);
        const maxX = 0;

        // Base CSS: bottom: 24px.
        // pos.y = 0 is docked bottom (24px padding from bottom viewport edge).
        // Dragging DOWNWARDS would mean pos.y > 0, which pushes the avatar below the bottom edge!
        // Therefore, maxY is strictly 0: the avatar can NEVER be dragged below the screen bottom.
        // Dragging UPWARDS means pos.y < 0.
        // Farthest up position leaves 24px padding from top viewport edge:
        const minY = -(screenHeight - widgetHeight - 48);
        const maxY = 0;

        return { minX, maxX, minY, maxY, screenWidth, screenHeight, widgetWidth, widgetHeight };
    }, []);

    const handleScreenPosUpdate = useCallback((px, py) => {
        if (bubbleRef.current) {
            bubbleRef.current.style.left = `${px}px`;
            bubbleRef.current.style.top = `${py}px`;
        }
    }, []);

    useEffect(() => {
        setMounted(true);
        const onGlobalPointerMove = (e) => {
            mouseTarget.current.x = e.clientX;
            mouseTarget.current.y = e.clientY;
        };
        window.addEventListener("pointermove", onGlobalPointerMove, { passive: true });
        return () => {
            setMounted(false);
            window.removeEventListener("pointermove", onGlobalPointerMove);
        };
    }, []);

    // One hint at a time, each clearing itself after duration. If forced (e.g. angry or chase),
    // immediately overrides existing hint.
    const showHint = useCallback((text, duration = HINT_VISIBLE_MS, force = false) => {
        if (hintTimer.current && !force) return;
        if (hintTimer.current) window.clearTimeout(hintTimer.current);
        setHint(text);
        hintTimer.current = window.setTimeout(() => {
            setHint(null);
            hintTimer.current = null;
        }, duration);
    }, []);

    // Only observe once the widget is actually on screen, so hints cannot fire
    // for sections the visitor passed before the avatar appeared.
    useEffect(() => {
        if (!mounted || !isWidget || isChasing) return;
        return observeHints(showHint, seenHints.current);
    }, [mounted, isWidget, isChasing, showHint]);

    // The drag hint is about the widget itself rather than any section.
    useEffect(() => {
        if (!isWidget || isChasing || seenHints.current.has(DRAG_HINT.id)) return;
        const t = window.setTimeout(() => {
            if (seenHints.current.has(DRAG_HINT.id)) return;
            seenHints.current.add(DRAG_HINT.id);
            showHint(DRAG_HINT.text);
        }, DRAG_HINT.delayMs);
        return () => window.clearTimeout(t);
    }, [isWidget, isChasing, showHint]);

    useEffect(() => {
        return () => {
            window.clearTimeout(hintTimer.current);
            window.clearTimeout(singleClickTimer.current);
            if (chaseTimer.current) window.clearTimeout(chaseTimer.current);
            if (returnTimer.current) window.clearTimeout(returnTimer.current);
            if (dragListenersRef.current) {
                window.removeEventListener("pointermove", dragListenersRef.current.onMove);
                window.removeEventListener("pointerup", dragListenersRef.current.onUp);
                window.removeEventListener("pointercancel", dragListenersRef.current.onUp);
                dragListenersRef.current = null;
            }
        };
    }, []);

    // Ensure resizing the viewport never traps the avatar out of bounds or below screen
    useEffect(() => {
        const handleResize = () => {
            if (isChasing) return;
            const { minX, maxX, minY, maxY } = getBounds();
            pos.current.x = Math.min(maxX, Math.max(minX, pos.current.x));
            pos.current.y = Math.min(maxY, Math.max(minY, pos.current.y));
            if (dragRef.current) {
                dragRef.current.style.transform = (pos.current.x || pos.current.y)
                    ? `translate(${pos.current.x}px, ${pos.current.y}px)`
                    : '';
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isChasing, getBounds]);

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

    // End the chase mode and return cleanly to dock
    const endChaseMode = useCallback(() => {
        if (chaseTimer.current) {
            window.clearTimeout(chaseTimer.current);
            chaseTimer.current = null;
        }
        if (returnTimer.current) {
            window.clearTimeout(returnTimer.current);
            returnTimer.current = null;
        }
        if (moveListenerRef.current) {
            window.removeEventListener("pointermove", moveListenerRef.current);
            moveListenerRef.current = null;
        }

        isChasingRef.current = false;
        setIsChasing(false);
        setChasePhase('IDLE');

        if (bubbleRef.current) {
            bubbleRef.current.style.left = '';
            bubbleRef.current.style.top = '';
        }

        if (canvasBleedRef.current) {
            canvasBleedRef.current.style.transform = 'scaleX(1)';
        }

        if (dragRef.current) {
            dragRef.current.style.transform = pos.current.x || pos.current.y ? `translate(${pos.current.x}px, ${pos.current.y}px)` : '';
        }

        showHint("Alright, truce! Let's behave now 🤝", 3500, true);
    }, [showHint]);

    // Start running & chasing the mouse cursor across the screen
    const startChaseMode = useCallback(() => {
        if (chaseTimer.current) window.clearTimeout(chaseTimer.current);
        if (returnTimer.current) window.clearTimeout(returnTimer.current);
        if (moveListenerRef.current) {
            window.removeEventListener("pointermove", moveListenerRef.current);
        }

        isChasingRef.current = true;
        setIsChasing(true);
        setChasePhase('CHASING');
        showHint("THAT'S IT! I'M COMING FOR YOU! 🏃💨", 6000, true);

        const onPointerMoveWindow = (e) => {
            mouseTarget.current.x = e.clientX;
            mouseTarget.current.y = e.clientY;
        };
        moveListenerRef.current = onPointerMoveWindow;
        window.addEventListener("pointermove", onPointerMoveWindow);

        // Chase for 5.5s, then enter RETURNING phase to run back to corner
        chaseTimer.current = window.setTimeout(() => {
            setChasePhase('RETURNING');
            showHint("Alright, truce! Let's behave now 🤝", 3500, true);

            // Safety timeout if returning takes more than 3 seconds
            returnTimer.current = window.setTimeout(() => {
                endChaseMode();
            }, 3000);
        }, 5500);
    }, [showHint, endChaseMode]);

    // Tracks rapid pokes/taps to trigger the chase mode
    const pokeTimes = useRef([]);

    // Triggered on ANY tap/poke — whether left-click or right-click
    const registerPoke = useCallback((isRightClick, e) => {
        if (isChasingRef.current || isChasing) return;

        if (e && typeof e.clientX === 'number') {
            mouseTarget.current.x = e.clientX;
            mouseTarget.current.y = e.clientY;
        }

        const now = Date.now();
        pokeTimes.current = [...pokeTimes.current.filter((t) => now - t < 2500), now];

        if (pokeTimes.current.length >= 5) {
            // Threshold reached! Unleash chase mode!
            isChasingRef.current = true;
            pokeTimes.current = [];
            if (singleClickTimer.current) {
                window.clearTimeout(singleClickTimer.current);
                singleClickTimer.current = null;
            }
            startChaseMode();
            return;
        }

        if (isRightClick) {
            // Cancel pending chat open if any left click was debouncing
            if (singleClickTimer.current) {
                window.clearTimeout(singleClickTimer.current);
                singleClickTimer.current = null;
            }
            setAngryPulse((p) => p + 1);
            setInteractionPulse((p) => p + 1);
            showHint("Keep poking me and see what happens... 🤨", 3500, true);
        } else {
            // Left click: debounce chat modal so rapid taps don't open chat
            setInteractionPulse((p) => p + 1);
            if (singleClickTimer.current) {
                window.clearTimeout(singleClickTimer.current);
            }
            singleClickTimer.current = window.setTimeout(() => {
                singleClickTimer.current = null;
                pokeTimes.current = [];
                onAvatarClick?.();
            }, 300);
        }
    }, [isChasing, showHint, startChaseMode, onAvatarClick]);

    const handlePointerDown = (e) => {
        // Only allow primary left-click (button 0) to drag
        if (isChasing || e.button !== 0) return;
        isDragging.current = true;
        hasDragged.current = false;
        startPos.current = { x: e.clientX, y: e.clientY };
        gsap.killTweensOf(pos.current);

        // Attach global pointer listeners for smooth dragging outside widget bounds
        const onMove = (moveEvt) => handlePointerMove(moveEvt);
        const onUp = (upEvt) => handlePointerUp(upEvt);

        if (dragListenersRef.current) {
            window.removeEventListener('pointermove', dragListenersRef.current.onMove);
            window.removeEventListener('pointerup', dragListenersRef.current.onUp);
            window.removeEventListener('pointercancel', dragListenersRef.current.onUp);
        }

        dragListenersRef.current = { onMove, onUp };
        window.addEventListener('pointermove', onMove, { passive: false });
        window.addEventListener('pointerup', onUp, { passive: false });
        window.addEventListener('pointercancel', onUp, { passive: false });
    };

    const handlePointerMove = (e) => {
        if (isChasing || !isDragging.current) return;

        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;

        // If moved more than 8px from start position, it's considered an intentional drag
        if (Math.hypot(dx, dy) > 8) {
            hasDragged.current = true;
        }

        const { minX, maxX, minY, maxY } = getBounds();

        // Strictly clamp in real time so the avatar CANNOT be dragged below the bottom of the screen or off any edge
        pos.current.x = Math.min(maxX, Math.max(minX, pos.current.x + dx));
        pos.current.y = Math.min(maxY, Math.max(minY, pos.current.y + dy));
        startPos.current = { x: e.clientX, y: e.clientY };

        if (dragRef.current) {
            dragRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        }
    };

    const handlePointerUp = (e) => {
        if (dragListenersRef.current) {
            window.removeEventListener('pointermove', dragListenersRef.current.onMove);
            window.removeEventListener('pointerup', dragListenersRef.current.onUp);
            window.removeEventListener('pointercancel', dragListenersRef.current.onUp);
            dragListenersRef.current = null;
        }

        if (isChasing) return;
        const wasDragging = isDragging.current;
        isDragging.current = false;

        const { minX, maxX, minY, maxY, screenWidth } = getBounds();

        if (dragRef.current && hasDragged.current && wasDragging) {
            const rect = dragRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const screenCenterX = screenWidth / 2;

            // Snap X to either left or right dock
            let targetX = maxX; // 0 (right edge)
            if (centerX < screenCenterX) {
                targetX = minX; // snap to left edge
            }

            // Snap Y within strictly bounded range [minY, 0] (never below screen bottom)
            let targetY = Math.min(maxY, Math.max(minY, pos.current.y));

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
        } else if (dragRef.current && wasDragging) {
            // Was a small click/tap without intentional drag: ensure pos is clamped and not drifted
            pos.current.x = Math.min(maxX, Math.max(minX, pos.current.x));
            pos.current.y = Math.min(maxY, Math.max(minY, pos.current.y));
            dragRef.current.style.transform = (pos.current.x || pos.current.y)
                ? `translate(${pos.current.x}px, ${pos.current.y}px)`
                : '';
        }
    };

    const handleWidgetClick = (e) => {
        // Block if right-clicked recently (within 400ms), or dragged, or chasing, or non-left button
        if (
            Date.now() - lastContextMenuTime.current < 400 ||
            hasDragged.current ||
            isChasing ||
            (e?.button !== undefined && e.button !== 0)
        ) {
            return;
        }

        registerPoke(false, e);
    };

    const handleContextMenu = (e) => {
        if (e) {
            if (typeof e.preventDefault === "function") e.preventDefault();
            if (typeof e.stopPropagation === "function") e.stopPropagation();
        }
        lastContextMenuTime.current = Date.now();
        if (e?.currentTarget?.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {}
        }
        isDragging.current = false;
        hasDragged.current = false;
        if (isChasing) return;

        registerPoke(true, e);
    };

    const handlePointerEnter = () => {
        setInteractionPulse((p) => p + 1);
    };

    if (!mounted) return null;

    const widgetOrigin = {
        x: (typeof window !== 'undefined' ? window.innerWidth : 1920) - 84 + pos.current.x,
        y: (typeof window !== 'undefined' ? window.innerHeight : 1080) - 124 + pos.current.y,
    };

    return createPortal(
        <div
            ref={dragRef}
            className={`avatar-fixed-widget ${isChatOpen ? 'chat-active' : ''} ${isChasing ? 'avatar-fullscreen-chase' : ''}`}
            onClick={handleWidgetClick}
            onContextMenu={handleContextMenu}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerEnter={handlePointerEnter}
            title="Chat with my AI mini-me!"
        >
            {isWidget && !isChatOpen && (
                <div
                    ref={bubbleRef}
                    className={`speech-bubble ${hint ? 'speech-bubble-hint' : ''} ${isChasing ? 'speech-bubble-chase' : ''}`}
                    role="status"
                    aria-live="polite"
                >
                    {hint ?? 'Press me to chat!'}
                </div>
            )}
            {/* The canvas bleeds 30px past the widget box on every side in corner mode,
                and expands to 100vw x 100vh during chase mode for full-screen Desktop Goose action! */}
            <div className="avatar-canvas-bleed" ref={canvasBleedRef}>
                <AvatarCanvas
                    cameraZ={5.4}
                    floatSpeed={2}
                    isWidget={isWidget}
                    isChatOpen={isChatOpen}
                    angryPulse={angryPulse}
                    isChasing={isChasing}
                    chasePhase={chasePhase}
                    mouseTarget={mouseTarget}
                    widgetOrigin={widgetOrigin}
                    onScreenPosUpdate={handleScreenPosUpdate}
                    onChaseComplete={endChaseMode}
                    interactionPulse={interactionPulse}
                    onAvatarClick={handleWidgetClick}
                    onContextMenu={handleContextMenu}
                />
            </div>
        </div>,
        document.body
    );
};

export default AvatarWidget;
