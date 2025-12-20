# 📘 Day 5: Textures & Advanced Materials - Surface Details

## 🎯 Learning Objectives

By the end of Day 5, you will understand:
- How to create and load textures in Three.js
- Different texture map types and their purposes
- UV mapping and texture coordinates
- The PBR (Physically-Based Rendering) workflow
- Texture properties (repeat, wrap, filtering)
- Combining multiple texture maps for realistic materials
- Performance considerations with textures

---

## 📚 Core Concepts

### 1. **What Are Textures?**

Textures are images applied to 3D geometry surfaces to add detail, color, and realism without adding geometric complexity.

**Think of it like:**
- Geometry = The shape of a ball
- Texture = The basketball pattern painted on it

**Key Benefit:**
- Adding surface detail with textures is **much faster** than adding more geometry
- A 1000-triangle sphere + detailed texture looks better and runs faster than a 100,000-triangle sphere

---

### 2. **Texture Loading**

#### **Method 1: Load from File (TextureLoader)**

```javascript
const textureLoader = new THREE.TextureLoader();

// Load a single texture
const colorTexture = textureLoader.load('/textures/color.jpg');

// Load with callbacks
const texture = textureLoader.load(
  '/path/to/texture.jpg',    // URL
  () => { console.log('Loaded'); },      // onLoad
  (progress) => { console.log(progress); }, // onProgress
  (error) => { console.error(error); }      // onError
);
```

#### **Method 2: Procedural Textures (Canvas)**

```javascript
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');

// Draw on canvas
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 256, 256);
ctx.fillStyle = 'blue';
ctx.fillRect(256, 0, 256, 256);

// Create texture from canvas
const texture = new THREE.CanvasTexture(canvas);
```

#### **Method 3: Data Texture (Programmatic)**

```javascript
const width = 512;
const height = 512;
const size = width * height;
const data = new Uint8Array(4 * size); // RGBA

for (let i = 0; i < size; i++) {
  const stride = i * 4;
  data[stride] = 255;     // R
  data[stride + 1] = 0;   // G
  data[stride + 2] = 0;   // B
  data[stride + 3] = 255; // A
}

const texture = new THREE.DataTexture(data, width, height);
texture.needsUpdate = true;
```

---

### 3. **Texture Map Types**

The PBR (Physically-Based Rendering) workflow uses multiple texture maps:

#### **Color/Albedo Map** (`map`)

The base color of the surface.

```javascript
material.map = colorTexture;
```

**Purpose:**
- Defines what color the surface is
- No lighting information (that comes from other maps)
- Think: "What color is this painted?"

**Example:**
- Wood texture = brown wood grain
- Brick = red/orange brick pattern

---

#### **Normal Map** (`normalMap`)

Simulates surface bumps and details without changing geometry.

```javascript
material.normalMap = normalTexture;
material.normalScale = new THREE.Vector2(1.0, 1.0); // Intensity
```

**How It Works:**
- RGB values = XYZ normal directions
- R(128, 128, 255) = surface pointing straight out
- Tricks the lighting calculations to think the surface has bumps

**Purpose:**
- Add surface detail (scratches, cracks, rivets)
- Much cheaper than real geometry
- Creates depth illusion

**Normal Scale:**
- `(0, 0)` = No effect
- `(1, 1)` = Normal strength
- `(2, 2)` = Exaggerated bumps
- Negative values flip the effect

**Visual:**
```
Flat Geometry + Normal Map = Looks Bumpy
(100 triangles)  (512x512)    (Realistic!)
```

---

#### **Roughness Map** (`roughnessMap`)

Controls how rough/smooth different areas are.

```javascript
material.roughnessMap = roughnessTexture;
material.roughness = 1.0; // Multiplier
```

**Grayscale Values:**
- **Black (0)** = Smooth, shiny, sharp reflections
- **White (1)** = Rough, matte, blurred reflections

**Purpose:**
- Vary surface smoothness across the material
- Shiny metal plates with scratched areas
- Polished wood with rough grain

**Example Map:**
- White mortar (rough)
- Gray bricks (semi-rough)
- Black glass (smooth)

---

#### **Metalness Map** (`metalnessMap`)

Defines which parts are metallic vs non-metallic.

```javascript
material.metalnessMap = metalnessTexture;
material.metalness = 1.0; // Multiplier
```

**Grayscale Values:**
- **Black (0)** = Non-metal (dielectric) - plastic, wood, fabric
- **White (1)** = Metal - iron, gold, copper

**Purpose:**
- Sharp distinction between metal/non-metal areas
- Rusty metal (mix of metal and non-metal)
- Metal rivets on leather

**Important:**
- In PBR, surfaces are EITHER metal OR non-metal
- No in-between values in reality
- Gray values = transitional/weathered areas

---

#### **Ambient Occlusion Map** (`aoMap`)

Simulates shadowing in crevices and corners.

