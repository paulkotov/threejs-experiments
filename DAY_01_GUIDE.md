# 📘 Day 1: Hello Three.js - Your First 3D Scene

## 🎯 Learning Objectives

By the end of Day 1, you will understand:
- The fundamental structure of a Three.js application
- The "Trinity" of Three.js: Scene, Camera, and Renderer
- How to create basic 3D geometry
- How to apply materials to objects
- How the animation loop works
- How to make scenes responsive

---

## 📚 Core Concepts

### 1. **The Scene** (`THREE.Scene`)

The scene is a container that holds all your 3D objects, lights, and cameras. Think of it as a stage where your 3D world exists.

```javascript
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);
```

**Key Points:**
- Everything visible must be added to the scene
- You can have multiple scenes, but typically use one
- Can set background color, fog, and environment

### 2. **The Camera** (`THREE.PerspectiveCamera`)

The camera defines what you see. It's your viewpoint into the 3D world.

```javascript
const camera = new THREE.PerspectiveCamera(
  75,                                     // Field of View (FOV)
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1,                                    // Near clipping plane
  1000                                    // Far clipping plane
);
camera.position.z = 5;
```

**Parameters Explained:**
- **FOV (75°)**: How wide the camera sees. Smaller = zoomed in, Larger = zoomed out
- **Aspect Ratio**: Should match your viewport (width/height)
- **Near (0.1)**: Objects closer than this won't render
- **Far (1000)**: Objects further than this won't render

**Camera Position:**
- Default is (0, 0, 0) - the center of the world
- We move it to (0, 0, 5) to see objects at the origin
- Positive Z = towards you, Negative Z = away from you

### 3. **The Renderer** (`THREE.WebGLRenderer`)

The renderer draws your 3D scene onto a 2D canvas using WebGL.

```javascript
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);
```

**Key Points:**
- `antialias: true` = smoother edges (slightly slower)
- `setPixelRatio()` = sharper on retina displays
- `renderer.domElement` = the actual `<canvas>` element

### 4. **Geometry** (The Shape)

Geometry defines the structure - the vertices (points) and faces (triangles) that make up a 3D shape.

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
```

**Common Built-in Geometries:**
- `BoxGeometry` - Cube/rectangular box
- `SphereGeometry` - Sphere
- `PlaneGeometry` - Flat plane
- `CylinderGeometry` - Cylinder
- `TorusGeometry` - Donut shape

### 5. **Material** (The Appearance)

Material defines how the surface looks - color, shininess, transparency, etc.

```javascript
const material = new THREE.MeshBasicMaterial({ 
  color: 0x00ff88,
  wireframe: false
});
```

**Material Types:**
- `MeshBasicMaterial` - No lighting needed, always visible
- `MeshStandardMaterial` - Realistic, reacts to lights
- `MeshPhongMaterial` - Shiny surfaces
- `MeshLambertMaterial` - Matte surfaces

**Color Formats:**
- Hexadecimal: `0xff0000` (red)
- RGB string: `'rgb(255, 0, 0)'`
- Color name: `'red'`

### 6. **Mesh** (Geometry + Material)

A mesh combines geometry and material into a visible object.

```javascript
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

### 7. **The Animation Loop**

The animation loop runs ~60 times per second, updating and rendering the scene.

```javascript
function animate() {
  requestAnimationFrame(animate);  // Schedule next frame
  
  cube.rotation.x += 0.01;         // Update objects
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);  // Draw the scene
}
animate(); // Start the loop
```

**How it Works:**
1. `requestAnimationFrame()` schedules the function to run before next repaint
2. Update object positions, rotations, etc.
3. Render the scene from the camera's viewpoint
4. Repeat

---

## 🔧 Code Breakdown

### Rotation

```javascript
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
```

- Rotation values are in **radians** (not degrees)
- π radians = 180 degrees
- `0.01` radians ≈ 0.57 degrees per frame
- At 60 FPS: 0.57 × 60 = ~34 degrees per second

### Position

```javascript
cube.position.x = -2;  // Move left
cube.position.y = 1;   // Move up
cube.position.z = -3;  // Move away
```

