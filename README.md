# 🎓 10-Day Three.js Mastery Course

A comprehensive, hands-on journey from Three.js beginner to advanced developer. Each day builds on the previous, with complete code examples and detailed explanations.

---

## 📅 Course Overview

### **Day 1: "Hello Three.js" - Your First 3D Scene** ✅ *Current*
- **Branch:** `day-01-hello-threejs`
- **Concepts:** Scene, Camera, Renderer, Basic Geometry, Animation Loop
- **Project:** Rotating colored cubes
- **Skills:** Understanding the Three.js trinity and fundamentals

### **Day 2: "Shapes & Materials" - Exploring Geometries**
- **Branch:** `day-02-shapes-materials`
- **Concepts:** Built-in geometries, material types, wireframes
- **Project:** 3D shape gallery with various materials
- **Skills:** Working with different geometries and material properties

### **Day 3: "Camera & Controls" - Mastering Perspective**
- **Branch:** `day-03-camera-controls`
- **Concepts:** Camera types, OrbitControls, camera positioning, FOV
- **Project:** Interactive scene with camera manipulation
- **Skills:** Camera control and user interaction

### **Day 4: "Let There Be Light" - Illumination Techniques**
- **Branch:** `day-04-lighting`
- **Concepts:** Ambient, Directional, Point, Spot lights, Shadows
- **Project:** Scene showcasing different lighting setups
- **Skills:** Creating atmosphere with lighting and shadows

### **Day 5: "Textures & Advanced Materials" - Surface Details**
- **Branch:** `day-05-textures`
- **Concepts:** Texture loading, UV mapping, normal maps, environment maps
- **Project:** Textured objects with realistic materials
- **Skills:** Working with textures and material maps

### **Day 6: "Animation & Transformations" - Bringing Life to 3D**
- **Branch:** `day-06-animation`
- **Concepts:** GSAP/Tween.js, keyframe animation, groups, hierarchies
- **Project:** Animated solar system or mechanical object
- **Skills:** Complex animations and object hierarchies

### **Day 7: "Custom Geometry & Shader Basics" - Going Deeper**
- **Branch:** `day-07-custom-geometry`
- **Concepts:** BufferGeometry, custom vertices, shader introduction
- **Project:** Custom terrain or wave geometry
- **Skills:** Creating custom geometries and shader fundamentals

### **Day 8: "Particle Systems" - Creating Magic**
- **Branch:** `day-08-particles`
- **Concepts:** Points, particle systems, sprite materials
- **Project:** Galaxy or weather effects with particles
- **Skills:** Performance optimization and instancing

### **Day 9: "Post-Processing Effects" - The Final Polish**
- **Branch:** `day-09-post-processing`
- **Concepts:** EffectComposer, render passes, bloom, DOF
- **Project:** Scene with cinematic effects
- **Skills:** Multi-pass rendering and visual effects

### **Day 10: "Grand Finale" - Interactive 3D Experience**
- **Branch:** `day-10-grand-finale`
- **Concepts:** Raycasting, physics, combining all techniques
- **Project:** Interactive 3D game or portfolio piece
- **Skills:** Integrating everything learned

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic knowledge of HTML, CSS, and JavaScript
- A code editor (VS Code recommended)
- Git for branch management

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/paulkotov/threejs-experiments.git
   cd threejs-experiments
   ```

2. **Checkout Day 1:**
   ```bash
   git checkout day-01-hello-threejs
   ```

3. **Launch a local server:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using VS Code Live Server
   # Right-click index.html → "Open with Live Server"
   ```

4. **Open in browser:**
   ```
   http://localhost:8000
   ```

---

## 📖 How to Use This Course

1. **Start with Day 1** - Checkout the `day-01-hello-threejs` branch
2. **Read the guide** - Each day has a `DAY_XX_GUIDE.md` with detailed explanations
3. **Run the code** - Open `index.html` in your browser
4. **Experiment** - Modify the code and see what happens
5. **Complete challenges** - Try the experiments suggested in each guide
6. **Move to next day** - Checkout the next branch when ready

