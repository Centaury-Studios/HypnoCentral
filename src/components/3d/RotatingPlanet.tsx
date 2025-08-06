import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface RotatingPlanetProps {
 className?: string;
}

const RotatingPlanet: React.FC<RotatingPlanetProps> = ({ className = '' }) => {
 const mountRef = useRef<HTMLDivElement>(null);
 const sceneRef = useRef<THREE.Scene | null>(null);
 const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
 const animationIdRef = useRef<number | null>(null);

 useEffect(() => {
   if (!mountRef.current) return;

   // Scene setup
   const scene = new THREE.Scene();
   sceneRef.current = scene;
   
   const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
   const renderer = new THREE.WebGLRenderer({ 
     alpha: true, 
     antialias: true,
     powerPreference: 'high-performance'
   });
   
   renderer.setSize(750, 750);
   renderer.setClearColor(0x000000, 0);
   rendererRef.current = renderer;
   mountRef.current.appendChild(renderer.domElement);

   // Create hologram planet group
   const planetGroup = new THREE.Group();
   
   // Main planet sphere made of points (holographic effect)
   const planetGeometry = new THREE.SphereGeometry(8.1, 64, 64);
   
   // Convert sphere to points for hologram effect
   const vertices = planetGeometry.attributes.position.array;
   const pointCount = vertices.length / 3;
   
   const pointGeometry = new THREE.BufferGeometry();
   const pointPositions = new Float32Array(pointCount * 3);
   const pointColors = new Float32Array(pointCount * 3);
   const pointSizes = new Float32Array(pointCount);
   
   for (let i = 0; i < pointCount; i++) {
     const i3 = i * 3;
     pointPositions[i3] = vertices[i3];
     pointPositions[i3 + 1] = vertices[i3 + 1];
     pointPositions[i3 + 2] = vertices[i3 + 2];
     
     // Hologram blue colors with variation
     const intensity = 0.6 + Math.random() * 0.4;
     pointColors[i3] = 0.3 * intensity;     // R
     pointColors[i3 + 1] = 0.7 * intensity; // G
     pointColors[i3 + 2] = 1.0 * intensity; // B
     
     pointSizes[i] = 0.8 + Math.random() * 0.4;
   }
   
   pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
   pointGeometry.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));
   pointGeometry.setAttribute('size', new THREE.BufferAttribute(pointSizes, 1));
   
   // Holographic planet material
   const planetMaterial = new THREE.ShaderMaterial({
     uniforms: {
       time: { value: 0 },
     },
     vertexShader: `
       attribute float size;
       varying vec3 vColor;
       varying float vAlpha;
       uniform float time;
       
       void main() {
         vColor = color;
         
         // Holographic flickering effect
         float flicker = sin(time * 4.0 + position.x * 5.0 + position.y * 3.0) * 0.5 + 0.5;
         float pulse = sin(time * 2.0) * 0.3 + 0.7;
         vAlpha = flicker * pulse * 0.8;
         
         vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
         gl_PointSize = size * (100.0 / -mvPosition.z) * pulse;
         gl_Position = projectionMatrix * mvPosition;
       }
     `,
     fragmentShader: `
       varying vec3 vColor;
       varying float vAlpha;
       
       void main() {
         float distance = length(gl_PointCoord - vec2(0.5));
         if (distance > 0.5) discard;
         
         // Holographic glow effect
         float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
         alpha = alpha * vAlpha;
         
         // Add extra glow for hologram effect
         vec3 glowColor = vColor + vec3(0.2, 0.3, 0.5) * (1.0 - alpha);
         
         gl_FragColor = vec4(glowColor, alpha);
       }
     `,
     transparent: true,
     blending: THREE.AdditiveBlending,
     vertexColors: true,
   });
   
   const planetPoints = new THREE.Points(pointGeometry, planetMaterial);
   planetGroup.add(planetPoints);
   
   // Holographic wireframe overlay
   const wireframeGeometry = new THREE.WireframeGeometry(planetGeometry);
   const wireframeMaterial = new THREE.LineBasicMaterial({
     color: 0x4dd0ff,
     transparent: true,
     opacity: 0.15,
   });
   const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
   planetGroup.add(wireframe);
   
   // Holographic atmosphere glow
   const atmosphereGeometry = new THREE.SphereGeometry(8.4, 32, 32);
   const atmosphereMaterial = new THREE.ShaderMaterial({
     uniforms: {
       time: { value: 0 },
     },
     vertexShader: `
       varying vec3 vNormal;
       varying vec3 vPosition;
       uniform float time;
       
       void main() {
         vNormal = normalize(normalMatrix * normal);
         vPosition = position;
         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
       }
     `,
     fragmentShader: `
       uniform float time;
       varying vec3 vNormal;
       varying vec3 vPosition;
       
       void main() {
         float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
         fresnel = pow(fresnel, 2.0);
         
         // Hologram pulse effect
         float pulse = sin(time * 3.0) * 0.3 + 0.7;
         float scanner = sin(vPosition.y * 2.0 + time * 6.0) * 0.5 + 0.5;
         
         vec3 hologramColor = vec3(0.3, 0.7, 1.0);
         float alpha = fresnel * pulse * 0.4 + scanner * 0.1;
         
         gl_FragColor = vec4(hologramColor, alpha);
       }
     `,
     blending: THREE.AdditiveBlending,
     side: THREE.BackSide,
     transparent: true,
   });
   
   const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
   planetGroup.add(atmosphere);
   
   // Orbiting stars/particles around the planet
   const starCount = 300;
   const starGeometry = new THREE.BufferGeometry();
   const starPositions = new Float32Array(starCount * 3);
   const starColors = new Float32Array(starCount * 3);
   const starSizes = new Float32Array(starCount);
   const starSpeeds = new Float32Array(starCount);
   
   for (let i = 0; i < starCount; i++) {
     const i3 = i * 3;
     
     // Create orbital rings at different distances
     const ring = Math.floor(Math.random() * 3);
     const radius = 12 + ring * 4 + Math.random() * 2;
     const theta = Math.random() * Math.PI * 2;
     const phi = (Math.random() - 0.5) * 0.8; // Flatten orbits
     
     starPositions[i3] = radius * Math.cos(theta);
     starPositions[i3 + 1] = radius * Math.sin(phi);
     starPositions[i3 + 2] = radius * Math.sin(theta);
     
     // Holographic star colors (blue-cyan spectrum)
     const colorVariation = Math.random();
     if (colorVariation < 0.7) {
       // Blue stars
       starColors[i3] = 0.2 + Math.random() * 0.3;     // R
       starColors[i3 + 1] = 0.6 + Math.random() * 0.4; // G  
       starColors[i3 + 2] = 1.0;                       // B
     } else {
       // Cyan-white stars
       starColors[i3] = 0.8 + Math.random() * 0.2;     // R
       starColors[i3 + 1] = 0.9 + Math.random() * 0.1; // G
       starColors[i3 + 2] = 1.0;                       // B
     }
     
     starSizes[i] = 0.5 + Math.random() * 1.5;
     starSpeeds[i] = 0.5 + Math.random() * 1.5;
   }
   
   starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
   starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
   starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
   starGeometry.setAttribute('speed', new THREE.BufferAttribute(starSpeeds, 1));
   
   const starMaterial = new THREE.ShaderMaterial({
     uniforms: {
       time: { value: 0 },
     },
     vertexShader: `
       attribute float size;
       attribute float speed;
       varying vec3 vColor;
       varying float vAlpha;
       uniform float time;
       
       void main() {
         vColor = color;
         
         // Twinkling effect
         float twinkle = sin(time * speed * 4.0 + position.x * 10.0) * 0.5 + 0.5;
         vAlpha = twinkle * 0.8 + 0.2;
         
         vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
         gl_PointSize = size * (80.0 / -mvPosition.z) * vAlpha;
         gl_Position = projectionMatrix * mvPosition;
       }
     `,
     fragmentShader: `
       varying vec3 vColor;
       varying float vAlpha;
       
       void main() {
         float distance = length(gl_PointCoord - vec2(0.5));
         if (distance > 0.5) discard;
         
         float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
         alpha = alpha * vAlpha;
         
         // Star glow effect
         vec3 finalColor = vColor + vec3(0.3, 0.3, 0.3) * (1.0 - alpha);
         
         gl_FragColor = vec4(finalColor, alpha * 0.9);
       }
     `,
     transparent: true,
     blending: THREE.AdditiveBlending,
     vertexColors: true,
   });
   
   const stars = new THREE.Points(starGeometry, starMaterial);
   planetGroup.add(stars);
   
   scene.add(planetGroup);
   
   // Minimal lighting for holographic effect
   const ambientLight = new THREE.AmbientLight(0x204080, 0.3);
   scene.add(ambientLight);
   
   // Position camera
   camera.position.set(6.75, 3.6, 27);
   camera.lookAt(0, 0, 0);
   
   let time = 0;
   
   // Animation loop
   const animate = () => {
     animationIdRef.current = requestAnimationFrame(animate);
     
     time += 0.01;
     
     // Update shader uniforms
     planetMaterial.uniforms.time.value = time;
     atmosphereMaterial.uniforms.time.value = time;
     starMaterial.uniforms.time.value = time;
     
             // Rotate planet (wireframe rotates with the group now)
    planetGroup.rotation.y += 0.002;
     
     // Rotate orbiting stars
     stars.rotation.y += 0.004;
     stars.rotation.x += 0.001;
     stars.rotation.z -= 0.002;
     
     // Camera orbit movement
     const cameraTime = time * 0.2;
     camera.position.x = Math.cos(cameraTime) * 27;
     camera.position.z = Math.sin(cameraTime) * 27;
     camera.position.y = 3.6 + Math.sin(time * 0.4) * 1.8;
     camera.lookAt(0, 0, 0);
     
     renderer.render(scene, camera);
   };
   
   animate();
   
   // Cleanup function
   return () => {
     if (animationIdRef.current) {
       cancelAnimationFrame(animationIdRef.current);
     }
     if (mountRef.current && renderer.domElement) {
       mountRef.current.removeChild(renderer.domElement);
     }
     
     // Dispose of all geometries and materials
     planetGeometry.dispose();
     pointGeometry.dispose();
     planetMaterial.dispose();
     wireframeGeometry.dispose();
     wireframeMaterial.dispose();
     atmosphereGeometry.dispose();
     atmosphereMaterial.dispose();
     starGeometry.dispose();
     starMaterial.dispose();
     renderer.dispose();
   };
 }, []);

 return (
   <div 
     ref={mountRef} 
     className={`pointer-events-none ${className}`}
     style={{ 
       width: '750px', 
       height: '750px',
       filter: 'drop-shadow(0 0 30px rgba(77, 208, 255, 0.4)) drop-shadow(0 0 60px rgba(77, 208, 255, 0.2))',
     }}
   />
 );
};

export default RotatingPlanet;