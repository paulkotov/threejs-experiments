# 📘 Day 2: Shapes & Materials - Exploring Geometries

## 🎯 Learning Objectives

By the end of Day 2, you will understand:
- All major built-in Three.js geometries
- Different material types and when to use them
- Material properties (metalness, roughness, shininess)
- The importance of lighting for realistic materials
- How to use OrbitControls for camera interaction
- Shadow casting and receiving
- Wireframe visualization

---

## 📚 Core Concepts

### 1. **Built-in Geometries**

Three.js provides many pre-built geometries that cover most use cases.

#### **BoxGeometry** - Rectangular Box/Cube

```javascript
const geometry = new THREE.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
// Example:
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
```

**Parameters:**
- `width`, `height`, `depth` - Dimensions
- `widthSegments`, etc. - Number of subdivisions (more = smoother but slower)

**Use Cases:** Buildings, containers, dice, Minecraft-style blocks

---

#### **SphereGeometry** - Perfect Sphere

```javascript
const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
// Example:
const sphereGeo = new THREE.SphereGeometry(0.6, 32, 32);
```

**Parameters:**
- `radius` - Size of sphere
- `widthSegments` - Horizontal detail (16-64 typical)
- `heightSegments` - Vertical detail (16-64 typical)
- Optional: `phiStart`, `phiLength`, etc. for partial spheres

**Use Cases:** Planets, balls, bubbles, particles

**Pro Tip:** 32 segments is a good balance between smoothness and performance

---

#### **ConeGeometry** - Cone or Pyramid

```javascript
const geometry = new THREE.ConeGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
// Example:
const coneGeo = new THREE.ConeGeometry(0.6, 1.2, 32);
```

**Parameters:**
- `radius` - Base radius
- `height` - Height of cone
- `radialSegments` - Sides around the base (3 = pyramid, 32 = smooth cone)
- `openEnded` - true to remove bottom cap

**Use Cases:** Trees, ice cream cones, traffic cones, arrows

---

#### **CylinderGeometry** - Cylinder or Tube

```javascript
const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);
// Example:
const cylinderGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32);
```

**Parameters:**
- `radiusTop`, `radiusBottom` - Different values create tapered cylinders
- `height` - Length of cylinder
- `radialSegments` - Smoothness (8-64)

**Use Cases:** Columns, cans, barrels, pipes

**Trick:** Set `radiusTop` to 0 to create a cone!

---

#### **TorusGeometry** - Donut Shape

```javascript
const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
// Example:
const torusGeo = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
```

**Parameters:**
- `radius` - Distance from center to middle of tube
- `tube` - Thickness of the donut
- `radialSegments` - Tube detail
- `tubularSegments` - Ring detail

**Use Cases:** Rings, tires, portals

---

#### **TorusKnotGeometry** - Complex Knot

```javascript
const geometry = new THREE.TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q);
// Example:
const knotGeo = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
```

**Parameters:**
- `p`, `q` - Define the knot pattern (try different values!)

**Use Cases:** Decorative objects, abstract art, Celtic knots

**Fun Fact:** Different p/q values create wildly different shapes!

---

#### **Other Useful Geometries**

- **PlaneGeometry** - Flat rectangle (ground, walls, screens)
- **CircleGeometry** - Flat circle (coins, UI elements)
- **RingGeometry** - Flat ring (halos, targets)
- **IcosahedronGeometry** - 20-sided polygon (low-poly spheres)
- **OctahedronGeometry** - 8-sided polygon (gems, dice)
- **TetrahedronGeometry** - 4-sided polygon (simple pyramids)
- **DodecahedronGeometry** - 12-sided polygon (fancy shapes)

---

### 2. **Material Types**

Materials define how surfaces interact with light and appear to the viewer.

#### **MeshBasicMaterial** - No Lighting

```javascript
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: false
});
```

**Properties:**
- ❌ Does NOT react to lights
- ✅ Always visible at full brightness
- ✅ Best performance
- ✅ Good for UI elements, unlit objects

**Use Cases:** Unlit objects, wireframes, UI elements, debugging

---

#### **MeshLambertMaterial** - Matte Surface

```javascript
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000
});
```

**Properties:**
- ✅ Reacts to lights
- ✅ Matte, non-shiny appearance
- ✅ Good performance
- ❌ No specular highlights (no shiny spots)

