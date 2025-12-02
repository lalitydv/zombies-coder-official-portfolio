import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export function Interactive3DHero({ text = 'Zombies Coder' }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = mouse.y * 0.3;
      meshRef.current.rotation.y = mouse.x * 0.3;
      meshRef.current.position.y = Math.sin(clock.elapsedTime) * 0.5;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <group ref={meshRef}>
        <Text
          fontSize={Math.min(viewport.width / 4, 2)}
          color={hovered ? '#22c55e' : '#3b82f6'}
          anchorX="center"
          anchorY="middle"
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {text}
        </Text>
        
        {/* Glowing ring around text */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[viewport.width / 3, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={hovered ? '#22c55e' : '#3b82f6'}
            emissive={hovered ? '#22c55e' : '#3b82f6'}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </>
  );
}

