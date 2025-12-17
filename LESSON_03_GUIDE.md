# 📘 Day 3: Camera & Controls - Mastering Perspective

## 🎯 Learning Objectives

By the end of Day 3, you will understand:
- The difference between Perspective and Orthographic cameras
- How Field of View (FOV) affects your scene
- Camera positioning and the `lookAt()` method
- Advanced OrbitControls configuration
- How to switch between cameras dynamically
- Camera frustum and clipping planes
- Best practices for camera setup in different scenarios

---

## 📚 Core Concepts

### 1. **Camera Types**

Cameras define how the 3D scene is projected onto the 2D screen.

#### **PerspectiveCamera** - Natural Human Vision

```javascript
const camera = new THREE.PerspectiveCamera(
  75,                                     // fov - Field of View
  window.innerWidth / window.innerHeight, // aspect - Aspect Ratio
  0.1,                                    // near - Near clipping plane
  1000                                    // far - Far clipping plane
);
```

**Parameters:**

1. **FOV (Field of View)** - Vertical angle in degrees
   - `35°-50°` = Narrow/Telephoto (zoomed in, less distortion)
   - `50°-75°` = Normal (natural looking)
   - `75°-120°` = Wide angle (fish-eye effect, more distortion)

2. **Aspect Ratio** - Usually `width / height`
   - Prevents stretching
   - Must match your viewport
   - Update on window resize

3. **Near Clipping Plane** - Closest visible distance
   - Too small (0.001) = Z-fighting issues
   - Too large = cuts off nearby objects
   - Typical: `0.1` to `1.0`

4. **Far Clipping Plane** - Furthest visible distance
   - Too large = depth precision issues
   - Too small = objects disappear too soon
   - Typical: `100` to `1000`

**Characteristics:**
- ✅ Objects farther away appear smaller (perspective distortion)
- ✅ Mimics human and camera vision
- ✅ Best for: Games, realistic scenes, first/third-person views
- ⚠️ Parallel lines converge at vanishing points

---

#### **OrthographicCamera** - Parallel Projection

```javascript
const frustumSize = 10;
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(
  frustumSize * aspect / -2,  // left
  frustumSize * aspect / 2,   // right
  frustumSize / 2,            // top
  frustumSize / -2,           // bottom
  0.1,                        // near
  1000                        // far
);
```

**Parameters:**

- **left, right, top, bottom** - Defines the visible box
- **frustumSize** - Controls zoom level (smaller = more zoomed in)
- **near, far** - Same as PerspectiveCamera

**Characteristics:**
- ✅ No perspective distortion - objects same size regardless of distance
- ✅ Parallel lines stay parallel
- ✅ Best for: CAD, strategy games, 2D games, technical drawings, UI
- ❌ Less realistic/immersive

**Visual Comparison:**
```
PERSPECTIVE:          ORTHOGRAPHIC:
    /\                    ||
   /  \                   ||
  /    \                  ||
 /      \                 ||
/________\                ||

Objects get             Objects stay
smaller with            same size
distance                regardless
```

---

### 2. **Field of View (FOV) Deep Dive**

FOV is the vertical viewing angle of the camera.

#### **FOV Values and Their Effects:**

```javascript
// NARROW FOV (Telephoto/Zoomed)
camera.fov = 35;
// ✓ Less distortion
// ✓ "Compressed" depth
// ✓ Objects appear closer together
// ✓ Use for: Product showcases, portraits

// NORMAL FOV
camera.fov = 75;
// ✓ Natural looking
// ✓ Balanced depth perception
// ✓ Use for: Most games, general 3D apps

// WIDE FOV (Wide Angle)
camera.fov = 100;
// ✓ More visible area
// ✓ "Stretched" depth
// ✓ Fish-eye distortion
// ✓ Use for: Racing games, action games, VR
```

**After changing FOV, MUST call:**
```javascript
camera.updateProjectionMatrix();
```

**FOV Formula:**
```
Horizontal FOV ≈ Vertical FOV × Aspect Ratio
```

---

### 3. **Camera Positioning**

#### **Position Property**

```javascript
// Set camera position
camera.position.set(x, y, z);
camera.position.x = 10;  // Move right
camera.position.y = 5;   // Move up
camera.position.z = 15;  // Move back (towards viewer)
```

**Coordinate System:**
- **X-axis:** Left (-) to Right (+)
- **Y-axis:** Down (-) to Up (+)
- **Z-axis:** Away (-) to Towards viewer (+)

#### **LookAt Method**

```javascript
// Camera looks at a point
camera.lookAt(0, 0, 0);           // Look at origin
camera.lookAt(object.position);   // Look at object
camera.lookAt(new THREE.Vector3(5, 0, 5));  // Look at coordinates
```

**Important:**
- `lookAt()` rotates the camera to face the target
- Overrides manual rotation
- Called AFTER positioning camera

#### **Common Camera Setups:**