**Use Cases:** Clay, fabric, chalk, paper, rough surfaces

**Algorithm:** Uses Lambertian reflectance (diffuse only)

---

#### **MeshPhongMaterial** - Shiny Surface

```javascript
const material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  shininess: 100,
  specular: 0x111111
});
```

**Properties:**
- ✅ Reacts to lights
- ✅ Specular highlights (shiny spots)
- ✅ Can control shininess
- ⚠️ Moderate performance

**Key Properties:**
- `shininess` - How shiny (0-1000+, default 30)
- `specular` - Color of shiny highlights

**Use Cases:** Plastic, polished wood, ceramics, painted surfaces

---

#### **MeshStandardMaterial** - Physically Based Rendering (PBR)

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5
});
```

**Properties:**
- ✅ Most realistic lighting
- ✅ Physically accurate
- ✅ Industry standard
- ⚠️ Slightly heavier performance

**Key Properties:**
- `metalness` - How metallic (0.0 = dielectric, 1.0 = metal)
- `roughness` - How rough (0.0 = smooth/shiny, 1.0 = rough/matte)

**Use Cases:** Almost everything! Most realistic option.

**PBR Explained:**
- Based on real-world physics
- Used in game engines (Unity, Unreal)
- Predictable results across different lighting

---

#### **Material Property Comparison**

| Material | Lighting | Shininess | Performance | Best For |
|----------|----------|-----------|-------------|----------|
| Basic | ❌ No | N/A | ⭐⭐⭐⭐⭐ | UI, Debug |
| Lambert | ✅ Yes | None | ⭐⭐⭐⭐ | Matte surfaces |
| Phong | ✅ Yes | Adjustable | ⭐⭐⭐ | Shiny surfaces |
| Standard | ✅ Yes | PBR | ⭐⭐⭐ | Realistic renders |

---

### 3. **Material Properties Deep Dive**

#### **Color**

```javascript
// Multiple ways to set color:
color: 0xff0000           // Hexadecimal
color: 'rgb(255, 0, 0)'   // RGB string
color: 'red'              // Color name
color: new THREE.Color(1, 0, 0)  // RGB (0-1 range)
```

#### **Metalness** (StandardMaterial only)

```javascript
metalness: 0.0  // Non-metal (plastic, wood, fabric)
metalness: 0.5  // Semi-metallic
metalness: 1.0  // Pure metal (gold, silver, copper)
```

**Visual Effect:**
- Low metalness = colored diffuse reflection
- High metalness = colored specular reflection (tinted reflections)

#### **Roughness** (StandardMaterial only)

```javascript
roughness: 0.0  // Mirror-smooth, sharp reflections
roughness: 0.5  // Semi-rough, blurred reflections
roughness: 1.0  // Very rough, matte appearance
```

**Visual Effect:**
- Low roughness = sharp highlights and reflections
- High roughness = diffuse, spread-out lighting

#### **Wireframe**

```javascript
wireframe: true  // Show underlying geometry structure
```

**Use Cases:**
- Debugging geometry
- Artistic effect (cyber, technical look)
- Understanding mesh topology

---

### 4. **Lighting Essentials**

Materials like `MeshStandardMaterial`, `MeshPhongMaterial`, and `MeshLambertMaterial` **NEED lighting** to be visible!

#### **AmbientLight** - Base Illumination

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
```

- Illuminates ALL objects equally from all directions
- No shadows
- Prevents completely black areas
- Think of it as "base lighting level"

#### **DirectionalLight** - Sunlight

```javascript
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7.5);
dirLight.castShadow = true;
scene.add(dirLight);
```

- Parallel light rays (like the sun)
- Can cast shadows
- Position determines direction
- Best for outdoor scenes

#### **PointLight** - Light Bulb

```javascript
const pointLight = new THREE.PointLight(0xff6b6b, 0.5, 100);
pointLight.position.set(-5, 5, -5);
scene.add(pointLight);
```

- Radiates in all directions from a point
- Has distance and decay
- Good for lamps, candles, explosions

---

### 5. **Shadows**

To enable shadows, you need THREE things:

```javascript
// 1. Enable shadows on the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows

// 2. Make lights cast shadows
directionalLight.castShadow = true;

// 3. Configure objects
cube.castShadow = true;    // This object creates shadows
ground.receiveShadow = true; // This object receives shadows
```