```javascript
// AO Map requires second UV channel
geometry.setAttribute('uv2', geometry.attributes.uv);

material.aoMap = aoTexture;
material.aoMapIntensity = 1.0; // How dark
```

**Grayscale Values:**
- **White** = Fully lit, no occlusion
- **Black** = Fully occluded, dark shadow

**Purpose:**
- Add depth to crevices
- Darken corners and gaps
- Increase visual realism

**Note:**
- AO maps use UV2 channel (second UV set)
- Usually baked from 3D software

---

#### **Displacement Map** (`displacementMap`)

Actually moves geometry vertices (not just visual trick).

```javascript
material.displacementMap = displacementTexture;
material.displacementScale = 0.5; // How much movement
material.displacementBias = 0.0;   // Offset
```

**Requirements:**
- Geometry needs **high subdivision** (many vertices)
- Won't work on low-poly models

**Purpose:**
- Real geometric detail
- Terrain height maps
- Brick depth

**Performance:**
- Expensive (more vertices = slower)
- Use sparingly

---

### 4. **UV Mapping**

UV mapping defines how 2D textures wrap onto 3D surfaces.

**UV Coordinates:**
- **U** = Horizontal (0 to 1, left to right)
- **V** = Vertical (0 to 1, bottom to top)
- Each vertex has a UV coordinate

**Example:**
```javascript
// A triangle's UV coordinates
const uvs = new Float32Array([
  0.0, 0.0,  // Vertex 1: bottom-left of texture
  1.0, 0.0,  // Vertex 2: bottom-right of texture
  0.5, 1.0   // Vertex 3: top-center of texture
]);

geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
```

**Built-in Geometries:**
- Three.js geometries come with UV coordinates
- Spheres, boxes, planes all have proper UVs

**Visual:**
```
3D Sphere ──UV mapping──> 2D Texture
   ●                      ┌──────┐
  /│\                     │██████│
 / │ \                    │██  ██│
    └────maps to──────>   │██████│
                          └──────┘
```

---

### 5. **Texture Properties**

#### **Repeat & Wrapping**

```javascript
texture.wrapS = THREE.RepeatWrapping; // Horizontal
texture.wrapT = THREE.RepeatWrapping; // Vertical
texture.repeat.set(4, 4); // Repeat 4x in each direction
```

**Wrap Modes:**
- `THREE.RepeatWrapping` - Texture tiles/repeats
- `THREE.ClampToEdgeWrapping` - Edge pixels stretch (default)
- `THREE.MirroredRepeatWrapping` - Mirror-tiles

**Use Cases:**
- `RepeatWrapping`: Tileable patterns (bricks, floor tiles)
- `ClampToEdge`: Character textures, unique surfaces
- `MirroredRepeat`: Seamless water, terrain

---

#### **Offset**

```javascript
texture.offset.set(0.5, 0.5); // Shift texture
```

**Purpose:**
- Animate texture position
- Adjust texture alignment

---

#### **Rotation**

```javascript
texture.rotation = Math.PI / 4; // 45 degrees (in radians)
texture.center.set(0.5, 0.5);    // Rotation center
```

---

#### **Filtering**

Controls how texture looks when scaled.

```javascript
// When texture is smaller than surface (far away)
texture.minFilter = THREE.LinearMipmapLinearFilter; // Best quality

// When texture is larger than surface (close up)
texture.magFilter = THREE.LinearFilter;
```

**Min Filter Options:**
- `NearestFilter` - Pixelated, retro look
- `LinearFilter` - Blurred
- `NearestMipmapNearestFilter` - Pixelated with mipmaps
- `LinearMipmapLinearFilter` - Smoothest (default)

**Mag Filter Options:**
- `NearestFilter` - Pixelated/blocky when close
- `LinearFilter` - Smooth/blurry when close (default)

**Mipmaps:**
- Pre-calculated smaller versions of texture
- Automatically generated by Three.js
- Improves performance and quality

---

### 6. **PBR Workflow**

Physically-Based Rendering uses multiple texture maps together.

**Complete PBR Material:**

```javascript
const material = new THREE.MeshStandardMaterial({
  // Base color
  map: colorMap,
  
  // Surface detail
  normalMap: normalMap,
  normalScale: new THREE.Vector2(1, 1),
  
  // Surface roughness
  roughnessMap: roughnessMap,
  roughness: 0.8, // Multiplier
  
  // Metallic areas
  metalnessMap: metalnessMap,
  metalness: 0.2, // Multiplier
  
  // Ambient occlusion
  aoMap: aoMap,
  aoMapIntensity: 1.0
});

// AO requires second UV channel
geometry.setAttribute('uv2', geometry.attributes.uv);
```

**The PBR Formula:**

```
Final Surface = 
  Color Map (what color?)
  + Normal Map (which direction?)
  + Roughness Map (how shiny?)
  + Metalness Map (metal or not?)
  + AO Map (how occluded?)
  + Lighting calculations
  = Realistic Material!
```

---

## 🔧 Practical Examples

### Example 1: Simple Textured Cube

