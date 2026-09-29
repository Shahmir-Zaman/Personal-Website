# Specification: Avatar Interactive Behaviors & Chase Easter Egg

**Date:** 2026-09-22  
**Status:** Approved  
**Topic:** Interactive Avatar Animations (Angry, Run, Sad->Idle Wake) & Cursor Chase Mechanic

---

## 1. Overview & Objectives

Enhance the 3D portfolio avatar with playful, responsive micro-interactions and an easter egg:
1. **Wake to Idle:** Hovering or right-clicking while in `Sad Idle` immediately returns the avatar to `Idle`.
2. **Angry Reaction:** Right-clicking the floating avatar widget triggers the baked `Angry` animation with a speech bubble reaction and context menu suppression.
3. **Click-Rage Chase Mode:** Clicking the avatar 5 times within 2 seconds activates the baked `Run` animation. The avatar widget unpins from its dock and actively chases the visitor's cursor across the screen for 6 seconds before tiring out and snapping back to the screen edge.

---

## 2. Animation States & Clip Mapping

The model `avatar-new.glb` has the following relevant baked clips:
* `Idle` (339 frames) — Looping breathing idle with head tracking
* `Wave` (69 frames) — Played when chat opens or avatar appears
* `Sad` (106 frames) — Triggered after 90 seconds of inactivity
* `Angry` (99 frames) — Triggered on right-click in widget state
* `Run` (22 frames) — Looping run cycle during cursor chase mode

### State Machine Definition

```javascript
const CLIP_FOR_STATE = {
  'Idle': 'Idle',
  'Sad Idle': 'Sad',
  'Wave': 'Wave',
  'Angry': 'Angry',
  'Run': 'Run',
};
```

* **Angry Configuration:**
  - One-shot animation (`THREE.LoopOnce`).
  - Clamp when finished (`clampWhenFinished = true`).
  - Crossfade duration: 0.3s.
  - Automatically transitions back to `Idle` on the `finished` mixer event (or fallback timeout).
* **Run Configuration:**
  - Looping animation (`THREE.LoopRepeat, Infinity`).
  - Time scale: 1.25x for energetic sprint pace.
  - Crossfade duration: 0.25s for immediate responsiveness.

---

## 3. Interaction Mechanics

### 3.1 Wake from Sad to Idle
* **Event Handlers:** `onPointerOver` and `onContextMenu` in `Avatar.jsx` / `AvatarWidget.jsx`.
* **Logic:**
  ```javascript
  if (animationName === "Sad Idle") {
    setAnimationName("Idle");
  }
  ```
* **Reset Timer:** Resets the 90-second inactivity countdown so the avatar does not immediately re-enter sadness.

### 3.2 Right-Click on Small Avatar (Angry Mode)
* **Trigger:** Right-click on the floating avatar widget (`onContextMenu`).
* **Behavior:**
  1. `e.preventDefault()` prevents browser context menu popup.
  2. Sets animation state to `Angry`.
  3. Displays a speech bubble: *"Hey! Why did you right-click me?! 😠"*.
  4. Once `Angry` completes, speech bubble clears and animation crossfades back to `Idle`.

### 3.3 Click-Rage Chase Mode
* **Trigger:** 5 clicks within a 2000ms sliding window.
* **State Machine:**
  - Enter state `isChasing = true`.
  - Override animation to `Run`.
  - Speech bubble updates to: *"THAT'S IT! I'M COMING FOR YOU! 🏃💨"*.
* **Physics Loop (`gsap.ticker`):**
  - Track target position based on `globalPointer.current`.
  - In each tick, compute delta vector between avatar widget center and pointer:
    ```javascript
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    ```
  - Move widget towards cursor at smooth interpolation speed (`pos.x += dx * 0.08`, `pos.y += dy * 0.08`).
  - Flip widget horizontally via CSS `scaleX(1)` vs `scaleX(-1)` depending on whether `dx >= 0` or `dx < 0`, so the avatar always faces the direction of motion.
  - Pointer dragging is disabled while `isChasing === true`.
* **Termination & Recovery (6000ms timeout):**
  - Timer completes -> `isChasing = false`.
  - Speech bubble displays: *"Phew... okay, stop poking me! 😮‍💨"* for 3 seconds.
  - Animation transitions from `Run` back to `Idle`.
  - Widget uses existing GSAP snap physics (`gsap.to(pos.current, { x: targetEdgeX, y: boundedY, ease: 'back.out(1.2)', duration: 0.7 })`) to cleanly return to the nearest screen edge.
  - Click timestamps array cleared.

---

## 4. Component Interfaces

### `Avatar.jsx`
New props:
* `forcedAnimation?: string` — Allows `AvatarWidget` to directly command `Angry` or `Run`.
* `onContextMenu?: (e: MouseEvent) => void` — Right-click event propagation.
* `onWakeFromSad?: () => void` — Notification when waking from sad state.

### `AvatarWidget.jsx`
* Maintains `rapidClicks: number[]` (timestamps).
* Maintains `isChasing: boolean`.
* Maintains `customHint: string | null`.
* Manages `gsap.ticker` listener for chase translation.

---

## 5. Testing & Verification

1. **Sad -> Idle Wake:**
   - Allow avatar to enter `Sad Idle` (or simulate by setting initial state).
   - Hover cursor over avatar: verify it immediately crossfades to `Idle` (not `Wave`).
   - Right-click avatar: verify it immediately crossfades to `Idle`.
2. **Right-Click Angry:**
   - Right-click widget in idle state.
   - Verify context menu does not appear.
   - Verify avatar plays `Angry` animation and speech bubble displays angry reaction.
   - Verify it returns cleanly to `Idle` when finished.
3. **Rapid Clicks & Chase:**
   - Click widget 5 times rapidly within 2 seconds.
   - Verify avatar starts `Run` animation and speech bubble announces chase.
   - Move mouse around window: verify widget follows cursor smoothly across the screen and faces the direction of movement.
   - After 6 seconds, verify avatar stops running, displays tired speech bubble, and springs back to the nearest screen edge.