**Shadow Quality:**
```javascript
light.shadow.mapSize.width = 2048;  // Higher = better quality, slower
light.shadow.mapSize.height = 2048;
```

---

### 6. **OrbitControls**

Allows interactive camera control with mouse/touch.

```javascript
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Smooth motion
controls.dampingFactor = 0.05;  // Smoothness amount
controls.minDistance = 5;       // Closest zoom
controls.maxDistance = 20;      // Furthest zoom
```

**In animation loop:**
```javascript
controls.update();  // MUST call this if enableDamping is true
```

**User Controls:**
- Left mouse + drag = Rotate camera
- Right mouse + drag = Pan
- Scroll wheel = Zoom in/out

---

## 🎨 Code Breakdown

### Creating a Mesh with Custom Material

```javascript
// 1. Create geometry
const geometry = new THREE.SphereGeometry(0.6, 32, 32);

// 2. Create material with properties
const material = new THREE.MeshStandardMaterial({
  color: 0xff6b6b,      // Red-ish color
  metalness: 0.7,       // Quite metallic
  roughness: 0.2        // Fairly smooth
});

// 3. Combine into mesh
const sphere = new THREE.Mesh(geometry, material);

// 4. Position it
sphere.position.set(2, 0, 0);

// 5. Enable shadows
sphere.castShadow = true;
sphere.receiveShadow = true;

// 6. Add to scene
scene.add(sphere);
```

---

## 🔬 Experiments to Try

### Experiment 1: Metalness & Roughness

Try different combinations:

```javascript
// Shiny metal (gold, chrome)
metalness: 1.0, roughness: 0.1

// Rough metal (iron, brushed aluminum)
metalness: 1.0, roughness: 0.8

// Shiny plastic
metalness: 0.0, roughness: 0.2

// Matte fabric
metalness: 0.0, roughness: 1.0
```

### Experiment 2: Custom Geometry

Create your own shape:

```javascript
const customGeo = new THREE.DodecahedronGeometry(0.7);
const customMat = new THREE.MeshStandardMaterial({
  color: 0x00ffaa,
  metalness: 0.5,
  roughness: 0.3,
  wireframe: true  // Try with wireframe!
});
const custom = new THREE.Mesh(customGeo, customMat);
scene.add(custom);
```

### Experiment 3: Emissive Materials

Make objects glow:

```javascript
const glowMat = new THREE.MeshStandardMaterial({
  color: 0x0066ff,
  emissive: 0x0066ff,    // Glow color
  emissiveIntensity: 0.5 // Glow strength
});
```

### Experiment 4: Transparent Materials

```javascript
const glassMat = new THREE.MeshStandardMaterial({
  color: 0x88ccff,
  transparent: true,
  opacity: 0.3,
  metalness: 0.1,
  roughness: 0.1
});
```

### Experiment 5: Different Geometry Parameters

```javascript
// Pyramid (3-sided cone)
new THREE.ConeGeometry(0.6, 1.2, 3);

// Hexagonal cylinder
new THREE.CylinderGeometry(0.5, 0.5, 1.2, 6);

// Half sphere
new THREE.SphereGeometry(0.6, 32, 32, 0, Math.PI);

// Thick torus (tire-like)
new THREE.TorusGeometry(0.5, 0.3, 16, 100);
```

---

## 🐛 Common Issues & Solutions

### Problem: Objects are completely black

**Cause:** Material needs lighting, but no lights in scene

**Solution:**
```javascript
// Add at least an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
```

---

### Problem: Objects look flat, no shadows

**Cause:** Shadows not enabled

**Solution:**
```javascript
// 1. Enable on renderer
renderer.shadowMap.enabled = true;

// 2. Light must cast shadows
directionalLight.castShadow = true;

// 3. Objects must cast/receive
object.castShadow = true;
ground.receiveShadow = true;
```

---

### Problem: Geometry looks blocky/angular

**Cause:** Not enough segments

**Solution:**
```javascript
// Increase segment count
// Before:
new THREE.SphereGeometry(1, 8, 8);  // Blocky!

// After:
new THREE.SphereGeometry(1, 32, 32); // Smooth!
```

**Warning:** Higher segments = slower performance. Balance quality and speed!

---

### Problem: Can't rotate camera with OrbitControls

