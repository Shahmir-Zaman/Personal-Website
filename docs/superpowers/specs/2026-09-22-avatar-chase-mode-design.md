# Design: Dynamic Fullscreen Avatar Chase Mode with 3D Rotation

## 1. Overview & Goal
When the user pokes or right-clicks the avatar 5 times, the avatar enters **Chase Mode**.
Currently, the chase moves a small 180x260px widget box with 2D `scaleX(-1)` flipping, which creates clipping boundaries, causes the avatar to appear constrained behind the cursor, and lacks natural 3D motion.

**Goal:**
1. Dynamically expand the 3D Canvas stage to **fullscreen (`100vw` × `100vh`)** during Chase Mode so the avatar has no boundary limits and never clips.
2. Implement **true 3D yaw rotation** so the avatar turns dynamically toward the cursor's movement vector as he runs.
3. Keep the speech bubble floating naturally above the running avatar.
4. Seamlessly return the avatar to the bottom-right corner widget when the 6-second chase concludes.

---

## 2. Architecture & Component Responsibilities

### A. Dynamic Canvas Mode in `AvatarWidget.jsx`
* **Idle/Normal Mode**:
  - The widget remains in its compact corner box (`120px × 200px`) at `bottom: 24px; right: 24px`.
  - Normal pointer events are enabled for dragging, hovering, single-click chat opening, and right-click angry gestures.
* **Chase Mode (`isChasing === true`)**:
  - The container class switches to `.avatar-fullscreen-chase` (`position: fixed; inset: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 50;`).
  - The Canvas expands to fill the entire viewport.
  - `pointer-events: none` ensures the running avatar never interferes with mouse clicks or underlying page elements.

### B. Fullscreen 3D Positioning & 3D Rotation in Three.js (`Avatar.jsx` / `AvatarCanvas`)
* **Coordinate Mapping**:
  - Using Three.js R3F's `viewport` and `delta` inside `useFrame`:
    Convert window pixel coordinates `(clientX, clientY)` into Three.js viewport units:
    ```javascript
    const targetX = (cursor.x / window.innerWidth) * viewport.width - viewport.width / 2;
    const targetY = -(cursor.y / window.innerHeight) * viewport.height + viewport.height / 2;
    ```
* **Smooth Chasing Movement**:
  - Avatar group position smoothly interpolates toward `(targetX, targetY)`:
    ```javascript
    pos.x = THREE.MathUtils.damp(pos.x, targetX, 4, delta);
    pos.y = THREE.MathUtils.damp(pos.y, targetY - 0.5, 4, delta); // Slightly offset below cursor so avatar doesn't obscure the pointer
    ```
* **True 3D Yaw Rotation Toward Movement Vector**:
  - Compute heading angle based on velocity/offset:
    ```javascript
    const dx = targetX - pos.x;
    const dy = targetY - pos.y;
    // Map movement direction to Y-axis rotation (radians)
    const targetAngle = Math.atan2(dx, 1.2); // Leans and faces into the run
    avatarGroup.rotation.y = THREE.MathUtils.damp(avatarGroup.rotation.y, targetAngle, 8, delta);
    ```
  - When running right, the avatar smoothly banks and turns right.
  - When running left, the avatar smoothly banks and turns left.
  - When chasing toward the top or bottom, head and body angle naturally.

### C. Speech Bubble Placement
* While in fullscreen chase mode, the speech bubble is rendered as an overlay anchored directly to the avatar's screen projection or CSS transform:
  - Speech bubble displays: `"THAT'S IT! I'M COMING FOR YOU! 🏃💨"`
  - Does not flip or reverse text when the avatar turns.

### D. Chase Completion & Return to Corner
* At `6000ms`:
  - Avatar smoothly runs/eases back to the bottom-right corner target coordinates.
  - Container transitions from fullscreen back to the compact widget box.
  - State returns to `Idle` animation with dialogue: `"Phew... okay, stop poking me! 😮‍💨"`.

---

## 3. Verification Plan
1. **Trigger Chase via 5 Pokes (Left-Click or Right-Click)**:
   - Confirm Canvas expands to fullscreen with zero edge clipping.
   - Confirm avatar turns dynamically in 3D to face the cursor as the mouse moves around the screen.
   - Confirm avatar runs with the baked `Run` animation (no T-pose).
2. **Cursor Transparency**:
   - Confirm `pointer-events: none` is active during chase so the mouse is never blocked.
3. **Corner Return**:
   - Confirm that at 6 seconds, the avatar smoothly runs back to the bottom-right corner and returns to `Idle`.
4. **Build Verification**:
   - Run `npm run build` to verify clean compilation with 0 errors.
