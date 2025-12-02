import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingParticles({ count = 500, color = '#3b82f6' }) {
  const meshRef = useRef();
  const particles = useRef([]);

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = [];
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    
    particles.current = velocities;
    return positions;
  }, [count]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < count * 3; i += 3) {
        const index = i / 3;
        const vel = particles.current[index];
        
        positions[i] += vel.x;
        positions[i + 1] += vel.y;
        positions[i + 2] += vel.z;
        
        // Bounce off boundaries
        if (Math.abs(positions[i]) > 25) vel.x *= -1;
        if (Math.abs(positions[i + 1]) > 25) vel.y *= -1;
        if (Math.abs(positions[i + 2]) > 25) vel.z *= -1;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Slow rotation
      meshRef.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
}