```javascript
// TOP-DOWN VIEW (Strategy games, CAD)
camera.position.set(0, 20, 0);
camera.lookAt(0, 0, 0);

// ISOMETRIC VIEW
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// FIRST-PERSON VIEW
camera.position.set(0, 1.6, 0);  // ~eye height
camera.lookAt(0, 1.6, -5);       // Look forward

// ORBIT VIEW (Product showcase)
const radius = 5;
const angle = elapsedTime;
camera.position.x = Math.cos(angle) * radius;
camera.position.z = Math.sin(angle) * radius;
camera.lookAt(0, 0, 0);
```

---

### 4. **OrbitControls - Advanced Configuration**

OrbitControls allows mouse/touch interaction with the camera.

#### **Basic Setup:**

```javascript
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update(); // Call in animation loop if enableDamping is true
```

#### **All Configuration Options:**

```javascript
// DAMPING (Smooth, inertial movement)
controls.enableDamping = true;      // Enable smooth camera motion
controls.dampingFactor = 0.05;      // Lower = smoother (0.01-0.2)

// ZOOM
controls.enableZoom = true;         // Allow zoom
controls.zoomSpeed = 1.0;           // Zoom sensitivity
controls.minDistance = 5;           // Closest zoom
controls.maxDistance = 50;          // Furthest zoom

// ROTATION
controls.enableRotate = true;       // Allow rotation
controls.rotateSpeed = 1.0;         // Rotation sensitivity
controls.minPolarAngle = 0;         // Minimum vertical angle (radians)
controls.maxPolarAngle = Math.PI;   // Maximum vertical angle
controls.minAzimuthAngle = -Infinity; // Minimum horizontal angle
controls.maxAzimuthAngle = Infinity;  // Maximum horizontal angle

// PANNING
controls.enablePan = true;          // Allow panning
controls.panSpeed = 1.0;            // Pan sensitivity
controls.screenSpacePanning = false; // Pan in screen space or world space

// AUTO-ROTATION
controls.autoRotate = false;        // Automatically rotate camera
controls.autoRotateSpeed = 2.0;     // Rotation speed (30s per orbit at 2.0)

// TARGET
controls.target.set(0, 0, 0);       // What the camera orbits around
```

#### **Useful Constraint Examples:**

```javascript
// PREVENT GOING BELOW GROUND
controls.maxPolarAngle = Math.PI / 2;

// LIMIT TO 180° HORIZONTAL ROTATION
controls.minAzimuthAngle = -Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 2;

// SHOWCASE MODE (Auto-rotate)
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;

// LOCK VERTICAL MOVEMENT
controls.maxPolarAngle = Math.PI / 4;
controls.minPolarAngle = Math.PI / 4;
```

---

### 5. **Camera Frustum**

The frustum is the 3D region visible to the camera.

```
         Far Plane
        ___________
       /          /|
      /          / |
     /          /  |
    /__________/   | ← FOV angle
    |          |   |
    |  Camera  |   /
    |    ●     |  /
    |__________|_/
       Near Plane
```

**Frustum Culling:**
- Objects outside frustum are not rendered
- Automatic optimization
- Improves performance

**Clipping Planes:**
```javascript
// Objects closer than 'near' are clipped
camera.near = 0.1;

// Objects farther than 'far' are clipped
camera.far = 1000;

// MUST update after changes:
camera.updateProjectionMatrix();
```

---

### 6. **Switching Cameras**

```javascript
let currentCamera = perspectiveCamera;
const controls = new THREE.OrbitControls(currentCamera, renderer.domElement);

function switchCamera(newCamera) {
  // Save old position
  const oldPosition = currentCamera.position.clone();
  
  // Switch camera
  currentCamera = newCamera;
  currentCamera.position.copy(oldPosition);
  
  // Update controls
  controls.object = currentCamera;
  
  // Update projection if needed
  currentCamera.updateProjectionMatrix();
}
```

---

## 🔧 Code Patterns

### Pattern 1: Responsive Camera

```javascript
window.addEventListener('resize', () => {
  // Update aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  
  // MUST call this after changing camera properties
  camera.updateProjectionMatrix();
  
  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

### Pattern 2: Smooth Camera Movement

```javascript
// Using lerp (linear interpolation) for smooth movement
const targetPosition = new THREE.Vector3(10, 5, 10);

