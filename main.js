class WebGLDriver {
  constructor(options = {}) {
    // Configuration options with defaults
    this.config = {
      container: options.container || document.body,
      width: options.width || window.innerWidth,
      height: options.height || window.innerHeight,
      backgroundColor: options.backgroundColor || 0x000000,
      antialias: options.antialias !== false, // Default to true
      alpha: options.alpha || false,
      shadows: options.shadows !== false, // Default to true
      controls: options.controls !== false, // Default to true
      stats: options.stats || false,
      debug: options.debug || false,
      ...options
    };

    // Core ThreeJS components
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.stats = null;

    // Animation and timing
    this.clock = new THREE.Clock();
    this.animationId = null;
    this.isAnimating = false;

    // Initialize the ThreeJS setup
    this.init();
  }

  /**
   * Initialize the ThreeJS scene, camera, renderer, and other components
   */
  init = () => {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createLights();
    
    if (this.config.controls) {
      this.createControls();
    }
    
    if (this.config.stats) {
      this.createStats();
    }

    this.setupEventListeners();
    this.setup(); // Call user-defined setup method
    this.startAnimation();
  }

  createScene = () => {
    this.scene = new THREE.Scene();
    if (this.config.backgroundColor !== null) {
      this.scene.background = new THREE.Color(this.config.backgroundColor);
    }
    
    if (this.config.debug) {
      console.log('Scene created:', this.scene);
    }
  }

  createCamera = () => {
    const aspect = this.config.width / this.config.height;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 5);
    
    if (this.config.debug) {
      console.log('Camera created:', this.camera);
    }
  }

  createRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
      antialias: this.config.antialias,
      alpha: this.config.alpha
    });
    
    this.renderer.setSize(this.config.width, this.config.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    if (this.config.shadows) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    this.config.container.appendChild(this.renderer.domElement);
    
    if (this.config.debug) {
      console.log('Renderer created:', this.renderer);
    }
  }

  createLights = () => {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);

    // Directional light for shadows and definition
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    
    if (this.config.shadows) {
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
    }
    
    this.scene.add(directionalLight);
    
    if (this.config.debug) {
      console.log('Lights created');
    }
  }

  createControls = () =>{
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      
      if (this.config.debug) {
        console.log('Orbit controls created');
      }
    } else if (this.config.debug) {
      console.warn('OrbitControls not available. Make sure to include the OrbitControls script.');
    }
  }

  createStats = () => {
    if (typeof Stats !== 'undefined') {
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb
      document.body.appendChild(this.stats.dom);
      
      if (this.config.debug) {
        console.log('Stats monitor created');
      }
    } else if (this.config.debug) {
      console.warn('Stats.js not available. Make sure to include the Stats.js library.');
    }
  }

  setupEventListeners = () => {
    window.addEventListener('resize', this.onWindowResize, false);
  }

  onWindowResize = () => {
    this.config.width = window.innerWidth;
    this.config.height = window.innerHeight;

    this.camera.aspect = this.config.width / this.config.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.config.width, this.config.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (this.config.debug) {
      console.log('Window resized:', this.config.width, 'x', this.config.height);
    }
  }

  startAnimation = () => {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animate();
    }
  }

  stopAnimation = () => {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
      this.isAnimating = false;
    }
  }


  animate = () => {
    if (!this.isAnimating) return;

    this.animationId = requestAnimationFrame(this.animate);

    const deltaTime = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Update stats
    if (this.stats) {
      this.stats.begin();
    }

    // Update controls
    if (this.controls) {
      this.controls.update();
    }

    // Call user-defined update method
    this.update(deltaTime, elapsedTime);

    // Render the scene
    this.renderer.render(this.scene, this.camera);

    // Update stats
    if (this.stats) {
      this.stats.end();
    }
  }

  addToScene = (object) => {
    this.scene.add(object);
    return object;
  }

  removeFromScene = (object) => {
    this.scene.remove(object);
    return object;
  }

  worldToScreen = (position) => {
    const vector = position.clone();
    vector.project(this.camera);
    
    return new THREE.Vector2(
      (vector.x * 0.5 + 0.5) * this.config.width,
      (vector.y * -0.5 + 0.5) * this.config.height
    );
  }

  /**
   * Get 3D world position from screen coordinates
   * @param {number} x - Screen x coordinate
   * @param {number} y - Screen y coordinate
   * @param {number} z - Z depth (default: 0.5)
   * @returns {THREE.Vector3} 3D world position
   */
  screenToWorld = (x, y, z = 0.5) => {
    const vector = new THREE.Vector3(
      (x / this.config.width) * 2 - 1,
      -(y / this.config.height) * 2 + 1,
      z
    );
    
    return vector.unproject(this.camera);
  }

  dispose = () => {
    this.stopAnimation();
    
    // Remove event listeners
    window.removeEventListener('resize', this.onWindowResize);
    
    // Dispose of controls
    if (this.controls) {
      this.controls.dispose();
    }
    
    // Remove stats
    if (this.stats && this.stats.dom.parentNode) {
      this.stats.dom.parentNode.removeChild(this.stats.dom);
    }
    
    // Remove renderer canvas
    if (this.renderer && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    
    // Dispose of renderer
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    if (this.config.debug) {
      console.log('ThreeJS instance disposed');
    }
  }

  setup = () => {
    // Override this method in your experiments
    if (this.config.debug) {
      console.log('Setup method called - override this in your experiment');
    }
  }

  /**
   * Update method - override this to add your own animation logic
   * Called every frame in the animation loop
   * @param {number} deltaTime - Time since last frame in seconds
   * @param {number} elapsedTime - Total elapsed time in seconds
   */
  update = (deltaTime, elapsedTime) => {
    // Override this method in your experiments
    // Example: rotate objects, update animations, etc.
  }
}