### Branch Structure
```
main (or feat/core) ← Your starting point
  ├── day-01-hello-threejs ← Fundamentals
  ├── day-02-shapes-materials
  ├── day-03-camera-controls
  ├── day-04-lighting
  ├── day-05-textures
  ├── day-06-animation
  ├── day-07-custom-geometry
  ├── day-08-particles
  ├── day-09-post-processing
  └── day-10-grand-finale ← Capstone project
```

---

## 📁 Project Structure

```
threejs-experiments/
├── index.html              # Main demo file (changes each day)
├── main.js                 # WebGLDriver class (advanced helper)
├── styles.css              # Global styles
├── DAY_XX_GUIDE.md        # Detailed guide for current day
├── README.md              # This file
└── (additional assets per day)
```

---

## 🎯 Learning Path

```
Day 1-3: FUNDAMENTALS
  └─ Build foundation: Scene setup, shapes, camera control

Day 4-6: INTERMEDIATE
  └─ Add realism: Lighting, textures, animations

Day 7-9: ADVANCED
  └─ Deep dive: Custom geometry, particles, effects

Day 10: MASTERY
  └─ Combine everything into a complete project
```

---

## 🛠️ Technologies Used

- **Three.js r128** - 3D graphics library
- **WebGL** - GPU-accelerated rendering
- **JavaScript ES6+** - Modern JavaScript features
- **HTML5 Canvas** - Rendering target
- **CSS3** - Styling and layout

---

## 📚 Resources

### Official Documentation
- [Three.js Docs](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)

### Learning Resources
- [Three.js Fundamentals](https://threejsfundamentals.org/)
- [Three.js Journey](https://threejs-journey.xyz/)
- [Bruno Simon's Course](https://threejs-journey.com/)

### Community
- [Three.js Discourse](https://discourse.threejs.org/)
- [Three.js on GitHub](https://github.com/mrdoob/three.js/)

---

## 💡 Tips for Success

1. **Type the code yourself** - Don't just copy-paste
2. **Experiment often** - Change values and see what happens
3. **Use the console** - Check for errors and use console.log()
4. **Take breaks** - Let concepts sink in
5. **Build projects** - Apply what you learn
6. **Ask questions** - Use the Three.js community

---

## 🎨 What You'll Build

By the end of this course, you'll have created:

- ✅ Rotating 3D shapes (Day 1)
- 🎭 Material showcase (Day 2)
- 🎥 Interactive camera system (Day 3)
- 💡 Dynamic lighting demo (Day 4)
- 🖼️ Textured 3D objects (Day 5)
- 🪐 Animated solar system (Day 6)
- 🏔️ Custom terrain (Day 7)
- ✨ Particle galaxy (Day 8)
- 🎬 Cinematic scene (Day 9)
- 🎮 Interactive 3D experience (Day 10)

---

## 📝 Course Philosophy

This course emphasizes:
- **Hands-on learning** - Code from day one
- **Progressive complexity** - Each day builds on the last
- **Clear explanations** - Understanding WHY, not just HOW
- **Experimentation** - Encouraged to break and fix things
- **Practical projects** - Build real, usable demos

---

## 🤝 Contributing

Found a bug or want to improve something?

1. Fork the repository
2. Create a feature branch (`git checkout -b improvement/better-explanation`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🏆 Completion Certificate

After completing all 10 days, you'll have:
- ✅ Deep understanding of Three.js fundamentals
- ✅ Portfolio of 10 impressive 3D demos
- ✅ Skills to build your own 3D web experiences
- ✅ Foundation for advanced topics (physics, VR/AR, etc.)

---

## 📞 Support

Questions or stuck on something?
- Check the `DAY_XX_GUIDE.md` for detailed explanations
- Review the code comments
- Consult the official Three.js docs
- Ask in the Three.js community forums

---

**🚀 Ready to master Three.js? Start with Day 1!**

```bash
git checkout day-01-hello-threejs
```

---

*Created with ❤️ for aspiring 3D web developers*