- Default position is (0, 0, 0)
- X: left (-) / right (+)
- Y: down (-) / up (+)
- Z: away (-) / towards (+)

---

## 🎨 Experiments to Try

### Experiment 1: Colors
Change the cube colors to your favorites:
```javascript
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff }); // Purple
```

### Experiment 2: Wireframe Mode
See the geometry structure:
```javascript
const material = new THREE.MeshBasicMaterial({ 
  color: 0x00ff88,
  wireframe: true  // Show the triangles!
});
```

### Experiment 3: Different Rotation Speeds
```javascript
cube.rotation.x += 0.05;  // Faster
cube.rotation.y += 0.001; // Slower
```

### Experiment 4: Camera Position
Move the camera to different positions:
```javascript
camera.position.set(3, 2, 5);  // x, y, z
camera.lookAt(0, 0, 0);        // Look at the center
```

### Experiment 5: Add More Shapes
```javascript
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 2;
scene.add(sphere);
```

---

## 🐛 Common Mistakes & Solutions

### Problem: Black screen, nothing renders
**Solutions:**
- Check if camera is positioned correctly (not at origin)
- Ensure objects are added to scene with `scene.add()`
- Check browser console for errors
- Make sure Three.js library loaded correctly

### Problem: Objects too small or too large
**Solutions:**
- Adjust geometry size: `new THREE.BoxGeometry(2, 2, 2)`
- Move camera closer/further: `camera.position.z = 10`
- Change Field of View: `new THREE.PerspectiveCamera(50, ...)`

### Problem: Animation is choppy
**Solutions:**
- Use `requestAnimationFrame()` not `setInterval()`
- Reduce rotation increment for smoother motion
- Check browser performance

---

## 📊 The Three.js Rendering Pipeline

```
┌─────────────────────────────────────────────────────────┐
│                    Animation Loop                        │
│  (runs ~60 times per second)                            │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  1. Update Phase                                         │
│     - Modify object positions, rotations, scales        │
│     - Update animations                                 │
│     - Handle user input                                 │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  2. Render Phase                                         │
│     - Camera calculates what's visible                  │
│     - Renderer draws scene to canvas                    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
                    Display on Screen
```

---

## 🎓 Quiz Yourself

1. **What are the three essential components needed for any Three.js scene?**
   <details><summary>Answer</summary>Scene, Camera, and Renderer</details>

2. **Why do we need to move the camera from its default position?**
   <details><summary>Answer</summary>The camera starts at (0,0,0) - the same position as our objects. We need to move it back to see them.</details>

3. **What's the difference between Geometry and Material?**
   <details><summary>Answer</summary>Geometry defines the SHAPE (vertices and faces), Material defines the APPEARANCE (color, texture, etc.)</details>

4. **Why use `requestAnimationFrame()` instead of `setInterval()`?**
   <details><summary>Answer</summary>requestAnimationFrame syncs with browser refresh rate (~60fps), pauses when tab is inactive, and provides smoother animations.</details>

5. **What unit does Three.js use for rotation?**
   <details><summary>Answer</summary>Radians (not degrees). 2π radians = 360 degrees</details>

---

## 🚀 Next Steps

Tomorrow in **Day 2: Shapes & Materials**, you'll learn:
- How to use different built-in geometries
- Advanced material properties
- Creating a gallery of 3D shapes
- Material types that react to light

---

## 💡 Key Takeaways

✅ **Scene, Camera, Renderer** - The Three.js Trinity  
✅ **Mesh = Geometry + Material**  
✅ **Animation Loop** updates and renders continuously  
✅ **Position in 3D space** uses X, Y, Z coordinates  
✅ **Rotation** is measured in radians  
✅ **Always handle window resize** for responsive scenes  

---

**Congratulations! 🎉 You've completed Day 1!**

You now understand the fundamentals of Three.js and can create basic 3D scenes. Keep experimenting with the code - that's the best way to learn!

---

*Created as part of the 10-Day Three.js Mastery Course*

