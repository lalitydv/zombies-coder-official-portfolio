'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Particle System Component
function FloatingParticles({ count = 50, color = '#22c55e' }) {
  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() * 0.015;
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const particlePositions = useMemo(() => {
    return new Float32Array(
      particles.flatMap((p) => [p.x, p.y, p.z])
    );
  }, [particles]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle;
      const t = particle.time + state.clock.elapsedTime * speed;
      
      particle.x = x + Math.cos((t / 10) * factor) + (Math.sin(t * factor) * 0.5);
      particle.y = y + Math.sin((t / 10) * factor) + (Math.cos(t * factor) * 0.5);
      particle.z = z + Math.cos((t / 10) * factor);
      
      const positions = mesh.current.geometry.attributes.position.array;
      positions[i * 3] = particle.x;
      positions[i * 3 + 1] = particle.y;
      positions[i * 3 + 2] = particle.z;
    });
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y += 0.0005;
  });

  return (
    <>
      <Points ref={mesh} positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={2}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </>
  );
}

// Plexus Network Component
function PlexusNetwork({ count = 60, color = '#22c55e' }) {
  const group = useRef();
  const [connections, setConnections] = useState([]);
  const frameCount = useRef(0);

  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ],
        velocity: [
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
        ],
      });
    }
    return temp;
  }, [count]);

  const nodeRefs = useRef([]);

  useFrame(() => {
    if (!group.current) return;

    frameCount.current += 1;

    // Update node positions
    nodes.forEach((node, i) => {
      node.position[0] += node.velocity[0];
      node.position[1] += node.velocity[1];
      node.position[2] += node.velocity[2];

      // Bounce off boundaries
      if (Math.abs(node.position[0]) > 10) node.velocity[0] *= -1;
      if (Math.abs(node.position[1]) > 10) node.velocity[1] *= -1;
      if (Math.abs(node.position[2]) > 10) node.velocity[2] *= -1;

      // Update sphere positions
      if (nodeRefs.current[i]) {
        nodeRefs.current[i].position.set(
          node.position[0],
          node.position[1],
          node.position[2]
        );
      }
    });

    // Update connections every 5 frames for performance (throttled)
    if (frameCount.current % 5 === 0) {
      const newConnections = [];
      nodes.forEach((nodeA, i) => {
        nodes.slice(i + 1).forEach((nodeB) => {
          const dx = nodeA.position[0] - nodeB.position[0];
          const dy = nodeA.position[1] - nodeB.position[1];
          const dz = nodeA.position[2] - nodeB.position[2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 4) {
            newConnections.push({
              start: [...nodeA.position],
              end: [...nodeB.position],
              opacity: Math.max(0.1, 1 - distance / 4),
            });
          }
        });
      });
      setConnections(newConnections);
    }
  });

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <Sphere 
          key={i} 
          ref={(el) => { if (el) nodeRefs.current[i] = el; }}
          position={node.position} 
          args={[0.05, 8, 8]}
        >
          <meshBasicMaterial color={color} />
        </Sphere>
      ))}
      {connections.map((line, i) => (
        <Line
          key={`line-${i}`}
          points={[line.start, line.end]}
          color={color}
          opacity={line.opacity}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

// Morphing Shapes Component
function MorphingShapes({ count = 15, color = '#22c55e' }) {
  const group = useRef();

  const shapes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.5 + Math.random() * 0.5,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;
    
    shapes.forEach((shape, i) => {
      const child = group.current.children[i];
      if (child) {
        child.rotation.x += shape.speed * 0.01;
        child.rotation.y += shape.speed * 0.01;
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.01;
      }
    });
  });

  const geometries = useMemo(() => {
    return shapes.map((shape) => {
      const geometryType = Math.floor(Math.random() * 3);
      let geometry;
      
      switch (geometryType) {
        case 0:
          geometry = new THREE.OctahedronGeometry(shape.scale, 0);
          break;
        case 1:
          geometry = new THREE.TetrahedronGeometry(shape.scale, 0);
          break;
        default:
          geometry = new THREE.BoxGeometry(shape.scale, shape.scale, shape.scale);
      }
      
      return geometry;
    });
  }, [shapes]);

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <mesh
          key={i}
          position={shape.position}
          rotation={shape.rotation}
          geometry={geometries[i]}
        >
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.4}
            wireframe
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Wave Background Component
function WaveBackground({ color = '#22c55e' }) {
  const mesh = useRef();

  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(30, 30, 32, 32);
    return geom;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const positions = mesh.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      positions[i + 2] = Math.sin(x * 0.5 + time) * 0.5 + Math.cos(y * 0.5 + time) * 0.5;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.z += 0.001;
  });

  return (
    <mesh ref={mesh} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.3}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Combined Effect Component
function CombinedEffect({ count = 80, colors = { primary: '#22c55e', secondary: '#3b82f6' } }) {
  const group = useRef();

  return (
    <group ref={group}>
      <FloatingParticles count={Math.floor(count * 0.6)} color={colors.primary} />
      <PlexusNetwork count={Math.floor(count * 0.4)} color={colors.secondary || colors.primary} />
      <MorphingShapes count={Math.floor(count * 0.2)} color={colors.primary} />
    </group>
  );
}

// Main ThreeScene Component
export default function ThreeScene({ 
  type = 'particles', 
  count = 50, 
  colors = { primary: '#22c55e', secondary: '#3b82f6' } 
}) {
  const primaryColor = colors?.primary || '#22c55e';
  const secondaryColor = colors?.secondary || '#3b82f6';

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} color={primaryColor} intensity={0.3} />

      {type === 'particles' && (
        <FloatingParticles count={count} color={primaryColor} />
      )}
      
      {type === 'plexus' && (
        <PlexusNetwork count={count} color={primaryColor} />
      )}
      
      {type === 'morphing' && (
        <MorphingShapes count={count} color={primaryColor} />
      )}
      
      {type === 'wave' && (
        <WaveBackground color={primaryColor} />
      )}
      
      {type === 'combined' && (
        <CombinedEffect count={count} colors={{ primary: primaryColor, secondary: secondaryColor }} />
      )}
    </Canvas>
  );
}

