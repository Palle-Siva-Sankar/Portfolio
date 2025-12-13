// ===== REALISTIC OFFICE ROOM SCENE (THREE.JS) =====

function initOfficeScene() {
    const container = document.getElementById('footer-3d-scene');
    if (!container) return;

    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded');
        return;
    }

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd0d5db); // Light Blue-Grey Sky tone outside

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(5, 3.5, 5); // Corner View
    camera.lookAt(0, 1.0, 0);

    // RENDERER
    // RENDERER
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // --- MATERIALS ---
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.6 }); // Wood
    const rugMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 1.0 });

    // Furniture Materials (From Previous Step)
    const leatherMat = new THREE.MeshPhysicalMaterial({ color: 0xffaa00, roughness: 0.6, clearcoat: 0.1 });
    const chromeMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 1.0, roughness: 0.15 });
    const plasticMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.2 });
    const woodTableMat = new THREE.MeshStandardMaterial({ color: 0x4e342e, roughness: 0.5 });
    const plantMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.8, side: THREE.DoubleSide });
    const screenMat = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x2244ff, emissiveIntensity: 2.0 });
    const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffaa00, emissiveIntensity: 5.0 });

    // --- BUILD ROOM ENVIRONMENT ---
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // Floor
    const floor = new THREE.Mesh(new THREE.BoxGeometry(10, 0.2, 10), floorMat);
    floor.position.y = -0.1;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Back Wall
    const wall1 = new THREE.Mesh(new THREE.BoxGeometry(10, 5, 0.2), wallMat);
    wall1.position.set(0, 2.4, -5);
    wall1.receiveShadow = true;
    roomGroup.add(wall1);

    // Side Wall
    const wall2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5, 10), wallMat);
    wall2.position.set(-5, 2.4, 0);
    wall2.receiveShadow = true;
    roomGroup.add(wall2);

    // Rug
    const rug = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 0.05, 32), rugMat);
    rug.position.set(0, 0.05, 0);
    rug.receiveShadow = true;
    roomGroup.add(rug);

    // Baseboard (Trim)
    const trim1 = new THREE.Mesh(new THREE.BoxGeometry(10, 0.15, 0.05), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    trim1.position.set(0, 0.075, -4.9);
    roomGroup.add(trim1);
    const trim2 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.15, 10), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    trim2.position.set(-4.9, 0.075, 0);
    roomGroup.add(trim2);

    // Window (Simulated)
    const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.5, 4), new THREE.MeshStandardMaterial({ color: 0x333333 }));
    windowFrame.position.set(-4.9, 2.5, 0);
    roomGroup.add(windowFrame);

    // Window Light Source
    const rectLight = new THREE.RectAreaLight(0xffffff, 5, 4, 2.5);
    rectLight.position.set(-4.8, 2.5, 0);
    rectLight.lookAt(0, 2.5, 0);
    roomGroup.add(rectLight);

    // --- FURNITURE PLACEMENT ---

    // 1. CHAIR (Center)
    const chairGroup = new THREE.Group();
    chairGroup.position.set(-1.0, 0, 0.5);
    chairGroup.rotation.y = 0.8;
    roomGroup.add(chairGroup);

    // Seat
    const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.5, 0.1, 32), leatherMat);
    seat.position.y = 0.55;
    seat.receiveShadow = true;
    seat.castShadow = true;
    chairGroup.add(seat);

    // Backrest
    const backGroup = new THREE.Group();
    backGroup.position.set(0, 0.55, -0.4);
    chairGroup.add(backGroup);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.1), leatherMat);
    back.position.y = 0.4;
    back.castShadow = true;
    backGroup.add(back);

    // Legs
    const legCyl = new THREE.CylinderGeometry(0.04, 0.04, 0.5);
    const leg1 = new THREE.Mesh(legCyl, chromeMat); leg1.position.set(-0.3, 0.25, -0.3); leg1.castShadow = true; chairGroup.add(leg1);
    const leg2 = new THREE.Mesh(legCyl, chromeMat); leg2.position.set(0.3, 0.25, -0.3); leg2.castShadow = true; chairGroup.add(leg2);
    const leg3 = new THREE.Mesh(legCyl, chromeMat); leg3.position.set(-0.3, 0.25, 0.3); leg3.castShadow = true; chairGroup.add(leg3);
    const leg4 = new THREE.Mesh(legCyl, chromeMat); leg4.position.set(0.3, 0.25, 0.3); leg4.castShadow = true; chairGroup.add(leg4);


    // 2. CORNER TABLE (For Laptop)
    const tableGroup = new THREE.Group();
    tableGroup.position.set(0.5, 0, -1.5);
    roomGroup.add(tableGroup);

    const tTop = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 1.5), woodTableMat); // Desk Shape
    tTop.position.y = 0.8;
    tTop.receiveShadow = true;
    tTop.castShadow = true;
    tableGroup.add(tTop);

    const tLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8), chromeMat); tLeg.position.set(-1.3, 0.4, -0.6); tableGroup.add(tLeg);
    const tLeg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8), chromeMat); tLeg2.position.set(1.3, 0.4, -0.6); tableGroup.add(tLeg2);
    const tLeg3 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8), chromeMat); tLeg3.position.set(-1.3, 0.4, 0.6); tableGroup.add(tLeg3);
    const tLeg4 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8), chromeMat); tLeg4.position.set(1.3, 0.4, 0.6); tableGroup.add(tLeg4);

    // 3. LAPTOP (On Desk)
    const lapGroup = new THREE.Group();
    lapGroup.position.set(0, 0.85, 0);
    lapGroup.rotation.y = 0.2;
    tableGroup.add(lapGroup);

    const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 0.3), chromeMat); lapBase.castShadow = true; lapGroup.add(lapBase);
    const lapScreen = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 0.02), chromeMat); lapScreen.position.set(0, 0.125, -0.15); lapScreen.rotation.x = 0.1; lapGroup.add(lapScreen);
    const lapGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.23), screenMat); lapGlow.position.set(0, 0.125, -0.139); lapGlow.rotation.x = 0.1; lapGroup.add(lapGlow);

    // 4. PLANT (Floor)
    const plantGroup = new THREE.Group();
    plantGroup.position.set(-3.5, 0, -3.5); // Corner
    roomGroup.add(plantGroup);

    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.3, 0.6, 32), plasticMat);
    pot.position.y = 0.3; pot.castShadow = true; plantGroup.add(pot);

    // Simple Bush
    for (let i = 0; i < 8; i++) {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), plantMat);
        leaf.scale.set(1, 0.1, 1.5);
        leaf.position.set(Math.random() * 0.5 - 0.25, 0.7 + Math.random() * 0.4, Math.random() * 0.5 - 0.25);
        leaf.rotation.set(Math.random(), Math.random(), Math.random());
        plantGroup.add(leaf);
    }

    // 5. LAMP (On Desk)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-1.0, 0.85, 0.4);
    lampGroup.rotation.y = -0.5;
    tableGroup.add(lampGroup);

    const lBase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.02), chromeMat); lampGroup.add(lBase);
    const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4), chromeMat); lArm.position.y = 0.2; lampGroup.add(lArm);
    const lHead = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.2, 16, 1, true), plasticMat); lHead.position.set(0.1, 0.4, 0); lHead.rotation.z = -1.2; lampGroup.add(lHead);
    const lBulb = new THREE.Mesh(new THREE.SphereGeometry(0.05), bulbMat); lBulb.position.set(0.15, 0.38, 0); lampGroup.add(lBulb);


    // --- LIGHTING ---
    const ambLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(ambLight);

    const sunLight = new THREE.DirectionalLight(0xffffee, 1.5);
    sunLight.position.set(-5, 10, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // CONTROLS
    let controls;
    if (typeof THREE.OrbitControls !== 'undefined') {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxPolarAngle = Math.PI / 2;
        controls.minDistance = 3;
        controls.maxDistance = 10;
        controls.target.set(0, 1, 0);
    }

    // ANIMATION LOOP OPTIMIZATION
    let isRendering = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isRendering = entry.isIntersecting;
        });
    }, { rootMargin: '200px' }); // Start rendering slightly before it enters viewport

    observer.observe(container);

    function animate() {
        requestAnimationFrame(animate);
        if (isRendering) {
            if (controls) controls.update();
            renderer.render(scene, camera);
        }
    }
    animate();

    window.addEventListener('resize', () => {
        if (container.clientWidth && container.clientHeight) {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
    });
}

document.addEventListener('DOMContentLoaded', initOfficeScene);
