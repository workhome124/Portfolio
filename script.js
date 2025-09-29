// Three.js 3D Background
class ThreeJSBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.cryptoTexts = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.init();
        this.animate();
        this.addEventListeners();
    }
    
    init() {
        const canvas = document.getElementById('three-canvas');
        if (!canvas) {
            console.error('Three.js canvas element not found');
            return;
        }
        
        try {
            // Scene
            this.scene = new THREE.Scene();
            console.log('Three.js scene created');
            
            // Camera
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.camera.position.z = 5;
            console.log('Three.js camera created');
            
            // Renderer
            this.renderer = new THREE.WebGLRenderer({ 
                canvas: canvas,
                alpha: true,
                antialias: true 
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            console.log('Three.js renderer created');
            
            // Create particles
            this.createParticles();
            console.log('Particles created');
            
            // Create floating geometric shapes
            this.createGeometricShapes();
            console.log('Geometric shapes created');
            
            // Create cryptocurrency text orbits
            this.createCryptoTextOrbits();
            console.log('Crypto text orbits created');
            
            // Add a test indicator to verify Three.js is working
            const testGeometry = new THREE.SphereGeometry(0.1, 8, 8);
            const testMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const testSphere = new THREE.Mesh(testGeometry, testMaterial);
            testSphere.position.set(0, 0, 2);
            this.scene.add(testSphere);
            
            console.log('Three.js background initialized successfully');
        } catch (error) {
            console.error('Error initializing Three.js background:', error);
        }
    }
    
    createParticles() {
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Positions
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;
            
            // Colors (blue to cyan gradient)
            const color = new THREE.Color();
            color.setHSL(0.5 + Math.random() * 0.2, 0.8, 0.6);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    createGeometricShapes() {
        // Create floating cubes
        for (let i = 0; i < 5; i++) {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00d4ff,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            );
            cube.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            this.scene.add(cube);
        }
        
        // Create floating spheres
        for (let i = 0; i < 3; i++) {
            const geometry = new THREE.SphereGeometry(0.3, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: 0x4ecdc4,
                wireframe: true,
                transparent: true,
                opacity: 0.2
            });
            
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 12
            );
            
            this.scene.add(sphere);
        }
    }
    
    createCryptoTextOrbits() {
        // Cryptocurrency and blockchain names
        const cryptoNames = [
            'Bitcoin', 'Ethereum', 'Solana', 'Polkadot', 'Cardano', 'Chainlink',
            'Polygon', 'Avalanche', 'Fantom', 'Algorand', 'Tezos', 'Cosmos',
            'Near', 'Aptos', 'Sui', 'Arbitrum', 'Optimism', 'Base',
            'Uniswap', 'Aave', 'Compound', 'MakerDAO', 'Curve', 'Balancer',
            'OpenSea', 'Blur', 'LooksRare', 'Magic Eden', 'Tensor', 'X2Y2',
            'Lens Protocol', 'Farcaster', 'Mirror', 'Rally', 'Audius', 'Livepeer'
        ];
        
        // Create multiple orbital rings
        const orbitalRings = [
            { radius: 3, speed: 0.005, textSize: 0.3, yOffset: 0 },
            { radius: 4.5, speed: -0.003, textSize: 0.25, yOffset: 0.5 },
            { radius: 6, speed: 0.004, textSize: 0.2, yOffset: -0.3 },
            { radius: 7.5, speed: -0.002, textSize: 0.18, yOffset: 0.8 }
        ];
        
        orbitalRings.forEach((ring, ringIndex) => {
            const textsPerRing = Math.floor(cryptoNames.length / orbitalRings.length);
            const startIndex = ringIndex * textsPerRing;
            const endIndex = ringIndex === orbitalRings.length - 1 ? cryptoNames.length : startIndex + textsPerRing;
            
            for (let i = startIndex; i < endIndex; i++) {
                const text = cryptoNames[i];
                const angle = (i - startIndex) * (Math.PI * 2) / (endIndex - startIndex);
                
                // Create text geometry
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const fontSize = 64;
                context.font = `bold ${fontSize}px Inter, sans-serif`;
                const textWidth = context.measureText(text).width;
                const textHeight = fontSize;
                
                canvas.width = textWidth * 2;
                canvas.height = textHeight * 2;
                context.font = `bold ${fontSize}px Inter, sans-serif`;
                context.fillStyle = '#00d4ff';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(text, canvas.width / 2, canvas.height / 2);
                
                // Add glow effect
                context.shadowColor = '#00d4ff';
                context.shadowBlur = 20;
                context.fillText(text, canvas.width / 2, canvas.height / 2);
                
                const texture = new THREE.CanvasTexture(canvas);
                const material = new THREE.SpriteMaterial({ 
                    map: texture,
                    transparent: true,
                    opacity: 0.8,
                    alphaTest: 0.1
                });
                
                const sprite = new THREE.Sprite(material);
                sprite.scale.set(ring.textSize, ring.textSize * 0.3, 1);
                
                // Position on orbital ring
                const x = Math.cos(angle) * ring.radius;
                const z = Math.sin(angle) * ring.radius;
                const y = ring.yOffset;
                
                sprite.position.set(x, y, z);
                sprite.userData = {
                    angle: angle,
                    radius: ring.radius,
                    speed: ring.speed,
                    yOffset: ring.yOffset,
                    originalAngle: angle
                };
                
                this.scene.add(sprite);
                this.cryptoTexts.push(sprite);
            }
        });
        
        // Add some additional floating crypto symbols
        this.createFloatingCryptoSymbols();
    }
    
    createFloatingCryptoSymbols() {
        const symbols = ['₿', 'Ξ', '◊', '◈', '◉', '◎', '◐', '◑'];
        
        symbols.forEach((symbol, index) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const fontSize = 48;
            canvas.width = 64;
            canvas.height = 64;
            
            context.font = `bold ${fontSize}px Inter, sans-serif`;
            context.fillStyle = '#4ecdc4';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.shadowColor = '#4ecdc4';
            context.shadowBlur = 15;
            context.fillText(symbol, 32, 32);
            
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ 
                map: texture,
                transparent: true,
                opacity: 0.6
            });
            
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(0.4, 0.4, 1);
            
            // Random position
            sprite.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 15
            );
            
            sprite.userData = {
                floatSpeed: 0.01 + Math.random() * 0.02,
                floatAmplitude: 2 + Math.random() * 3,
                originalY: sprite.position.y
            };
            
            this.scene.add(sprite);
            this.cryptoTexts.push(sprite);
        });
    }
    
    animate() {
        if (!this.scene || !this.camera || !this.renderer) {
            console.error('Three.js components not initialized');
            return;
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
        
        try {
            // Rotate particles
            if (this.particles) {
                this.particles.rotation.x += 0.001;
                this.particles.rotation.y += 0.002;
            }
            
            // Rotate geometric shapes
            this.scene.children.forEach((child) => {
                if (child instanceof THREE.Mesh && child.geometry.type === 'BoxGeometry') {
                    child.rotation.x += 0.01;
                    child.rotation.y += 0.01;
                }
                if (child instanceof THREE.Mesh && child.geometry.type === 'SphereGeometry') {
                    child.rotation.x += 0.005;
                    child.rotation.y += 0.005;
                }
            });
            
            // Animate cryptocurrency text orbits
            this.cryptoTexts.forEach((textSprite) => {
                if (textSprite.userData.radius) {
                    // Orbital motion
                    textSprite.userData.angle += textSprite.userData.speed;
                    const x = Math.cos(textSprite.userData.angle) * textSprite.userData.radius;
                    const z = Math.sin(textSprite.userData.angle) * textSprite.userData.radius;
                    textSprite.position.x = x;
                    textSprite.position.z = z;
                    
                    // Make text always face the camera
                    textSprite.lookAt(this.camera.position);
                } else if (textSprite.userData.floatSpeed) {
                    // Floating motion for symbols
                    textSprite.position.y = textSprite.userData.originalY + 
                        Math.sin(Date.now() * textSprite.userData.floatSpeed) * textSprite.userData.floatAmplitude;
                    
                    // Gentle rotation
                    textSprite.rotation.z += 0.01;
                }
            });
            
            // Mouse interaction
            this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.05;
            this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);
            
            this.renderer.render(this.scene, this.camera);
        } catch (error) {
            console.error('Error in Three.js animation loop:', error);
        }
    }
    
    addEventListeners() {
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Initialize Three.js background
let threeBackground = null;

// Smooth scrolling and navigation
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        this.init();
    }
    
    init() {
        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu
                this.navMenu.classList.remove('active');
            });
        });
        
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.hamburger.classList.toggle('active');
        });
        
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Add fade-in class to elements
        const elements = document.querySelectorAll('.skill-category, .project-card, .stat-item, .tech-item, .contact-method');
        elements.forEach(el => {
            el.classList.add('fade-in');
        });
        
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);
        
        // Observe elements
        elements.forEach(el => {
            this.observer.observe(el);
        });
        
        // Animate skill bars
        this.animateSkillBars();
    }
    
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    progressBar.style.width = width;
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
}

