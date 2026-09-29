# Desktop Goose-Style Avatar Chase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the avatar's chase easter egg into a true "Desktop Goose"-style experience where the 3D canvas stage covers the full screen and the avatar turns to face and sprint directly towards the mouse pointer anywhere on the screen.

**Architecture:**
- **Dynamic Fullscreen Viewport:** During `isChasing === true`, `AvatarWidget` expands to `fixed inset-0 w-screen h-screen pointer-events-none z-50`.
- **3D World-Space Pathfinding:** In Three.js (`useFrame`), mouse screen coordinates are unprojected into 3D world units. The avatar moves towards the target with velocity and acceleration.
- **Dynamic 3D Orientation (Desktop Goose):** The avatar's 3D Y-axis (and subtle pitch/bank) smoothly rotates toward the movement vector `Math.atan2(dx, -dy)`, so the avatar visibly turns and runs toward the cursor in full 3D.
- **Dynamic Speech Bubble Positioning:** The speech bubble tracks the avatar's 3D head projected to screen coordinates so `"THAT'S IT! I'M COMING FOR YOU! 🏃💨"` floats directly above the running avatar.
- **Return to Corner on Timeout:** When the 6s timer expires, the target coordinate returns to the bottom-right corner. The avatar runs back to the corner, transitions to `Idle`, and the widget smoothly shrinks back to its compact 120x200px corner mode.

**Tech Stack:** React 18, React Three Fiber (R3F), Three.js, GSAP, Tailwind CSS / Vanilla CSS

---

## Task 1: Fullscreen Canvas CSS & Widget Wrapper State
**Files:**
- Modify: `src/index.css`
- Modify: `src/components/AvatarWidget.jsx`

- [ ] **Step 1: Add `.avatar-fullscreen-chase` in `src/index.css`**
- [ ] **Step 2: Update `AvatarWidget.jsx` to toggle fullscreen during chase**
- [ ] **Step 3: Connect mouse pointer stream and projection callback**

---

## Task 2: 3D World Movement & Desktop Goose Heading Rotation in `Avatar.jsx`
**Files:**
- Modify: `src/components/Models/HeroModels/Avatar.jsx`

- [ ] **Step 1: In `useFrame`, calculate viewport-mapped target coordinates from mouse pointer**
- [ ] **Step 2: Smoothly interpolate avatar 3D position towards target**
- [ ] **Step 3: Compute heading angle `Math.atan2(dx, dy)` and rotate `rotation.y` to face movement**
- [ ] **Step 4: Smooth return to origin on chase end**

---

## Task 3: Verification & Polish
- [ ] **Step 1: Run `npm run build` to verify clean compilation**
- [ ] **Step 2: Test 3D rotation in all 4 quadrants (top, bottom, left, right)**
- [ ] **Step 3: Test speech bubble tracking and corner reset**
