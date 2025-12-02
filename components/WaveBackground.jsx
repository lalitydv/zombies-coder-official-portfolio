import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function WaveBackground({ color = '#22c55e' }) {
  const meshRef = useRef();
  
  const geometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(50, 50, 50, 50);
    return geometry;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      const time = clock.elapsedTime;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.1 + time) * 0.5 + Math.cos(y * 0.1 + time * 0.8) * 0.5;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      <primitive object={geometry} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

