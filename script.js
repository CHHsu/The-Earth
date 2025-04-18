document.addEventListener('DOMContentLoaded', () => {
    const infoContent = document.getElementById('info-content');
    const container = document.getElementById('earth-container');
    const langToggle = document.getElementById('langToggle');
    const showLatLongCheckbox = document.getElementById('showLatLong');
    const showRegionMarkersCheckbox = document.getElementById('showRegionMarkers');
    let currentLang = 'zh';
    let currentRegion = null;
    let latLongLines = null;
    let regionMarkers = null;

    // Language data
    const i18nData = {
        "zh": {
            "title": "地球各大洲與海洋",
            "clickToSeeDetails": "點擊地圖上的區域以查看詳細信息",
            "features": "功能選項",
            "showLatLong": "顯示經緯度線",
            "showRegionMarkers": "顯示地區標記",
            "regions": {
                "asia": "亞洲是世界上最大的洲，面積約4,500萬平方公里，佔地球陸地總面積的30%。",
                "africa": "非洲是世界第二大洲，面積約3,000萬平方公里，擁有世界最大的沙漠——撒哈拉沙漠。",
                "north-america": "北美洲是世界第三大洲，面積約2,400萬平方公里，擁有世界最長的 mountain range——落基山脈。",
                "south-america": "南美洲面積約1,780萬平方公里，擁有世界最長的 mountain range——安第斯山脈。",
                "europe": "歐洲面積約1,000萬平方公里，是世界上人口密度最高的大洲之一。",
                "australia": "大洋洲是世界上最小的大洲，面積約860萬平方公里，包括澳大利亞大陸和眾多島嶼。",
                "antarctica": "南極洲是世界第五大洲，面積約1,400萬平方公里，是世界上最寒冷的大洲。",
                "pacific": "太平洋是世界最大的海洋，面積約1.65億平方公里，平均深度約4,000米。",
                "atlantic": "大西洋是世界第二大的海洋，面積約1.06億平方公里，連接北美洲和歐洲。",
                "indian": "印度洋是世界第三大的海洋，面積約7,300萬平方公里，主要位於南半球。",
                "arctic": "北冰洋是世界最小的海洋，面積約1,400萬平方公里，大部分區域常年被冰層覆蓋。",
                "southern": "南冰洋是環繞南極洲的海洋，面積約2,000萬平方公里，是世界上最年輕的海洋。"
            }
        },
        "en": {
            "title": "Earth's Continents and Oceans",
            "clickToSeeDetails": "Click on the map to see details",
            "features": "Features",
            "showLatLong": "Show Latitude and Longitude Lines",
            "showRegionMarkers": "Show Region Markers",
            "regions": {
                "asia": "Asia is the largest continent, covering about 45 million square kilometers, approximately 30% of Earth's total land area.",
                "africa": "Africa is the second-largest continent, covering about 30 million square kilometers, home to the world's largest desert, the Sahara.",
                "north-america": "North America is the third-largest continent, covering about 24 million square kilometers, featuring the world's longest mountain range, the Rocky Mountains.",
                "south-america": "South America covers about 17.8 million square kilometers, featuring the world's longest mountain range, the Andes.",
                "europe": "Europe covers about 10 million square kilometers and is one of the most densely populated continents.",
                "australia": "Oceania is the smallest continent, covering about 8.6 million square kilometers, including the Australian mainland and numerous islands.",
                "antarctica": "Antarctica is the fifth-largest continent, covering about 14 million square kilometers, and is the coldest continent on Earth.",
                "pacific": "The Pacific Ocean is the largest and deepest ocean, covering about 165 million square kilometers with an average depth of 4,000 meters.",
                "atlantic": "The Atlantic Ocean is the second-largest ocean, covering about 106 million square kilometers, connecting North America and Europe.",
                "indian": "The Indian Ocean is the third-largest ocean, covering about 73 million square kilometers, primarily located in the Southern Hemisphere.",
                "arctic": "The Arctic Ocean is the smallest ocean, covering about 14 million square kilometers, with most of its surface covered by ice year-round.",
                "southern": "The Southern Ocean encircles Antarctica, covering about 20 million square kilometers, and is the youngest ocean on Earth."
            }
        }
    };

    // Region coordinates data
    const regionCoordinates = {
        "asia": { lat: 34.0479, lon: 100.6197, name: "亞洲" },
        "africa": { lat: 1.6508, lon: 10.2679, name: "非洲" },
        "north-america": { lat: 54.5260, lon: -105.2551, name: "北美洲" },
        "south-america": { lat: -8.7832, lon: -55.4915, name: "南美洲" },
        "europe": { lat: 54.5260, lon: 15.2551, name: "歐洲" },
        "australia": { lat: -25.2744, lon: 133.7751, name: "大洋洲" },
        "antarctica": { lat: -82.8628, lon: 135.0000, name: "南極洲" },
        "pacific": { lat: 0.0000, lon: -160.0000, name: "太平洋" },
        "atlantic": { lat: 0.0000, lon: -30.0000, name: "大西洋" },
        "indian": { lat: -20.0000, lon: 80.0000, name: "印度洋" },
        "arctic": { lat: 90.0000, lon: 0.0000, name: "北冰洋" },
        "southern": { lat: -65.0000, lon: 0.0000, name: "南冰洋" }
    };

    // Function to update text content
    function updateTextContent() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (i18nData[currentLang] && i18nData[currentLang][key]) {
                element.textContent = i18nData[currentLang][key];
                // Update document title if the element is the title tag
                if (element.tagName.toLowerCase() === 'title') {
                    document.title = i18nData[currentLang][key];
                }
            }
        });

        // Update region info if exists
        if (currentRegion && i18nData[currentLang].regions[currentRegion]) {
            infoContent.textContent = i18nData[currentLang].regions[currentRegion];
        }
    }

    // Initial text update
    updateTextContent();

    // Language switching functionality
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        langToggle.textContent = currentLang === 'zh' ? 'EN' : 'ZH';
        document.documentElement.lang = currentLang === 'zh' ? 'zh-TW' : 'en';
        updateTextContent();
    });

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(5, 256, 256);
    const textureLoader = new THREE.TextureLoader();
    
    // 使用更高質量的地球紋理
    const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.RepeatWrapping;
    earthTexture.repeat.set(1, 1);
    
    const normalMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg');
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(1, 1);
    
    const specularMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');
    specularMap.wrapS = THREE.RepeatWrapping;
    specularMap.wrapT = THREE.RepeatWrapping;
    specularMap.repeat.set(1, 1);

    // 使用 MeshStandardMaterial 代替 MeshPhongMaterial 以獲得更好的光照效果
    const earthMaterial = new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(0.05, 0.05),
        roughnessMap: specularMap,
        roughness: 0.7,
        metalness: 0.1,
        side: THREE.FrontSide,
        flatShading: false
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Atmosphere with improved blending
    const atmosphereGeometry = new THREE.SphereGeometry(5.1, 256, 256);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x0077ff,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Function to create region markers
    function createRegionMarkers() {
        const group = new THREE.Group();
        
        // Function to create a marker for a region
        function createRegionMarker(regionId) {
            const coords = regionCoordinates[regionId];
            if (!coords) return null;
            
            const markerGroup = new THREE.Group();
            
            // Convert lat/lon to 3D coordinates
            const phi = (90 - coords.lat) * Math.PI / 180;
            const theta = (coords.lon + 180) * Math.PI / 180;
            
            const radius = 5.1;
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.cos(phi);
            const z = radius * Math.sin(phi) * Math.sin(theta);
            
            // Create marker point
            const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
            const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            marker.position.set(x, y, z);
            markerGroup.add(marker);
            
            // Create label
            const labelGeometry = new THREE.PlaneGeometry(0.5, 0.5);
            const labelMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            });
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            
            // Position the label
            const labelRadius = 5.3;
            label.position.set(
                labelRadius * Math.sin(phi) * Math.cos(theta),
                labelRadius * Math.cos(phi),
                labelRadius * Math.sin(phi) * Math.sin(theta)
            );
            
            // Create canvas for text
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 128;
            canvas.height = 64;
            context.fillStyle = 'white';
            context.font = '16px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            
            // Add region name and coordinates
            context.fillText(`${coords.name}`, 64, 20);
            context.fillText(`${coords.lat.toFixed(1)}°N, ${coords.lon.toFixed(1)}°E`, 64, 40);
            
            // Create texture from canvas
            const texture = new THREE.CanvasTexture(canvas);
            labelMaterial.map = texture;
            
            markerGroup.add(label);
            
            // Store region ID for interaction
            markerGroup.userData = { regionId };
            
            return markerGroup;
        }
        
        // Create markers for all regions
        Object.keys(regionCoordinates).forEach(regionId => {
            const marker = createRegionMarker(regionId);
            if (marker) {
                group.add(marker);
            }
        });
        
        return group;
    }

    // Toggle region markers
    showRegionMarkersCheckbox.addEventListener('change', () => {
        if (showRegionMarkersCheckbox.checked) {
            if (!regionMarkers) {
                regionMarkers = createRegionMarkers();
                scene.add(regionMarkers);
            } else {
                scene.add(regionMarkers);
            }
        } else {
            if (regionMarkers) {
                scene.remove(regionMarkers);
            }
        }
    });

    // Function to create latitude and longitude lines
    function createLatLongLines() {
        const group = new THREE.Group();
        
        // Create latitude lines (parallels)
        for (let lat = -80; lat <= 80; lat += 20) {
            const radius = 5.05;
            const segments = 64;
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            
            for (let i = 0; i <= segments; i++) {
                const theta = (i / segments) * Math.PI * 2;
                const phi = (90 - lat) * Math.PI / 180;
                
                const x = radius * Math.sin(phi) * Math.cos(theta);
                const y = radius * Math.cos(phi);
                const z = radius * Math.sin(phi) * Math.sin(theta);
                
                vertices.push(x, y, z);
            }
            
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
            const line = new THREE.Line(geometry, material);
            group.add(line);

            // Add latitude label
            const labelGeometry = new THREE.PlaneGeometry(0.5, 0.5);
            const labelMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            });
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            
            // Position the label
            const labelRadius = 5.3;
            const labelPhi = (90 - lat) * Math.PI / 180;
            label.position.set(
                labelRadius * Math.sin(labelPhi) * Math.cos(0),
                labelRadius * Math.cos(labelPhi),
                labelRadius * Math.sin(labelPhi) * Math.sin(0)
            );
            
            // Create canvas for text
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 64;
            canvas.height = 64;
            context.fillStyle = 'white';
            context.font = '24px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(`${lat}°`, 32, 32);
            
            // Create texture from canvas
            const texture = new THREE.CanvasTexture(canvas);
            labelMaterial.map = texture;
            
            group.add(label);
        }
        
        // Create longitude lines (meridians)
        for (let lon = 0; lon < 360; lon += 20) {
            const radius = 5.05;
            const segments = 64;
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            
            for (let i = 0; i <= segments; i++) {
                const phi = (i / segments) * Math.PI;
                const theta = lon * Math.PI / 180;
                
                const x = radius * Math.sin(phi) * Math.cos(theta);
                const y = radius * Math.cos(phi);
                const z = radius * Math.sin(phi) * Math.sin(theta);
                
                vertices.push(x, y, z);
            }
            
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
            const line = new THREE.Line(geometry, material);
            group.add(line);

            // Add longitude label
            const labelGeometry = new THREE.PlaneGeometry(0.5, 0.5);
            const labelMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            });
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            
            // Position the label
            const labelRadius = 5.3;
            const labelPhi = Math.PI / 2;
            const labelTheta = lon * Math.PI / 180;
            label.position.set(
                labelRadius * Math.sin(labelPhi) * Math.cos(labelTheta),
                labelRadius * Math.cos(labelPhi),
                labelRadius * Math.sin(labelPhi) * Math.sin(labelTheta)
            );
            
            // Create canvas for text
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 64;
            canvas.height = 64;
            context.fillStyle = 'white';
            context.font = '24px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(`${lon}°`, 32, 32);
            
            // Create texture from canvas
            const texture = new THREE.CanvasTexture(canvas);
            labelMaterial.map = texture;
            
            group.add(label);
        }
        
        return group;
    }

    // Toggle latitude and longitude lines
    showLatLongCheckbox.addEventListener('change', () => {
        if (showLatLongCheckbox.checked) {
            if (!latLongLines) {
                latLongLines = createLatLongLines();
                scene.add(latLongLines);
            } else {
                scene.add(latLongLines);
            }
        } else {
            if (latLongLines) {
                scene.remove(latLongLines);
            }
        }
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Camera position
    camera.position.z = 15;

    // Zoom limits
    const minZoom = 8;
    const maxZoom = 30;
    const zoomSpeed = 0.1;

    // Mouse control
    let isMouseDown = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    container.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    });

    container.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;

        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };

        earth.rotation.y += deltaMove.x * 0.005;
        earth.rotation.x += deltaMove.y * 0.005;
        atmosphere.rotation.y = earth.rotation.y;
        atmosphere.rotation.x = earth.rotation.x;
        
        // Rotate lat/long lines with earth
        if (latLongLines) {
            latLongLines.rotation.y = earth.rotation.y;
            latLongLines.rotation.x = earth.rotation.x;
        }
        
        // Rotate region markers with earth
        if (regionMarkers) {
            regionMarkers.rotation.y = earth.rotation.y;
            regionMarkers.rotation.x = earth.rotation.x;
        }

        previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    });

    container.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    container.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    // Mouse wheel zoom
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        // Determine zoom direction
        const zoomDirection = e.deltaY > 0 ? -1 : 1;
        
        // Calculate new camera position
        const newZ = camera.position.z + zoomDirection * zoomSpeed;
        
        // Apply zoom limits
        if (newZ >= minZoom && newZ <= maxZoom) {
            camera.position.z = newZ;
        }
    }, { passive: false });

    // Auto rotation
    let autoRotate = true;
    container.addEventListener('click', () => {
        autoRotate = !autoRotate;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        if (autoRotate) {
            earth.rotation.y += 0.001;
            atmosphere.rotation.y = earth.rotation.y;
            if (latLongLines) {
                latLongLines.rotation.y = earth.rotation.y;
            }
            if (regionMarkers) {
                regionMarkers.rotation.y = earth.rotation.y;
            }
        }

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}); 