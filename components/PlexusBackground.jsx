import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PlexusBackground({ count = 100, color = '#22c55e' }) {
  const meshRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();

  // Create random points and connections
  const { positions, connections } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const positionsArray = [];
    
    // Generate positions
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      positionsArray.push({ x, y, z });
    }

    // Create connections between nearby points
    const connectionArray = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positionsArray[i].x - positionsArray[j].x;
        const dy = positionsArray[i].y - positionsArray[j].y;
        const dz = positionsArray[i].z - positionsArray[j].z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < 3) {
          connectionArray.push(
            positionsArray[i].x, positionsArray[i].y, positionsArray[i].z,
            positionsArray[j].x, positionsArray[j].y, positionsArray[j].z
          );
        }
      }
    }
    
    return {
      positions,
      connections: new Float32Array(connectionArray)
    };
  }, [count]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = clock.elapsedTime * 0.15;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.x = clock.elapsedTime * 0.1;
      pointsRef.current.rotation.y = clock.elapsedTime * 0.15;
    }
    if (linesRef.current) {
      linesRef.current.rotation.x = clock.elapsedTime * 0.1;
      linesRef.current.rotation.y = clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color={color} />
      </points>

      {/* Lines connecting points */}
      {connections.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={connections.length / 3}
              array={connections}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} opacity={0.3} transparent linewidth={1} />
        </lineSegments>
      )}
    </group>
  );
}