```javascript
const loader = new THREE.TextureLoader();
const texture = loader.load('/textures/brick.jpg');

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

---

### Example 2: Procedural Checker Pattern

```javascript
function createCheckerTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const tileSize = 64;
  for (let y = 0; y < canvas.height; y += tileSize) {
    for (let x = 0; x < canvas.width; x += tileSize) {
      const isEven = ((x / tileSize) + (y / tileSize)) % 2 === 0;
      ctx.fillStyle = isEven ? '#ffffff' : '#000000';
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }

  return new THREE.CanvasTexture(canvas);
}

const checkerMap = createCheckerTexture();
```

---

### Example 3: Repeating Texture

```javascript
const texture = loader.load('/textures/grass.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(10, 10); // Repeat 10x10

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ map: texture })
);
```

---

### Example 4: Animated Texture

```javascript
function animate() {
  // Scroll texture
  texture.offset.x += 0.01;
  
  // Must call this when texture is first applied or properties change
  texture.needsUpdate = true;
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

---

## 🎨 Experiments to Try

### Experiment 1: Texture Repeat

```javascript
// Try different repeat values
texture.repeat.set(1, 1);   // No repeat
texture.repeat.set(2, 2);   // 2x2 grid
texture.repeat.set(10, 1);  // Stretched horizontally
```

### Experiment 2: Normal Map Strength

```javascript
// Adjust normal map intensity
material.normalScale.set(0.1, 0.1); // Subtle
material.normalScale.set(1, 1);     // Normal
material.normalScale.set(3, 3);     // Exaggerated
```

### Experiment 3: Roughness Variation

```javascript
// Try different roughness values
material.roughness = 0.0;  // Mirror-like
material.roughness = 0.5;  // Semi-glossy
material.roughness = 1.0;  // Completely matte
```

### Experiment 4: Mix Materials

```javascript
// Half metal, half not
material.metalness = 0.5;

// Vary it with a map
material.metalnessMap = myMetalnessMap;
material.metalness = 1.0; // Multiplier
```

---

## 🐛 Common Issues & Solutions

### Problem: Texture appears black

**Causes:**
- Texture not loaded yet
- Wrong file path
- Material needs lights (`MeshStandardMaterial` requires lighting)

**Solutions:**
```javascript
// Use loading callback
loader.load('/path.jpg', (texture) => {
  material.map = texture;
  material.needsUpdate = true;
});

// Or use MeshBasicMaterial (doesn't need lights)
const material = new THREE.MeshBasicMaterial({ map: texture });
```

---

### Problem: Texture is stretched or distorted

**Cause:** UV mapping issues or wrong aspect ratio

**Solution:**
```javascript
// Check geometry has UV coordinates
console.log(geometry.attributes.uv);

// Adjust texture repeat to match aspect
texture.repeat.set(1, 0.5); // If texture is 2:1 ratio
```

---

### Problem: Texture looks pixelated

**Cause:** Magnification filter

**Solution:**
```javascript
// For smooth scaling
texture.magFilter = THREE.LinearFilter;

// For intentional pixel art
texture.magFilter = THREE.NearestFilter;
```

---

### Problem: Texture not updating

**Cause:** Forgot to set `needsUpdate`

**Solution:**
```javascript
texture.needsUpdate = true;
material.needsUpdate = true;
```

---

### Problem: AO Map not working

**Cause:** Missing UV2 channel

**Solution:**
```javascript
// AO maps require second UV channel
geometry.setAttribute('uv2', geometry.attributes.uv);
```

---

## 📊 Texture Resolution Guide

| Use Case | Recommended Size | Reasoning |
|----------|-----------------|-----------|
| Small props | 512×512 | Sufficient detail |
| Characters | 1024×1024 | Good detail |
| Hero objects | 2048×2048 | High detail |
| Environment | 2048×2048 or 4096×4096 | Large surface area |
| UI elements | 256×256 | Small on screen |

**Performance Tips:**
- Use smallest texture that looks good
- Power of 2 sizes (256, 512, 1024, 2048) for mipmaps
- Compress textures (JPEG for color, PNG for alpha)

---

## 💡 Key Takeaways

✅ **Textures add detail** without geometric complexity  
✅ **UV mapping** defines how 2D textures wrap on 3D surfaces  
✅ **Color map** = base color  
✅ **Normal map** = surface detail illusion  
✅ **Roughness map** = surface smoothness variation  
✅ **Metalness map** = metal vs non-metal areas  
✅ **AO map** = crevice shadowing  
✅ **PBR workflow** = combining all maps for realism  
✅ **Repeat/wrap** controls texture tiling  
✅ **Filtering** affects texture scaling quality  

---

**Excellent work! 🎉 You now understand textures and PBR materials!**

Textures are the key to creating visually rich 3D scenes without performance penalties. The PBR workflow you learned today is the industry standard used in games, films, and professional visualization!

---

*Day 5 of the 10-Day Three.js Mastery Course*

