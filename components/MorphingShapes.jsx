import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function MorphingShapes({ count = 20, color = '#22c55e' }) {
  const groupRef = useRef();
  const shapes = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      scale: 0.5 + Math.random() * 0.5,
      morphSpeed: 0.5 + Math.random() * 0.5,
    }));
  }, [count]);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <MorphingShape
          key={i}
          position={shape.position}
          initialRotation={shape.rotation}
          scale={shape.scale}
          morphSpeed={shape.morphSpeed}
          color={color}
        />
      ))}
    </group>
  );
}

function MorphingShape({ position, initialRotation, scale, morphSpeed, color }) {
  const meshRef = useRef();
  
  // Randomly select a geometry type
  const geometry = useMemo(() => {
    const geometries = [
      () => new THREE.BoxGeometry(1, 1, 1),
      () => new THREE.SphereGeometry(0.7, 16, 16),
      () => new THREE.OctahedronGeometry(0.7),
      () => new THREE.TetrahedronGeometry(0.7),
      () => new THREE.IcosahedronGeometry(0.7),
    ];
    return geometries[Math.floor(Math.random() * geometries.length)]();
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.elapsedTime * morphSpeed;
      
      // Smooth rotation
      meshRef.current.rotation.x = initialRotation[0] + time * 0.5;
      meshRef.current.rotation.y = initialRotation[1] + time * 0.3;
      meshRef.current.rotation.z = initialRotation[2] + time * 0.4;
      
      // Pulsing scale for morphing effect
      const pulse = 1 + Math.sin(time * 2) * 0.2;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={initialRotation}
      scale={scale}
      geometry={geometry}
    >
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