function animate() {
  camera.position.lerp(targetPosition, 0.05); // 5% towards target each frame
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

### Pattern 3: Multiple Viewports

```javascript
// Split screen - two cameras
function render() {
  // Left half - Perspective
  renderer.setViewport(0, 0, window.innerWidth / 2, window.innerHeight);
  renderer.render(scene, perspectiveCamera);
  
  // Right half - Orthographic
  renderer.setViewport(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
  renderer.render(scene, orthographicCamera);
}
```

---

## 🎨 Experiments to Try

### Experiment 1: FOV Comparison

```javascript
// Try these FOV values and see the difference
camera.fov = 30;   // Telephoto - less distortion
camera.fov = 75;   // Normal - balanced
camera.fov = 120;  // Fish-eye - lots of distortion
camera.updateProjectionMatrix();
```

### Experiment 2: Camera Orbiting

```javascript
function animate() {
  const radius = 10;
  const speed = 0.5;
  camera.position.x = Math.cos(elapsedTime * speed) * radius;
  camera.position.z = Math.sin(elapsedTime * speed) * radius;
  camera.lookAt(0, 0, 0);
}
```

### Experiment 3: Shake Effect

```javascript
function shakeCamera(intensity) {
  camera.position.x += (Math.random() - 0.5) * intensity;
  camera.position.y += (Math.random() - 0.5) * intensity;
}
```

### Experiment 4: Constrained Rotation

```javascript
// Lock camera to only orbit horizontally
controls.minPolarAngle = Math.PI / 3;
controls.maxPolarAngle = Math.PI / 3;
```

---

## 🐛 Common Issues & Solutions

### Problem: Camera inside object, can't see anything

**Cause:** Camera position at (0,0,0) or inside geometry

**Solution:**
```javascript
camera.position.set(0, 5, 10); // Move back
camera.lookAt(0, 0, 0);
```

---

### Problem: Objects disappear when moving camera

**Cause:** Outside the frustum (near/far clipping)

**Solution:**
```javascript
camera.near = 0.1;   // Not too small
camera.far = 1000;   // Large enough for scene
camera.updateProjectionMatrix();
```

---

### Problem: Distorted aspect ratio (stretched)

**Cause:** Camera aspect doesn't match viewport

**Solution:**
```javascript
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
```

---

### Problem: Changed FOV but nothing happened

**Cause:** Forgot to update projection matrix

**Solution:**
```javascript
camera.fov = 50;
camera.updateProjectionMatrix(); // ← MUST CALL THIS!
```

---

### Problem: Controls not working after camera switch

**Cause:** Controls still reference old camera

**Solution:**
```javascript
controls.object = newCamera;  // Update controls reference
```

---

## 📊 Camera Type Comparison

| Feature | Perspective | Orthographic |
|---------|------------|--------------|
| **Realism** | High (like human eye) | Low (technical) |
| **Depth Perception** | Strong | Weak |
| **Parallel Lines** | Converge | Stay parallel |
| **Distance = Size** | Yes, smaller | No, same size |
| **Best For** | Games, VR, realistic scenes | CAD, UI, strategy games |
| **Performance** | Same | Same |
| **FOV** | Adjustable | N/A |

---

## 🎮 Use Case Guide

### Choose **PerspectiveCamera** for:
- ✅ First-person games (FPS)
- ✅ Third-person games
- ✅ Racing games
- ✅ VR/AR experiences
- ✅ Realistic architectural visualization
- ✅ Cinematics

### Choose **OrthographicCamera** for:
- ✅ 2D games with 3D graphics
- ✅ Strategy games (top-down)
- ✅ CAD/technical drawings
- ✅ Isometric views
- ✅ UI elements in 3D
- ✅ Pixel-perfect positioning

---

## 🎓 Quiz Yourself

1. **What happens if you change `camera.fov` but don't call `updateProjectionMatrix()`?**
   <details><summary>Answer</summary>
   Nothing! The change won't take effect until you call `updateProjectionMatrix()`. This is a very common mistake.
   </details>

2. **What's the difference between Perspective and Orthographic cameras?**
   <details><summary>Answer</summary>
   Perspective: Objects farther away appear smaller (realistic). Orthographic: Objects stay the same size regardless of distance (technical/CAD).
   </details>

3. **Why should the camera aspect ratio match the viewport?**
   <details><summary>Answer</summary>
   To prevent distortion. If they don't match, circles become ovals and squares become rectangles.
   </details>

4. **What does `camera.lookAt(0, 0, 0)` do?**
   <details><summary>Answer</summary>
   It rotates the camera to point directly at the coordinates (0, 0, 0) - the origin/center of the scene.
   </details>

5. **When MUST you call `controls.update()` in the animation loop?**
   <details><summary>Answer</summary>
   When `enableDamping` is true. Damping requires update() to be called each frame for smooth motion.
   </details>

---

## 🚀 Next Steps

Tomorrow in **Day 4: Let There Be Light**, you'll learn:
- Different light types (Ambient, Directional, Point, Spot)
- Shadow configuration
- Light intensity and color
- Creating atmosphere and mood with lighting
- Performance optimization for lights

---

## 💡 Key Takeaways

✅ **PerspectiveCamera** = realistic, farther = smaller  
✅ **OrthographicCamera** = technical, no perspective distortion  
✅ **FOV** controls how wide the camera sees (35-120° typical)  
✅ **Always call** `updateProjectionMatrix()` after camera changes  
✅ **OrbitControls** enables easy mouse interaction  
✅ **Near/far planes** define what's visible (frustum)  
✅ **`lookAt()`** points camera at target  
✅ **Damping** creates smooth, professional camera movement  

---

**Excellent work! 🎉 You now master camera control!**

Understanding cameras is crucial for creating engaging 3D experiences. The difference between good and great 3D apps often comes down to camera work!

---

*Day 3 of the 10-Day Three.js Mastery Course*