**Cause:** Forgot to update controls in animation loop

**Solution:**
```javascript
function animate() {
  requestAnimationFrame(animate);
  
  controls.update();  // ← Add this!
  
  renderer.render(scene, camera);
}
```

---

## 📊 Geometry Performance Comparison

| Geometry | Triangles (typical) | Performance | Use Case |
|----------|---------------------|-------------|----------|
| Box | 12 | ⭐⭐⭐⭐⭐ | Blocks, buildings |
| Sphere (32 seg) | ~2,000 | ⭐⭐⭐ | Balls, planets |
| Sphere (8 seg) | ~128 | ⭐⭐⭐⭐ | Low-poly style |
| Torus (16,100) | ~3,200 | ⭐⭐ | Detailed rings |
| TorusKnot (100,16) | ~3,200 | ⭐⭐ | Complex shapes |

**Performance Tip:** Start with lower segment counts. Increase only if you notice angular edges.

---

## 🎓 Material Selection Guide

### Choose **MeshBasicMaterial** when:
- ✅ You don't need lighting
- ✅ Creating UI elements
- ✅ Maximum performance needed
- ✅ Debugging/wireframes

### Choose **MeshLambertMaterial** when:
- ✅ Need simple lighting
- ✅ Matte surfaces (clay, fabric)
- ✅ Good performance required
- ✅ Mobile devices

### Choose **MeshPhongMaterial** when:
- ✅ Need shiny surfaces
- ✅ Plastic, ceramic materials
- ✅ Want specular highlights
- ✅ Desktop/console platforms

### Choose **MeshStandardMaterial** when:
- ✅ Want realistic materials
- ✅ Using modern devices
- ✅ Need PBR workflow
- ✅ Professional appearance

**General Rule:** Use `MeshStandardMaterial` by default unless you have a specific reason not to.

---

## 🎯 Quiz Yourself

1. **What's the difference between `metalness` and `roughness`?**
   <details><summary>Answer</summary>
   Metalness controls whether the material is metal (1.0) or non-metal (0.0). Roughness controls how smooth (0.0) or rough (1.0) the surface is. They work together to create realistic materials.
   </details>

2. **Why do some materials need lights to be visible?**
   <details><summary>Answer</summary>
   Materials like MeshStandardMaterial and MeshPhongMaterial simulate realistic lighting. Without light, there's nothing to reflect, so they appear black. MeshBasicMaterial doesn't need lights because it ignores lighting calculations.
   </details>

3. **What does the `segments` parameter control in geometries?**
   <details><summary>Answer</summary>
   Segments control how many subdivisions/triangles make up the geometry. More segments = smoother appearance but lower performance. Fewer segments = angular appearance but better performance.
   </details>

4. **What are the three requirements for shadows to work?**
   <details><summary>Answer</summary>
   1. Enable shadow map on renderer (`renderer.shadowMap.enabled = true`)
   2. Light must cast shadows (`light.castShadow = true`)
   3. Objects must cast AND receive shadows (`object.castShadow/receiveShadow = true`)
   </details>

5. **What's the purpose of `enableDamping` in OrbitControls?**
   <details><summary>Answer</summary>
   It adds inertia to camera movements, making them smooth and gradual rather than instant. Creates a more natural, polished feel. Must call `controls.update()` in animation loop when enabled.
   </details>

---

## 🚀 Next Steps

Tomorrow in **Day 3: Camera & Controls**, you'll learn:
- Different camera types (Perspective vs Orthographic)
- Advanced OrbitControls settings
- Multiple camera views
- Camera animations
- Custom camera movements

---

## 💡 Key Takeaways

✅ **Six main geometry types**: Box, Sphere, Cone, Cylinder, Torus, TorusKnot  
✅ **Four material types**: Basic (unlit), Lambert (matte), Phong (shiny), Standard (PBR)  
✅ **Material properties**: metalness, roughness, color, wireframe  
✅ **Lighting is essential** for realistic materials  
✅ **Shadows require** renderer, light, and object configuration  
✅ **OrbitControls** enable interactive camera movement  
✅ **Segment count** affects both appearance and performance  

---

**Great job! 🎉 You now understand geometries and materials!**

You can create a wide variety of 3D objects and make them look realistic with proper materials and lighting.

---

*Day 2 of the 10-Day Three.js Mastery Course*

