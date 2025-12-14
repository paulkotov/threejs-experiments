# 📘 Day 7: Custom Geometry & Shader Basics - Going Deeper

## 🎯 Learning Objectives

By the end of Day 7, you will understand:
- How to create custom geometry with BufferGeometry
- Working with vertices, indices, and attributes
- Introduction to GLSL (OpenGL Shading Language)
- Vertex shaders vs Fragment shaders
- Shader uniforms, attributes, and varyings
- How to animate geometry with shaders
- GPU-accelerated rendering concepts

---

## 📚 Core Concepts

### 1. **BufferGeometry - Custom Geometry Creation**

`BufferGeometry` lets you create geometry from scratch by defining vertices directly.

**Why use BufferGeometry?**
- Full control over geometry structure
- Better performance than regular Geometry
- Required for complex, procedural shapes
- Direct GPU memory access

**Basic Structure:**
```javascript
const geometry = new THREE.BufferGeometry();

// Define vertex positions (x, y, z for each vertex)
const positions = new Float32Array([
  0, 0, 0,    // Vertex 0
  1, 0, 0,    // Vertex 1
  1, 1, 0     // Vertex 2
]);

// Create attribute and attach to geometry
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
```

---

### 2. **Vertices, Indices, and Triangles**

#### **Vertices**
Individual points in 3D space.

```javascript
const positions = [
  x1, y1, z1,  // Vertex 0
  x2, y2, z2,  // Vertex 1  
  x3, y3, z3   // Vertex 2
];
```

#### **Indices**
Define which vertices form triangles.

```javascript
const indices = [
  0, 1, 2,  // Triangle using vertices 0, 1, 2
  2, 1, 3   // Triangle using vertices 2, 1, 3
];

geometry.setIndex(indices);
```

**Why use indices?**
- Vertices can be reused (efficiency!)
- Fewer vertices needed
- Smaller memory footprint

**Example:**
```
Four vertices (quad):
  0 ─── 1
  │  ╱  │
  │ ╱   │
  2 ─── 3

Without indices: 6 vertices (two separate triangles)
With indices: 4 vertices + 6 indices
```

---

### 3. **Geometry Attributes**

Attributes store per-vertex data.

#### **Position Attribute** (required)
```javascript
// Each vertex = 3 values (x, y, z)
const positions = new Float32Array([...]);
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
```

#### **UV Attribute** (for texturing)
```javascript
// Each vertex = 2 values (u, v) from 0-1
const uvs = new Float32Array([
  0, 0,  // Bottom-left of texture
  1, 0,  // Bottom-right
  1, 1   // Top-right
]);
geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
```

#### **Color Attribute** (vertex colors)
```javascript
// Each vertex = 3 values (r, g, b) from 0-1
const colors = new Float32Array([
  1, 0, 0,  // Red
  0, 1, 0,  // Green
  0, 0, 1   // Blue
]);
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
```

#### **Normal Attribute** (for lighting)
```javascript
// Usually computed automatically
geometry.computeVertexNormals();

// Or manual:
const normals = new Float32Array([...]);
geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
```

---

### 4. **Introduction to Shaders**

Shaders are programs that run on the GPU to render graphics.

**Two Types:**
1. **Vertex Shader** - Processes each vertex
2. **Fragment Shader** - Processes each pixel

**Written in:** GLSL (OpenGL Shading Language)

---

### 5. **Vertex Shader**

Runs once for each vertex. Determines final vertex position.

```glsl
// Vertex Shader (GLSL)
uniform float uTime;       // From JavaScript
attribute vec3 position;   // Built-in: vertex position
varying vec3 vPosition;    // Pass to fragment shader

void main() {
  vec3 pos = position;
  
  // Animate vertex position
  pos.y += sin(pos.x + uTime) * 2.0;
  
  // Pass data to fragment shader
  vPosition = pos;
  
  // Required: Set gl_Position (final vertex position)
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

**Key Points:**
- `main()` is the entry point
- Must set `gl_Position` (final screen position)
- Can modify vertex positions
- Can pass data to fragment shader via `varying`

**Built-in Variables:**
- `position` - Vertex position
- `normal` - Vertex normal
- `uv` - UV coordinates
- `projectionMatrix` - Camera projection
- `modelViewMatrix` - Model transformation + camera view

---

### 6. **Fragment Shader**

Runs once for each pixel. Determines final pixel color.

```glsl
// Fragment Shader (GLSL)
uniform float uTime;
varying vec3 vPosition;    // From vertex shader

void main() {
  // Calculate color based on position
  vec3 color = vec3(vPosition.y * 0.1);
  
  // Add some pattern
  color.r += sin(vPosition.x * 10.0 + uTime) * 0.5;
  
  // Required: Set gl_FragColor (final pixel color)
  gl_FragColor = vec4(color, 1.0);
}
```

**Key Points:**
- `main()` is the entry point
- Must set `gl_FragColor` (RGBA color)
- Receives interpolated varying values
- Runs MILLIONS of times per frame (once per pixel!)

---

### 7. **Shader Data Types**

#### **Uniforms** (JavaScript → Shader)
Same value for all vertices/pixels. Updated from JavaScript.

```javascript
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
    uColor: { value: new THREE.Color(0xff0000) },
    uResolution: { value: new THREE.Vector2(800, 600) }
  }
});

