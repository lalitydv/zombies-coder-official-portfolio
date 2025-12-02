import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { PlexusBackground } from './PlexusBackground';
import { FloatingParticles } from './FloatingParticles';
import { MorphingShapes } from './MorphingShapes';
import { WaveBackground } from './WaveBackground';

export function ThreeScene({ 
  type = 'plexus', 
  count = 100,
  colors = { primary: '#22c55e', secondary: '#3b82f6' }
}) {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          {type === 'plexus' && (
            <PlexusBackground count={count} color={colors.primary} />
          )}
          
          {type === 'particles' && (
            <FloatingParticles count={count * 5} color={colors.secondary} />
          )}
          
          {type === 'morphing' && (
            <MorphingShapes count={count / 5} color={colors.primary} />
          )}
          
          {type === 'wave' && (
            <WaveBackground color={colors.primary} />
          )}
          
          {type === 'combined' && (
            <>
              <PlexusBackground count={count} color={colors.primary} />
              <FloatingParticles count={count * 3} color={colors.secondary} />
              <MorphingShapes count={count / 10} color={colors.primary} />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

