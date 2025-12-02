import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import ThreeScene to avoid SSR issues
const ThreeScene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => null,
});

export function ThreeSceneWrapper(props) {
  return (
    <Suspense fallback={null}>
      <ThreeScene {...props} />
    </Suspense>
  );
}