// Update in animation loop
material.uniforms.uTime.value += delta;
```

```glsl
// In shader:
uniform float uTime;
uniform vec3 uColor;
uniform vec2 uResolution;
```

---

#### **Attributes** (Per-Vertex Data)
Different value for each vertex. Set in geometry.

```javascript
const positions = new Float32Array([...]);
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
```

```glsl
// In vertex shader:
attribute vec3 position;  // Built-in
attribute vec2 uv;        // Built-in
attribute vec3 color;     // Custom
```

---

#### **Varyings** (Vertex → Fragment)
Pass data from vertex shader to fragment shader.

```glsl
// Vertex Shader:
varying vec3 vColor;

void main() {
  vColor = color;  // Set in vertex shader
  // ...
}

// Fragment Shader:
varying vec3 vColor;  // Receive (interpolated!)

void main() {
  gl_FragColor = vec4(vColor, 1.0);  // Use in fragment shader
}
```

**Important:** Fragment shader receives **interpolated** values!

**Example:**
```
Vertex 0: vColor = red (1, 0, 0)
Vertex 1: vColor = blue (0, 0, 1)

Pixel halfway between:
  vColor = purple (0.5, 0, 0.5)  ← Automatically interpolated!
```

---

### 8. **GLSL Basics**

#### **Data Types:**
```glsl
float a = 1.0;           // Single number
vec2 b = vec2(1.0, 2.0); // 2D vector (x, y)
vec3 c = vec3(1.0, 2.0, 3.0); // 3D vector (r, g, b) or (x, y, z)
vec4 d = vec4(1.0, 2.0, 3.0, 4.0); // 4D vector (r, g, b, a)
```

#### **Vector Operations:**
```glsl
vec3 a = vec3(1.0, 2.0, 3.0);
vec3 b = vec3(4.0, 5.0, 6.0);

vec3 sum = a + b;           // (5, 7, 9)
vec3 product = a * b;       // (4, 10, 18) component-wise
float dot = dot(a, b);      // Dot product
vec3 cross = cross(a, b);   // Cross product
float len = length(a);      // Vector length
vec3 norm = normalize(a);   // Unit vector
```

#### **Math Functions:**
```glsl
sin(x), cos(x), tan(x)
abs(x), sign(x)
floor(x), ceil(x), fract(x)
min(x, y), max(x, y), clamp(x, min, max)
mix(a, b, t)  // Linear interpolation: a * (1-t) + b * t
step(edge, x)  // 0 if x < edge, 1 if x >= edge
smoothstep(edge0, edge1, x)  // Smooth 0-1 transition
```

---

## 🔧 Code Patterns

### Pattern 1: Simple Custom Triangle

```javascript
const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  0, 1, 0,   // Top
  -1, -1, 0, // Bottom left
  1, -1, 0   // Bottom right
]);

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const triangle = new THREE.Mesh(geometry, material);
scene.add(triangle);
```

---

### Pattern 2: Animated Shader

```javascript
const material = new THREE.ShaderMaterial({
  vertexShader: `...`,
  fragmentShader: `...`,
  uniforms: {
    uTime: { value: 0 }
  }
});

function animate() {
  material.uniforms.uTime.value += delta;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

---

### Pattern 3: Height-Based Coloring

```glsl
// Fragment Shader
varying float vElevation;

void main() {
  vec3 lowColor = vec3(0.0, 0.0, 0.5);
  vec3 highColor = vec3(1.0, 1.0, 1.0);
  
  float mixValue = vElevation / maxHeight;
  vec3 color = mix(lowColor, highColor, mixValue);
  
  gl_FragColor = vec4(color, 1.0);
}
```

---

## 🎨 Experiments to Try

### Experiment 1: Different Wave Patterns

```glsl
// In vertex shader, try:

// Circular ripples
float dist = length(pos.xz);
pos.y = sin(dist - uTime) * 2.0;

// Diagonal waves
pos.y = sin((pos.x + pos.z) * 0.5 + uTime) * 3.0;

// Interference pattern
pos.y = sin(pos.x + uTime) * sin(pos.z + uTime) * 2.0;
```

### Experiment 2: Custom Colors

```glsl
// In fragment shader:

// Rainbow based on position
vec3 color = vec3(
  sin(vPosition.x * 0.1 + uTime) * 0.5 + 0.5,
  sin(vPosition.z * 0.1 + uTime * 1.3) * 0.5 + 0.5,
  vElevation * 0.1
);

// Pulsing color
vec3 color = vec3(0.5) + vec3(0.5) * sin(uTime);
```

---

## 💡 Key Takeaways

✅ **BufferGeometry** = custom geometry from vertices  
✅ **Vertices** = points in 3D space  
✅ **Indices** = define triangles efficiently  
✅ **Attributes** = per-vertex data  
✅ **Vertex Shader** = processes vertices (position)  
✅ **Fragment Shader** = processes pixels (color)  
✅ **Uniforms** = JavaScript → Shader (same for all)  
✅ **Varyings** = Vertex → Fragment (interpolated)  
✅ **GLSL** = C-like language for shaders  
✅ **GPU** = massively parallel (thousands of vertices/pixels at once!)  

---

**Amazing work! 🎉 You've entered the world of shader programming!**

Shaders unlock the full power of the GPU. What you learned today is the foundation for advanced effects, custom materials, and performance optimization in 3D graphics!

---

*Day 7 of the 10-Day Three.js Mastery Course*