// Typing animation for hero text
class TypingAnimation {
    constructor() {
        this.titleName = document.querySelector('.title-name');
        this.titleRole = document.querySelector('.title-role');
        
        this.init();
    }
    
    init() {
        if (this.titleName) {
            this.typeText(this.titleName, 'Daniel Ramos', 100);
        }
        
        setTimeout(() => {
            if (this.titleRole) {
                this.typeText(this.titleRole, 'Blockchain Developer', 80);
            }
        }, 1500);
    }
    
    typeText(element, text, speed) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);
    }
}

// Particle system for hero section
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #00d4ff;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.6;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    animate() {
        this.particles.forEach(particle => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Contact form handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = '#4ecdc4';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                this.form.reset();
            }, 2000);
        }, 1500);
    }
}

// Parallax scrolling effect
class ParallaxEffect {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-icon');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Three.js to be available
    const initThreeJS = () => {
        if (typeof THREE !== 'undefined') {
            console.log('Initializing Three.js background...');
            threeBackground = new ThreeJSBackground();
        } else {
            console.log('Three.js not ready, retrying...');
            setTimeout(initThreeJS, 100);
        }
    };
    
    // Initialize Three.js background
    initThreeJS();
    
    // Initialize other components
    new Navigation();
    new ScrollAnimations();
    new TypingAnimation();
    new ParticleSystem();
    new ContactForm();
    new ParallaxEffect();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (threeBackground) {
        threeBackground.destroy();
    }
});

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
    }
    
    .particle {
        animation: float 3s ease-in-out infinite;
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-progress {
        transition: width 2s ease-out;
    }
    
    .project-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project-card:hover {
        transform: translateY(-10px) scale(1.02);
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    .btn:hover::before {
        left: 100%;
    }
    
    .tech-item:hover {
        transform: translateX(10px) scale(1.05);
    }
    
    .stat-item:hover {
        transform: translateY(-5px) scale(1.05);
    }
    
    .contact-method:hover {
        transform: translateX(10px) scale(1.02);
    }
    
    .social-link:hover {
        transform: translateY(-3px) scale(1.1);
    }
    
    .floating-icon {
        transition: all 0.3s ease;
    }
    
    .floating-icon:hover {
        transform: scale(1.2) rotate(360deg);
    }
    
    .profile-card {
        transition: all 0.3s ease;
    }
    
    .profile-card:hover {
        transform: rotateY(5deg) rotateX(5deg) scale(1.05);
    }
    
    .card-glow {
        animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
    }
    
    .nav-link::after {
        transition: width 0.3s ease;
    }
    
    .nav-link:hover::after {
        width: 100%;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);
